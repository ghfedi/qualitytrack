import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";

const COLORS = ['#3b82f6', '#ef4444', '#f97316', '#22c55e', '#8b5cf6', '#06b6d4'];

export default function ReportsManager({ productionData, actions }) {
    const [reportType, setReportType] = useState("production");
    const [period, setPeriod] = useState("month");

    const getFilteredData = () => {
        const now = new Date();
        let startDate;

        switch (period) {
            case "week":
                startDate = subDays(now, 7);
                break;
            case "month":
                startDate = startOfMonth(now);
                break;
            case "quarter":
                startDate = subDays(now, 90);
                break;
            default:
                startDate = subDays(now, 30);
        }

        return productionData.filter(item => new Date(item.date) >= startDate);
    };

    const generateProductionReport = () => {
        const filteredData = getFilteredData();

        // Données par poste
        const posteStats = {};
        filteredData.forEach(item => {
            if (!posteStats[item.poste]) {
                posteStats[item.poste] = {
                    production: 0,
                    rebut: 0,
                    count: 0
                };
            }
            posteStats[item.poste].production += item.production_totale;
            posteStats[item.poste].rebut += item.quantite_rebut;
            posteStats[item.poste].count += 1;
        });

        const posteData = Object.entries(posteStats).map(([poste, stats]) => ({
            poste,
            production: stats.production,
            rebut: stats.rebut,
            taux_rebut: ((stats.rebut / stats.production) * 100).toFixed(2)
        }));

        // Données par type de défaut
        const defautStats = {};
        filteredData.forEach(item => {
            if (item.type_defaut) {
                defautStats[item.type_defaut] = (defautStats[item.type_defaut] || 0) + item.quantite_rebut;
            }
        });

        const defautData = Object.entries(defautStats).map(([defaut, count]) => ({
            name: defaut,
            value: count
        }));

        return { posteData, defautData };
    };

    const generateActionsReport = () => {
        // Statistiques des actions par statut
        const statutStats = {};
        actions.forEach(action => {
            statutStats[action.statut] = (statutStats[action.statut] || 0) + 1;
        });

        const statutData = Object.entries(statutStats).map(([statut, count]) => ({
            name: statut,
            value: count
        }));

        // Actions par type
        const typeStats = {};
        actions.forEach(action => {
            typeStats[action.type_action] = (typeStats[action.type_action] || 0) + 1;
        });

        const typeData = Object.entries(typeStats).map(([type, count]) => ({
            type,
            count
        }));

        return { statutData, typeData };
    };

    const exportReport = () => {
        const reportData = reportType === "production" ? generateProductionReport() : generateActionsReport();

        // Simuler l'export
        const jsonData = JSON.stringify(reportData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `rapport-${reportType}-${period}-${format(new Date(), 'yyyy-MM-dd')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const { posteData, defautData } = generateProductionReport();
    const { statutData, typeData } = generateActionsReport();

    return (
        <div className="space-y-6">
            {/* Contrôles */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">Générateur de Rapports</h3>

                <div className="flex items-center gap-3">
                    <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Type de rapport" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="production">Rapport Production</SelectItem>
                            <SelectItem value="actions">Rapport Actions</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">7 jours</SelectItem>
                            <SelectItem value="month">Ce mois</SelectItem>
                            <SelectItem value="quarter">3 mois</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={exportReport} className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                    </Button>
                </div>
            </div>

            {/* Rapports Production */}
            {reportType === "production" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Performance par Poste
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={posteData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="poste" />
                                        <YAxis />
                                        <Tooltip formatter={(value, name) => [
                                            name === 'taux_rebut' ? `${value}%` : value.toLocaleString(),
                                            name === 'taux_rebut' ? 'Taux rebut' : name === 'production' ? 'Production' : 'Rebut'
                                        ]} />
                                        <Bar dataKey="production" fill="#3b82f6" name="production" />
                                        <Bar dataKey="rebut" fill="#ef4444" name="rebut" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5" />
                                Répartition des Défauts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={defautData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {defautData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Résumé */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Résumé Exécutif - Production</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {getFilteredData().reduce((sum, item) => sum + item.production_totale, 0).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">Production Totale</p>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <p className="text-2xl font-bold text-red-600">
                                        {getFilteredData().reduce((sum, item) => sum + item.quantite_rebut, 0).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">Rebut Total</p>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600">
                                        {(getFilteredData().reduce((sum, item) => sum + item.quantite_rebut, 0) /
                                            getFilteredData().reduce((sum, item) => sum + item.production_totale, 0) * 100).toFixed(2)}%
                                    </p>
                                    <p className="text-sm text-gray-600">Taux Moyen</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">
                                        {posteData.filter(p => parseFloat(p.taux_rebut) <= 2).length}
                                    </p>
                                    <p className="text-sm text-gray-600">Postes Conformes</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Rapports Actions */}
            {reportType === "actions" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5" />
                                Statut des Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statutData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {statutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Actions par Type
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={typeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="type" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Résumé Actions */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Résumé Exécutif - Actions Correctives</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">{actions.length}</p>
                                    <p className="text-sm text-gray-600">Actions Totales</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">
                                        {actions.filter(a => a.statut === "Terminé").length}
                                    </p>
                                    <p className="text-sm text-gray-600">Terminées</p>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600">
                                        {actions.filter(a => a.statut === "En cours").length}
                                    </p>
                                    <p className="text-sm text-gray-600">En Cours</p>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <p className="text-2xl font-bold text-red-600">
                                        {actions.filter(a => a.statut === "En retard").length}
                                    </p>
                                    <p className="text-sm text-gray-600">En Retard</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
