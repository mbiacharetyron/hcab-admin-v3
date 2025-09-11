# Docker Compose Deployment Guide

This guide walks you through deploying your H-Cab Admin Dashboard using Docker Compose.

## 🚀 **Quick Start**

### 1. **Setup Environment Variables**

Copy the environment template and fill in your values:

```bash
# Copy the template
cp env.template .env

# Edit the .env file with your actual values
nano .env
```

**Required values in `.env`:**
```bash
VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
VITE_API_BASE_URL=https://api.hcab.tech/api/v1
VITE_DEMO_MODE=false
```

### 2. **Deploy with Docker Compose**

```bash
# Build and start the services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3. **Access Your Application**

- **Direct access**: http://localhost:3200
- **With proxy** (if enabled): http://admin.hcab.tech

## 📋 **Deployment Options**

### **Option 1: Simple Deployment (Recommended for testing)**

```bash
# Start only the main application
docker-compose up -d hcab-admin
```

### **Option 2: Production Deployment with Nginx Proxy**

```bash
# Start with nginx proxy for production
docker-compose --profile proxy up -d
```

## 🔧 **Configuration Files**

### **docker-compose.yml**
- Main application service
- Optional nginx reverse proxy
- Health checks and restart policies
- Traefik labels for automatic SSL

### **env.template**
- Template for environment variables
- Copy to `.env` and fill in your values

### **nginx-proxy.conf**
- Production-ready nginx configuration
- SSL termination
- Rate limiting
- Security headers
- Static file caching

## 🛠️ **Management Commands**

### **Start Services**
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d hcab-admin

# Start with proxy
docker-compose --profile proxy up -d
```

### **Stop Services**
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### **View Logs**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f hcab-admin

# Last 100 lines
docker-compose logs --tail=100 hcab-admin
```

### **Update Application**
```bash
# Pull latest changes and rebuild
git pull
docker-compose build --no-cache
docker-compose up -d
```

### **Check Status**
```bash
# Service status
docker-compose ps

# Health check status
docker-compose exec hcab-admin wget -q --spider http://localhost:3200 && echo "Healthy" || echo "Unhealthy"
```

## 🔒 **Security Configuration**

### **Environment Variables Security**
- Never commit `.env` files to version control
- Use strong, unique API keys
- Restrict Google Maps API key to your domain

### **Nginx Security Features**
- Rate limiting (10 req/s for API, 30 req/s for static files)
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- SSL/TLS termination
- Request size limits

### **Container Security**
- Non-root user in containers
- Read-only filesystem where possible
- Health checks for monitoring
- Restart policies for reliability

## 🌐 **Production Setup with SSL**

### **1. Get SSL Certificates**

**Option A: Let's Encrypt (Recommended)**
```bash
# Install certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d admin.hcab.tech

# Copy certificates to ssl directory
sudo cp /etc/letsencrypt/live/admin.hcab.tech/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/admin.hcab.tech/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*
```

**Option B: Self-signed (for testing)**
```bash
# Create ssl directory
mkdir -p ssl

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=admin.hcab.tech"
```

### **2. Configure Domain**

Update your DNS to point `admin.hcab.tech` to your server's IP address.

### **3. Deploy with SSL**

```bash
# Start with nginx proxy
docker-compose --profile proxy up -d
```

## 📊 **Monitoring and Maintenance**

### **Health Checks**
The application includes built-in health checks:
- HTTP endpoint check every 30 seconds
- Automatic restart on failure
- Start period of 40 seconds

### **Log Management**
```bash
# View application logs
docker-compose logs -f hcab-admin

# View nginx logs
docker-compose logs -f nginx-proxy

# Rotate logs (add to crontab)
0 2 * * * docker-compose logs --since=24h > /var/log/hcab-admin-$(date +\%Y\%m\%d).log
```

### **Backup Strategy**
```bash
# Backup environment configuration
cp .env .env.backup.$(date +%Y%m%d)

# Backup SSL certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz ssl/
```

## 🔍 **Troubleshooting**

### **Common Issues**

**1. Map not loading**
```bash
# Check if API key is set
docker-compose exec hcab-admin env | grep VITE_GOOGLE_MAPS_API_KEY

# Verify API key in browser console
# Check Google Cloud Console for API restrictions
```

**2. Container won't start**
```bash
# Check logs
docker-compose logs hcab-admin

# Check if port is already in use
netstat -tulpn | grep :3200

# Rebuild without cache
docker-compose build --no-cache
```

**3. SSL certificate issues**
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Test SSL connection
openssl s_client -connect admin.hcab.tech:443
```

**4. API connection issues**
```bash
# Test API connectivity from container
docker-compose exec hcab-admin wget -qO- http://api.hcab.tech/api/v1/admin/dashboard/stats

# Check environment variables
docker-compose exec hcab-admin env | grep VITE_API
```

### **Debug Mode**
```bash
# Run in debug mode with logs
docker-compose up

# Access container shell
docker-compose exec hcab-admin sh
```

## 🚀 **Deployment Checklist**

- [ ] Environment variables configured in `.env`
- [ ] Google Maps API key obtained and restricted
- [ ] Domain DNS configured (if using custom domain)
- [ ] SSL certificates obtained (for production)
- [ ] Docker and Docker Compose installed
- [ ] Firewall configured (ports 80, 443, 3200)
- [ ] Application tested locally
- [ ] Backup strategy in place
- [ ] Monitoring setup configured

## 📈 **Scaling**

### **Horizontal Scaling**
```yaml
# In docker-compose.yml, modify the hcab-admin service:
services:
  hcab-admin:
    # ... existing configuration ...
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

### **Load Balancing**
The nginx proxy configuration already includes upstream configuration for load balancing multiple instances.

## 🎯 **Next Steps**

1. **Set up your environment variables** in `.env`
2. **Deploy with Docker Compose**: `docker-compose up -d`
3. **Test your application** at http://localhost:3200
4. **Configure SSL** for production use
5. **Set up monitoring** and backup strategies
6. **Configure your domain** and DNS

Your H-Cab Admin Dashboard should now be running smoothly with Docker Compose! 🎉
