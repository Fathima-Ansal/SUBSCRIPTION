import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { HealthIndicator } from '../../components/common/HealthIndicator';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Briefcase,
  UserCheck,
  FileSpreadsheet,
  CalendarCheck,
  Receipt,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export const StaffDashboard = () => {
  const { user } = useAuth();

  const staffModules = [
    { title: 'Customers', path: '/staff/customers', icon: UserCheck, desc: 'Manage customer accounts & profiles' },
    { title: 'Quotations', path: '/staff/quotations', icon: FileSpreadsheet, desc: 'Prepare and dispatch pricing proposals' },
    { title: 'Subscriptions', path: '/staff/subscriptions', icon: CalendarCheck, desc: 'Track subscriber renewals and terms' },
    { title: 'Invoices', path: '/staff/invoices', icon: Receipt, desc: 'Issue bills and check payment statuses' },
    { title: 'Payments', path: '/staff/payments', icon: CreditCard, desc: 'Record offline and online receipts' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Control"
        subtitle={`Welcome, ${user?.name || 'Staff Member'}. Manage daily operations, customer subscriptions, and invoices.`}
        badge={<Badge variant="staff">STAFF OPERATIONS</Badge>}
      />

      {/* Real-time Health Indicator */}
      <HealthIndicator />

      {/* Operational Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Role Authority</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Operations Staff</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Access limited to designated operational modules. No admin settings access.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Daily Workflows</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">5 Workstreams</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Customers, Quotations, Subscriptions, Invoices, Payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">API Authentication</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Protected JWT</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Role validation enforced at both React router and Express middleware layers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Workstream Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Operational Workstreams</CardTitle>
          <CardDescription>
            Staff navigation endpoints ready for Stage 2 business logic implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffModules.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex flex-col p-4 rounded-xl border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all bg-white group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
