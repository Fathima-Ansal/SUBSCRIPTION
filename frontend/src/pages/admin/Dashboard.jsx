import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { HealthIndicator } from '../../components/common/HealthIndicator';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  Database,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const adminModules = [
    { name: 'Users', path: '/admin/users', permission: 'ADMIN Only', status: 'Route Mounted' },
    { name: 'Customers', path: '/admin/customers', permission: 'ADMIN & STAFF', status: 'Route Mounted' },
    { name: 'Products & Plans', path: '/admin/products', permission: 'ADMIN & STAFF', status: 'Route Mounted' },
    { name: 'Quotations', path: '/admin/quotations', permission: 'ADMIN & STAFF', status: 'Route Mounted' },
    { name: 'Subscriptions', path: '/admin/subscriptions', permission: 'Full System', status: 'Route Mounted' },
    { name: 'Discounts', path: '/admin/discounts', permission: 'ADMIN Only', status: 'Route Mounted' },
    { name: 'Invoices & Billing', path: '/admin/invoices', permission: 'Full System', status: 'Route Mounted' },
    { name: 'Payments', path: '/admin/payments', permission: 'Full System', status: 'Route Mounted' },
    { name: 'Reports & Analytics', path: '/admin/reports', permission: 'ADMIN Only', status: 'Route Mounted' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Control Center"
        subtitle={`Welcome back, ${user?.name || 'Administrator'}. Full system oversight and architecture status.`}
        badge={<Badge variant="admin">ADMIN PRIVILEGES</Badge>}
        actions={
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success('Prisma initial User schema and auth routes are operational!')}
          >
            <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" />
            Verify Architecture
          </Button>
        }
      />

      {/* Backend & DB Health Indicator */}
      <HealthIndicator />

      {/* Key Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Access Level</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Super Admin</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold flex items-center mr-1">
                <CheckCircle2 className="w-3.5 h-3.5 mr-0.5 inline" /> Active
              </span>
              <span>All 12 Admin navigation modules available</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">User Directory</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">3 Roles</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-slate-500">
              <Badge variant="outline" className="mr-1">ADMIN</Badge>
              <Badge variant="outline" className="mr-1">STAFF</Badge>
              <Badge variant="outline">CUSTOMER</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">API Architecture</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">REST + JWT</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-slate-500">
              <span>Bcrypt hash + Zod validation</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Database Engine</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">PostgreSQL</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-slate-500">
              <span>Prisma ORM Client v6</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Readiness Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Business Modules Readiness</CardTitle>
              <CardDescription>
                Initial Phase 1 foundations established. Awaiting complete business workflow specification for Phase 2.
              </CardDescription>
            </div>
            <Badge variant="default">Phase 1 Complete</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Module Name</th>
                  <th className="px-4 py-3">Navigation Route</th>
                  <th className="px-4 py-3">Role Permission Policy</th>
                  <th className="px-4 py-3">Backend Integration</th>
                  <th className="px-4 py-3">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminModules.map((mod) => (
                  <tr key={mod.name} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-800">{mod.name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{mod.path}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {mod.permission}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-emerald-600 font-medium">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                      {mod.status}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-slate-500">
                        Foundation Ready
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
