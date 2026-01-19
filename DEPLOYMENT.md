# World Tree — Codex 365
## Deployment Guide

This guide will help you deploy World Tree to Vercel with all features configured.

---

## Quick Deploy to Vercel

### 1. Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository with your code
- Node.js 18+ installed locally

### 2. One-Click Deploy

Click the button below to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sathvik2005/World-Tree-journal-Codex-365)

---

## Manual Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Directory
```bash
cd mythical-world-tree
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name:** world-tree-codex-365
- **Directory:** `./`
- **Override settings?** No

### 4. Configure Environment Variables

Go to your Vercel project dashboard → Settings → Environment Variables

Add these variables (get values from your service providers):

**AI Features:**
- `VITE_AI_API_ENDPOINT` - Your AI API endpoint
- `VITE_AI_API_KEY` - Your AI API key

**Cloud Sync (Firebase):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**Cloud Sync (Supabase):**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`

**Collaboration:**
- `VITE_WS_URL` - WebSocket server URL

### 5. Deploy Production Build
```bash
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

---

## Custom Domain Setup

### 1. Add Domain in Vercel
- Go to Project Settings → Domains
- Add your custom domain (e.g., `worldtree-codex.com`)

### 2. Update DNS Records
Point your domain to Vercel:
- **Type:** CNAME
- **Name:** `@` or `www`
- **Value:** `cname.vercel-dns.com`

### 3. Enable HTTPS
Vercel automatically provisions SSL certificates.

---

## Environment Configuration

### Development
Create `.env.local` in project root:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Production
Set environment variables in Vercel dashboard.

---

## Build Configuration

The project uses Vite for building. Configuration is in:
- `vite.config.js` - Vite settings
- `vercel.json` - Vercel deployment settings
- `package.json` - Build scripts

### Build Command
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

---

## Optimization Tips

### 1. Enable Edge Caching
All static assets are cached by default with `vercel.json` config.

### 2. Optimize Images
Use WebP format for images. Add to `vite.config.js`:
```js
build: {
  rollupOptions: {
    output: {
      assetFileNames: 'assets/[name]-[hash][extname]'
    }
  }
}
```

### 3. Code Splitting
Vite automatically code-splits. Verify with:
```bash
npm run build -- --report
```

### 4. Enable Analytics
Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

In `main.jsx`:
```js
import { inject } from '@vercel/analytics';
inject();
```

---

## Monitoring & Debugging

### View Logs
```bash
vercel logs [deployment-url]
```

### Vercel Dashboard
Monitor at: [vercel.com/dashboard](https://vercel.com/dashboard)
- Real-time logs
- Deployment history
- Performance metrics
- Error tracking

---

## Rollback Deployment

### Via CLI
```bash
vercel rollback [deployment-url]
```

### Via Dashboard
Go to Deployments → Select previous version → Promote to Production

---

## CI/CD with GitHub

### Automatic Deployments
Vercel auto-deploys on:
- Push to `main` branch → Production
- Pull requests → Preview deployments

### Disable Auto-Deploy
Project Settings → Git → Disable "Production Branch"

---

## Troubleshooting

### Build Fails
1. Check Node version: `node --version` (should be 18+)
2. Clear cache: `rm -rf node_modules .vercel && npm install`
3. Check build logs in Vercel dashboard

### Environment Variables Not Working
1. Prefix all variables with `VITE_`
2. Redeploy after adding variables
3. Variables must be set in Vercel dashboard

### Routes Not Working (404)
1. Verify `vercel.json` has correct rewrites
2. Check `vite.config.js` has `base: '/'`

### Performance Issues
1. Enable Vercel Analytics
2. Check Lighthouse scores
3. Optimize images and assets

---

## Cost Estimation

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100GB bandwidth
- ✅ Automatic HTTPS
- ✅ Preview deployments

### Pro Tier ($20/month)
- More bandwidth
- Team collaboration
- Password protection
- Advanced analytics

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Support](https://vercel.com/support)

---

## Post-Deployment Checklist

- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Analytics installed
- [ ] Error monitoring active
- [ ] Preview deployments working
- [ ] Social media cards updated
- [ ] README updated with live URL

---

🎉 **Your World Tree — Codex 365 is now live!**
