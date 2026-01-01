# 🚀 Complete Step-by-Step Hosting Guide

## 📋 Prerequisites Checklist
- [ ] GitHub account (you have: leen134)
- [ ] Repository created (you have: Pet-Adoption-web)
- [ ] Code pushed to GitHub
- [ ] Terminal/Command Prompt ready

---

## PART 1: Prepare Your Code ✅

### Step 1.1: Install Missing Dependencies

**In your terminal, run:**
```bash
cd backend
npm install dotenv
cd ..
```

### Step 1.2: Resolve Git Conflicts and Push

```bash
git checkout --ours package.json package-lock.json
git add .
git commit -m "Prepare for hosting: add environment variables support"
git push origin main
```

**✅ Expected:** Code pushed successfully to GitHub

---

## PART 2: Host Your Database (MySQL) 🗄️

### Option A: Railway (Recommended - Free Tier)

1. **Go to:** https://railway.app
2. **Click:** "Start a New Project"
3. **Sign up** with your GitHub account
4. **Click:** "New" → "Database" → "Add MySQL"
5. **Wait** for database to be created (30-60 seconds)
6. **Click** on the MySQL service
7. **Go to** "Variables" tab
8. **Copy these values** (you'll need them later):
   - `MYSQLHOST` → This is your `DB_HOST`
   - `MYSQLUSER` → This is your `DB_USER`
   - `MYSQLPASSWORD` → This is your `DB_PASSWORD`
   - `MYSQLDATABASE` → This is your `DB_NAME`
   - `MYSQLPORT` → This is your `DB_PORT` (usually 3306)

9. **Click** "Connect" tab to get connection string if needed

**📝 Save these credentials - you'll need them in Step 3!**

### Option B: PlanetScale (Alternative)

1. Go to https://planetscale.com
2. Sign up with GitHub
3. Create new database
4. Get connection credentials

---

## PART 3: Host Your Backend API 🔧

### Using Railway (Recommended)

1. **In Railway dashboard**, click "New" → "GitHub Repo"
2. **Select** your repository: `leen134/Pet-Adoption-web`
3. **After deployment starts**, click on the service
4. **Go to** "Settings" tab
5. **Set Root Directory:** `backend`
6. **Go to** "Variables" tab
7. **Add these environment variables:**

```
DB_HOST=<value from Step 2>
DB_USER=<value from Step 2>
DB_PASSWORD=<value from Step 2>
DB_NAME=<value from Step 2>
DB_PORT=<value from Step 2>
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://leen134.github.io
```

8. **Go to** "Settings" → "Generate Domain"
9. **Copy the URL** (e.g., `https://pet-adoption-web-production.up.railway.app`)
10. **Wait** for deployment to complete (2-5 minutes)

**📝 Save your backend URL - you'll need it in Step 4!**

### Using Render (Alternative)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repository: `leen134/Pet-Adoption-web`
5. Configure:
   - **Name:** pet-adoption-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add same environment variables as Railway
7. Click "Create Web Service"
8. Copy the URL

---

## PART 4: Set Up Your Database Tables 📊

### Step 4.1: Access Your Database

You need to run your SQL script to create tables. Options:

**Option A: Using Railway MySQL**
1. In Railway, click on your MySQL service
2. Go to "Data" tab
3. Use the web SQL editor, OR
4. Use MySQL Workbench or command line with connection details

**Option B: Using MySQL Workbench**
1. Download MySQL Workbench
2. Connect using credentials from Step 2
3. Run your `testdb.sql` file

**Option C: Using Command Line**
```bash
mysql -h <DB_HOST> -u <DB_USER> -p<DB_PASSWORD> <DB_NAME> < testdb.sql
```

### Step 4.2: Verify Tables Created

Make sure these tables exist:
- `users`
- `medical` (if your SQL creates it)
- Any other tables from your SQL file

---

## PART 5: Host Your Frontend 🌐

### Using GitHub Pages (Already Configured!)

1. **Open terminal** in your project root
2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Create `.env` file** in frontend folder:
   ```bash
   # Create .env file
   echo REACT_APP_API_URL=https://your-backend-url.railway.app > .env
   ```
   **Replace** `https://your-backend-url.railway.app` with your actual backend URL from Step 3!

4. **Install gh-pages** (if not already):
   ```bash
   npm install --save-dev gh-pages
   ```

5. **Build your app:**
   ```bash
   npm run build
   ```

6. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

7. **Wait** for deployment (1-2 minutes)

8. **Your site will be live at:**
   ```
   https://leen134.github.io/Pet-Adoption-web
   ```

### Enable GitHub Pages (If Not Already Enabled)

1. Go to: https://github.com/leen134/Pet-Adoption-web/settings/pages
2. **Source:** Select "gh-pages" branch
3. **Folder:** Select "/ (root)"
4. Click "Save"

---

## PART 6: Test Your Website ✅

### Step 6.1: Test Frontend
1. Visit: https://leen134.github.io/Pet-Adoption-web
2. Check if page loads correctly

### Step 6.2: Test Signup
1. Click "Sign Up"
2. Fill in the form
3. Submit
4. Check if it redirects to home page
5. Check your database to see if user was created

### Step 6.3: Test Login
1. Click "Login"
2. Use credentials from signup
3. Check if login works
4. Check if it redirects to home page

### Step 6.4: Check Browser Console
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for any errors
4. Go to "Network" tab
5. Check if API calls are successful

---

## PART 7: Troubleshooting 🔧

### Problem: CORS Errors
**Solution:** Make sure `FRONTEND_URL` in backend environment variables is set to:
```
https://leen134.github.io
```

### Problem: Database Connection Failed
**Solution:** 
- Verify all database environment variables are correct
- Check database is accessible from Railway/Render
- Verify database tables are created

### Problem: API Returns 404
**Solution:**
- Check backend URL is correct in frontend `.env` file
- Verify backend is deployed and running
- Check backend logs in Railway/Render dashboard

### Problem: Frontend Shows Blank Page
**Solution:**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly
- Rebuild and redeploy: `npm run build && npm run deploy`

### Problem: GitHub Pages Not Updating
**Solution:**
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check GitHub Actions tab for deployment status

---

## 📝 Quick Reference: All Your URLs

After completing all steps, you should have:

- **Frontend:** https://leen134.github.io/Pet-Adoption-web
- **Backend:** https://your-backend.railway.app (or .render.com)
- **Database:** (hosted on Railway/PlanetScale)
- **GitHub Repo:** https://github.com/leen134/Pet-Adoption-web

---

## 🎉 Success Checklist

- [ ] Database hosted and accessible
- [ ] Backend API deployed and running
- [ ] Frontend deployed to GitHub Pages
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] Signup functionality works
- [ ] Login functionality works
- [ ] No CORS errors
- [ ] Website accessible publicly

---

## 💡 Pro Tips

1. **Keep credentials safe:** Never commit `.env` files to GitHub
2. **Monitor logs:** Check Railway/Render logs if something breaks
3. **Test locally first:** Always test changes locally before deploying
4. **Backup database:** Export your database regularly
5. **Use environment variables:** Never hardcode sensitive data

---

## 🆘 Need Help?

- Check Railway/Render logs for backend errors
- Check browser console for frontend errors
- Verify all environment variables are set
- Make sure database tables exist
- Test API endpoints directly using Postman or curl

---

**Good luck with your deployment! 🚀**

