# #!/bin/bash

# # H-Cab Admin Dashboard Server Setup Script
# # This script sets up the server with all required dependencies

# set -e  # Exit on any error

# # Colors for output
# RED='\033[0;31m'
# GREEN='\033[0;32m'
# YELLOW='\033[1;33m'
# BLUE='\033[0;34m'
# NC='\033[0m' # No Color

# print_status() {
#     echo -e "${BLUE}[INFO]${NC} $1"
# }

# print_success() {
#     echo -e "${GREEN}[SUCCESS]${NC} $1"
# }

# print_warning() {
#     echo -e "${YELLOW}[WARNING]${NC} $1"
# }

# print_error() {
#     echo -e "${RED}[ERROR]${NC} $1"
# }

# # Function to check if command exists
# command_exists() {
#     command -v "$1" >/dev/null 2>&1
# }

# print_status "Setting up H-Cab Admin Dashboard server..."

# # Update system packages
# print_status "Updating system packages..."
# sudo apt update && sudo apt upgrade -y

# # Install Docker if not present
# if ! command_exists docker; then
#     print_status "Installing Docker..."
    
#     # Remove old Docker versions
#     sudo apt remove -y docker docker-engine docker.io containerd runc || true
    
#     # Install prerequisites
#     sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
#     # Add Docker's official GPG key
#     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
#     # Add Docker repository
#     echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
#     # Install Docker
#     sudo apt update
#     sudo apt install -y docker-ce docker-ce-cli containerd.io
    
#     # Add current user to docker group
#     sudo usermod -aG docker $USER
    
#     print_success "Docker installed successfully"
# else
#     print_success "Docker is already installed"
# fi

# # Install Docker Compose if not present
# if ! command_exists docker-compose; then
#     print_status "Installing Docker Compose..."
    
#     # Get latest version
#     COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    
#     # Download and install
#     sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#     sudo chmod +x /usr/local/bin/docker-compose
    
#     print_success "Docker Compose installed successfully"
# else
#     print_success "Docker Compose is already installed"
# fi

# # Install additional utilities
# print_status "Installing additional utilities..."
# sudo apt install -y curl wget git htop

# # Create deployment directory
# print_status "Creating deployment directory..."
# sudo mkdir -p /home/ubuntu/admin-deployment
# sudo chown ubuntu:ubuntu /home/ubuntu/admin-deployment

# # Configure firewall (if ufw is available)
# if command_exists ufw; then
#     print_status "Configuring firewall..."
#     sudo ufw allow 22/tcp   # SSH
#     sudo ufw allow 80/tcp   # HTTP
#     sudo ufw allow 443/tcp  # HTTPS
#     sudo ufw allow 3200/tcp # Application
#     sudo ufw --force enable
#     print_success "Firewall configured"
# fi

# # Start and enable Docker service
# print_status "Starting Docker service..."
# sudo systemctl start docker
# sudo systemctl enable docker

# # Verify installations
# print_status "Verifying installations..."

# if command_exists docker; then
#     docker_version=$(docker --version)
#     print_success "Docker: $docker_version"
# else
#     print_error "Docker installation failed"
#     exit 1
# fi

# if command_exists docker-compose; then
#     compose_version=$(docker-compose --version)
#     print_success "Docker Compose: $compose_version"
# else
#     print_error "Docker Compose installation failed"
#     exit 1
# fi

# # Test Docker without sudo
# print_status "Testing Docker without sudo..."
# if docker ps >/dev/null 2>&1; then
#     print_success "Docker is working correctly"
# else
#     print_warning "Docker requires sudo or user needs to be added to docker group"
#     print_warning "Run: sudo usermod -aG docker $USER && newgrp docker"
# fi

# print_success "Server setup completed successfully!"
# print_status "Your server is now ready for H-Cab Admin Dashboard deployment"
# print_status "You can now run your GitLab CI pipeline to deploy the application"
