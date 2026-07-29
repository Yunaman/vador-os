'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import {
  MetricCards,
  AIInsightsWidget,
  KitchenQueueWidget,
  RecentOrdersWidget,
  InventoryAlertsWidget,
  WeatherWidget,
  CalendarWidget,
  QuickActionsWidget
} from '../components/DashboardWidgets';
import DashboardCharts from '../components/DashboardCharts';
import { useStore } from '../store/useStore';

import { translations } from '../data/translations';

export default function Home() {
  const { sidebarOpen, activeWorkspace, locale } = useStore();
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Premium Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Layout container */}
      <div
        className="flex-1 min-h-screen flex flex-col transition-all duration-300"
        style={{ paddingLeft: sidebarOpen ? '280px' : '76px' }}
      >
        {/* Dynamic Top Navigation Header */}
        <Navbar />

        {/* Dashboard workspace core content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome Premium Gold Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest">{t.systemOperational}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-foreground mt-1 flex items-baseline gap-2">
                {t.activeWorkspace}: <span className="luxury-gradient-text font-black">{activeWorkspace}</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                {t.welcomeBack}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto text-xs font-semibold text-muted-foreground">
              <span>{t.tenantStatus}</span>
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold">
                {t.premiumActive}
              </span>
            </div>
          </div>

          {/* Metric Overview cards */}
          <MetricCards />

          {/* Core Analytics & KDS / Log panels */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Charts & Table performance */}
            <div className="xl:col-span-2 space-y-6">
              <DashboardCharts />
            </div>

            {/* AI Insights & Alerts columns */}
            <div className="space-y-6">
              <AIInsightsWidget />
              <InventoryAlertsWidget />
            </div>
          </div>

          {/* Secondary KDS / Recent Orders / Weather Widgets block */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KitchenQueueWidget />
            <RecentOrdersWidget />
            <QuickActionsWidget />
          </div>

          {/* Weather & Calendar bottom layout block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherWidget />
            <CalendarWidget />
          </div>
        </main>
      </div>
    </div>
  );
}
