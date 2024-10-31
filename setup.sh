#!/bin/bash

echo "Setting up project for Vercel deployment on macOS..."

# Step 1: Remove Next.js and React DOM dependencies from package.json
echo "Updating dependencies in package.json..."
sed -i '' '/"next":/d' package.json
sed -i '' '/"react-dom":/d' package.json

# Step 2: Update build scripts in package.json
echo "Updating build scripts in package.json..."
sed -i '' 's/"start": "node server\/server.js",/"start": "node api\/index.js", "build": "npm run build --prefix frontend", "vercel-build": "npm run build",/' package.json

# Step 3: Move server.js to api/index.js
echo "Organizing server files..."
mkdir -p api
mv server.js api/index.js

# Step 4: Create a vercel.json configuration file
echo "Creating vercel.json for Vercel configuration..."
cat <<EOL > vercel.json
{
  "functions": {
    "api/*.js": {
      "runtime": "vercel/node"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/frontend/build/$1" }
  ]
}
EOL

echo "Setup complete."

# Step 5: Commit and push changes to GitHub
echo "Adding changes to Git..."
git add .
git commit -m "Restructured project for Vercel deployment"
git push origin master

echo "All changes have been pushed to GitHub! Vercel will start deployment shortly."