import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))

}


/**
 * Crée une URL pour une page donnée
 */
export function createPageUrl(pageName: string, params?: Record<string, string>): string {
  let url = `/${pageName}`;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
}

/**
 * Parse les paramètres d'URL actuels
 */
export function getUrlParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

/**
 * Obtient un paramètre d'URL spécifique
 */
export function getUrlParam(key: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// ==========================================
// DATA FORMATTING UTILITIES
// ==========================================

/**
 * Formate un nombre avec des séparateurs de milliers
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

/**
 * Formate un pourcentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calcule le taux de rebut
 */
export function calculateRebutRate(production: number, rebut: number): number {
  return production > 0 ? (rebut / production) * 100 : 0;
}

/**
 * Détermine le statut basé sur le taux de rebut
 */
export type StatusType = 'success' | 'warning' | 'danger';

export function getStatusFromRate(rate: number, warningThreshold: number = 2, dangerThreshold: number = 3): StatusType {
  if (rate > dangerThreshold) return 'danger';
  if (rate > warningThreshold) return 'warning';
  return 'success';
}

// ==========================================
// DATE UTILITIES
// ==========================================

/**
 * Formate une date en français
 */
export function formatDateFR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Formate une date avec l'heure
 */
export function formatDateTimeFR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Obtient le début du mois
 */
export function getStartOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Obtient la fin du mois
 */
export function getEndOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Obtient les N derniers jours
 */
export function getLastNDays(days: number): Date[] {
  const result: Date[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    result.push(date);
  }

  return result;
}

// ==========================================
// VALIDATION UTILITIES
// ==========================================

/**
 * Valide une adresse email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un nombre positif
 */
export function isPositiveNumber(value: string | number): boolean {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0;
}

// ==========================================
// ARRAY UTILITIES
// ==========================================

/**
 * Groupe un tableau par clé
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Trouve l'élément avec la valeur maximale
 */
export function maxBy<T>(array: T[], getValue: (item: T) => number): T | undefined {
  if (array.length === 0) return undefined;

  return array.reduce((max, current) =>
      getValue(current) > getValue(max) ? current : max
  );
}

/**
 * Calcule la somme d'une propriété
 */
export function sumBy<T>(array: T[], getValue: (item: T) => number): number {
  return array.reduce((sum, item) => sum + getValue(item), 0);
}

// ==========================================
// COLOR UTILITIES
// ==========================================

/**
 * Obtient une couleur basée sur le statut
 */
export function getStatusColor(status: StatusType): string {
  switch (status) {
    case 'success': return '#22c55e';
    case 'warning': return '#f59e0b';
    case 'danger': return '#ef4444';
    default: return '#6b7280';
  }
}

/**
 * Obtient une couleur de fond basée sur le statut
 */
export function getStatusBgColor(status: StatusType): string {
  switch (status) {
    case 'success': return '#f0fdf4';
    case 'warning': return '#fffbeb';
    case 'danger': return '#fef2f2';
    default: return '#f9fafb';
  }
}

// ==========================================
// STORAGE UTILITIES
// ==========================================

/**
 * Sauvegarde dans le localStorage
 */
export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
}

/**
 * Récupère depuis le localStorage
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return defaultValue;
  }
}

// ==========================================
// EXPORT UTILITIES
// ==========================================

/**
 * Exporte des données en CSV
 */
export function exportToCsv(data: any[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporte des données en JSON
 */
export function exportToJson(data: any, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface ProductionDataType {
  id: string;
  date: string;
  poste: string;
  equipe: string;
  type_carton: string;
  grammage?: number;
  production_totale: number;
  quantite_rebut: number;
  type_defaut?: string;
  commentaires?: string;
  created_date: string;
  updated_date: string;
  created_by: string;
}

export interface ActionCorrectiveType {
  id: string;
  titre: string;
  description?: string;
  type_action: string;
  poste_concerne: string;
  responsable: string;
  date_debut: string;
  date_prevue: string;
  statut: 'En cours' | 'Terminé' | 'En retard' | 'Annulé';
  priorite: 'Haute' | 'Moyenne' | 'Basse';
  created_date: string;
  updated_date: string;
  created_by: string;
}

export interface KPIData {
  tauxRebut: number;
  tendance: number;
  nbAlertes: number;
  conformite: number;
}

export interface ChartDataPoint {
  date: string;
  taux_rebut: number;
}

export interface DefectData {
  name: string;
  value: number;
  total: number;
}

export interface PosteStats {
  poste: string;
  equipe: string;
  rebut: number;
  ecart: number;
}
