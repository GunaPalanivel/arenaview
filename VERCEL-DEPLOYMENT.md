# ArenaView - Vercel Deployment Guide

This guide explains how to deploy ArenaView to Vercel with proper frontend and backend separation.

## Architecture

- **Frontend**: React SPA deployed on Vercel (main domain)
- **Backend**: Node.js API deployed on Vercel Serverless Functions
- **Database**: PostgreSQL (managed separately, e.g., Supabase, AWS RDS, or DigitalOcean)

## Prerequisites

1. GitHub account with ArenaView repository
2. Vercel account (free tier available)
3. PostgreSQL database (cloud-hosted)
4. Environment variables configured

## Step 1: Prepare PostgreSQL Database

### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Get the **Connection String** from Settings → Database
4. Connection URL format: `postgresql://user:password@host:5432/dbname?sslmode=require`

### Option B: Other Providers

- **AWS RDS**: https://aws.amazon.com/rds/
- **DigitalOcean**: https://www.digitalocean.com/products/managed-databases-postgresql/
- **Railway**: https://railway.app/

## Step 2: Deploy Backend to Vercel

### 2.1 Create Vercel Backend Project

```bash
# Clone/push repo to GitHub if not already done
cd arenaview
git remote add origin https://github.com/YOUR_USERNAME/arenaview.git
git push -u origin main
```

### 2.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select the `arenaview` repository
5. **Configuration**:

   - Root Directory: `./backend`
   - Framework Preset: `Other`
   - Build Command: `npm run build && npx prisma generate`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

6. Click "Deploy"

### 2.3 Configure Backend Environment Variables

In Vercel Dashboard:

1. Go to your project settings → **Environment Variables**
2. Add the following:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

3. Re-deploy after adding variables

### 2.4 Run Prisma Migrations

After first deployment, run migrations on the database:

```bash
# Locally (with DATABASE_URL set)
npx prisma migrate deploy
npx prisma db seed
```

Or use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login and run commands in context
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Frontend Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select the same `arenaview` repository (same repo, different project)
4. **Configuration**:

   - Root Directory: `./frontend`
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Click "Deploy"

### 3.2 Configure Frontend Environment Variables

In Vercel Dashboard for frontend project:

1. Go to settings → **Environment Variables**
2. Add:

```
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

3. Re-deploy after adding variables

### 3.3 Configure Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions

## Step 4: Verify Deployment

### Test Backend

```bash
# Health check
curl https://your-backend-domain.vercel.app/health

# Login
curl -X POST https://your-backend-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'

# Get games (with token)
curl https://your-backend-domain.vercel.app/api/games?limit=5 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Frontend

1. Navigate to your frontend domain
2. Login with test credentials:
   - Email: `test@example.com`
   - Password: `Test1234`
3. Verify games load and filters work
4. Test favorites functionality

## Monitoring & Logs

### Backend Logs

```bash
# Using Vercel CLI
vercel logs --follow
```

### Frontend Logs

```bash
# Go to Vercel Dashboard → Deployments → select deployment → Logs
```

## Environment Variables Reference

### Backend (.env)

| Variable     | Example                        | Required                 |
| ------------ | ------------------------------ | ------------------------ |
| DATABASE_URL | postgresql://user:pass@host/db | Yes                      |
| JWT_SECRET   | min-32-char-secret-key         | Yes                      |
| FRONTEND_URL | https://yourdomain.com         | Yes                      |
| NODE_ENV     | production                     | Yes                      |
| PORT         | 3001                           | No (Vercel auto-assigns) |

### Frontend (.env)

| Variable     | Example                        | Required |
| ------------ | ------------------------------ | -------- |
| VITE_API_URL | https://api.yourdomain.com/api | Yes      |

## Troubleshooting

### Frontend Cannot Connect to Backend

- Check `VITE_API_URL` in frontend environment variables
- Verify backend CORS allows frontend origin:
  - Should allow `*.vercel.app` domains
  - Check `src/config/cors.ts` in backend

### Database Connection Fails

- Verify `DATABASE_URL` is correct with SSL mode: `?sslmode=require`
- Check database firewall allows Vercel IPs
- Test connection locally first:
  ```bash
  psql postgresql://user:pass@host/db
  ```

### Migrations Fail

- Ensure database exists before running migrations
- Check migrations folder has latest migration files
- Use `prisma migrate resolve` to fix migration issues

### 401 Unauthorized Errors

- Verify JWT_SECRET is same in backend deployment
- Check token expiry (default 7 days)
- Ensure cookies are sent with credentials for CORS

## Scaling Considerations

For production:

1. **Database**: Configure connection pooling

   - Supabase: Connection pooling enabled by default
   - AWS RDS: Use RDS Proxy

2. **Caching**: Add CDN cache for static assets

   - Vercel includes CDN by default
   - Set cache headers in responses

3. **Rate Limiting**: Adjust limits in backend

   - Current: 5 login attempts/15min, 30 favorites toggles/min
   - Edit in `src/config/rate-limit.ts`

4. **Monitoring**: Set up error tracking
   - Sentry integration (optional)
   - Log aggregation (Vercel provides basic logs)

## Rollback

To rollback to previous deployment:

1. Vercel Dashboard → Deployments
2. Select previous deployment
3. Click "Promote to Production"

## Cost Estimation

- **Vercel**: Free tier for frontend + backend serverless (generous limits)
- **Database**: $7-100+/month depending on provider
- **Total**: ~$7-20/month for small-medium traffic

## Monitoring Commands

```bash
# Check deployment status
vercel status

# Pull environment variables
vercel env pull

# Run build locally
npm run build

# Preview production build
npm run preview
```

## Further Optimization

- Enable gzip compression (automatic)
- Optimize images in GameCard
- Implement request caching headers
- Use service workers for offline support
- Set up analytics (Vercel Web Analytics)

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Vercel Guide](https://www.prisma.io/docs/orm/overview/deployments/deploy-to-vercel)
- [PostgreSQL Hosting](https://www.postgresql.org/support/versioning/)
