'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  mockMetrics,
  recentOrders,
  inventoryAlerts,
  aiInsights
} from '../data/mockData';
import {
  DollarSign,
  ShoppingBag,
  Users2,
  Percent,
  Scale,
  Sparkles,
  Check,
  Play,
  Clock,
  CloudSun,
  Calendar,
  Plus,
  Send,
  AlertCircle
} from 'lucide-react';

/* ---------------- Metric Cards Section ---------------- */
export function MetricCards() {
  const metrics = [
    { key: 'revenue', label: 'Total Revenue', value: mockMetrics.revenue.value, change: mockMetrics.revenue.change, trend: mockMetrics.revenue.trend, desc: mockMetrics.revenue.description, icon: DollarSign, color: 'text-amber-500 bg-amber-500/10' },
    { key: 'orders', label: 'Total Orders', value: mockMetrics.orders.value, change: mockMetrics.orders.change, trend: mockMetrics.orders.trend, desc: mockMetrics.orders.description, icon: ShoppingBag, color: 'text-yellow-500 bg-yellow-500/10' },
    { key: 'customers', label: 'Active Customers', value: mockMetrics.customers.value, change: mockMetrics.customers.change, trend: mockMetrics.customers.trend, desc: mockMetrics.customers.description, icon: Users2, color: 'text-emerald-500 bg-emerald-500/10' },
    { key: 'profit', label: 'Net Profit Margin', value: mockMetrics.profit.value, change: mockMetrics.profit.change, trend: mockMetrics.profit.trend, desc: mockMetrics.profit.description, icon: Percent, color: 'text-amber-600 bg-amber-600/10' },
    { key: 'avgOrder', label: 'Avg Order Ticket', value: mockMetrics.averageOrder.value, change: mockMetrics.averageOrder.change, trend: mockMetrics.averageOrder.trend, desc: mockMetrics.averageOrder.description, icon: Scale, color: 'text-orange-500 bg-orange-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      {metrics.map((card, idx) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          className="glass-panel glass-panel-hover p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground tracking-wide">{card.label}</span>
            <div className={`p-2 rounded-xl ${card.color}`}>
              <card.icon size={15} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">{card.value}</h3>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-[11px] font-bold ${card.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {card.change}
              </span>
              <span className="text-[10px] text-muted-foreground">{card.desc}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- AI Insights Widget ---------------- */
export function AIInsightsWidget() {
  const { addQuickActionLog } = useStore();

  const handleApplyInsight = (title: string) => {
    addQuickActionLog(`Vador AI Auto-Applied Recommendation: ${title}`);
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-500 animate-pulse" />
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Vador AI Copilot</h4>
        </div>
        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">3 Insights</span>
      </div>

      <div className="space-y-3.5">
        {aiInsights.map((insight) => (
          <div key={insight.id} className="p-3.5 rounded-xl bg-secondary/30 border border-border/40 hover:border-amber-500/20 transition-all">
            <div className="flex items-center justify-between gap-2">
              <h5 className="text-xs font-bold text-foreground">{insight.title}</h5>
              <span className="text-[9px] font-bold text-emerald-500">{insight.confidence} match</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
              {insight.description}
            </p>
            <div className="flex items-center justify-between gap-4 mt-3">
              <span className="text-[10px] font-semibold text-amber-500">{insight.impact}</span>
              <button
                onClick={() => handleApplyInsight(insight.title)}
                className="text-[10px] bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-2.5 py-1 rounded-lg font-bold transition-all"
              >
                Apply Recommendation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Kitchen Queue Widget (KDS) ---------------- */
export function KitchenQueueWidget() {
  const { kitchenQueue, completeKitchenItem, preparingKitchenItem, addKitchenItem, addQuickActionLog } = useStore();
  const [newItemText, setNewItemText] = React.useState('');
  const [newItemType, setNewItemType] = React.useState<'Beverage' | 'Food' | 'Pastry'>('Beverage');

  const handleAddCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    addKitchenItem({
      orderNumber: `#${Math.floor(1000 + Math.random() * 9000)}`,
      item: newItemText,
      type: newItemType
    });
    addQuickActionLog(`Created kitchen order: ${newItemText}`);
    setNewItemText('');
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Kitchen Queue (KDS)</h4>
        </div>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
          {kitchenQueue.length} Active
        </span>
      </div>

      {/* Mini form to inject new coffee-shop queue items */}
      <form onSubmit={handleAddCustomOrder} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="e.g., 1x Nitro Brew with foam"
          className="sm:col-span-1 bg-secondary/50 text-[11px] px-3 py-1.5 rounded-lg focus:outline-none border border-border/60 focus:border-primary"
        />
        <select
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value as 'Beverage' | 'Food' | 'Pastry')}
          className="bg-secondary/50 text-[11px] px-2 py-1.5 rounded-lg focus:outline-none border border-border/60"
        >
          <option value="Beverage">Beverage</option>
          <option value="Food">Food</option>
          <option value="Pastry">Pastry</option>
        </select>
        <button
          type="submit"
          className="bg-primary hover:opacity-90 text-primary-foreground text-[10px] font-bold py-1 px-3 rounded-lg flex items-center justify-center gap-1"
        >
          <Plus size={12} /> Add
        </button>
      </form>

      <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {kitchenQueue.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-primary">{item.orderNumber}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.type === 'Beverage' ? 'bg-blue-500/10 text-blue-500' :
                    item.type === 'Food' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-pink-500/10 text-pink-500'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-[9px] text-muted-foreground">{item.timeElapsed}</span>
                </div>
                <p className="text-xs font-semibold text-foreground mt-1 truncate">{item.item}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.status === 'pending' ? (
                  <button
                    onClick={() => preparingKitchenItem(item.id)}
                    className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
                    title="Start Preparing"
                  >
                    <Play size={12} />
                  </button>
                ) : (
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-bold animate-pulse">
                    Preparing
                  </span>
                )}
                <button
                  onClick={() => completeKitchenItem(item.id)}
                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                  title="Complete & Archive"
                >
                  <Check size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Recent Orders List ---------------- */
export function RecentOrdersWidget() {
  const { searchQuery } = useStore();

  const filteredOrders = recentOrders.filter(o =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Recent Guest Orders</h4>
        <span className="text-[10px] text-muted-foreground">Live Feed</span>
      </div>

      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {filteredOrders.map((ord) => (
          <div key={ord.id} className="p-3 rounded-xl bg-secondary/30 border border-border/40 hover:bg-secondary/50 transition-all flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">{ord.customer}</span>
                {ord.tier === 'VIP' && (
                  <span className="text-[8px] bg-amber-500/15 text-amber-500 font-extrabold px-1.5 py-0.5 rounded">VIP</span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{ord.items}</p>
              <span className="text-[9px] text-muted-foreground/60">{ord.time}</span>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-foreground">{ord.total}</p>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full inline-block mt-1 ${
                ord.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                ord.status === 'Preparing' ? 'bg-yellow-500/10 text-yellow-500' :
                ord.status === 'Refunded' ? 'bg-red-500/10 text-red-500' :
                'bg-gray-500/10 text-gray-500'
              }`}>
                {ord.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Inventory Alerts Widget ---------------- */
export function InventoryAlertsWidget() {
  const { addNotification, addQuickActionLog } = useStore();

  const handleRestock = (item: string) => {
    addNotification({
      title: 'Restock Placed',
      description: `Draft purchase order generated for ${item}.`,
      type: 'system'
    });
    addQuickActionLog(`Restock draft created for: ${item}`);
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle size={15} className="text-destructive" />
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Critical Inventory Alerts</h4>
        </div>
        <span className="text-[10px] text-destructive font-bold">Auto-Linked POs</span>
      </div>

      <div className="space-y-3">
        {inventoryAlerts.map((alert) => (
          <div key={alert.id} className="p-3 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{alert.item}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-[10px] font-bold ${alert.status === 'critical' ? 'text-destructive' : 'text-yellow-500'}`}>
                  {alert.current} {alert.unit} left
                </span>
                <span className="text-[9px] text-muted-foreground">(Required: {alert.required} {alert.unit})</span>
              </div>
            </div>

            <button
              onClick={() => handleRestock(alert.item)}
              className="text-[9px] bg-destructive/10 hover:bg-destructive hover:text-white text-destructive px-2.5 py-1.5 rounded-lg font-bold transition-all shrink-0"
            >
              Reorder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Weather Coffee Widget ---------------- */
export function WeatherWidget() {
  return (
    <div className="glass-panel p-5 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-900/15 flex flex-col justify-between h-44">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Local Micro-Weather</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5">London Flagship Cafe Area</p>
        </div>
        <CloudSun size={24} className="text-amber-500 animate-bounce" />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-foreground">14&deg;C</span>
          <span className="text-xs text-emerald-500 font-bold">Overcast &amp; Rainy</span>
        </div>
        <p className="text-[11px] text-amber-500 font-medium mt-1.5 leading-relaxed">
          🌧️ Rainy day pattern detected. Iced spanish latte demand dropped -8%. Warm flat whites and filter coffees up +18%.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Calendar Widget ---------------- */
export function CalendarWidget() {
  const events = [
    { time: '10:00 AM', label: 'Barista Morning Sync & Tasting' },
    { time: '02:00 PM', label: 'Vendor Restock Arabica beans' },
    { time: '04:30 PM', label: 'VIP Lounge Booking (8 guests)' },
  ];

  return (
    <div className="glass-panel p-5 flex flex-col justify-between h-44">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Cafe Operations Calendar</h4>
          <p className="text-[10px] text-muted-foreground">Today&apos;s Schedule</p>
        </div>
        <Calendar size={18} className="text-primary" />
      </div>

      <div className="space-y-1.5">
        {events.map((ev, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px]">
            <span className="font-extrabold text-primary shrink-0">{ev.time}</span>
            <span className="text-muted-foreground truncate">{ev.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Quick Actions & Audit Logs ---------------- */
export function QuickActionsWidget() {
  const { quickActionsLog, addQuickActionLog, addNotification } = useStore();
  const [customMsg, setCustomMsg] = React.useState('');

  const handleQuickAction = (actionName: string) => {
    addQuickActionLog(actionName);
    addNotification({
      title: 'Action Logged',
      description: `User triggered quick action: ${actionName}`,
      type: 'system'
    });
  };

  const handleSendCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    addQuickActionLog(`Custom Log: ${customMsg}`);
    setCustomMsg('');
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-4">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground">Operational Control &amp; Logs</h4>
        <span className="text-[10px] text-muted-foreground">Real-time Session Logs</span>
      </div>

      {/* Button controls */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => handleQuickAction('Manual Restock trigger (Oat Milk)')}
          className="py-2 px-3 bg-secondary/80 hover:bg-secondary border border-border/80 text-[10px] font-bold text-foreground rounded-lg transition-all"
        >
          🥛 Restock Oat Milk
        </button>
        <button
          onClick={() => handleQuickAction('Trigger Daily Backup & Report export')}
          className="py-2 px-3 bg-secondary/80 hover:bg-secondary border border-border/80 text-[10px] font-bold text-foreground rounded-lg transition-all"
        >
          📊 Trigger Sales Sync
        </button>
        <button
          onClick={() => handleQuickAction('Flush KDS completed archive')}
          className="py-2 px-3 bg-secondary/80 hover:bg-secondary border border-border/80 text-[10px] font-bold text-foreground rounded-lg transition-all"
        >
          🧹 Flush KDS Cache
        </button>
        <button
          onClick={() => handleQuickAction('Announce "Happy Hour +10% Off" on App')}
          className="py-2 px-3 bg-secondary/80 hover:bg-secondary border border-border/80 text-[10px] font-bold text-foreground rounded-lg transition-all animate-pulse"
        >
          ☕ Broadcast Promo
        </button>
      </div>

      {/* Custom operational log injection form */}
      <form onSubmit={handleSendCustomLog} className="flex gap-2">
        <input
          type="text"
          value={customMsg}
          onChange={(e) => setCustomMsg(e.target.value)}
          placeholder="Log custom event to workspace feed..."
          className="flex-1 bg-secondary/50 text-[11px] px-3 py-1.5 rounded-lg focus:outline-none border border-border/60 focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground p-1.5 rounded-lg shrink-0"
        >
          <Send size={12} />
        </button>
      </form>

      {/* Event Logs viewer */}
      <div className="bg-black/25 dark:bg-black/50 p-3 rounded-xl border border-border/40 font-mono text-[10px] text-amber-500/90 h-[110px] overflow-y-auto space-y-1">
        {quickActionsLog.map((log, idx) => (
          <div key={idx} className="truncate">
            <span className="text-muted-foreground/60">[{idx}]</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
}
