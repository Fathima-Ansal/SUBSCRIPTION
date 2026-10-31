import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  CreditCard,
  Receipt,
  History,
  LifeBuoy
} from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';

export const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const customerNavItems = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/customer/profile', icon: User },
    { label: 'My Subscriptions', path: '/customer/subscriptions', icon: CreditCard },
    { label: 'My Invoices', path: '/customer/invoices', icon: Receipt },
    { label: 'Payment History', path: '/customer/payments', icon: History },
    { label: 'Support', path: '/customer/support', icon: LifeBuoy },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        items={customerNavItems}
        panelTitle="Customer Portal"
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        panelTheme="customer"
      />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <Navbar
          user={user}
          onToggleSidebar={() => setSidebarOpen(true)}
          panelName="Customer Account"
          panelRole="CUSTOMER"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
