import { useState } from 'react';
import { Shield, Lock, Key, Database, Eye, Clock, Check, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Toggle from '../../components/ui/Toggle';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

interface RolePermission extends Record<string, unknown> {
  id: string;
  role: string;
  dashboard: boolean;
  marketplace: boolean;
  farm: boolean;
  community: boolean;
  ai: boolean;
  admin: boolean;
}

interface AuditLog extends Record<string, unknown> {
  id: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  time: string;
  status: string;
}

const rolePermissions: RolePermission[] = [
  { id: 'farmer', role: 'Farmer', dashboard: true, marketplace: true, farm: true, community: true, ai: true, admin: false },
  { id: 'buyer', role: 'Buyer', dashboard: true, marketplace: true, farm: false, community: true, ai: false, admin: false },
  { id: 'supplier', role: 'Supplier', dashboard: true, marketplace: true, farm: false, community: true, ai: false, admin: false },
  { id: 'admin', role: 'Admin', dashboard: true, marketplace: true, farm: true, community: true, ai: true, admin: true },
];

const auditLogs: AuditLog[] = [
  { id: 'a1', user: 'Zaldy Mar Ybañez', action: 'Login', resource: 'Authentication', ip: '192.168.1.42', time: '2 minutes ago', status: 'success' },
  { id: 'a2', user: 'Maria Santos', action: 'Profile Update', resource: 'User Profile', ip: '203.177.12.55', time: '15 minutes ago', status: 'success' },
  { id: 'a3', user: 'System', action: 'Failed Login Attempt', resource: 'Authentication', ip: '45.33.32.156', time: '1 hour ago', status: 'failed' },
  { id: 'a4', user: 'Juan Dela Cruz', action: 'Password Change', resource: 'User Profile', ip: '112.198.75.30', time: '3 hours ago', status: 'success' },
  { id: 'a5', user: 'Admin', action: 'Role Permission Update', resource: 'RBAC', ip: '192.168.1.1', time: '1 day ago', status: 'success' },
  { id: 'a6', user: 'System', action: 'API Key Generated', resource: 'API Security', ip: 'Internal', time: '2 days ago', status: 'success' },
];

export default function SecurityPage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Security Settings"
          description="Manage your account security and access controls"
        />

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <Shield size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Multi-Factor Authentication (MFA)</h3>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account using authenticator apps.</p>
                  </div>
                </div>
                <Toggle checked={mfaEnabled} onChange={(e) => setMfaEnabled(e.target.checked)} />
              </div>
              {mfaEnabled && (
                <div className="mt-4 sm:pl-14">
                  <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <Check size={14} />
                    MFA is enabled
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Database size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Data Encryption</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3 protocols.
                    Your personal information, farm data, and financial records are protected with industry-standard encryption.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <Badge variant="primary" className="bg-blue-50 text-blue-600" size="sm">
                      <Lock size={10} />
                      AES-256 at Rest
                    </Badge>
                    <Badge variant="accent" className="bg-purple-50 text-purple-600" size="sm">
                      <Lock size={10} />
                      TLS 1.3 in Transit
                    </Badge>
                    <Badge variant="success" size="sm">
                      <Lock size={10} />
                      End-to-End Encrypted
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Key size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">API Security</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    All API requests are authenticated using JWT tokens with automatic expiry. Rate limiting
                    prevents abuse, and API keys are scoped to specific permissions.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Authentication', value: 'JWT Bearer Tokens', color: 'text-emerald-600' },
                  { label: 'Rate Limiting', value: '100 req/min per user', color: 'text-blue-600' },
                  { label: 'Token Expiry', value: '24 hours', color: 'text-purple-600' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-primary-500" />
                <h3 className="font-semibold text-gray-900">Role Permissions Matrix</h3>
              </div>
            </CardHeader>
            <CardContent>
              <Table
                columns={[
                  { key: 'role', header: 'Role', className: 'font-medium text-gray-900' },
                  { key: 'dashboard', header: 'Dashboard', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.dashboard ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                  { key: 'marketplace', header: 'Marketplace', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.marketplace ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                  { key: 'farm', header: 'Farm', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.farm ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                  { key: 'community', header: 'Community', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.community ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                  { key: 'ai', header: 'AI Tools', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.ai ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                  { key: 'admin', header: 'Admin', className: 'text-center', render: (item: Record<string, unknown>) => { const rp = item as RolePermission; return rp.admin ? <Check size={14} className="inline text-emerald-600" /> : <X size={14} className="inline text-red-300" />; } },
                ]}
                data={rolePermissions as unknown as Record<string, unknown>[]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary-500" />
                <h3 className="font-semibold text-gray-900">Recent Audit Logs</h3>
              </div>
            </CardHeader>
            <CardContent>
              <Table
                columns={[
                  { key: 'user', header: 'User' },
                  { key: 'action', header: 'Action' },
                  { key: 'resource', header: 'Resource' },
                  { key: 'ip', header: 'IP Address', className: 'font-mono text-xs' },
                  { key: 'time', header: 'Time' },
                  { key: 'status', header: 'Status', render: (item: Record<string, unknown>) => {
                    const log = item as AuditLog;
                    return <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {log.status === 'success' ? <Check size={10} /> : <X size={10} />}
                      {log.status}
                    </span>;
                  }},
                ]}
                data={auditLogs as unknown as Record<string, unknown>[]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
