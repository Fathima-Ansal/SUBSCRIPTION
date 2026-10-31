import React, { useState, useEffect } from 'react';
import { checkHealth } from '../../services/api';
import { Activity, CheckCircle2, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const HealthIndicator = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkHealth();
      setHealth(data);
    } catch (err) {
      setError(err.message || 'Cannot reach backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-semibold text-slate-800">Backend API & Database Status</h4>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="text-xs text-slate-500 hover:text-blue-600 flex items-center space-x-1 cursor-pointer transition-colors"
          title="Refresh Health Status"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Express Server Status */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-600 font-medium">Express API (Port 5000)</span>
          {loading ? (
            <span className="text-slate-400">Checking...</span>
          ) : health?.success ? (
            <Badge variant="success" className="flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>Online & Connected</span>
            </Badge>
          ) : (
            <Badge variant="danger" className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 mr-1" />
              <span>Offline / Unreachable</span>
            </Badge>
          )}
        </div>

        {/* PostgreSQL Database Status */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center space-x-1.5">
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-medium">PostgreSQL (Prisma)</span>
          </div>
          {loading ? (
            <span className="text-slate-400">Checking...</span>
          ) : health?.database?.connected ? (
            <Badge variant="success" className="flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>Connected</span>
            </Badge>
          ) : (
            <Badge variant="warning" className="flex items-center space-x-1" title={health?.database?.status}>
              <AlertCircle className="w-3 h-3 mr-1" />
              <span>Pending Connection</span>
            </Badge>
          )}
        </div>
      </div>

      {health && (
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between px-1">
          <span>Endpoint: <code className="text-slate-600 font-mono">GET /api/health</code></span>
          <span>Last checked: {new Date(health.timestamp || Date.now()).toLocaleTimeString()}</span>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100">
          {error}. Ensure the Express backend is running on port 5000.
        </p>
      )}
    </div>
  );
};
