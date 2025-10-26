# mediquick (monorepo)

## Start frontend (dev)
cd frontend
npm install
npm run dev

## Build frontend
npm run build

## Start backend (dev)
cd backend
npm install
npm run dev

## Build backend
npm run build
npm start

## README.md

```markdown
# Mediquick Stays 🏥✨

A comprehensive medical tourism platform connecting patients with specialized healthcare accommodation packages.

## 🌟 Features

### For Patients
- **Healthcare-Focused Stays**: Curated accommodation packages for medical travelers
- **Easy Booking System**: Streamlined booking process with medical needs in mind
- **Package Selection**: Various packages tailored to different medical requirements
- **Add-on Services**: Additional amenities and services for comfort and recovery
- **Secure Payments**: Safe and reliable payment processing

### For Administrators
- **Dashboard Analytics**: Real-time insights into bookings, revenue, and occupancy
- **Booking Management**: Comprehensive view and management of all reservations
- **Blog Management**: Content management system for health and wellness articles
- **User Management**: Patient and customer relationship management

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication

### Development
- **Hot-reload** development server
- **ESLint** & **Prettier** for code quality
- **MongoDB Atlas** for cloud database

## 📁 Project Structure

```
mediquick-stays/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Server utilities
│   └── package.json
├── shared/                 # Shared types and utilities
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mediquick-stays.git
   cd mediquick-stays
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client && npm install

   # Install server dependencies  
   cd ../server && npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mediquick-stays
   JWT_SECRET=your-jwt-secret-key
   PORT=5000
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Database Setup**
   - For local MongoDB: Ensure MongoDB is running on port 27017
   - For MongoDB Atlas: Update the connection string in your `.env` file

5. **Start the application**
   ```bash
   # From root directory - starts both client and server
   npm run dev

   # Or start separately:
   # Terminal 1 - Start backend
   cd server && npm run dev

   # Terminal 2 - Start frontend  
   cd client && npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:3000/bookings/admin

## 📊 Admin Dashboard

The admin dashboard provides comprehensive management capabilities:

- **Real-time Analytics**: Booking statistics, revenue tracking, occupancy rates
- **Booking Management**: View, filter, and manage all patient bookings
- **Blog Management**: Create, edit, and delete health and wellness articles
- **User Insights**: Patient preferences and booking patterns

Access: Navigate to `/bookings/admin` after starting the application.

## 🗄 Database Models

### Bookings
- Patient information and medical requirements
- Package selections and add-on services
- Booking dates and status tracking
- Payment information and totals

### Blogs  
- Health and wellness articles
- SEO-optimized content management
- Category and tag organization
- Analytics (views, likes, read time)

### Users
- Patient profiles and medical preferences
- Booking history and preferences
- Authentication and security

## 🧪 Available Scripts

### Root Level
```bash
npm run dev          # Start both client and server
npm run build        # Build both client and server
npm test            # Run tests for both
```

### Client
```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run lint        # Run ESLint
```

### Server
```bash
npm run dev         # Start with hot-reload
npm start           # Start production server
npm test            # Run tests
npm run lint        # Run ESLint
```

## 🔧 Configuration

### MongoDB Connection
Update the `MONGODB_URI` in your environment variables:
- Local: `mongodb://localhost:27017/mediquick-stays`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mediquick-stays`

### JWT Configuration
Set a strong `JWT_SECRET` in your environment variables for authentication security.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@mediquickstays.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/mediquick-stays/issues)
- 📚 Documentation: [Project Wiki](https://github.com/your-username/mediquick-stays/wiki)

## 🙏 Acknowledgments

- Medical tourism industry partners
- Healthcare professionals for guidance
- Open source community for amazing tools
```

These files provide:

1. **Comprehensive `.gitignore`** that covers all common development files, dependencies, and sensitive data
2. **Professional `README.md`** with:
   - Clear project description
   - Installation and setup instructions
   - Feature overview
   - Tech stack details
   - Project structure
   - Admin dashboard information
   - Database model explanations
   - Development scripts
   - Contribution guidelines

The README is structured to be helpful for both developers wanting to contribute and potential clients evaluating your work. It showcases the professionalism and completeness of your Mediquick Stays project!