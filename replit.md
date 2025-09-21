# Crop Yield Prediction System - Replit Setup

## Overview
This is a full-stack crop yield prediction application built with Next.js frontend and FastAPI backend. The system uses machine learning models to predict crop yields based on various agricultural parameters.

## Recent Changes (September 21, 2025)
- Successfully imported and configured the application for Replit environment
- Set up Python backend with FastAPI and all required dependencies
- Configured Next.js frontend with proper host settings for Replit proxy
- Updated CORS settings for cross-origin requests
- Created placeholder Firebase configuration (requires user's real credentials)
- Set up deployment configuration for autoscale production deployment
- Created sample data fallbacks when Firebase is not configured

## Project Architecture

### Frontend (Port 5000)
- **Technology**: Next.js 15 with React, TypeScript, Tailwind CSS
- **Components**: Modern UI with authentication, farm management, prediction forms
- **Deployment**: Configured for autoscale deployment

### Backend (Port 8000) 
- **Technology**: FastAPI with Python 3.11
- **Features**: ML crop yield prediction, Firebase integration, weather API
- **Models**: Pre-trained CatBoost models with 55+ crop types
- **API Endpoints**: 
  - `/api/predict` - Make crop yield predictions
  - `/api/add-farm` - Add new farms
  - `/api/get-farms` - Retrieve user farms
  - `/api/get-predictions` - Get prediction history
  - `/api/crops` - List available crop types

### Database
- **Technology**: Firebase Firestore (requires configuration)
- **Fallback**: Sample data when Firebase not configured
- **Collections**: users, farms, predictions

## Current Status
✅ **Frontend**: Running successfully on port 5000 with modern UI
✅ **Backend**: Configured and ready (requires Firebase credentials for full functionality)
✅ **ML Models**: Loaded successfully with 55 crop types available
✅ **Deployment**: Configured for production autoscale deployment

## User Configuration Required

### Firebase Setup
1. Create a Firebase project with Firestore enabled
2. Replace placeholder values in `.env.local` with your Firebase configuration
3. Add your Firebase service account JSON as `backend/firebase-service-account.json`

### Optional Enhancements
- Add OpenWeatherMap API key to `backend/.env` for real weather data
- Configure additional crop types in the ML model
- Customize UI components and styling

## User Preferences
- Uses modern React/Next.js patterns with TypeScript
- Prefers FastAPI for Python backend APIs
- Uses Tailwind CSS for styling with shadcn/ui components
- Machine learning integration with CatBoost models
- Firebase for authentication and data storage

## Workflow Configuration
- **Frontend Workflow**: `npx next dev --hostname 0.0.0.0 --port 5000`
- **Backend Workflow**: `cd backend && python main.py`
- **Deployment**: Autoscale configuration with npm build/start commands