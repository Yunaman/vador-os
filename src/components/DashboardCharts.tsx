'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { useStore } from '../store/useStore';
import {
  mockMonthlyPerformance,
  mockDailyPerformance,
  popularProducts
} from '../data/mockData';

// Premium Color Palettes for Luxury Gold Theme
const GOLD_COLORS = ['#b8860b', '#dfa95a', '#fef08a', '#10b981', '#3b82f6', '#ec4899', '#78716c'];

export default function DashboardCharts() {
  const { searchQuery } = useStore();

  const filteredProducts = popularProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1: Revenue & Orders Area Trend */}
      <div className="glass-panel p-5 lg:col-span-2 flex flex-col gap-4 h-[380px]">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Revenue & Order Volume Trend</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Year to Date performance trajectory</p>
          </div>
          <span className="text-[10px] bg-primary/15 text-primary px-2.5 py-1 rounded-full font-bold">Live Sync</span>
        </div>

        <div className="flex-1 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockMonthlyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dfa95a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#dfa95a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis dataKey="name" stroke="#78716c" fontSize={10} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#121214',
                  border: '1px solid #27272a',
                  borderRadius: '10px',
                  color: '#fafafa'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" name="Revenue ($)" dataKey="revenue" stroke="#dfa95a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" name="Orders (Qty)" dataKey="orders" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Hourly Performance Run */}
      <div className="glass-panel p-5 flex flex-col gap-4 h-[380px]">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Hourly Load Distribution</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Peak rush hours tracking</p>
          </div>
          <span className="text-[10px] text-muted-foreground">Today</span>
        </div>

        <div className="flex-1 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDailyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis dataKey="name" stroke="#78716c" fontSize={9} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={9} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#121214',
                  border: '1px solid #27272a',
                  borderRadius: '10px',
                  color: '#fafafa'
                }}
              />
              <Bar name="Hourly Revenue ($)" dataKey="revenue" fill="#dfa95a" radius={[4, 4, 0, 0]}>
                {mockDailyPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 1 ? '#b8860b' : '#dfa95a'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product performance list and visual matrix */}
      <div className="glass-panel p-5 lg:col-span-3 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Menu Item & Stock Performance Matrix</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Popular Coffee Beverages, Food and Pastries sorted by sales quantity</p>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full font-bold">Auto-Optimize</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2.5 font-semibold">Item Name</th>
                <th className="pb-2.5 font-semibold">Category</th>
                <th className="pb-2.5 font-semibold text-right">Units Sold</th>
                <th className="pb-2.5 font-semibold text-right">Revenue</th>
                <th className="pb-2.5 font-semibold text-right">In-Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredProducts.map((p, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-all">
                  <td className="py-3 font-semibold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD_COLORS[idx % GOLD_COLORS.length] }} />
                    {p.name}
                  </td>
                  <td className="py-3 text-muted-foreground">{p.category}</td>
                  <td className="py-3 text-right font-semibold text-foreground">{p.sales.toLocaleString()}</td>
                  <td className="py-3 text-right font-semibold text-emerald-500">${p.revenue.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      p.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500' :
                      p.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {p.status} ({p.stock} left)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
