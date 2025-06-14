
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/lib/utils.ts";
import { BarChart3, Settings, FileText, Users, TrendingUp, Database } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
    {
        title: "Tableau de bord",
        url: createPageUrl("Dashboard"),
        icon: BarChart3,
    },
    {
        title: "Actions correctives",
        url: createPageUrl("Actions"),
        icon: Settings,
    },
    {
        title: "Backoffice",
        url: createPageUrl("Backoffice"),
        icon: Database,
    },
];

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <SidebarProvider>
            <style>
                {`
          :root {
            --primary: 213 94% 68%;
            --secondary: 142 76% 36%;
            --accent: 38 92% 50%;
            --background: 210 40% 98%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --muted: 210 40% 96%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --border: 214.3 31.8% 91.4%;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}
            </style>
            <div className="min-h-screen flex w-full">
                <Sidebar className="border-r border-blue-100 glass-effect">
                    <SidebarHeader className="border-b border-blue-100 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-lg">QualityTrack</h2>
                                <p className="text-sm text-blue-600 font-medium">Suivi Qualité Production</p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-4">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl ${
                                                    location.pathname === item.url
                                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                                        : 'text-gray-700'
                                                }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup className="mt-8">
                            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                                Indicateurs Rapides
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <div className="px-3 py-2 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Objectif mensuel</span>
                                        <span className="font-bold text-green-600">moins de 2%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Alertes actives</span>
                                        <span className="font-bold text-orange-600">3</span>
                                    </div>
                                </div>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="flex-1 flex flex-col">
                    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-6 py-4 md:hidden">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200" />
                            <h1 className="text-xl font-bold text-gray-900">QualityTrack</h1>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
