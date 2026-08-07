import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const mockProfile = {
      _id: req.user?.id || '65f1a2b3c4d5e6f7a8b9c0d1',
      name: req.user?.name || 'Alex Johnson',
      email: req.user?.email || 'alex.johnson@example.com',
      role: req.user?.role || 'user',
      plan: 'pro',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      stats: {
        interviewsTaken: 8,
        averageScore: 86,
        totalQuestionsAnswered: 40,
        codingChallengesSolved: 14
      },
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Docker', 'Tailwind CSS'],
      weakSkills: ['System Design Scalability', 'Kubernetes Pod Networking', 'Memory Leak Profiling'],
      strongSkills: ['React Fiber & Hooks', 'REST & GraphQL Architecture', 'JWT Authentication', 'Mongoose Pipelines'],
      experience: [
        { title: 'Senior Frontend Engineer', company: 'TechCorp Solutions', duration: '2023 - Present', description: 'Architecting high-scale React apps' },
        { title: 'Full Stack Developer', company: 'DevStudio Inc.', duration: '2021 - 2023', description: 'Built REST APIs and MERN microservices' }
      ],
      education: [
        { degree: 'B.S. in Computer Science', institution: 'State University', year: '2021' }
      ],
      certificates: [
        { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2024' },
        { title: 'Full Stack Engineering Specialization', issuer: 'Coursera', date: '2023' }
      ],
      bookmarks: [
        'How does the React Virtual DOM diffing algorithm handle list keys?',
        'Explain rate limiting algorithm implementations (Token Bucket vs Sliding Window).'
      ],
      achievements: [
        { id: 'ach_1', title: 'First AI Interview Completed', description: 'Successfully completed your first AI mock interview session.', unlockedAt: new Date(), badgeIcon: '🏆' },
        { id: 'ach_2', title: 'Code Warrior', description: 'Solved 10+ live coding challenges with optimal time complexity.', unlockedAt: new Date(), badgeIcon: '⚡' },
        { id: 'ach_3', title: 'Top Communicator', description: 'Scored 90%+ in AI Voice Communication metric.', unlockedAt: new Date(), badgeIcon: '🎙️' }
      ],
      points: 450
    };

    res.json({ success: true, user: mockProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = { ...req.user, ...req.body };
    res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', score: 96, interviews: 24, badges: 8, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { rank: 2, name: 'Alex Johnson', score: 88, interviews: 14, badges: 6, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
    { rank: 3, name: 'David Kim', score: 86, interviews: 18, badges: 5, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80' },
    { rank: 4, name: 'Emily Davis', score: 84, interviews: 12, badges: 4, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
    { rank: 5, name: 'Michael Brown', score: 82, interviews: 10, badges: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }
  ];
  res.json({ success: true, leaderboard });
};
