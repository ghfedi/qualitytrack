import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function TrendChart({ data, target = 2, title = "Évolution du Taux de Rebut" }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 mb-2">
                        {format(new Date(label), 'dd MMM yyyy', { locale: fr })}
                    </p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm">
                {entry.dataKey}: <strong>{entry.value.toFixed(2)}%</strong>
              </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const getLineColor = (value) => {
        if (value > target * 1.5) return '#ef4444'; // Rouge
        if (value > target) return '#f97316'; // Orange
        return '#22c55e'; // Vert
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Objectif: {target}%
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(date) => format(new Date(date), 'dd/MM', { locale: fr })}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine
                                    y={target}
                                    stroke="#3b82f6"
                                    strokeDasharray="5 5"
                                    strokeWidth={2}
                                    label={{ value: `Objectif ${target}%`, position: "topRight" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="taux_rebut"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
