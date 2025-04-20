FROM node:18-alpine

# Create working directory
WORKDIR /app

# Create package.json
RUN echo '{"name":"k8s-demo-app","version":"1.0.0","main":"server.js"}' > package.json

# Copy application files
COPY index.html /app/
COPY server.js /app/

# Expose port that will run inside container
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O- http://localhost:3000/health || exit 1

# Start application
CMD ["node", "server.js"]
