import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Users, DollarSign, Activity, ShieldAlert, Trash2, Search, CheckCircle2 } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [users, setUsers] = useState([
    { id: 'u_1', name: 'Sarah Chen', email: 'sarah.chen@gmail.com', role: 'user', plan: 'pro', interviews: 14 },
    { id: 'u_2', name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'user', plan: 'pro', interviews: 8 },
    { id: 'u_3', name: 'Marcus Vance', email: 'marcus.v@techcorp.io', role: 'user', plan: 'enterprise', interviews: 22 },
    { id: 'u_4', name: 'Elena Rostova', email: 'elena.rostova@dev.com', role: 'user', plan: 'free', interviews: 2 }
  ]);
  const [search, setSearch] = useState('');

  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 3200 },
    { month: 'Mar', revenue: 4100 },
    { month: 'Apr', revenue: 5600 },
    { month: 'May', revenue: 6800 },
    { month: 'Jun', revenue: 8400 }
  ];

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Admin Command Center
          </span>
          <h1 className="text-3xl font-extrabold text-white">Platform Analytics & Management</h1>
        </div>
      </div>

      {/* Admin Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-semibold text-slate-400">Total Registered Users</span>
          <div className="text-2xl font-extrabold text-white mt-2">1,420</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-semibold text-slate-400">Active Pro Subscribers</span>
          <div className="text-2xl font-extrabold text-brand-purple mt-2">340</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-semibold text-slate-400">Interviews Conducted</span>
          <div className="text-2xl font-extrabold text-brand-blue mt-2">4,890</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-semibold text-slate-400">Total Platform Revenue</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2">$28,450</div>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <h3 className="font-extrabold text-lg text-white mb-4">Monthly Revenue Dashboard ($)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', borderColor: '#334155' }} />
              <Bar dataKey="revenue" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Management Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-white">Manage Platform Users</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full glass-input rounded-xl py-2 pl-9 pr-3 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Interviews</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">{u.name}</td>
                  <td className="p-3 text-slate-400">{u.email}</td>
                  <td className="p-3 capitalize font-bold text-brand-purple">{u.plan}</td>
                  <td className="p-3">{u.interviews}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
