# Production Deployment Guide

## Environment Variables in Production

This guide explains how to properly handle environment variables when deploying your H-Cab Admin Dashboard to production.

## 🔧 **Environment Variables Required**

Your application requires these environment variables:

```bash
# Google Maps API Key (Required for map functionality)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# API Configuration
VITE_API_BASE_URL=https://api.hcab.tech/api/v1

# Demo Mode
VITE_DEMO_MODE=false
```

## 🐳 **Docker Deployment (Recommended)**

### Build with Environment Variables

```bash
# Build Docker image with environment variables
docker build \
  --build-arg VITE_GOOGLE_MAPS_API_KEY="your_actual_api_key_here" \
  --build-arg VITE_API_BASE_URL="https://your-production-api.com/api/v1" \
  --build-arg VITE_DEMO_MODE="false" \
  -t hcab-admin:latest .
```

### Run the Container

```bash
# Run the container
docker run -d -p 3200:3200 --name hcab-admin hcab-admin:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  hcab-admin:
    build:
      context: .
      args:
        VITE_GOOGLE_MAPS_API_KEY: ${VITE_GOOGLE_MAPS_API_KEY}
        VITE_API_BASE_URL: ${VITE_API_BASE_URL}
        VITE_DEMO_MODE: ${VITE_DEMO_MODE}
    ports:
      - "3200:3200"
    environment:
      - NODE_ENV=production
```

Then create a `.env` file for Docker Compose:

```bash
# .env file for Docker Compose
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
VITE_API_BASE_URL=https://your-production-api.com/api/v1
VITE_DEMO_MODE=false
```

Run with:
```bash
docker-compose up -d
```

## ☁️ **Cloud Platform Deployment**

### Vercel

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add each variable:
     - `VITE_GOOGLE_MAPS_API_KEY`
     - `VITE_API_BASE_URL`
     - `VITE_DEMO_MODE`

2. **Deploy:**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Set Environment Variables in Netlify Dashboard:**
   - Go to Site settings → Environment variables
   - Add each variable

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### AWS Amplify

1. **Set Environment Variables in Amplify Console:**
   - Go to App settings → Environment variables
   - Add each variable

2. **Deploy automatically on git push**

## 🔒 **Security Best Practices**

### 1. **Never Commit .env Files**
Your `.gitignore` already excludes `.env` files, which is correct.

### 2. **Use Different API Keys for Different Environments**
- **Development**: Use a restricted API key for localhost
- **Staging**: Use a restricted API key for staging domain
- **Production**: Use a restricted API key for production domain

### 3. **Restrict Google Maps API Key**
In Google Cloud Console:
1. Go to APIs & Services → Credentials
2. Click on your API key
3. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your production domain(s)
4. Under "API restrictions":
   - Select "Restrict key"
   - Choose only the APIs you need:
     - Maps JavaScript API
     - Geocoding API (if used)
     - Places API (if used)

## 🚀 **Quick Production Setup**

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable Maps JavaScript API
4. Create an API key
5. Restrict it to your production domain

### Step 2: Deploy with Docker
```bash
# Replace with your actual values
docker build \
  --build-arg VITE_GOOGLE_MAPS_API_KEY="AIzaSyC..." \
  --build-arg VITE_API_BASE_URL="https://api.hcab.tech/api/v1" \
  --build-arg VITE_DEMO_MODE="false" \
  -t hcab-admin:latest .

docker run -d -p 3200:3200 --name hcab-admin hcab-admin:latest
```

### Step 3: Verify Deployment
1. Open your browser to `http://your-server:3200`
2. Check that the map loads properly
3. Verify API calls are working

## 🔍 **Troubleshooting**

### Map Not Loading
- Check browser console for API key errors
- Verify `VITE_GOOGLE_MAPS_API_KEY` is set correctly
- Ensure API key has proper restrictions

### API Calls Failing
- Check `VITE_API_BASE_URL` is correct
- Verify CORS settings on your backend
- Check network tab in browser dev tools

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_`
- Restart the development server after adding variables
- Check that variables are set at build time (not runtime)

## 📝 **Environment Variable Reference**

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_GOOGLE_MAPS_API_KEY` | Yes | Google Maps API key | `AIzaSyC...` |
| `VITE_API_BASE_URL` | No | Backend API URL | `https://api.hcab.tech/api/v1` |
| `VITE_DEMO_MODE` | No | Use mock data | `false` |

## 🎯 **Next Steps**

1. **Get your Google Maps API key** from Google Cloud Console
2. **Choose your deployment method** (Docker recommended)
3. **Set environment variables** according to your chosen method
4. **Deploy and test** your application
5. **Monitor** for any issues and adjust as needed

Your map should now display properly in production! 🗺️
