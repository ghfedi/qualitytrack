import React, { useState, useEffect } from "react";
import  ProductionData  from "@/Entities/ProductionData";
import ActionCorrective  from "@/Entities/ActionCorrective";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Plus, Settings, Users, BarChart } from "lucide-react";

import ProductionDataManager from "../components/backoffice/ProductionDataManager";
import ActionsManager from "../components/backoffice/ActionsManager";
import ReportsManager from "../components/backoffice/ReportsManager";
import SettingsManager from "../components/backoffice/SettingsManager";

export default function BackofficePage() {
    const [productionData, setProductionData] = useState([]);
    const [actions, setActions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("production");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [prodData, actionsData] = await Promise.all([
                ProductionData.list("-created_date"),
                ActionCorrective.list("-created_date")
            ]);
            setProductionData(prodData);
            setActions(actionsData);
        } catch (error) {
            console.error("Erreur lors du chargement:", error);
        }
        setIsLoading(false);
    };

    const refreshData = () => {
        loadData();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                        <div className="h-96 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Backoffice Administration
                        </h1>
                        <p className="text-lg text-gray-600">
                            Gestion complète des données de production et actions correctives
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className="bg-green-100 text-green-800 px-3 py-1">
                            <Database className="w-4 h-4 mr-1" />
                            Système opérationnel
                        </Badge>
                        <Button
                            onClick={refreshData}
                            variant="outline"
                            className="border-blue-200 hover:bg-blue-50"
                        >
                            Actualiser
                        </Button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Données Production</p>
                                    <p className="text-2xl font-bold text-blue-600">{productionData.length}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <BarChart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Actions Correctives</p>
                                    <p className="text-2xl font-bold text-purple-600">{actions.length}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Settings className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Taux Rebut Moyen</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {productionData.length > 0 ?
                                            ((productionData.reduce((sum, item) => sum + item.quantite_rebut, 0) /
                                                productionData.reduce((sum, item) => sum + item.production_totale, 0)) * 100).toFixed(1)
                                            : 0}%
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Database className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Actions En Cours</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {actions.filter(a => a.statut === "En cours").length}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Interface de gestion par onglets */}
                <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <div className="border-b border-gray-200 px-6 pt-6">
                                <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                                    <TabsTrigger value="production" className="flex items-center gap-2">
                                        <BarChart className="w-4 h-4" />
                                        Données Production
                                    </TabsTrigger>
                                    <TabsTrigger value="actions" className="flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Actions Correctives
                                    </TabsTrigger>
                                    <TabsTrigger value="reports" className="flex items-center gap-2">
                                        <Database className="w-4 h-4" />
                                        Rapports
                                    </TabsTrigger>
                                    <TabsTrigger value="settings" className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Paramètres
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="p-6">
                                <TabsContent value="production" className="mt-0">
                                    <ProductionDataManager
                                        data={productionData}
                                        onDataChange={refreshData}
                                    />
                                </TabsContent>

                                <TabsContent value="actions" className="mt-0">
                                    <ActionsManager
                                        actions={actions}
                                        onActionsChange={refreshData}
                                    />
                                </TabsContent>

                                <TabsContent value="reports" className="mt-0">
                                    <ReportsManager
                                        productionData={productionData}
                                        actions={actions}
                                    />
                                </TabsContent>

                                <TabsContent value="settings" className="mt-0">
                                    <SettingsManager />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
