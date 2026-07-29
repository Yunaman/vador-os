'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard,
  Coffee,
  UtensilsCrossed,
  Boxes,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Layers,
  Settings,
  Menu
} from 'lucide-react';

export default function Sidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    activeWorkspace,
    setActiveWorkspace,
    addQuickActionLog
  } = useStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Coffee, label: 'Digital QR Menu' },
    { icon: UtensilsCrossed, label: 'POS Terminal' },
    { icon: Layers, label: 'Kitchen KDS' },
    { icon: Boxes, label: 'Inventory' },
    { icon: Users, label: 'Staff & Team' },
    { icon: BarChart3, label: 'Analytics' }
  ];

  const workspaces = [
    'Robusta Coffee (Flagship)',
    'Robusta Coffee (Downtown)',
    'Robusta Coffee (Catering)',
    'Vador Test Workspace'
  ];

  const [workspaceDropdown, setWorkspaceDropdown] = React.useState(false);

  const handleWorkspaceChange = (ws: string) => {
    setActiveWorkspace(ws);
    setWorkspaceDropdown(false);
    addQuickActionLog(`Switched workspace to ${ws}`);
  };

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 280 : 76 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-screen glass-panel z-40 flex flex-col justify-between border-r border-border"
    >
      {/* Top Section */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4">
        {/* Logo & Toggle Header */}
        <div className="flex items-center justify-between h-12 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-600 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/10 shrink-0">
              <span className="font-extrabold text-black text-lg tracking-wider">V</span>
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="font-bold tracking-tight text-foreground text-sm uppercase">Vador OS</span>
                <span className="text-[10px] text-muted-foreground font-semibold tracking-widest uppercase">Premium SaaS</span>
              </motion.div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground transition-all duration-200"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Workspace Selector */}
        <div className="relative mb-6">
          <button
            onClick={() => sidebarOpen && setWorkspaceDropdown(!workspaceDropdown)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/60 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-md bg-amber-900/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                R
              </div>
              {sidebarOpen && (
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate">{activeWorkspace}</span>
                  <span className="text-[10px] text-muted-foreground">Standard Multi-Tenant</span>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <Menu size={12} className="text-muted-foreground shrink-0 ml-1" />
            )}
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {workspaceDropdown && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute left-0 w-full mt-2 p-1 rounded-xl glass-panel border border-border/80 shadow-2xl z-50"
              >
                {workspaces.map((ws) => (
                  <button
                    key={ws}
                    onClick={() => handleWorkspaceChange(ws)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors duration-150 ${
                      activeWorkspace === ws
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {ws}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items */}
        <div className="space-y-1.5">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold shadow-inner'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70 border-l-4 border-transparent'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs tracking-wide"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-border flex flex-col gap-3">
        <button className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all duration-200">
          <Settings size={18} className="shrink-0" />
          {sidebarOpen && <span className="text-xs tracking-wide">Settings</span>}
        </button>

        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-900 flex items-center justify-center font-bold text-xs text-white shrink-0">
            JS
          </div>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-foreground truncate">Jules Architect</span>
              <span className="text-[10px] text-emerald-500 font-medium">Owner • Robusta</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
