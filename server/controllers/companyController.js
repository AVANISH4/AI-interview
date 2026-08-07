export const getCompanies = async (req, res) => {
  const companies = [
    { id: 'google', name: 'Google', slug: 'google', logo: '🌐', tagline: 'Organize the world information', popularRoles: ['Software Engineer', 'Frontend', 'System Design'], description: 'Focuses heavily on algorithm efficiency, system architecture, and scalable design.' },
    { id: 'amazon', name: 'Amazon', slug: 'amazon', logo: '📦', tagline: 'Earth most customer-centric company', popularRoles: ['Full Stack', 'Backend', 'Leadership Principles'], description: 'Emphasizes Amazon Leadership Principles alongside technical coding proficiency.' },
    { id: 'microsoft', name: 'Microsoft', slug: 'microsoft', logo: '🪟', tagline: 'Empower every person and organization', popularRoles: ['C++', 'Azure Cloud', 'Software Engineer'], description: 'Tests deep knowledge of data structures, OOP patterns, and Cloud architecture.' },
    { id: 'meta', name: 'Meta', slug: 'meta', logo: '♾️', tagline: 'Bring the world closer together', popularRoles: ['React Frontend', 'Product Architecture', 'Full Stack'], description: 'High-speed coding rounds with focus on React, GraphQL, and client-side performance.' },
    { id: 'netflix', name: 'Netflix', slug: 'netflix', logo: '🍿', tagline: 'Entertain the world', popularRoles: ['Microservices', 'DevOps', 'Senior Engineer'], description: 'Focuses on high-throughput distributed systems and freedom & responsibility culture.' },
    { id: 'adobe', name: 'Adobe', slug: 'adobe', logo: '🎨', tagline: 'Changing the world through digital experiences', popularRoles: ['C++', 'Frontend', 'Algorithms'], description: 'Values graphics algorithms, performance engineering, and modern web UI.' },
    { id: 'apple', name: 'Apple', slug: 'apple', logo: '🍏', tagline: 'Think different', popularRoles: ['Embedded Systems', 'UI/UX Engineering', 'Swift/C++'], description: 'Deep technical interviews with emphasis on privacy, optimization, and low-level code.' },
    { id: 'uber', name: 'Uber', slug: 'uber', logo: '🚗', tagline: 'We ignite opportunity by setting the world in motion', popularRoles: ['Distributed Systems', 'Go/Java', 'System Design'], description: 'Real-time geo-indexing, backend concurrency, and microservice resiliency.' },
    { id: 'linkedin', name: 'LinkedIn', slug: 'linkedin', logo: '💼', tagline: 'Connect the world professionals', popularRoles: ['Java Backend', 'Frontend', 'Data Engineering'], description: 'Focuses on scalable REST APIs, domain modeling, and collaborative engineering.' },
    { id: 'openai', name: 'OpenAI', slug: 'openai', logo: '🤖', tagline: 'Ensuring AGI benefits all humanity', popularRoles: ['AI/ML Engineer', 'Python Infrastructure', 'Full Stack'], description: 'Deep dive into LLM mechanics, Python data pipelines, and cutting-edge AI product design.' }
  ];
  res.json({ success: true, companies });
};

export const getCompanyDetails = async (req, res) => {
  const { slug } = req.params;
  res.json({
    success: true,
    company: {
      slug,
      name: slug.toUpperCase(),
      tracks: [
        { role: 'Senior Software Engineer', difficulty: 'Hard', duration: '30 mins' },
        { role: 'Frontend Specialist', difficulty: 'Medium', duration: '20 mins' },
        { role: 'System Architect', difficulty: 'Hard', duration: '45 mins' }
      ]
    }
  });
};
