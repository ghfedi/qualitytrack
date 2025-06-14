import React, { useState } from "react";
import  ActionCorrective  from "@/Entities/ActionCorrective";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ActionsManager({ actions, onActionsChange }) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        type_action: "",
        poste_concerne: "",
        responsable: "",
        date_debut: "",
        date_prevue: "",
        statut: "En cours",
        priorite: "Moyenne"
    });

    const resetForm = () => {
        setFormData({
            titre: "",
            description: "",
            type_action: "",
            poste_concerne: "",
            responsable: "",
            date_debut: "",
            date_prevue: "",
            statut: "En cours",
            priorite: "Moyenne"
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await ActionCorrective.create(formData);
            setIsCreating(false);
            resetForm();
            onActionsChange();
        } catch (error) {
            console.error("Erreur lors de la création:", error);
        }
    };

    const handleEdit = (action) => {
        setEditingId(action.id);
        setFormData({
            titre: action.titre,
            description: action.description,
            type_action: action.type_action,
            poste_concerne: action.poste_concerne,
            responsable: action.responsable,
            date_debut: action.date_debut,
            date_prevue: action.date_prevue,
            statut: action.statut,
            priorite: action.priorite
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await ActionCorrective.update(editingId, formData);
            setEditingId(null);
            resetForm();
            onActionsChange();
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette action corrective ?")) {
            try {
                await ActionCorrective.delete(id);
                onActionsChange();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
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

    const FormFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <Label htmlFor="titre">Titre de l'action</Label>
                <Input
                    id="titre"
                    value={formData.titre}
                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                    placeholder="Titre de l'action corrective"
                    required
                />
            </div>

            <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Description détaillée de l'action"
                    className="h-24"
                />
            </div>

            <div>
                <Label htmlFor="type_action">Type d'action</Label>
                <Select value={formData.type_action} onValueChange={(value) => setFormData({...formData, type_action: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Type d'action" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="QRQC">QRQC</SelectItem>
                        <SelectItem value="8D">8D</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Formation">Formation</SelectItem>
                        <SelectItem value="Amélioration process">Amélioration process</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="poste_concerne">Poste concerné</Label>
                <Select value={formData.poste_concerne} onValueChange={(value) => setFormData({...formData, poste_concerne: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Poste concerné" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Poste 1">Poste 1</SelectItem>
                        <SelectItem value="Poste 2">Poste 2</SelectItem>
                        <SelectItem value="Poste 3">Poste 3</SelectItem>
                        <SelectItem value="Poste 4">Poste 4</SelectItem>
                        <SelectItem value="Tous postes">Tous postes</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                    id="responsable"
                    value={formData.responsable}
                    onChange={(e) => setFormData({...formData, responsable: e.target.value})}
                    placeholder="Nom du responsable"
                    required
                />
            </div>

            <div>
                <Label htmlFor="priorite">Priorité</Label>
                <Select value={formData.priorite} onValueChange={(value) => setFormData({...formData, priorite: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Haute">Haute</SelectItem>
                        <SelectItem value="Moyenne">Moyenne</SelectItem>
                        <SelectItem value="Basse">Basse</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="date_debut">Date de début</Label>
                <Input
                    id="date_debut"
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => setFormData({...formData, date_debut: e.target.value})}
                    required
                />
            </div>

            <div>
                <Label htmlFor="date_prevue">Date prévue</Label>
                <Input
                    id="date_prevue"
                    type="date"
                    value={formData.date_prevue}
                    onChange={(e) => setFormData({...formData, date_prevue: e.target.value})}
                    required
                />
            </div>

            <div>
                <Label htmlFor="statut">Statut</Label>
                <Select value={formData.statut} onValueChange={(value) => setFormData({...formData, statut: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Terminé">Terminé</SelectItem>
                        <SelectItem value="En retard">En retard</SelectItem>
                        <SelectItem value="Annulé">Annulé</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Formulaire de création */}
            {isCreating && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Nouvelle Action Corrective
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <FormFields />
                            <div className="flex gap-3">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    <Save className="w-4 h-4 mr-2" />
                                    Créer
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        resetForm();
                                    }}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Annuler
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Gestion des Actions Correctives</h3>
                {!isCreating && (
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle action
                    </Button>
                )}
            </div>

            {/* Tableau des actions */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>Statut</TableHead>
                            <TableHead>Titre</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead>Poste</TableHead>
                            <TableHead>Priorité</TableHead>
                            <TableHead>Échéance</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {actions.map((action) => (
                            <TableRow key={action.id} className="hover:bg-gray-50">
                                {editingId === action.id ? (
                                    <TableCell colSpan={8}>
                                        <form onSubmit={handleUpdate} className="space-y-4">
                                            <FormFields />
                                            <div className="flex gap-3">
                                                <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Sauvegarder
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        resetForm();
                                                    }}
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Annuler
                                                </Button>
                                            </div>
                                        </form>
                                    </TableCell>
                                ) : (
                                    <>
                                        <TableCell>{getStatusIcon(action.statut)}</TableCell>
                                        <TableCell className="font-medium">{action.titre}</TableCell>
                                        <TableCell>{action.type_action}</TableCell>
                                        <TableCell>{action.responsable}</TableCell>
                                        <TableCell>{action.poste_concerne}</TableCell>
                                        <TableCell>{getPriorityBadge(action.priorite)}</TableCell>
                                        <TableCell>{format(new Date(action.date_prevue), "dd/MM/yyyy", { locale: fr })}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(action)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(action.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
