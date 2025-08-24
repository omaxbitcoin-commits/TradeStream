# Omax - Cryptocurrency Token Tracking Platform

## Overview

Omax is a modern web application for tracking and analyzing cryptocurrency tokens across multiple platforms (Odin, AstroApe, and Tyche). The platform provides real-time token data visualization, wallet tracking capabilities, and trading interfaces for cryptocurrency enthusiasts and traders.

The application follows a full-stack architecture with a React-based frontend, Express.js backend, and PostgreSQL database integration through Drizzle ORM. It features a modern UI built with Shadcn/ui components, real-time data fetching, and comprehensive token analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Theme System**: Custom theme provider supporting dark and bitcoin themes
- **Internationalization**: Custom language context supporting English and Chinese

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for token data from multiple sources
- **Development Server**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error handling middleware with structured responses

### Data Layer
- **Database**: PostgreSQL with connection via Neon Database serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory
- **Migration System**: Drizzle Kit for database migrations
- **Storage Abstraction**: In-memory storage implementation for development with interface for easy database integration

### Component Architecture
- **Design System**: Atomic design principles with reusable UI components
- **Component Structure**: Organized into common, trading, modals, and UI categories
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Real-time Features
- **Data Fetching**: Automatic polling every 5 seconds for live token updates
- **Cache Management**: Intelligent caching with React Query for optimal performance
- **Live Updates**: Real-time price and market data synchronization

## External Dependencies

### Third-party APIs
- **Odin.fun API**: Token data source for newly created and trending tokens
- **AstroApe.fun API**: Additional token marketplace integration
- **Tyche.run API**: Extended token analytics and data

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production
- **Connection Pooling**: Built-in connection management for scalability

### UI Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for token displays
- **React Hook Form**: Form state management and validation

### Development Tools
- **Replit Integration**: Development environment optimization with cartographer and error overlay plugins
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **ESBuild**: Fast bundling for production builds

### Authentication (Planned)
- **Wallet Integration**: Support for MetaMask and WalletConnect
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple

### Monitoring and Analytics
- **Request Logging**: Custom middleware for API request tracking
- **Performance Monitoring**: Built-in timing and response logging
- **Error Tracking**: Structured error reporting and handling