import React, { useState, useEffect } from "react";
import ProductionData from "@/Entities/ProductionData";
import { AlertCircle, TrendingDown, Factory, Target } from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

import FilterBar from "../components/dashboard/FilterBar";
import KPICard from "../components/dashboard/KPICard";
import TrendChart from "../components/dashboard/TrendChart";
import DefectChart from "../components/dashboard/DefectChart";
import PosteTable from "../components/dashboard/PosteTable";

export default function Dashboard() {
    const [productionData, setProductionData] = useState([]);
    const [filters, setFilters] = useState({
        periode: "ce_mois",
        equipe: "Tous",
        poste: "Tous",
        type_carton: "Tous"
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [filters]);
    // Create sample data in  Bulkdata
    const data = [
        {
            "date": "2025-06-07",
            "poste": "Poste 1",
            "equipe": "Équipe A",
            "type_carton": "Double cannelure",
            "grammage": 450,
            "production_totale": 10000,
            "quantite_rebut": 180,
            "type_defaut": "Décollement",
            "commentaires": "Problème d'humidité détecté",
            "id": "684b389b507a33a541564634",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-08",
            "poste": "Poste 2",
            "equipe": "Équipe B",
            "type_carton": "Simple cannelure",
            "grammage": 350,
            "production_totale": 8500,
            "quantite_rebut": 425,
            "type_defaut": "Gauchissement",
            "commentaires": "Réglage température onduleuse",
            "id": "684b389b507a33a541564635",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-09",
            "poste": "Poste 3",
            "equipe": "Équipe C",
            "type_carton": "Double cannelure",
            "grammage": 500,
            "production_totale": 12000,
            "quantite_rebut": 240,
            "type_defaut": "Écrasement",
            "commentaires": "Pression rouleau trop élevée",
            "id": "684b389b507a33a541564636",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-10",
            "poste": "Poste 1",
            "equipe": "Équipe A",
            "type_carton": "Simple cannelure",
            "grammage": 300,
            "production_totale": 9500,
            "quantite_rebut": 142,
            "type_defaut": "Mauvaise cannelure",
            "commentaires": "Maintenance préventive effectuée",
            "id": "684b389b507a33a541564637",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-11",
            "poste": "Poste 2",
            "equipe": "Équipe B",
            "type_carton": "Double cannelure",
            "grammage": 400,
            "production_totale": 11000,
            "quantite_rebut": 220,
            "type_defaut": "Décollement",
            "commentaires": "Qualité colle vérifiée",
            "id": "684b389b507a33a541564638",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-12",
            "poste": "Poste 1",
            "equipe": "Équipe C",
            "type_carton": "Triple cannelure",
            "grammage": 600,
            "production_totale": 7500,
            "quantite_rebut": 150,
            "type_defaut": "Dimension incorrecte",
            "commentaires": "Étalonnage machine OK",
            "id": "684b389b507a33a541564639",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-13",
            "poste": "Poste 3",
            "equipe": "Équipe A",
            "type_carton": "Simple cannelure",
            "grammage": 320,
            "production_totale": 8800,
            "quantite_rebut": 176,
            "type_defaut": "Gauchissement",
            "commentaires": "Formation équipe prévue",
            "id": "684b389b507a33a54156463a",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        },
        {
            "date": "2025-06-14",
            "poste": "Poste 2",
            "equipe": "Équipe C",
            "type_carton": "Double cannelure",
            "grammage": 480,
            "production_totale": 10500,
            "quantite_rebut": 315,
            "type_defaut": "Écrasement",
            "commentaires": "Action corrective lancée",
            "id": "684b389b507a33a54156463b",
            "created_date": "2025-06-12T20:29:15.927000",
            "updated_date": "2025-06-12T20:29:15.927000",
            "created_by_id": "684b359401e810ca5e3f15b7",
            "created_by": "fghribi3@gmail.com",
            "is_sample": false
        }
    ];
    const loadData = async () => {
        setIsLoading(true);
        try {

            setProductionData(data);
            console.error("Erreur lors du chargement des données:", error);
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
        }
        setIsLoading(false);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleExportPDF = () => {
        // Simuler l'export PDF
        alert("Export PDF en cours de développement...");
    };

    // Calculs des KPI
    const calculateKPIs = () => {
        if (!productionData.length) return {
            tauxRebut: 0,
            tendance: 0,
            nbAlertes: 0,
            conformite: 100
        };

        const totalProduction = productionData.reduce((sum, item) => sum + item.production_totale, 0);
        const totalRebut = productionData.reduce((sum, item) => sum + item.quantite_rebut, 0);
        const tauxRebut = totalProduction > 0 ? (totalRebut / totalProduction) * 100 : 0;

        // Calcul de la tendance (comparaison avec les données précédentes)
        const today = new Date();
        const yesterday = subDays(today, 1);

        const dataToday = productionData.filter(item =>
            format(new Date(item.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
        );
        const dataYesterday = productionData.filter(item =>
            format(new Date(item.date), 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')
        );

        const tauxHier = dataYesterday.length > 0 ?
            (dataYesterday.reduce((sum, item) => sum + item.quantite_rebut, 0) /
                dataYesterday.reduce((sum, item) => sum + item.production_totale, 0)) * 100 : 0;

        const tendance = tauxHier > 0 ? ((tauxRebut - tauxHier) / tauxHier) * 100 : 0;

        // Calcul des alertes (postes > 3%)
        const posteStats = getPosteStats();
        const nbAlertes = posteStats.filter(poste => poste.rebut > 3).length;

        // Calcul de la conformité (% de postes sous l'objectif)
        const conformite = posteStats.length > 0 ?
            (posteStats.filter(poste => poste.rebut <= 2).length / posteStats.length) * 100 : 100;

        return { tauxRebut, tendance, nbAlertes, conformite };
    };

    // Données pour le graphique de tendance
    const getTrendData = () => {
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = subDays(new Date(), 29 - i);
            const dayData = productionData.filter(item =>
                format(new Date(item.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            );

            const totalProd = dayData.reduce((sum, item) => sum + item.production_totale, 0);
            const totalRebut = dayData.reduce((sum, item) => sum + item.quantite_rebut, 0);
            const taux = totalProd > 0 ? (totalRebut / totalProd) * 100 : 0;

            return {
                date: format(date, 'yyyy-MM-dd'),
                taux_rebut: taux
            };
        });

        return last30Days;
    };

    // Données pour le graphique des défauts
    const getDefectData = () => {
        const defectCount = {};
        productionData.forEach(item => {
            if (item.type_defaut) {
                defectCount[item.type_defaut] = (defectCount[item.type_defaut] || 0) + item.quantite_rebut;
            }
        });

        return Object.entries(defectCount).map(([name, value]) => ({
            name,
            value,
            total: Object.values(defectCount).reduce((sum, v) => sum + v, 0)
        }));
    };

    // Données pour le tableau des postes
    const getPosteStats = () => {
        const posteStats = {};
        productionData.forEach(item => {
            const key = `${item.poste}-${item.equipe}`;
            if (!posteStats[key]) {
                posteStats[key] = {
                    poste: item.poste,
                    equipe: item.equipe,
                    totalProd: 0,
                    totalRebut: 0
                };
            }
            posteStats[key].totalProd += item.production_totale;
            posteStats[key].totalRebut += item.quantite_rebut;
        });

        return Object.values(posteStats).map(stat => ({
            poste: stat.poste,
            equipe: stat.equipe,
            rebut: stat.totalProd > 0 ? (stat.totalRebut / stat.totalProd) * 100 : 0,
            ecart: stat.totalProd > 0 ? ((stat.totalRebut / stat.totalProd) * 100) - 2 : -2
        })).sort((a, b) => b.rebut - a.rebut);
    };

    const kpis = calculateKPIs();
    const trendData = getTrendData();
    const defectData = getDefectData();
    const posteData = getPosteStats();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="h-96 bg-gray-200 rounded"></div>
                            <div className="h-96 bg-gray-200 rounded"></div>
                        </div>
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
                            Tableau de Bord Qualité
                        </h1>
                        <p className="text-lg text-gray-600">
                            Suivi en temps réel du taux de rebut - Ligne de production carton ondulé
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Dernière mise à jour</p>
                        <p className="font-semibold text-gray-900">
                            {format(new Date(), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                        </p>
                    </div>
                </div>

                {/* Barre de filtres */}
                <FilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onExportPDF={handleExportPDF}
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        title="Taux de Rebut Global"
                        value={kpis.tauxRebut}
                        unit="%"
                        target={2}
                        trend={kpis.tendance}
                        status={kpis.tauxRebut > 3 ? "danger" : kpis.tauxRebut > 2 ? "warning" : "success"}
                        icon={TrendingDown}
                        description="Objectif mensuel < 2%"
                    />

                    <KPICard
                        title="Alertes Actives"
                        value={kpis.nbAlertes}
                        unit=""
                        status={kpis.nbAlertes > 2 ? "danger" : kpis.nbAlertes > 0 ? "warning" : "success"}
                        icon={AlertCircle}
                        description="Postes > 3% de rebut"
                    />

                    <KPICard
                        title="Conformité Postes"
                        value={kpis.conformite}
                        unit="%"
                        target={80}
                        status={kpis.conformite < 60 ? "danger" : kpis.conformite < 80 ? "warning" : "success"}
                        icon={Factory}
                        description="% postes sous objectif"
                    />

                    <KPICard
                        title="Performance Objectif"
                        value={kpis.tauxRebut <= 2 ? "Atteint" : "En cours"}
                        unit=""
                        status={kpis.tauxRebut <= 2 ? "success" : "warning"}
                        icon={Target}
                        description="Objectif mensuel 2%"
                    />
                </div>

                {/* Graphiques */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <TrendChart data={trendData} target={2} />
                    <DefectChart data={defectData} />
                </div>

                {/* Tableau des postes */}
                <PosteTable data={posteData} />
            </div>
        </div>
    );
}
