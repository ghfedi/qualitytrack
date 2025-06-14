import React, { useState } from "react";
import ProductionData  from "@/Entities/ProductionData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProductionDataManager({ data, onDataChange }) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        date: "",
        poste: "",
        equipe: "",
        type_carton: "",
        grammage: "",
        production_totale: "",
        quantite_rebut: "",
        type_defaut: "",
        commentaires: ""
    });

    const resetForm = () => {
        setFormData({
            date: "",
            poste: "",
            equipe: "",
            type_carton: "",
            grammage: "",
            production_totale: "",
            quantite_rebut: "",
            type_defaut: "",
            commentaires: ""
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await ProductionData.create({
                ...formData,
                grammage: parseFloat(formData.grammage),
                production_totale: parseInt(formData.production_totale),
                quantite_rebut: parseInt(formData.quantite_rebut)
            });
            setIsCreating(false);
            resetForm();
            onDataChange();
        } catch (error) {
            console.error("Erreur lors de la création:", error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            date: item.date,
            poste: item.poste,
            equipe: item.equipe,
            type_carton: item.type_carton,
            grammage: item.grammage?.toString() || "",
            production_totale: item.production_totale?.toString() || "",
            quantite_rebut: item.quantite_rebut?.toString() || "",
            type_defaut: item.type_defaut || "",
            commentaires: item.commentaires || ""
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await ProductionData.update(editingId, {
                ...formData,
                grammage: parseFloat(formData.grammage),
                production_totale: parseInt(formData.production_totale),
                quantite_rebut: parseInt(formData.quantite_rebut)
            });
            setEditingId(null);
            resetForm();
            onDataChange();
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette donnée ?")) {
            try {
                await ProductionData.delete(id);
                onDataChange();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    const calculateTauxRebut = (production, rebut) => {
        return production > 0 ? ((rebut / production) * 100).toFixed(2) : 0;
    };

    const FormFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                />
            </div>

            <div>
                <Label htmlFor="poste">Poste</Label>
                <Select value={formData.poste} onValueChange={(value) => setFormData({...formData, poste: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un poste" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Poste 1">Poste 1</SelectItem>
                        <SelectItem value="Poste 2">Poste 2</SelectItem>
                        <SelectItem value="Poste 3">Poste 3</SelectItem>
                        <SelectItem value="Poste 4">Poste 4</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="equipe">Équipe</Label>
                <Select value={formData.equipe} onValueChange={(value) => setFormData({...formData, equipe: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une équipe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Équipe A">Équipe A</SelectItem>
                        <SelectItem value="Équipe B">Équipe B</SelectItem>
                        <SelectItem value="Équipe C">Équipe C</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="type_carton">Type de Carton</Label>
                <Select value={formData.type_carton} onValueChange={(value) => setFormData({...formData, type_carton: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Type de carton" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Simple cannelure">Simple cannelure</SelectItem>
                        <SelectItem value="Double cannelure">Double cannelure</SelectItem>
                        <SelectItem value="Triple cannelure">Triple cannelure</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="grammage">Grammage (g/m²)</Label>
                <Input
                    id="grammage"
                    type="number"
                    value={formData.grammage}
                    onChange={(e) => setFormData({...formData, grammage: e.target.value})}
                    placeholder="450"
                />
            </div>

            <div>
                <Label htmlFor="production_totale">Production Totale</Label>
                <Input
                    id="production_totale"
                    type="number"
                    value={formData.production_totale}
                    onChange={(e) => setFormData({...formData, production_totale: e.target.value})}
                    placeholder="10000"
                    required
                />
            </div>

            <div>
                <Label htmlFor="quantite_rebut">Quantité Rebut</Label>
                <Input
                    id="quantite_rebut"
                    type="number"
                    value={formData.quantite_rebut}
                    onChange={(e) => setFormData({...formData, quantite_rebut: e.target.value})}
                    placeholder="200"
                    required
                />
            </div>

            <div>
                <Label htmlFor="type_defaut">Type de Défaut</Label>
                <Select value={formData.type_defaut} onValueChange={(value) => setFormData({...formData, type_defaut: value})}>
                    <SelectTrigger>
                        <SelectValue placeholder="Type de défaut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Décollement">Décollement</SelectItem>
                        <SelectItem value="Gauchissement">Gauchissement</SelectItem>
                        <SelectItem value="Écrasement">Écrasement</SelectItem>
                        <SelectItem value="Mauvaise cannelure">Mauvaise cannelure</SelectItem>
                        <SelectItem value="Dimension incorrecte">Dimension incorrecte</SelectItem>
                        <SelectItem value="Qualité impression">Qualité impression</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="md:col-span-2">
                <Label htmlFor="commentaires">Commentaires</Label>
                <Input
                    id="commentaires"
                    value={formData.commentaires}
                    onChange={(e) => setFormData({...formData, commentaires: e.target.value})}
                    placeholder="Commentaires optionnels..."
                />
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
                            Nouvelle Donnée de Production
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
                <h3 className="text-xl font-semibold">Gestion des Données de Production</h3>
                {!isCreating && (
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter des données
                    </Button>
                )}
            </div>

            {/* Tableau des données */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>Date</TableHead>
                            <TableHead>Poste</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Type Carton</TableHead>
                            <TableHead>Production</TableHead>
                            <TableHead>Rebut</TableHead>
                            <TableHead>Taux (%)</TableHead>
                            <TableHead>Défaut</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-gray-50">
                                {editingId === item.id ? (
                                    <TableCell colSpan={9}>
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
                                        <TableCell>{format(new Date(item.date), "dd/MM/yyyy", { locale: fr })}</TableCell>
                                        <TableCell>{item.poste}</TableCell>
                                        <TableCell>{item.equipe}</TableCell>
                                        <TableCell>{item.type_carton}</TableCell>
                                        <TableCell className="font-mono">{item.production_totale?.toLocaleString()}</TableCell>
                                        <TableCell className="font-mono">{item.quantite_rebut?.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge className={`${
                                                calculateTauxRebut(item.production_totale, item.quantite_rebut) > 3
                                                    ? 'bg-red-100 text-red-800'
                                                    : calculateTauxRebut(item.production_totale, item.quantite_rebut) > 2
                                                        ? 'bg-orange-100 text-orange-800'
                                                        : 'bg-green-100 text-green-800'
                                            }`}>
                                                {calculateTauxRebut(item.production_totale, item.quantite_rebut)}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{item.type_defaut}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(item.id)}
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
