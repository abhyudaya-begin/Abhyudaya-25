import React, { useState, useEffect } from 'react';

// Main Campus Ambassador Component
const CampusAmbassadorProgram = () => {
  const [isCA, setIsCA] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  // Simulate checking if user is a CA (would connect to your auth system)
  useEffect(() => {
    // Replace with actual authentication logic
    const checkIfUserIsCA = () => {
      // Mock implementation - would be replaced with actual API call
      const mockUserIsCA = localStorage.getItem('userIsCA') === 'true';
      setIsCA(mockUserIsCA);
    };
    
    checkIfUserIsCA();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-transparent rounded-lg shadow-md">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-6">
        <TabButton 
          active={activeTab === 'about'} 
          onClick={() => setActiveTab('about')}
          label="About CA Program"
        />
        <TabButton 
          active={activeTab === 'benefits'} 
          onClick={() => setActiveTab('benefits')}
          label="Benefits & Rewards"
        />
        <TabButton 
          active={activeTab === 'responsibilities'} 
          onClick={() => setActiveTab('responsibilities')}
          label="Responsibilities"
        />
        {isCA && (
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            label="My Dashboard"
          />
        )}
      </div>
      
      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'about' && <AboutProgram />}
        {activeTab === 'benefits' && <BenefitsRewards />}
        {activeTab === 'responsibilities' && <Responsibilities />}
        {activeTab === 'dashboard' && <CADashboard />}
        
        {/* Show application CTA if not a CA and not viewing dashboard */}
        {!isCA && activeTab !== 'dashboard' && (
          <ApplicationCTA setIsCA={setIsCA} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, label }) => (
  <button
    className={`px-4 py-2 font-medium text-sm border-b-2 focus:outline-none ${
      active 
        ? 'border-blue-500 text-blue-600' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// About Program Component
const AboutProgram = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Campus Ambassador Program</h2>
    <p className="mb-4">
      Our Campus Ambassador Program is designed to connect passionate students with our organization.
      As a CA, you'll represent our brand on your campus, organize events, spread awareness,
      and gain valuable professional experience.
    </p>
    
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <FeatureCard 
        title="Leadership Development" 
        description="Build leadership and communication skills by organizing events and leading campus initiatives."
        icon="👑"
      />
      <FeatureCard 
        title="Network Expansion" 
        description="Connect with industry professionals, alumni, and fellow CAs from other institutions."
        icon="🌐"
      />
      <FeatureCard 
        title="Resume Builder" 
        description="Add valuable experience to your resume and receive a certificate upon successful completion."
        icon="📄"
      />
    </div>
  </div>
);

// Benefits & Rewards Component
const BenefitsRewards = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Benefits & Rewards</h2>
    <p className="mb-6">
      Our Campus Ambassadors receive exclusive benefits and rewards for their contribution and dedication.
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      <FeatureCard 
        title="Financial Incentives" 
        description="Earn stipends, commissions, and performance-based bonuses for achieving targets."
        icon="💰"
      />
      <FeatureCard 
        title="Exclusive Access" 
        description="Get early access to new features, products, and attend exclusive webinars and workshops."
        icon="🔑"
      />
      <FeatureCard 
        title="Recognition" 
        description="Outstanding ambassadors will be featured on our website and social media channels."
        icon="🏆"
      />
    </div>
  </div>
);

// Responsibilities Component
const Responsibilities = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">CA Responsibilities</h2>
    <p className="mb-6">
      Campus Ambassadors are expected to fulfill the following responsibilities:
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      <FeatureCard 
        title="Campus Outreach" 
        description="Promote our platform through presentations, word-of-mouth, and campus events."
        icon="🗣️"
      />
      <FeatureCard 
        title="Event Organization" 
        description="Plan and execute workshops, seminars, and other events on campus."
        icon="📅"
      />
      <FeatureCard 
        title="Content Creation" 
        description="Create and share content about our platform on social media and campus channels."
        icon="📱"
      />
    </div>
  </div>
);

// Dashboard Component (shown only if user is a CA)
const CADashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Your CA Dashboard</h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Performance Metrics</h3>
        <div className="space-y-4">
          <MetricItem label="Referrals" value="23" target="30" />
          <MetricItem label="Events Organized" value="2" target="4" />
          <MetricItem label="Content Pieces" value="7" target="10" />
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Upcoming Tasks</h3>
        <ul className="space-y-2">
          <TaskItem 
            title="Submit monthly report" 
            dueDate="March 5, 2025"
            priority="high"
          />
          <TaskItem 
            title="Organize campus workshop" 
            dueDate="March 15, 2025"
            priority="medium"
          />
          <TaskItem 
            title="Social media campaign" 
            dueDate="March 20, 2025"
            priority="low"
          />
        </ul>
      </div>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg mt-6">
      <h3 className="font-bold text-lg mb-2">Resources & Materials</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResourceCard title="Presentation Templates" />
        <ResourceCard title="Promotion Posters" />
        <ResourceCard title="Email Templates" />
        <ResourceCard title="Brand Guidelines" />
      </div>
    </div>
  </div>
);

// Application CTA Component (shown if user is not a CA)
const ApplicationCTA = ({ setIsCA, setActiveTab }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    year: '',
    motivation: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    console.log("Form submitted:", formData);
    // Mock setting the user as a CA
    localStorage.setItem('userIsCA', 'true');
    setIsCA(true);
    setActiveTab('dashboard');
  };
  
  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
      {!showForm ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">Join Our Campus Ambassador Program</h3>
          <p className="mb-4">Become a leader on your campus, gain valuable experience, and earn rewards!</p>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">Campus Ambassador Application</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">University/College</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year of Study</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5+">5+ Year</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Why do you want to be a Campus Ambassador?</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Reusable Card Components
const FeatureCard = ({ title, description, icon }) => (
  <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const MetricItem = ({ label, value, target }) => {
  const progress = (parseInt(value) / parseInt(target)) * 100;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}/{target}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

const TaskItem = ({ title, dueDate, priority }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  
  return (
    <li className="flex items-center bg-transparent  justify-between p-2 hover:bg-gray-100 rounded">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">Due: {dueDate}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    </li>
  );
};

const ResourceCard = ({ title }) => (
  <div className="p-3 border rounded-lg bg-white text-center hover:shadow-md transition cursor-pointer">
    <div className="text-xl mb-2">📄</div>
    <p className="text-sm font-medium">{title}</p>
  </div>
);

export default CampusAmbassadorProgram;