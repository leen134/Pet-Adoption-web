# Complete Step-by-Step Hosting Guide for Pet Adoption Website

## Overview
Your project has:
- **Frontend:** React app (port 3000)
- **Backend:** Node.js/Express API (port 3001)
- **Database:** MySQL (testdb)

You need to host all three components separately.

---

## STEP 1: Resolve Git Conflicts and Push to GitHub

### 1.1 Open Terminal in Project Root
Navigate to: `C:\Users\user\OneDrive\Desktop\Pet Adoption React Project`

### 1.2 Resolve Merge Conflicts
```bash
git checkout --ours package.json
git checkout --ours package-lock.json
git add package.json package-lock.json
git commit -m "Resolve merge conflicts"
```

### 1.3 Push to GitHub
```bash
git push origin main
```

**Expected Output:** Should see "Writing objects" and "To https://github.com/leen134/Pet-Adoption-web.git"

---

## STEP 2: Prepare Backend for Production

### 2.1 Create Environment Variables File

Create `backend/.env` file with:
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=testdb
PORT=3001
NODE_ENV=production
```

### 2.2 Update Backend to Use Environment Variables

We need to modify `backend/index.js` to read from environment variables instead of hardcoded values.

---

## STEP 3: Host Database (MySQL)

### Option A: Railway (Recommended - Free Tier Available)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Provision MySQL"
5. Wait for database to be created
6. Click on MySQL service → "Variables" tab
7. Copy these values:
   - `MYSQLHOST` (database host)
   - `MYSQLUSER` (database user)
   - `MYSQLPASSWORD` (database password)
   - `MYSQLDATABASE` (database name)
   - `MYSQLPORT` (port, usually 3306)

### Option B: PlanetScale (Free MySQL Alternative)

1. Go to [planetscale.com](https://planetscale.com)
2. Sign up with GitHub
3. Create a new database
4. Get connection credentials

### Option C: Free MySQL Hosting Services
- **Aiven** (free tier)
- **Clever Cloud** (free tier)

---

## STEP 4: Host Backend API

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository: `leen134/Pet-Adoption-web`
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** (leave empty or `npm install`)
   - **Start Command:** `npm start`
6. Go to "Variables" tab and add:
   ```
   DB_HOST=<from Step 3>
   DB_USER=<from Step 3>
   DB_PASSWORD=<from Step 3>
   DB_NAME=<from Step 3>
   PORT=3001
   NODE_ENV=production
   ```
7. Click "Deploy"
8. Wait for deployment
9. Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** pet-adoption-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add Environment Variables (same as Railway)
7. Click "Create Web Service"
8. Copy the URL (e.g., `https://pet-adoption-backend.onrender.com`)

---

## STEP 5: Update Backend Code for Production

We need to update `backend/index.js` to use environment variables.

---

## STEP 6: Host Frontend

### Option A: GitHub Pages (Already Configured!)

Your `frontend/package.json` already has GitHub Pages setup!

1. Install gh-pages (if not already):
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. Update frontend API URLs to use your hosted backend

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Option B: Vercel (Alternative)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import repository
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
6. Deploy

---

## STEP 7: Update Frontend to Use Production API

Update API URLs in frontend to point to your hosted backend.

---

## STEP 8: Test Everything

1. Visit your frontend URL
2. Try signing up
3. Try logging in
4. Check if data is saved in database

---

## Quick Reference: All URLs You'll Need

- **GitHub Repository:** https://github.com/leen134/Pet-Adoption-web
- **Frontend URL:** https://leen134.github.io/Pet-Adoption-web
- **Backend URL:** (from Railway/Render)
- **Database:** (from Railway/PlanetScale)

---

## Troubleshooting

### CORS Errors
- Make sure backend CORS allows your frontend URL
- Update `backend/index.js` CORS settings

### Database Connection Errors
- Verify environment variables are set correctly
- Check database is accessible from backend host
- Ensure database tables are created

### API Not Working
- Check backend URL is correct in frontend
- Verify backend is running and accessible
- Check browser console for errors

