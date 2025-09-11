# GitLab CI Deployment Guide

This guide explains how to deploy your H-Cab Admin Dashboard using GitLab CI with Docker Compose.

## 🚀 **GitLab CI Configuration**

Your `.gitlab-ci.yml` has been updated to:
- Build Docker images with environment variables
- Deploy using Docker Compose
- Handle environment variables securely
- Use GitLab Container Registry

## 🔧 **Required GitLab CI Variables**

You need to set these variables in your GitLab project settings:

### **Go to: Project Settings → CI/CD → Variables**

#### **Required Variables:**
```bash
# Google Maps API Key (Required for map functionality)
VITE_GOOGLE_MAPS_API_KEY = your_actual_google_maps_api_key_here

# API Configuration
VITE_API_BASE_URL = https://api.hcab.tech/api/v1

# Demo Mode
VITE_DEMO_MODE = false

# Server Configuration
IP_ADDRESS = your_server_ip_address
SSH_KEY = your_private_ssh_key_content
```

#### **GitLab Built-in Variables (automatically available):**
- `CI_REGISTRY` - GitLab Container Registry URL
- `CI_REGISTRY_USER` - GitLab registry username
- `CI_REGISTRY_PASSWORD` - GitLab registry password

## 📋 **Setting Up GitLab CI Variables**

### **1. Access GitLab Project Settings**
1. Go to your GitLab project
2. Navigate to **Settings** → **CI/CD**
3. Expand **Variables** section

### **2. Add Required Variables**

#### **VITE_GOOGLE_MAPS_API_KEY**
- **Key**: `VITE_GOOGLE_MAPS_API_KEY`
- **Value**: Your Google Maps API key
- **Type**: Variable
- **Environment scope**: All
- **Protect variable**: ✅ (recommended)
- **Mask variable**: ✅ (recommended)

#### **VITE_API_BASE_URL**
- **Key**: `VITE_API_BASE_URL`
- **Value**: `https://api.hcab.tech/api/v1`
- **Type**: Variable
- **Environment scope**: All
- **Protect variable**: ✅
- **Mask variable**: ❌

#### **VITE_DEMO_MODE**
- **Key**: `VITE_DEMO_MODE`
- **Value**: `false`
- **Type**: Variable
- **Environment scope**: All
- **Protect variable**: ✅
- **Mask variable**: ❌

#### **IP_ADDRESS**
- **Key**: `IP_ADDRESS`
- **Value**: Your server's IP address
- **Type**: Variable
- **Environment scope**: All
- **Protect variable**: ✅
- **Mask variable**: ❌

#### **SSH_KEY**
- **Key**: `SSH_KEY`
- **Value**: Your private SSH key content (entire key including headers)
- **Type**: Variable
- **Environment scope**: All
- **Protect variable**: ✅
- **Mask variable**: ❌

## 🔒 **Security Best Practices**

### **1. Variable Protection**
- ✅ **Protect variables** that contain sensitive information
- ✅ **Mask variables** for API keys and secrets
- ❌ **Don't mask** variables that contain special characters or are too long

### **2. SSH Key Setup**
```bash
# Generate SSH key pair (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "gitlab-ci@yourdomain.com"

# Copy public key to your server
ssh-copy-id -i ~/.ssh/id_rsa.pub ubuntu@your_server_ip

# Copy private key content to GitLab CI variable
cat ~/.ssh/id_rsa
```

### **3. Google Maps API Key Security**
- Restrict your API key to your production domain
- Enable only required APIs (Maps JavaScript API)
- Set up usage quotas and alerts

## 🚀 **Deployment Process**

### **Automatic Deployment**
When you push to the `main` branch:

1. **Build Stage**:
   - Builds Docker image with environment variables
   - Pushes image to GitLab Container Registry
   - Tags with version (YY.MM.DD.HH format)

2. **Deploy Stage**:
   - Connects to your server via SSH
   - Copies deployment files
   - Creates environment file on server
   - Deploys using Docker Compose
   - Starts the application

### **Manual Deployment**
You can also trigger deployment manually:
1. Go to **CI/CD** → **Pipelines**
2. Click **Run pipeline**
3. Select branch and run

## 🔍 **Monitoring Deployment**

### **1. GitLab CI Pipeline**
- Check pipeline status in **CI/CD** → **Pipelines**
- View logs for each job
- Monitor build and deployment progress

### **2. Server Monitoring**
```bash
# SSH into your server
ssh ubuntu@your_server_ip

# Check container status
docker ps

# View application logs
docker logs hcab-admin

# Check Docker Compose status
cd /home/ubuntu/admin-deployment
docker-compose ps
```

### **3. Application Health**
- **Direct access**: `http://your_server_ip:3200`
- **Health check**: Built-in health checks every 30 seconds
- **Logs**: Available via `docker logs hcab-admin`

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **1. Build Fails - Missing Environment Variables**
```
Error: VITE_GOOGLE_MAPS_API_KEY is not set
```
**Solution**: Add the variable in GitLab CI/CD settings

#### **2. Deployment Fails - SSH Connection**
```
Error: Permission denied (publickey)
```
**Solution**: 
- Check SSH key is correctly set in GitLab variables
- Verify public key is on the server
- Test SSH connection manually

#### **3. Docker Compose Not Found**
```
Error: docker-compose: command not found
```
**Solution**: 
- The GitLab CI now automatically installs Docker Compose on your server
- If you want to install it manually, run the server setup script:
  ```bash
  # Copy server-setup.sh to your server and run:
  chmod +x server-setup.sh
  ./server-setup.sh
  ```

#### **4. Application Not Accessible**
```
Error: Connection refused on port 3200
```
**Solution**:
- Check if container is running: `docker ps`
- Check container logs: `docker logs hcab-admin`
- Verify firewall settings

#### **5. Map Not Loading**
```
Error: Google Maps API key required
```
**Solution**:
- Verify `VITE_GOOGLE_MAPS_API_KEY` is set correctly
- Check API key restrictions in Google Cloud Console
- Verify API key has proper permissions

### **Debug Commands**
```bash
# Check environment variables on server
ssh ubuntu@your_server_ip "cd /home/ubuntu/admin-deployment && cat .env"

# Check container environment
ssh ubuntu@your_server_ip "docker exec hcab-admin env | grep VITE"

# View deployment logs
ssh ubuntu@your_server_ip "cd /home/ubuntu/admin-deployment && docker-compose logs"
```

## 📊 **Deployment Status**

### **Success Indicators**
- ✅ Pipeline shows green checkmarks
- ✅ Container is running: `docker ps` shows `hcab-admin`
- ✅ Application accessible at `http://your_server_ip:3200`
- ✅ Map loads without errors
- ✅ Health checks pass

### **Rollback Process**
If deployment fails:
```bash
# SSH into server
ssh ubuntu@your_server_ip

# Go to deployment directory
cd /home/ubuntu/admin-deployment

# Stop current deployment
docker-compose down

# Pull previous version (if available)
# Update VERSION in .env file to previous version
docker-compose up -d
```

## 🎯 **Next Steps**

1. **Set up GitLab CI variables** with your actual values
2. **Configure SSH access** to your server
3. **Push to main branch** to trigger deployment
4. **Monitor the pipeline** for successful deployment
5. **Test your application** at `http://your_server_ip:3200`
6. **Verify map functionality** with your Google Maps API key

Your H-Cab Admin Dashboard will now deploy automatically via GitLab CI! 🚀
