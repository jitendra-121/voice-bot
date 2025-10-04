# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Voice Chatbot to Vercel.

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free tier available)
- [ ] OpenAI API key
- [ ] Voice Chatbot repository pushed to GitHub

## Step 1: Prepare Repository

### 1.1 Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "chore: initial commit"

# Add GitHub remote and push
git remote add origin https://github.com/yourusername/voice-chatbot.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Repository Structure
Ensure your repository contains:
```
voice-chatbot/
├── pages/
│   ├── index.js
│   └── api/
│       └── chat.js
├── public/
│   └── favicon.ico
├── package.json
├── next.config.js
├── .env.example
├── .gitignore
└── README.md
```

## Step 2: Connect to Vercel

### 2.1 Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 2.2 Import Repository
1. From Vercel dashboard, click "New Project"
2. Find your `voice-chatbot` repository
3. Click "Import"
4. Leave default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

## Step 3: Configure Environment Variables

### 3.1 Add Required Variables
In the "Environment Variables" section during import (or later in project settings):

1. **OPENAI_API_KEY** (Required)
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (your OpenAI API key)
   - Environment: Production, Preview, Development

2. **OPENAI_MODEL** (Optional)
   - Name: `OPENAI_MODEL`
   - Value: `gpt-4o-mini` (or your preferred model)
   - Environment: Production, Preview, Development

### 3.2 Security Best Practices
- ✅ Never commit API keys to repository
- ✅ Use Vercel's environment variable system
- ✅ Different keys for development/production if needed
- ✅ Regularly rotate API keys
- ❌ Don't expose keys in frontend code

## Step 4: Deploy

### 4.1 Initial Deployment
1. Click "Deploy" after configuring environment variables
2. Wait for build to complete (usually 1-3 minutes)
3. Vercel will provide a deployment URL like `https://voice-chatbot-xyz.vercel.app`

### 4.2 Verify Deployment
1. Click on the deployment URL
2. Test basic functionality:
   - Page loads without errors
   - Text input works
   - Voice features work (if using Chrome/Edge)
   - API responses are received

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. Go to Project Settings → Domains
2. Add your domain (e.g., `chatbot.yourdomain.com`)
3. Configure DNS according to Vercel's instructions
4. Wait for SSL certificate provisioning

### 5.2 Domain Configuration
- **CNAME**: Point to `cname.vercel-dns.com`
- **A Record**: Point to Vercel's IP addresses
- SSL certificates are automatic with Vercel

## Step 6: Environment-Specific Configuration

### 6.1 Development Environment
For testing deployments:
- Use Preview deployments for pull requests
- Set up development-specific API keys if needed
- Test features in staging environment

### 6.2 Production Environment
- Use production OpenAI API key
- Enable all security features
- Monitor usage and costs
- Set up monitoring/analytics if needed

## Step 7: Continuous Deployment

### 7.1 Automatic Deployments
Vercel automatically deploys when you push to:
- **main/master branch** → Production deployment
- **Other branches/PRs** → Preview deployments

### 7.2 Deploy Hooks
For manual deployments or CI/CD integration:
1. Go to Project Settings → Git
2. Create Deploy Hook
3. Use webhook URL for external triggers

## Step 8: Monitoring and Maintenance

### 8.1 Monitor Functions
- Check Function logs in Vercel dashboard
- Monitor API usage on OpenAI dashboard
- Watch for rate limits or errors

### 8.2 Performance Optimization
- Enable Edge Caching if applicable
- Monitor Core Web Vitals
- Optimize bundle size if needed

### 8.3 Security Monitoring
- Regularly check for exposed secrets
- Monitor API usage patterns
- Update dependencies regularly

## Troubleshooting Common Issues

### Build Failures
- **ESLint errors**: Fix code issues or adjust rules
- **TypeScript errors**: Ensure types are correct
- **Missing dependencies**: Check package.json

### Runtime Errors
- **API 500 errors**: Check environment variables are set
- **CORS issues**: Shouldn't occur with Vercel (co-located)
- **Function timeouts**: Monitor function execution time

### Environment Variable Issues
- **Variables not updating**: Redeploy after changing env vars
- **Wrong environment**: Check variable is set for correct env
- **Quotes in values**: Don't wrap values in quotes in Vercel

### OpenAI API Issues
- **Rate limits**: Monitor usage on OpenAI dashboard
- **Invalid key**: Verify key is correct and active
- **Model not found**: Check model name is correct

## Cost Considerations

### Vercel Costs
- **Hobby Plan**: Free tier includes:
  - 100GB bandwidth
  - 100GB-hours function execution
  - Unlimited deployments
- **Pro Plan**: $20/month with increased limits

### OpenAI Costs
- **gpt-4o-mini**: ~$0.00015 per 1K input tokens
- **gpt-4**: Higher cost but better quality
- Monitor usage to avoid unexpected bills

## Security Checklist

Before deploying to production:
- [ ] No API keys in repository
- [ ] Environment variables properly set
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Input validation in API routes
- [ ] Rate limiting considered (if high traffic expected)
- [ ] Error messages don't expose sensitive information

## Post-Deployment Testing

After successful deployment:
1. Test all voice features on different browsers
2. Verify API responses are working
3. Check mobile compatibility
4. Test error scenarios (network issues, etc.)
5. Validate security (no exposed secrets)

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **OpenAI API Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**🎉 Congratulations!** Your Voice Chatbot should now be live and accessible worldwide through your Vercel deployment URL.