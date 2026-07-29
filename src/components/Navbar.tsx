'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    notificationOpen,
    toggleNotification,
    notifications,
    markAllNotificationsRead,
    activeWorkspace,
    addQuickActionLog
  } = useStore();

  const [profileDropdown, setProfileDropdown] = React.useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTriggerAction = (act: string) => {
    addQuickActionLog(`Action: ${act}`);
  };

  return (
    <>
      <header className="sticky top-0 right-0 z-30 w-full h-16 glass-panel border-b border-border/80 flex items-center justify-between px-6">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 w-96 relative">
          <Search size={16} className="absolute left-3 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search transactions, customers, beverages, orders..."
            className="w-full bg-secondary/60 hover:bg-secondary/90 focus:bg-background text-xs pl-9 pr-4 py-2 rounded-xl border border-border/80 focus:border-primary focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-4">
          {/* AI Helper Quick Trigger */}
          <button
            onClick={() => handleTriggerAction('Vador AI Quick Audit')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-600/15 border border-amber-500/30 text-[11px] text-amber-500 hover:opacity-90 font-medium transition-all"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>AI Quick Audit</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-secondary/80 border border-border/40 text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={toggleNotification}
              className="p-2 rounded-xl hover:bg-secondary/80 border border-border/40 text-muted-foreground hover:text-foreground relative transition-all duration-200"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border/40 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/25 text-primary flex items-center justify-center font-bold text-xs">
                JS
              </div>
            </button>

            {/* Profile Dropdown Card */}
            <AnimatePresence>
              {profileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 p-1.5 rounded-xl glass-panel border border-border/80 shadow-2xl z-50 text-xs"
                >
                  <div className="p-2 border-b border-border mb-1">
                    <p className="font-bold text-foreground">Jules Architect</p>
                    <p className="text-[10px] text-muted-foreground">jules@robustacoffee.com</p>
                  </div>
                  <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                    <User size={13} />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-destructive/10 text-destructive rounded-lg flex items-center gap-2 transition-colors">
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Slide-out Notification Drawer */}
      <AnimatePresence>
        {notificationOpen && (
          <>
            {/* Backdrop click-away */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"
              onClick={toggleNotification}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-80 md:w-96 glass-panel border-l border-border z-50 flex flex-col justify-between"
            >
              <div className="p-5 flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Notification Center</h3>
                    <p className="text-[10px] text-muted-foreground">Workspace: {activeWorkspace}</p>
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-primary hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border transition-all ${
                        notif.unread
                          ? 'bg-primary/5 border-primary/20'
                          : 'bg-secondary/40 border-border/40'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.type === 'alert' && <AlertTriangle size={14} className="text-destructive mt-0.5" />}
                        {notif.type === 'insight' && <Sparkles size={14} className="text-amber-500 mt-0.5 animate-pulse" />}
                        {notif.type === 'order' && <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />}
                        {notif.type === 'system' && <Info size={14} className="text-blue-500 mt-0.5" />}
                        <div className="flex-1 text-left">
                          <p className={`text-xs font-semibold ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                            {notif.description}
                          </p>
                          <p className="text-[9px] text-muted-foreground/60 mt-1.5">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-border bg-secondary/20">
                <button
                  onClick={toggleNotification}
                  className="w-full py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:opacity-90 transition-all duration-200"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Separate component for Bell icon to prevent import confusion/overlap
function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
