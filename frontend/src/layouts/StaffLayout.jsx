import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  FileSpreadsheet,
  CalendarCheck,
  Receipt,
  CreditCard
} from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';

export const StaffLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const staffNavItems = [
    { label: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
    { label: 'Customers', path: '/staff/customers', icon: UserCheck },
    { label: 'Quotations', path: '/staff/quotations', icon: FileSpreadsheet },
    { label: 'Subscriptions', path: '/staff/subscriptions', icon: CalendarCheck },
    { label: 'Invoices', path: '/staff/invoices', icon: Receipt },
    { label: 'Payments', path: '/staff/payments', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        items={staffNavItems}
        panelTitle="Staff Portal"
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        panelTheme="staff"
      />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <Navbar
          user={user}
          onToggleSidebar={() => setSidebarOpen(true)}
          panelName="Staff Operations"
          panelRole="STAFF"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
