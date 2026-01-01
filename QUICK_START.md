# ⚡ Quick Start - Host Your Website in 30 Minutes

## 🎯 What You Need to Do (In Order)

### 1️⃣ Install dotenv (1 minute)
```bash
cd backend
npm install dotenv
cd ..
```

### 2️⃣ Push Code to GitHub (2 minutes)
```bash
git checkout --ours package.json package-lock.json
git add .
git commit -m "Add environment variables for hosting"
git push origin main
```

### 3️⃣ Host Database on Railway (5 minutes)
1. Go to https://railway.app → Sign up with GitHub
2. New Project → Add MySQL Database
3. Copy these values from Variables tab:
   - MYSQLHOST → DB_HOST
   - MYSQLUSER → DB_USER  
   - MYSQLPASSWORD → DB_PASSWORD
   - MYSQLDATABASE → DB_NAME
   - MYSQLPORT → DB_PORT

### 4️⃣ Host Backend on Railway (10 minutes)
1. In Railway → New → GitHub Repo → Select your repo
2. Settings → Root Directory: `backend`
3. Variables tab → Add:
   ```
   DB_HOST=<from step 3>
   DB_USER=<from step 3>
   DB_PASSWORD=<from step 3>
   DB_NAME=<from step 3>
   DB_PORT=3306
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://leen134.github.io
   ```
4. Settings → Generate Domain → Copy URL

### 5️⃣ Create Database Tables (5 minutes)
- Use Railway MySQL Data tab OR
- Use MySQL Workbench with credentials from step 3
- Run your `testdb.sql` file

### 6️⃣ Host Frontend on GitHub Pages (5 minutes)
```bash
cd frontend
# Create .env file with your backend URL
echo REACT_APP_API_URL=https://your-backend-url.railway.app > .env
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### 7️⃣ Test (2 minutes)
- Visit: https://leen134.github.io/Pet-Adoption-web
- Try signup and login

## ✅ Done! Your website is live!

**See `STEP_BY_STEP_HOSTING.md` for detailed instructions.**

