import React from 'react';
import { Menu, LogOut, User, Bell, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const Navbar = ({ user, onToggleSidebar, panelName, panelRole }) => {
  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant="admin" className="space-x-1">
            <ShieldCheck className="w-3 h-3 mr-1 inline" />
            <span>Administrator</span>
          </Badge>
        );
      case 'STAFF':
        return (
          <Badge variant="staff" className="space-x-1">
            <Briefcase className="w-3 h-3 mr-1 inline" />
            <span>Staff Portal</span>
          </Badge>
        );
      case 'CUSTOMER':
      default:
        return (
          <Badge variant="customer" className="space-x-1">
            <UserCheck className="w-3 h-3 mr-1 inline" />
            <span>Customer Portal</span>
          </Badge>
        );
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            B
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-slate-900 tracking-tight text-base">Brightloop</span>
            <span className="text-slate-400 text-xs ml-1 font-medium">Software</span>
          </div>
        </div>

        <div className="hidden md:flex items-center pl-3 border-l border-slate-200">
          {getRoleBadge(panelRole)}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-800">{user?.name || 'Authorized User'}</span>
          <span className="text-[11px] text-slate-500">{user?.email || 'user@brightloop.io'}</span>
        </div>

        <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs">
          {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </div>
      </div>
    </header>
  );
};
