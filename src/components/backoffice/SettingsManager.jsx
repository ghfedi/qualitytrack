import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, AlertTriangle, Database, Bell, Shield } from "lucide-react";

export default function SettingsManager() {
    const [settings, setSettings] = useState({
        // Seuils d'alerte
        seuilAlerte: 2,
        seuilCritique: 3,

        // Notifications
        emailAlertes: true,
        alertesTempsReel: true,
        rapportQuotidien: false,
        rapportHebdomadaire: true,

        // Paramètres système
        autoRefresh: true,
        refreshInterval: 5,
        dataRetention: 365,

        // Objectifs
        objectifMensuel: 2,
        objectifTrimestre: 1.8,
        objectifAnnuel: 1.5
    });

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const saveSettings = () => {
        // Simuler la sauvegarde
        alert("Paramètres sauvegardés avec succès !");
    };

    const resetSettings = () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?")) {
            setSettings({
                seuilAlerte: 2,
                seuilCritique: 3,
                emailAlertes: true,
                alertesTempsReel: true,
                rapportQuotidien: false,
                rapportHebdomadaire: true,
                autoRefresh: true,
                refreshInterval: 5,
                dataRetention: 365,
                objectifMensuel: 2,
                objectifTrimestre: 1.8,
                objectifAnnuel: 1.5
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Paramètres Système</h3>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={resetSettings}>
                        Réinitialiser
                    </Button>
                    <Button onClick={saveSettings} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Seuils d'alerte */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Seuils d'Alerte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="seuilAlerte">Seuil d'alerte (%)</Label>
                            <Input
                                id="seuilAlerte"
                                type="number"
                                step="0.1"
                                value={settings.seuilAlerte}
                                onChange={(e) => handleSettingChange('seuilAlerte', parseFloat(e.target.value))}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Déclenche une alerte orange
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="seuilCritique">Seuil critique (%)</Label>
                            <Input
                                id="seuilCritique"
                                type="number"
                                step="0.1"
                                value={settings.seuilCritique}
                                onChange={(e) => handleSettingChange('seuilCritique', parseFloat(e.target.value))}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Déclenche une alerte rouge
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <h4 className="font-medium">Objectifs Qualité</h4>

                            <div>
                                <Label htmlFor="objectifMensuel">Objectif mensuel (%)</Label>
                                <Input
                                    id="objectifMensuel"
                                    type="number"
                                    step="0.1"
                                    value={settings.objectifMensuel}
                                    onChange={(e) => handleSettingChange('objectifMensuel', parseFloat(e.target.value))}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="objectifTrimestre">Objectif trimestriel (%)</Label>
                                <Input
                                    id="objectifTrimestre"
                                    type="number"
                                    step="0.1"
                                    value={settings.objectifTrimestre}
                                    onChange={(e) => handleSettingChange('objectifTrimestre', parseFloat(e.target.value))}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="objectifAnnuel">Objectif annuel (%)</Label>
                                <Input
                                    id="objectifAnnuel"
                                    type="number"
                                    step="0.1"
                                    value={settings.objectifAnnuel}
                                    onChange={(e) => handleSettingChange('objectifAnnuel', parseFloat(e.target.value))}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Alertes par email</Label>
                                <p className="text-xs text-gray-500">
                                    Recevoir les alertes par email
                                </p>
                            </div>
                            <Switch
                                checked={settings.emailAlertes}
                                onCheckedChange={(checked) => handleSettingChange('emailAlertes', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Alertes temps réel</Label>
                                <p className="text-xs text-gray-500">
                                    Notifications instantanées dans l'app
                                </p>
                            </div>
                            <Switch
                                checked={settings.alertesTempsReel}
                                onCheckedChange={(checked) => handleSettingChange('alertesTempsReel', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Rapport quotidien</Label>
                                <p className="text-xs text-gray-500">
                                    Rapport automatique chaque jour
                                </p>
                            </div>
                            <Switch
                                checked={settings.rapportQuotidien}
                                onCheckedChange={(checked) => handleSettingChange('rapportQuotidien', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Rapport hebdomadaire</Label>
                                <p className="text-xs text-gray-500">
                                    Synthèse hebdomadaire par email
                                </p>
                            </div>
                            <Switch
                                checked={settings.rapportHebdomadaire}
                                onCheckedChange={(checked) => handleSettingChange('rapportHebdomadaire', checked)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Paramètres système */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            Système
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Actualisation automatique</Label>
                                <p className="text-xs text-gray-500">
                                    Rafraîchir les données automatiquement
                                </p>
                            </div>
                            <Switch
                                checked={settings.autoRefresh}
                                onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="refreshInterval">Intervalle d'actualisation (minutes)</Label>
                            <Input
                                id="refreshInterval"
                                type="number"
                                min="1"
                                max="60"
                                value={settings.refreshInterval}
                                onChange={(e) => handleSettingChange('refreshInterval', parseInt(e.target.value))}
                                className="mt-1"
                                disabled={!settings.autoRefresh}
                            />
                        </div>

                        <div>
                            <Label htmlFor="dataRetention">Rétention des données (jours)</Label>
                            <Input
                                id="dataRetention"
                                type="number"
                                min="30"
                                max="3650"
                                value={settings.dataRetention}
                                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Durée de conservation des données de production
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Informations système */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Informations Système
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm text-gray-500">Version</Label>
                                <p className="font-medium">v2.1.0</p>
                            </div>
                            <div>
                                <Label className="text-sm text-gray-500">Dernière mise à jour</Label>
                                <p className="font-medium">15/12/2024</p>
                            </div>
                            <div>
                                <Label className="text-sm text-gray-500">Base de données</Label>
                                <Badge className="bg-green-100 text-green-800">Connectée</Badge>
                            </div>
                            <div>
                                <Label className="text-sm text-gray-500">Statut</Label>
                                <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h4 className="font-medium">Actions de maintenance</h4>
                            <Button variant="outline" size="sm" className="w-full">
                                Vider le cache
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                                Optimiser la base de données
                            </Button>
                            <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                                Réinitialiser toutes les données
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
