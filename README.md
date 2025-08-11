# Gestion Centrale UCL

A comprehensive web application for managing student associations at UCL (Université Catholique de Louvain).

## Features

### Core Management
- **Member Management**: Registration, profiles, roles and permissions
- **Event Management**: Create, schedule and manage association events  
- **Financial Management**: Budget tracking, expense management, dues collection
- **Communication**: Internal messaging, announcements, notifications

### Advanced Features
- **Dashboard Analytics**: Member statistics, financial overview, event metrics
- **Role-based Access Control**: Different permission levels for members, officers, and administrators
- **Document Management**: Store and organize important association documents
- **Mobile Responsive**: Optimized for all devices

## Technology Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js with Express, MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **Deployment**: Docker containers, environment-based configuration
- **Testing**: Jest for backend, React Testing Library for frontend

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gestion-centrale-ucl
```

2. Install all dependencies
```bash
npm run install:all
```

3. Set up environment variables
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Start development servers
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Docker Deployment

```bash
# Build and start all services
npm run docker:up

# Stop all services  
npm run docker:down
```

## Project Structure

```
gestion-centrale-ucl/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
├── server/                # Node.js backend API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Helper functions
│   │   └── config/        # Configuration files
├── docs/                  # Documentation
└── docker-compose.yml     # Docker orchestration
```

## API Documentation

The API follows RESTful conventions and includes the following main endpoints:

- `/api/auth` - Authentication (login, register, refresh)
- `/api/users` - User management
- `/api/events` - Event management  
- `/api/finances` - Financial operations
- `/api/communications` - Messaging and announcements

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.