// pages/Bookings/Admin.tsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer 
} from 'recharts';
import api from '../../services/api';

interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  name?: string;
  total?: number;
  email?: string;
  clientBookingId?: string;
}

interface LocalBooking {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  total: number;
  deposit: number;
  status: string;
  timestamp: string;
  packageId: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  featuredImage?: string;
  imageUrl?: string;
}

interface DashboardStats {
  totalBookings: number;
  recentBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'blogs' | 'localBookings'>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [localBookings, setLocalBookings] = useState<LocalBooking[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [newBlog, setNewBlog] = useState({ 
    title: '', 
    content: '', 
    author: '',
    featuredImage: '' 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  
  // Add authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Check if already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyAdminToken(token);
    }
    loadLocalStorageBookings();
  }, []);

  // Load local storage bookings function
  const loadLocalStorageBookings = () => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem('mediquickBookings') || '[]');
      setLocalBookings(storedBookings);
    } catch (error) {
      console.error('Error loading localStorage bookings:', error);
    }
  };

  // Fetch dashboard data function - MOVED BEFORE functions that call it
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      console.log('🔄 Fetching dashboard data...');
      
      const [statsRes, bookingsRes, blogsRes] = await Promise.all([
        api.get('/api/admin/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get('/api/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        }), 
        api.get('/api/admin/blogs', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      console.log('✅ Data fetched successfully:', {
        stats: statsRes.data,
        bookingsCount: bookingsRes.data?.data?.list?.length || 0,
        blogsCount: blogsRes.data?.length || 0
      });

      setStats(statsRes.data);
      setBookings(bookingsRes.data?.data?.list || []);
      setBlogs(blogsRes.data || []);
    } catch (error: any) {
      console.error('❌ Failed to fetch dashboard data:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch data';
      setError(errorMessage);
      
      // If unauthorized, logout
      if (error.response?.status === 401) {
        handleAdminLogout();
      } else {
        setFallbackData();
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for demo when API is not available
  const setFallbackData = () => {
    setStats({
      totalBookings: 24,
      recentBookings: 5,
      totalRevenue: 12500,
      occupancyRate: 78
    });
    
    setBookings([
      {
        _id: '1',
        user: { name: 'John Doe', email: 'john@example.com' },
        checkIn: '2024-01-15',
        checkOut: '2024-01-20',
        guests: 2,
        totalAmount: 1200,
        status: 'confirmed',
        createdAt: '2024-01-10'
      },
      {
        _id: '2',
        user: { name: 'Jane Smith', email: 'jane@example.com' },
        checkIn: '2024-01-18',
        checkOut: '2024-01-22',
        guests: 1,
        totalAmount: 900,
        status: 'pending',
        createdAt: '2024-01-12'
      }
    ]);

    setBlogs([
      {
        _id: '1',
        title: 'Welcome to Mediquick Stays',
        content: 'Discover our premium healthcare accommodation services.',
        author: 'Admin',
        createdAt: '2024-01-01',
        featuredImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    ]);
  };

  // Admin logout function
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminUser(null);
    setBookings([]);
    setStats(null);
    console.log('👋 Admin logged out');
  };

  // Verify admin token
  const verifyAdminToken = async (token: string) => {
    try {
      const response = await api.get('/api/admin/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setIsAuthenticated(true);
        setAdminUser(response.data.data.user);
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
    }
  };

  // Admin login function
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      console.log('🔐 Attempting admin login...');
      
      const response = await api.post('/api/admin/auth/login', loginData);
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        setAdminUser(user);
        console.log('✅ Admin login successful');
        
        // Load data after successful login
        fetchDashboardData();
      }
    } catch (error: any) {
      console.error('❌ Admin login failed:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoginLoading(false);
    }
  };

  // Sync local bookings to server
  const syncLocalBookingsToServer = async () => {
    if (localBookings.length === 0) {
      alert('No local bookings to sync');
      return;
    }

    setSyncing(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('Please log in as admin to sync bookings');
        setSyncing(false);
        return;
      }

      console.log('🔄 Starting sync for bookings:', localBookings);
      
      const response = await api.post('/api/bookings/sync-bookings', {
        bookings: localBookings
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.ok) {
        console.log('✅ Sync successful:', response.data);
        
        // Show success message with option to clear local storage
        const shouldClear = window.confirm(
          `✅ Successfully synced ${response.data.synced} bookings to server!\n\n` +
          `Do you want to clear the local storage now?\n\n` +
          `• Click "OK" to clear local storage\n` +
          `• Click "Cancel" to keep local bookings for backup`
        );
        
        if (shouldClear) {
          localStorage.removeItem('mediquickBookings');
          setLocalBookings([]);
          console.log('🗑️ Local storage cleared');
        } else {
          console.log('💾 Local storage kept as backup');
        }
        
        // Refresh the dashboard data to show synced bookings
        fetchDashboardData();
      }
    } catch (error: any) {
      console.error('❌ Sync failed:', error);
      
      if (error.response?.status === 401) {
        alert('❌ Unauthorized: Please log in as administrator');
        handleAdminLogout();
      } else {
        alert(`❌ Sync failed: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setSyncing(false);
    }
  };

  // Clear local bookings
  const clearLocalBookings = () => {
    if (localBookings.length === 0) {
      alert('No local bookings to clear');
      return;
    }

    const confirmClear = window.confirm(
      `Are you sure you want to clear ${localBookings.length} local bookings?\n\n` +
      `This action cannot be undone. Only do this after confirming the bookings are safely in the database.`
    );

    if (confirmClear) {
      localStorage.removeItem('mediquickBookings');
      setLocalBookings([]);
      alert('✅ Local bookings cleared successfully');
    }
  };

  const deleteLocalBooking = (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this local booking?')) {
      return;
    }

    const updatedBookings = localBookings.filter(booking => booking.bookingId !== bookingId);
    setLocalBookings(updatedBookings);
    localStorage.setItem('mediquickBookings', JSON.stringify(updatedBookings));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      console.log('📤 Uploading image...', file.name);
      
      // Convert image to base64 for easy storage
      const base64Image = await convertToBase64(file);
      setNewBlog(prev => ({ ...prev, featuredImage: base64Image }));
      setImagePreview(base64Image);
      
      console.log('✅ Image processed successfully');
    } catch (error) {
      console.error('❌ Failed to process image:', error);
      alert('Failed to process image. Please try another image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setNewBlog(prev => ({ ...prev, featuredImage: '' }));
    setImagePreview(null);
  };

  const addBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('🔄 Adding new blog...');
      
      // Create blog data with all required fields
      const blogData = {
        title: newBlog.title,
        content: newBlog.content,
        author: newBlog.author,
        featuredImage: newBlog.featuredImage
      };
      
      const response = await api.post('/api/admin/blogs', blogData);
      
      if (response.data) {
        // Reset form
        setNewBlog({ 
          title: '', 
          content: '', 
          author: '',
          featuredImage: '' 
        });
        setImagePreview(null);
        
        console.log('✅ Blog added successfully:', response.data);
        fetchDashboardData();
      } else {
        throw new Error('Failed to add blog');
      }
    } catch (error: any) {
      console.error('❌ Failed to add blog:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to add blog';
      
      // Show more detailed error message
      if (error.response?.data?.details) {
        alert(`Failed to add blog: ${errorMessage}\nDetails: ${error.response.data.details}`);
      } else {
        alert(`Failed to add blog: ${errorMessage}`);
      }
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      console.log('🔄 Deleting blog...');
      
      const response = await api.delete(`/api/admin/blogs/${id}`);
      
      if (response.data) {
        console.log('✅ Blog deleted successfully');
        fetchDashboardData();
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error: any) {
      console.error('❌ Failed to delete blog:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to delete blog';
      alert(`Failed to delete blog: ${errorMessage}`);
    }
  };

  // Check database status
  const checkDatabaseStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/api/admin/database-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('📊 Database status:', response.data);
      
      if (response.data.success) {
        const data = response.data.data;
        alert(
          `📊 Database Status:\n\n` +
          `• Connected: ${data.database.connected ? '✅' : '❌'}\n` +
          `• Database: ${data.database.name}\n` +
          `• Bookings: ${data.collections.bookings.total}\n` +
          `• Packages: ${data.collections.packages.total}\n` +
          `• Contacts: ${data.collections.contacts.total}\n` +
          `• Users: ${data.collections.users.total}`
        );
        
        console.log('Detailed database info:', data);
      }
    } catch (error: any) {
      console.error('Error checking database:', error);
      if (error.response?.status === 401) {
        alert('❌ Unauthorized: Please log in again');
        handleAdminLogout();
      } else {
        alert(`❌ Error checking database: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 }
  ];

  const bookingStatusData = [
    { name: 'Confirmed', value: 75 },
    { name: 'Pending', value: 15 },
    { name: 'Cancelled', value: 10 }
  ];

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Mediquick Stays Administration
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleAdminLogin}>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Admin email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {loginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign in as Admin'
                  )}
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Default credentials: admin@mediquick.com / admin123
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching data from server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mediquick Stays Admin</h1>
              {adminUser && (
                <p className="text-sm text-gray-500">Welcome, {adminUser.name}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-8">
                {['dashboard', 'bookings', 'localBookings', 'blogs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`capitalize ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    } border-b-2 px-1 pt-1 text-sm font-medium`}
                  >
                    {tab === 'localBookings' ? 'Local Bookings' : tab}
                  </button>
                ))}
              </nav>
              
              <button
                onClick={checkDatabaseStatus}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-2"
              >
                <span>🔍</span>
                <span>Check DB</span>
              </button>
              
              <button
                onClick={() => {
                  fetchDashboardData();
                  loadLocalStorageBookings();
                }}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
              
              <button
                onClick={handleAdminLogout}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Connection Issue
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{error}</p>
                  <p className="mt-1">Using demo data. Please check:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Backend server is running on port 5606</li>
                    <li>Backend URL: http://localhost:5606</li>
                    <li>Admin routes exist at /api/admin/</li>
                    <li>No SSL/HTTPS issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && stats && (
          <div className="px-4 py-6 sm:px-0">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">B</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.totalBookings}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">W</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Recent Bookings</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.recentBookings}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">$</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd className="text-lg font-medium text-gray-900">${stats.totalRevenue.toLocaleString()}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">%</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Occupancy Rate</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.occupancyRate}%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Bookings Alert */}
            {localBookings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-400 text-xl">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        {localBookings.length} Local Booking{localBookings.length > 1 ? 's' : ''} Pending Sync
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        These bookings are stored locally and need to be synced to the server.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={syncLocalBookingsToServer}
                    disabled={syncing}
                    className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 disabled:bg-yellow-400 flex items-center space-x-2"
                  >
                    {syncing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Syncing...</span>
                      </>
                    ) : (
                      <>
                        <span>🔄</span>
                        <span>Sync Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Booking Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Bookings Preview */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {bookings.slice(0, 5).map((booking) => (
                    <li key={booking._id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.checkIn} to {booking.checkOut}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {booking.status}
                          </span>
                          <div className="ml-4 text-sm text-gray-900">${booking.totalAmount}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {!bookings || bookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
                  <p className="text-gray-600">
                    {bookings === null ? 'Loading...' : 'No bookings in the database.'}
                  </p>
                  <button
                    onClick={fetchDashboardData}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Refresh Data
                  </button>
                </div>
              ) : (
                <div>
                  <div className="px-4 py-4 bg-gray-50 border-b">
                    <p className="text-sm text-gray-600">
                      Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <li key={booking._id}>
                        <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                {booking.name || 'No Name'}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  KES {booking.total?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  {booking.email || 'No Email'}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'No Date'} - {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'No Date'}
                                </p>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}`}>
                                  {booking.status || 'unknown'}
                                </span>
                              </div>
                            </div>
                            {booking.clientBookingId && (
                              <div className="mt-1 text-xs text-gray-400">
                                Client ID: {booking.clientBookingId}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'localBookings' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Local Storage Bookings
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Bookings stored locally in browser storage (offline mode)
                    </p>
                  </div>
                  {localBookings.length > 0 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={clearLocalBookings}
                        className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 flex items-center space-x-2"
                      >
                        <span>🗑️</span>
                        <span>Clear Local</span>
                      </button>
                      <button
                        onClick={syncLocalBookingsToServer}
                        disabled={syncing}
                        className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:bg-green-400 flex items-center space-x-2"
                      >
                        {syncing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Syncing...</span>
                          </>
                        ) : (
                          <>
                            <span>🔄</span>
                            <span>Sync to Server</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {localBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Local Bookings</h3>
                  <p className="text-gray-600">All bookings are synced with the server or no bookings exist.</p>
                </div>
              ) : (
                <>
                  <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="text-yellow-400">💡</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Tip:</strong> Sync bookings to save them to the database. Clear local storage only after confirming successful sync.
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {localBookings.map((booking) => (
                      <li key={booking.bookingId} className="px-4 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                {booking.name}
                              </p>
                              <div className="ml-2 flex items-center space-x-2">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Local
                                </span>
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  KES {booking.total?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <div className="sm:flex space-x-6">
                                <p className="flex items-center text-sm text-gray-500">
                                  📧 {booking.email}
                                </p>
                                <p className="flex items-center text-sm text-gray-500">
                                  📞 {booking.phone}
                                </p>
                                <p className="flex items-center text-sm text-gray-500">
                                  📅 {booking.checkIn} - {booking.checkOut}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {booking.guests} guest{Number(booking.guests) > 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Booking ID: {booking.bookingId} • Created: {new Date(booking.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="px-4 py-6 sm:px-0">
            {/* Add Blog Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-medium mb-4">Add New Blog Post</h3>
              <form onSubmit={addBlog} className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Featured Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg border-2 border-indigo-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        aria-label="Remove featured image"
                        title="Remove featured image"
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <span className="sr-only">Remove featured image</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium">
                            {uploadingImage ? 'Uploading...' : 'Choose Image'}
                          </span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="Enter blog title..."
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="Enter author name..."
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={6}
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="Write your blog content here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading Image...
                    </>
                  ) : (
                    'Add Blog Post'
                  )}
                </button>
              </form>
            </div>

            {/* Blogs List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {blogs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Blog Posts Yet</h3>
                  <p className="text-gray-600">Create your first blog post using the form above.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <li key={blog._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        {/* Blog Image Thumbnail */}
                        {(blog.featuredImage || blog.imageUrl) && (
                          <div className="flex-shrink-0">
                            <img 
                              src={blog.featuredImage || blog.imageUrl} 
                              alt={blog.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-gray-900 truncate">
                              {blog.title}
                            </h4>
                            <button
                              onClick={() => deleteBlog(blog._id)}
                              className="ml-4 bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors font-medium"
                            >
                              Delete
                            </button>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              By {blog.author}
                            </span>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            {(blog.featuredImage || blog.imageUrl) && (
                              <span className="text-green-600 font-medium">
                                Has Image
                              </span>
                            )}
                          </div>
                          
                          <p className="mt-2 text-gray-600 line-clamp-2">
                            {blog.content}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;