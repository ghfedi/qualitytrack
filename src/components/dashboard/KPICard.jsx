import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function KPICard({
                                    title,
                                    value,
                                    unit = "%",
                                    target,
                                    trend,
                                    status = "success",
                                    icon: Icon,
                                    description
                                }) {
    const getStatusColor = () => {
        switch (status) {
            case "danger": return "from-red-500 to-red-600";
            case "warning": return "from-orange-500 to-orange-600";
            case "success": return "from-green-500 to-green-600";
            default: return "from-blue-500 to-blue-600";
        }
    };

    const getStatusBg = () => {
        switch (status) {
            case "danger": return "bg-red-50 border-red-200";
            case "warning": return "bg-orange-50 border-orange-200";
            case "success": return "bg-green-50 border-green-200";
            default: return "bg-blue-50 border-blue-200";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className={`relative overflow-hidden ${getStatusBg()} border shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getStatusColor()} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />

                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {Icon && (
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${getStatusColor()} shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                                {description && (
                                    <p className="text-xs text-gray-600 mt-1">{description}</p>
                                )}
                            </div>
                        </div>

                        {target && (
                            <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                <Target className="w-3 h-3" />
                                Objectif: {target}{unit}
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {typeof value === 'number' ? value.toFixed(1) : value}
                </span>
                                <span className="text-lg text-gray-600 font-medium">{unit}</span>
                            </div>

                            {trend && (
                                <div className="flex items-center gap-2 mt-2">
                                    {trend > 0 ? (
                                        <TrendingUp className="w-4 h-4 text-red-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-green-500" />
                                    )}
                                    <span className={`text-sm font-medium ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(trend).toFixed(1)}% vs hier
                  </span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
