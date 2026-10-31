import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/ui/Badge';
import { Package, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const ModulePlaceholderPage = ({
  title,
  subtitle,
  badgeText = 'Foundation Ready',
  roleScope = 'ADMIN',
  backUrl,
}) => {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        subtitle={subtitle || `Management and operations module for ${title}.`}
        badge={<Badge variant={roleScope.toLowerCase()}>{badgeText}</Badge>}
        actions={
          backUrl && (
            <Link to={backUrl}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Dashboard
              </Button>
            </Link>
          )
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <EmptyState
          icon={Package}
          title={`${title} Module Initialized`}
          description={`The layout, sidebar navigation, protected route, and backend controller foundation for ${title} are established. Data models and business workflows will be enabled in Phase 2.`}
        />

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Module Architecture Specification
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Required Authorization</span>
              <span className="font-semibold text-slate-800">{roleScope}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Phase Status</span>
              <span className="font-semibold text-blue-600">Phase 1: Shell & Auth Verified</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block">Next Milestone</span>
              <span className="font-semibold text-slate-800">Prisma Schema & Business CRUD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
