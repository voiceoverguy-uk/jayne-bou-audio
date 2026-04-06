#!/usr/bin/env bash
set -euo pipefail

echo "=== Jayne Bou Audio — Vercel Build ==="

# 1. Build the frontend
echo "[1/4] Building frontend..."
pnpm --filter @workspace/jayne-bou-audio run build

# 2. Set up Vercel Build Output API structure
echo "[2/4] Creating .vercel/output structure..."
rm -rf .vercel/output
mkdir -p .vercel/output/static
mkdir -p ".vercel/output/functions/api/index.func"

# 3. Copy frontend static files
echo "[3/4] Copying static files..."
cp -r artifacts/jayne-bou-audio/dist/public/. .vercel/output/static/

# 4. Copy API function
echo "[4/4] Setting up serverless function..."
cp api/index.js ".vercel/output/functions/api/index.func/index.js"

cat > ".vercel/output/functions/api/index.func/.vc-config.json" << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.js",
  "launcherType": "Nodejs",
  "shouldAddHelpers": true
}
EOF

# 5. Write routing config
cat > .vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF

echo "=== Build complete ==="
echo "Static files: $(find .vercel/output/static -type f | wc -l) files"
echo "Function:     .vercel/output/functions/api/index.func/index.js"
