# Hosting Your Pet Adoption Web Application

## Current Status ✅

Your Git repository is set up correctly:
- ✅ Repository: `https://github.com/leen134/Pet-Adoption-web`
- ✅ Remote connected
- ⚠️ Need to resolve merge conflicts before pushing

## Step 1: Resolve Merge Conflicts

You have conflicts in `package.json` and `package-lock.json`. Here's how to fix:

### Option A: Keep Your Local Versions (Recommended)
```bash
git checkout --ours package.json
git checkout --ours package-lock.json
git add package.json package-lock.json
git commit -m "Resolve merge conflicts: keep local package files"
git push origin main
```

### Option B: Use Remote Versions
```bash
git checkout --theirs package.json
git checkout --theirs package-lock.json
git add package.json package-lock.json
git commit -m "Resolve merge conflicts: use remote package files"
npm install  # Reinstall dependencies
git push origin main
```

## Step 2: Hosting Options

Since you have a **full-stack application** (React frontend + Node.js backend), you need separate hosting:

### Option 1: GitHub Pages (Frontend Only - Free)

**Pros:** Free, easy setup  
**Cons:** Only hosts static files (frontend only), backend needs separate hosting

**Steps:**
1. Build your React app:
   ```bash
   cd frontend
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `frontend/package.json`:
   ```json
   "homepage": "https://leen134.github.io/Pet-Adoption-web",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

**Note:** Your backend API calls will need to point to a hosted backend (see Option 2).

### Option 2: Vercel (Frontend + Backend - Free Tier)

**Pros:** Free, easy deployment, supports both frontend and backend  
**Cons:** Backend has limitations on free tier

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Vercel will auto-detect React and Node.js
5. Configure:
   - **Frontend:** Root directory: `frontend`
   - **Backend:** Create separate project, root directory: `backend`

### Option 3: Netlify (Frontend) + Railway/Render (Backend)

**Frontend on Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`

**Backend on Railway or Render:**
- **Railway:** [railway.app](https://railway.app) - Easy Node.js hosting
- **Render:** [render.com](https://render.com) - Free tier available

### Option 4: Heroku (Full Stack - Paid/Free Tier Limited)

1. Install Heroku CLI
2. Create two apps (frontend + backend)
3. Deploy separately

## Step 3: Update API URLs for Production

After hosting, update your API URLs:

**In `frontend/src/pages/SignupPage.js`:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/users";
```

**In `frontend/src/pages/LoginPage.js`:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/login";
```

Create `.env` file in frontend:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Recommended Approach for Beginners

1. **Frontend:** GitHub Pages (free, easy)
2. **Backend:** Railway or Render (free tier available)
3. Update frontend API URLs to point to hosted backend

## Quick Start Commands

```bash
# 1. Resolve conflicts and push
git checkout --ours package.json package-lock.json
git add .
git commit -m "Resolve conflicts and push to GitHub"
git push origin main

# 2. Build frontend
cd frontend
npm run build

# 3. Deploy to GitHub Pages (if using Option 1)
npm install --save-dev gh-pages
# Then add scripts to package.json and run:
npm run deploy
```

## Need Help?

- Check your repository: https://github.com/leen134/Pet-Adoption-web
- Make sure your backend is running before testing frontend
- Update CORS settings in backend if hosting separately

