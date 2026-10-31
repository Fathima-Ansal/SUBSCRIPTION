import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, X, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ items, panelTitle, isOpen, onCloseMobile, panelTheme = 'admin' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const themeAccentClasses = {
    admin: 'text-blue-600 bg-blue-50',
    staff: 'text-cyan-600 bg-cyan-50',
    customer: 'text-emerald-600 bg-emerald-50',
  };

  const activeThemeClass = themeAccentClasses[panelTheme] || themeAccentClasses.admin;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand & Panel Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm shadow-sm">
              BL
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">Brightloop</div>
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{panelTitle}</div>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu Navigation
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all',
                    isActive
                      ? cn('font-semibold shadow-xs', activeThemeClass)
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'mr-3 h-4 w-4 shrink-0 transition-colors',
                      'text-slate-500 group-hover:text-slate-800'
                    )}
                  />
                )}
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer info & Logout */}
        <div className="border-t border-slate-200 p-3 space-y-2 bg-slate-50/50">
          <div className="px-3 py-1.5 text-xs text-slate-500">
            <span className="block font-medium text-slate-700 truncate">{user?.name || 'Logged in user'}</span>
            <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{user?.role || panelTheme}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
