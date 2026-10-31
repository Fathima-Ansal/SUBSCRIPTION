import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { HealthIndicator } from '../../components/common/HealthIndicator';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  User,
  CreditCard,
  Receipt,
  History,
  LifeBuoy,
  ShieldCheck,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export const CustomerDashboard = () => {
  const { user } = useAuth();

  const customerModules = [
    { title: 'My Profile', path: '/customer/profile', icon: User, desc: 'Manage your contact details and security preferences' },
    { title: 'My Subscriptions', path: '/customer/subscriptions', icon: CreditCard, desc: 'View subscribed Brightloop plans and renewals' },
    { title: 'My Invoices', path: '/customer/invoices', icon: Receipt, desc: 'Download invoices and view billing breakdown' },
    { title: 'Payment History', path: '/customer/payments', icon: History, desc: 'View past transaction receipts and records' },
    { title: 'Support', path: '/customer/support', icon: LifeBuoy, desc: 'Get assistance and open technical tickets' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriber Account Center"
        subtitle={`Welcome, ${user?.name || 'Customer'}. Manage your subscription packages, invoices, and billing.`}
        badge={<Badge variant="customer">CUSTOMER ACCESS</Badge>}
      />

      {/* Health Check Indicator */}
      <HealthIndicator />

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Account Identity</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1 truncate max-w-[180px]">{user?.name || 'Subscriber'}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <User className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Email: <span className="text-slate-800 font-medium">{user?.email || 'N/A'}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Data Isolation</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Tenant Protected</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Lock className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Customers can only view their own records and subscriptions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Security Status</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Verified Session</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Authenticated via stateless JWT with 7-day token expiry.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Self-service navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriber Services</CardTitle>
          <CardDescription>
            Access your self-service management tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerModules.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex flex-col p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all bg-white group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
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
