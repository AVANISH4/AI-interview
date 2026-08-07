export const getAdminStats = async (req, res) => {
  const stats = {
    totalUsers: 1420,
    activeSubscribers: 340,
    totalInterviewsTaken: 4890,
    totalRevenue: 28450,
    monthlyGrowthPercentage: 18.5,
    recentUsers: [
      { _id: 'u_1', name: 'Sarah Chen', email: 'sarah.chen@gmail.com', plan: 'pro', registeredAt: new Date(Date.now() - 3600000 * 4) },
      { _id: 'u_2', name: 'Alex Johnson', email: 'alex.johnson@example.com', plan: 'pro', registeredAt: new Date(Date.now() - 3600000 * 12) },
      { _id: 'u_3', name: 'Marcus Vance', email: 'marcus.v@techcorp.io', plan: 'enterprise', registeredAt: new Date(Date.now() - 3600000 * 24) },
      { _id: 'u_4', name: 'Elena Rostova', email: 'elena.rostova@dev.com', plan: 'free', registeredAt: new Date(Date.now() - 3600000 * 36) }
    ],
    revenueData: [
      { month: 'Jan', revenue: 2400 },
      { month: 'Feb', revenue: 3200 },
      { month: 'Mar', revenue: 4100 },
      { month: 'Apr', revenue: 5600 },
      { month: 'May', revenue: 6800 },
      { month: 'Jun', revenue: 8400 }
    ]
  };

  res.json({ success: true, stats });
};

export const getAllUsers = async (req, res) => {
  const users = [
    { _id: 'u_1', name: 'Sarah Chen', email: 'sarah.chen@gmail.com', role: 'user', plan: 'pro', interviewsCount: 14, createdAt: '2026-02-10' },
    { _id: 'u_2', name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'user', plan: 'pro', interviewsCount: 8, createdAt: '2026-02-14' },
    { _id: 'u_3', name: 'Marcus Vance', email: 'marcus.v@techcorp.io', role: 'user', plan: 'enterprise', interviewsCount: 22, createdAt: '2026-01-20' },
    { _id: 'u_4', name: 'Admin Developer', email: 'admin@aiinterviewpro.com', role: 'admin', plan: 'enterprise', interviewsCount: 45, createdAt: '2026-01-01' }
  ];
  res.json({ success: true, users });
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  res.json({ success: true, message: `User ${userId} deleted successfully` });
};
