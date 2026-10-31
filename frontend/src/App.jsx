import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Layouts
import { AdminLayout } from './layouts/AdminLayout';
import { StaffLayout } from './layouts/StaffLayout';
import { CustomerLayout } from './layouts/CustomerLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Dashboard Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { StaffDashboard } from './pages/staff/Dashboard';
import { CustomerDashboard } from './pages/customer/Dashboard';

// Module Pages
import { ModulePlaceholderPage } from './pages/common/ModulePlaceholderPage';
import { useAuth } from './hooks/useAuth';

// Smart Home Redirect
const HomeRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'STAFF') return <Navigate to="/staff/dashboard" replace />;
  return <Navigate to="/customer/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeRedirect />} />

          {/* PANEL 1: ADMIN (Super Admin Access) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ModulePlaceholderPage title="User Management" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="customers" element={<ModulePlaceholderPage title="Customers" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="products" element={<ModulePlaceholderPage title="Products Catalog" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="plans" element={<ModulePlaceholderPage title="Subscription Plans" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="quotations" element={<ModulePlaceholderPage title="Quotations" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="subscriptions" element={<ModulePlaceholderPage title="Subscriptions" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="discounts" element={<ModulePlaceholderPage title="Discounts & Coupons" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="invoices" element={<ModulePlaceholderPage title="Invoices & Billing" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="payments" element={<ModulePlaceholderPage title="Payments" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="reports" element={<ModulePlaceholderPage title="Reports & Analytics" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
            <Route path="settings" element={<ModulePlaceholderPage title="System Settings" roleScope="ADMIN" backUrl="/admin/dashboard" />} />
          </Route>

          {/* PANEL 2: STAFF (Operations Access) */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/staff/dashboard" replace />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="customers" element={<ModulePlaceholderPage title="Customers" roleScope="STAFF" backUrl="/staff/dashboard" />} />
            <Route path="quotations" element={<ModulePlaceholderPage title="Quotations" roleScope="STAFF" backUrl="/staff/dashboard" />} />
            <Route path="subscriptions" element={<ModulePlaceholderPage title="Subscriptions" roleScope="STAFF" backUrl="/staff/dashboard" />} />
            <Route path="invoices" element={<ModulePlaceholderPage title="Invoices" roleScope="STAFF" backUrl="/staff/dashboard" />} />
            <Route path="payments" element={<ModulePlaceholderPage title="Payments" roleScope="STAFF" backUrl="/staff/dashboard" />} />
          </Route>

          {/* PANEL 3: CUSTOMER (Self-Service Access) */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/customer/dashboard" replace />} />
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="profile" element={<ModulePlaceholderPage title="My Profile" roleScope="CUSTOMER" backUrl="/customer/dashboard" />} />
            <Route path="subscriptions" element={<ModulePlaceholderPage title="My Subscriptions" roleScope="CUSTOMER" backUrl="/customer/dashboard" />} />
            <Route path="invoices" element={<ModulePlaceholderPage title="My Invoices" roleScope="CUSTOMER" backUrl="/customer/dashboard" />} />
            <Route path="payments" element={<ModulePlaceholderPage title="Payment History" roleScope="CUSTOMER" backUrl="/customer/dashboard" />} />
            <Route path="support" element={<ModulePlaceholderPage title="Customer Support" roleScope="CUSTOMER" backUrl="/customer/dashboard" />} />
          </Route>

          {/* Wildcard / Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
