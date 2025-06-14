import React, { useState, useEffect } from "react";
import ActionCorrective  from "@/Entities/ActionCorrective";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
export default function ActionsPage() {
    const [actions, setActions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadActions();
    }, []);

    const loadActions = async () => {
        setIsLoading(true);
        try {
            const data = await ActionCorrective.list("-created_date");
            setActions(data);
        } catch (error) {
            console.error("Erreur lors du chargement des actions:", error);
        }
        setIsLoading(false);
    };

    const getStatusIcon = (statut) => {
        switch (statut) {
            case "Terminé": return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "En retard": return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-blue-500" />;
        }
    };

    const getStatusBadge = (statut) => {
        switch (statut) {
            case "Terminé": return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
            case "En retard": return <Badge className="bg-red-100 text-red-800">En retard</Badge>;
            case "En cours": return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
            default: return <Badge className="bg-gray-100 text-gray-800">{statut}</Badge>;
        }
    };

    const getPriorityBadge = (priorite) => {
        switch (priorite) {
            case "Haute": return <Badge variant="destructive">Haute</Badge>;
            case "Moyenne": return <Badge variant="secondary">Moyenne</Badge>;
            default: return <Badge variant="outline">Basse</Badge>;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Actions Correctives
                        </h1>
                        <p className="text-lg text-gray-600">
                            Suivi des actions d'amélioration qualité
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Nouvelle Action
                    </Button>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Actions totales</p>
                                        <p className="text-2xl font-bold text-gray-900">{actions.length}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <AlertCircle className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">En cours</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {actions.filter(a => a.statut === "En cours").length}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Clock className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Terminées</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {actions.filter(a => a.statut === "Terminé").length}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">En retard</p>
                                        <p className="text-2xl font-bold text-red-600">
                                            {actions.filter(a => a.statut === "En retard").length}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-red-100 rounded-xl">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Liste des actions */}
                <div className="space-y-4">
                    {actions.map((action, index) => (
                        <motion.div
                            key={action.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {getStatusIcon(action.statut)}
                                            <div>
                                                <CardTitle className="text-lg">{action.titre}</CardTitle>
                                                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {getPriorityBadge(action.priorite)}
                                            {getStatusBadge(action.statut)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">Responsable:</span>
                                            <span className="font-medium">{action.responsable}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">Échéance:</span>
                                            <span className="font-medium">
                        {format(new Date(action.date_prevue), "dd MMM yyyy", { locale: fr })}
                      </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-medium ml-2">{action.type_action}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Poste:</span>
                                            <span className="font-medium ml-2">{action.poste_concerne}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {actions.length === 0 && (
                    <div className="text-center py-12">
                        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucune action corrective
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Commencez par créer votre première action corrective.
                        </p>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                            <Plus className="w-5 h-5 mr-2" />
                            Créer une action
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
