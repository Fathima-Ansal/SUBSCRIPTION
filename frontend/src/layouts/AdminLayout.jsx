import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Package,
  Layers,
  FileSpreadsheet,
  CalendarCheck,
  Tag,
  Receipt,
  CreditCard,
  BarChart3,
  Settings
} from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Customers', path: '/admin/customers', icon: UserCheck },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Plans', path: '/admin/plans', icon: Layers },
    { label: 'Quotations', path: '/admin/quotations', icon: FileSpreadsheet },
    { label: 'Subscriptions', path: '/admin/subscriptions', icon: CalendarCheck },
    { label: 'Discounts', path: '/admin/discounts', icon: Tag },
    { label: 'Invoices', path: '/admin/invoices', icon: Receipt },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        items={adminNavItems}
        panelTitle="Admin Panel"
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        panelTheme="admin"
      />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <Navbar
          user={user}
          onToggleSidebar={() => setSidebarOpen(true)}
          panelName="Admin Panel"
          panelRole="ADMIN"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
