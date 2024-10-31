#!/bin/bash

# Create required folders for Vercel setup
echo "Setting up project structure for Vercel..."

# 1. Move server files into an 'api' directory
mkdir -p api
mv server.js api/index.js
echo "Moved server.js to api/index.js for Vercel API functions."

# 2. Check if the frontend directory exists and is configured for Next.js or React
if [ -d "frontend" ]; then
    echo "Frontend directory found."

    # Check for Next.js setup
    if [ -f "frontend/next.config.js" ]; then
        echo "Detected Next.js in frontend. Configuring for Vercel..."
        # Update frontend package.json for Vercel Next.js
        sed -i '' 's/"start": "react-scripts start"/"vercel-build": "next build"/' frontend/package.json
        sed -i '' 's/"client": "npm start --prefix frontend"/"build": "npm run build --prefix frontend"/' package.json
    else
        # Standard React setup
        echo "Standard React detected in frontend. Configuring static build..."
        sed -i '' 's/"client": "npm start --prefix frontend"/"build": "npm run build --prefix frontend"/' package.json
    fi
else
    echo "Error: frontend directory not found. Ensure the React app is in 'frontend'."
    exit 1
fi

# 3. Install necessary dependencies
echo "Installing dependencies..."
npm install
npm install --prefix frontend

# 4. Configure vercel.json for API routes and frontend
echo "Creating vercel.json configuration..."
cat <<EOL > vercel.json
{
  "functions": {
    "api/*.js": {
      "runtime": "vercel/node"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/frontend/$1" }
  ]
}
EOL

echo "Setup complete. You can now deploy to Vercel!"