import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PosteTable({ data, title = "Performance par Poste" }) {
    const getStatusIcon = (rebut, objectif = 2) => {
        if (rebut > objectif * 1.5) {
            return <AlertTriangle className="w-4 h-4 text-red-500" />;
        } else if (rebut > objectif) {
            return <AlertCircle className="w-4 h-4 text-orange-500" />;
        }
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    };

    const getStatusBadge = (rebut, objectif = 2) => {
        if (rebut > objectif * 1.5) {
            return <Badge className="bg-red-100 text-red-800 border-red-200">Critique</Badge>;
        } else if (rebut > objectif) {
            return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Attention</Badge>;
        }
        return <Badge className="bg-green-100 text-green-800 border-green-200">Conforme</Badge>;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {title}
                        <Badge variant="outline" className="ml-auto">
                            {data.length} postes surveillés
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">Statut</TableHead>
                                    <TableHead className="font-semibold">Poste</TableHead>
                                    <TableHead className="font-semibold">Équipe</TableHead>
                                    <TableHead className="font-semibold text-right">Rebut (%)</TableHead>
                                    <TableHead className="font-semibold text-right">Écart/Objectif</TableHead>
                                    <TableHead className="font-semibold">Performance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((poste, index) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <TableCell>
                                            {getStatusIcon(poste.rebut)}
                                        </TableCell>
                                        <TableCell className="font-medium">{poste.poste}</TableCell>
                                        <TableCell>{poste.equipe}</TableCell>
                                        <TableCell className="text-right font-mono font-bold">
                                            {poste.rebut.toFixed(2)}%
                                        </TableCell>
                                        <TableCell className="text-right">
                      <span className={`font-medium ${
                          poste.ecart > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {poste.ecart > 0 ? '+' : ''}{poste.ecart.toFixed(2)}%
                      </span>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(poste.rebut)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
