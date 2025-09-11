#!/bin/bash

# H-Cab Admin Dashboard Deployment Script
# This script automates the Docker Compose deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command_exists docker-compose; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    if [ ! -f .env ]; then
        if [ -f env.template ]; then
            print_status "Creating .env file from template..."
            cp env.template .env
            print_warning "Please edit .env file with your actual values before continuing"
            print_warning "Required: VITE_GOOGLE_MAPS_API_KEY"
            read -p "Press Enter after you've updated the .env file..."
        else
            print_error "No .env file or env.template found. Please create .env file manually."
            exit 1
        fi
    fi
    
    # Check if required variables are set
    if ! grep -q "VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here" .env; then
        print_success "Environment file looks good"
    else
        print_warning "Please update VITE_GOOGLE_MAPS_API_KEY in .env file"
        read -p "Press Enter after updating the API key..."
    fi
}

# Function to build and deploy
deploy() {
    print_status "Building and deploying application..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose down 2>/dev/null || true
    
    # Build and start
    print_status "Building Docker images..."
    docker-compose build --no-cache
    
    print_status "Starting services..."
    docker-compose up -d
    
    print_success "Deployment completed!"
}

# Function to check deployment status
check_status() {
    print_status "Checking deployment status..."
    
    # Wait a moment for services to start
    sleep 5
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        print_success "Services are running"
        
        # Check health
        print_status "Checking application health..."
        if curl -f http://localhost:3200 >/dev/null 2>&1; then
            print_success "Application is healthy and accessible at http://localhost:3200"
        else
            print_warning "Application may still be starting up. Check logs with: docker-compose logs -f"
        fi
    else
        print_error "Some services failed to start. Check logs with: docker-compose logs"
        exit 1
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    docker-compose logs -f hcab-admin
}

# Function to show help
show_help() {
    echo "H-Cab Admin Dashboard Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  deploy     Deploy the application (default)"
    echo "  status     Check deployment status"
    echo "  logs       Show application logs"
    echo "  stop       Stop all services"
    echo "  restart    Restart all services"
    echo "  update     Pull latest changes and redeploy"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 status"
    echo "  $0 logs"
}

# Function to stop services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "Services stopped"
}

# Function to restart services
restart_services() {
    print_status "Restarting services..."
    docker-compose restart
    print_success "Services restarted"
}

# Function to update and redeploy
update_deployment() {
    print_status "Updating deployment..."
    
    # Pull latest changes
    print_status "Pulling latest changes..."
    git pull
    
    # Rebuild and restart
    print_status "Rebuilding and restarting..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    
    print_success "Update completed!"
}

# Main script logic
main() {
    case "${1:-deploy}" in
        "deploy")
            check_prerequisites
            setup_environment
            deploy
            check_status
            ;;
        "status")
            check_status
            ;;
        "logs")
            show_logs
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            restart_services
            ;;
        "update")
            check_prerequisites
            update_deployment
            check_status
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
