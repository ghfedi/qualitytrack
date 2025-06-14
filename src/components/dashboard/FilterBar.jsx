import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Calendar, Users, Factory, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FilterBar({
                                      filters,
                                      onFilterChange,
                                      onExportPDF
                                  }) {
    const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'Tous').length;

    return (
        <Card className="shadow-lg bg-white/95 backdrop-blur-sm border-blue-100">
            <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">Filtres</span>
                        {activeFiltersCount > 0 && (
                            <Badge className="bg-blue-100 text-blue-800">
                                {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        {/* Période */}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <Select value={filters.periode} onValueChange={(value) => onFilterChange('periode', value)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Période" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aujourd'hui">Aujourd'hui</SelectItem>
                                    <SelectItem value="cette_semaine">Cette semaine</SelectItem>
                                    <SelectItem value="ce_mois">Ce mois</SelectItem>
                                    <SelectItem value="3_mois">3 derniers mois</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Équipe */}
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <Select value={filters.equipe} onValueChange={(value) => onFilterChange('equipe', value)}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Équipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tous">Toutes équipes</SelectItem>
                                    <SelectItem value="Équipe A">Équipe A</SelectItem>
                                    <SelectItem value="Équipe B">Équipe B</SelectItem>
                                    <SelectItem value="Équipe C">Équipe C</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Poste */}
                        <div className="flex items-center gap-2">
                            <Factory className="w-4 h-4 text-gray-500" />
                            <Select value={filters.poste} onValueChange={(value) => onFilterChange('poste', value)}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Poste" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tous">Tous postes</SelectItem>
                                    <SelectItem value="Poste 1">Poste 1</SelectItem>
                                    <SelectItem value="Poste 2">Poste 2</SelectItem>
                                    <SelectItem value="Poste 3">Poste 3</SelectItem>
                                    <SelectItem value="Poste 4">Poste 4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Type de carton */}
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <Select value={filters.type_carton} onValueChange={(value) => onFilterChange('type_carton', value)}>
                                <SelectTrigger className="w-44">
                                    <SelectValue placeholder="Type carton" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tous">Tous types</SelectItem>
                                    <SelectItem value="Simple cannelure">Simple cannelure</SelectItem>
                                    <SelectItem value="Double cannelure">Double cannelure</SelectItem>
                                    <SelectItem value="Triple cannelure">Triple cannelure</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button
                        onClick={onExportPDF}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                    >
                        Export PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
