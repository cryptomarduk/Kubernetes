# Kubernetes

# Basic Kubernetes Application

This project demonstrates a simple web application deployed on Kubernetes, showcasing fundamental Kubernetes concepts. It's ideal for learning about Deployment, Service, ConfigMap, Secret, and Ingress resources.

![Architecture Diagram](./docs/architecture.png)

## Project Contents

This project includes the following Kubernetes concepts:

- **Deployment**: Running and managing the application
- **Service**: Providing access to pods and load balancing
- **ConfigMap**: Storing configuration data
- **Secret**: Securely storing sensitive information
- **Ingress**: Exposing the application to the outside world

## Prerequisites

- Docker installed and running
- kubectl installed and connected to a Kubernetes cluster
- Ingress controller installed on your Kubernetes cluster

## Setup Steps

### 1. Build and Push Docker Image

```bash
# Navigate to the app directory
cd app

# Build Docker image
docker build -t <your-dockerhub-username>/k8s-demo-app:latest .

# Push to Docker Hub
docker push <your-dockerhub-username>/k8s-demo-app:latest
```

### 2. Deploy the Kubernetes Application

First, edit the deployment.yaml file to insert your Docker Hub username.

```bash
# Create ConfigMap
kubectl apply -f k8s/configmap.yaml

# Create Secret
kubectl apply -f k8s/secret.yaml

# Create Deployment
kubectl apply -f k8s/deployment.yaml

# Create Service
kubectl apply -f k8s/service.yaml

# Create Ingress (edit according to your DNS settings)
kubectl apply -f k8s/ingress.yaml
```

### 3. Testing the Application

```bash
# Check pod status
kubectl get pods -l app=demo-app

# Check the service
kubectl get svc demo-app-service

# Check the ingress
kubectl get ingress demo-app-ingress
```

You can view the application in your browser by navigating to `http://demo-app.example.com` (or by editing your hosts file).

## Updating ConfigMap and Secret

You can update the application's appearance by modifying the ConfigMap:

```bash
# Edit the ConfigMap
kubectl edit configmap demo-app-config

# Or update with new values
kubectl patch configmap demo-app-config --type=merge -p '{"data":{"APP_COLOR":"#ffe6e6"}}'

# Restart the pods
kubectl rollout restart deployment demo-app
```

## Troubleshooting

If pods fail to start or don't work properly:

```bash
# Check pod status
kubectl describe pod <pod-name>

# Check pod logs
kubectl logs <pod-name>
```

## Architecture Explanation

This application works as follows:

1. Kubernetes Deployment runs the specified number of replicas
2. ConfigMap and Secret provide application configuration and sensitive data
3. Service provides access to pods and distributes traffic
4. Ingress exposes the application to the outside world

## Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
