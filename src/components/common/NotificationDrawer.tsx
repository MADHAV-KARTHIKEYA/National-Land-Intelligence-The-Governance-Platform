import React from 'react';
import { Bell, CheckCheck, AlertTriangle, RefreshCw, Trophy, FileText, X } from 'lucide-react';
import { NotificationItem, ActiveModule } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (module: ActiveModule) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNavigate
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'update':
        return <RefreshCw className="w-4 h-4 text-cyan-400" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-emerald-400" />;
      case 'workspace':
        return <FileText className="w-4 h-4 text-indigo-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100">National Platform Alerts</h3>
          <span className="text-xs text-slate-500 font-mono">({notifications.filter(n => !n.read).length} unread)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllRead}
            title="Mark all as read"
            className="text-xs text-slate-400 hover:text-emerald-400 p-1 rounded"
          >
            <CheckCheck className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No active notifications. Cadastral sync running normally.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.actionUrl) onNavigate(item.actionUrl as ActiveModule);
                onClose();
              }}
              className={`p-3 rounded-lg text-left transition cursor-pointer ${
                item.read ? 'bg-slate-900/40 hover:bg-slate-800/40' : 'bg-slate-800/70 hover:bg-slate-800 border-l-2 border-emerald-400'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 p-1 rounded bg-slate-950 border border-slate-800 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-slate-200 truncate">{item.title}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{item.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>CORS Geodetic Alerts Connected</span>
        <span className="text-emerald-400">Live 2026 Feed</span>
      </div>
    </div>
  );
};
