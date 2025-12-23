# Grabcash Hosting Cost Analysis & Platform Recommendations

**Document Prepared For:** Grabcash Platform
**Date:** December 2024
**Purpose:** Evaluate hosting costs and recommend cost-effective solutions for scaling

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Tech Stack](#current-tech-stack)
3. [Free Hosting Options](#free-hosting-options)
4. [Paid Hosting Costs at Scale](#paid-hosting-costs-at-scale)
5. [Platform Recommendations](#platform-recommendations)
6. [Cost-Saving Strategies](#cost-saving-strategies)
7. [Recommended Action Plan](#recommended-action-plan)

---

## Executive Summary

Grabcash is a micro-task earning platform built with Next.js 15, PostgreSQL (Neon), and various third-party services. This document outlines hosting costs at different scale levels and provides recommendations for cost-effective hosting solutions, particularly suited for Nigerian entrepreneurs looking to minimize expenses while maintaining performance.

**Key Findings:**
- Free tier hosting is viable for initial launch (0 - 1,000 users)
- Small scale operations (1,000 - 5,000 users): ~$40-45/month (~₦65,000)
- Medium scale operations (10,000 - 50,000 users): ~$120-150/month (~₦200,000)
- Large scale operations (100,000+ users): ~$250-500/month (~₦400,000-800,000)

---

## Current Tech Stack

| Component | Current Solution |
|-----------|------------------|
| Framework | Next.js 15 (App Router) |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 6 |
| Authentication | Better Auth |
| File Storage | AWS S3 (Tigris) |
| Payment Gateway | Paystack + Flutterwave |
| Email Service | Mailjet + Resend |
| Styling | Tailwind CSS 4 + ShadCN UI |

---

## Free Hosting Options

These platforms offer generous free tiers suitable for launching and testing your platform:

| Platform | Free Tier Includes | Best For | Limitations |
|----------|-------------------|----------|-------------|
| **Vercel** | 100GB bandwidth, Serverless functions, Automatic deployments | Next.js applications (Recommended) | 100GB bandwidth limit, 10-second function timeout |
| **Netlify** | 100GB bandwidth, 300 build minutes/month | Static sites + serverless | Limited serverless capabilities |
| **Railway** | $5 free credits/month | Full-stack with database | Credits deplete quickly with traffic |
| **Render** | 750 hours/month | Backend services | Spins down after 15 mins of inactivity |

**Recommendation:** Start with **Vercel** - it's built by the Next.js team and offers the best developer experience and performance optimization for Next.js applications.

---

## Paid Hosting Costs at Scale

### Scenario 1: Small Scale (1,000 - 5,000 users)

| Service | Platform | Monthly Cost (USD) | Monthly Cost (NGN)* |
|---------|----------|-------------------|---------------------|
| Hosting | Vercel Pro | $20 | ₦32,000 |
| Database | Neon (Launch Plan) | $19 | ₦30,400 |
| File Storage | Cloudflare R2 | $0-5 | ₦0-8,000 |
| Email | Mailjet Free Tier | $0 | ₦0 |
| **TOTAL** | | **$39-44/month** | **₦62,400-70,400/month** |

**Expected Capabilities:**
- Handle 10,000-50,000 page views/month
- Store up to 10GB of files
- Send up to 6,000 emails/month
- Support concurrent users effectively

---

### Scenario 2: Medium Scale (10,000 - 50,000 users)

| Service | Platform | Monthly Cost (USD) | Monthly Cost (NGN)* |
|---------|----------|-------------------|---------------------|
| Hosting | Vercel Pro + Usage | $30-50 | ₦48,000-80,000 |
| Database | Neon Scale Plan | $69 | ₦110,400 |
| File Storage | Cloudflare R2 | $10-20 | ₦16,000-32,000 |
| Email | Mailjet Basic | $15 | ₦24,000 |
| **TOTAL** | | **$124-154/month** | **₦198,400-246,400/month** |

**Expected Capabilities:**
- Handle 100,000-500,000 page views/month
- Store up to 50GB of files
- Send up to 30,000 emails/month
- Higher database compute and storage

---

### Scenario 3: Large Scale (100,000+ users)

| Service | Platform | Monthly Cost (USD) | Monthly Cost (NGN)* |
|---------|----------|-------------------|---------------------|
| Hosting | Vercel Team or VPS | $50-150 | ₦80,000-240,000 |
| Database | Neon Business or Supabase Pro | $100-300 | ₦160,000-480,000 |
| File Storage | Cloudflare R2 | $30-50 | ₦48,000-80,000 |
| Email | Mailjet Premium | $25-50 | ₦40,000-80,000 |
| CDN | Cloudflare Pro (Optional) | $20 | ₦32,000 |
| **TOTAL** | | **$225-570/month** | **₦360,000-912,000/month** |

**Expected Capabilities:**
- Handle 1,000,000+ page views/month
- Store 100GB+ of files
- Send 100,000+ emails/month
- Enterprise-grade database performance
- Global CDN distribution

---

*\*Currency conversion based on ₦1,600 = $1 USD. Adjust calculations based on current exchange rates.*

---

## Platform Recommendations

### Hosting Platforms

| Platform | Starting Cost | Pros | Cons | Best For |
|----------|---------------|------|------|----------|
| **Vercel** | Free / $20 Pro | Best Next.js support, Easy deployment, Automatic scaling | Can become expensive at high scale | Recommended for start |
| **Railway** | Pay-as-you-go (~$5-20/mo) | Simple setup, Good free tier, Built-in database | Less optimized for Next.js | Budget-conscious startups |
| **Fly.io** | ~$5-15/mo | Great performance, Edge computing, Good pricing | More technical setup required | Performance-focused apps |
| **DigitalOcean App Platform** | $5-12/mo | Predictable pricing, Good documentation | Manual scaling needed | Steady traffic patterns |
| **Hetzner VPS** | €4-10/mo (~$5-12) | Cheapest at scale, Full control | Self-managed, Technical expertise needed | Large scale, cost optimization |
| **Render** | Free / $7/mo | Easy setup, Free SSL | Cold starts on free tier | Simple deployments |

---

### Database Platforms

| Platform | Free Tier | Paid Plans | Pros | Cons |
|----------|-----------|------------|------|------|
| **Neon** (Current) | 0.5GB storage, 190 compute hours | $19/mo (Launch) | Excellent Prisma support, Serverless, Branching | Compute hour limits |
| **Supabase** | 500MB storage, 2GB bandwidth | $25/mo (Pro) | PostgreSQL + Auth + Storage + Realtime | More features than needed |
| **PlanetScale** | 5GB reads, 1 billion row reads | $29/mo (Scaler) | Excellent scaling, Branching | MySQL only (not PostgreSQL) |
| **Railway Postgres** | $5 free credits | Pay-as-you-go | Simple, Integrated | Limited free tier |
| **CockroachDB** | 10GB storage | $0 (Serverless) | Distributed, Resilient | Different SQL dialect |

**Recommendation:** Stay with **Neon** - it integrates well with Prisma and offers excellent serverless PostgreSQL performance.

---

### File Storage Platforms

| Platform | Free Tier | Paid Pricing | Key Advantage |
|----------|-----------|--------------|---------------|
| **Cloudflare R2** | 10GB storage, No egress fees | $0.015/GB/month stored | **Zero bandwidth/egress charges** |
| **Backblaze B2** | 10GB storage | $0.005/GB stored, $0.01/GB egress | Very affordable |
| **AWS S3** | 5GB (12 months) | $0.023/GB stored + egress | Industry standard |
| **Tigris** (Current) | Limited | Usage-based | S3-compatible |
| **Uploadthing** | 2GB | $10/mo (Pro) | Easy Next.js integration |

**Recommendation:** Switch to **Cloudflare R2** - the zero egress fees will save significant costs as your platform scales and users upload/download more files.

---

### Email Service Platforms

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Mailjet** (Current) | 6,000 emails/month | $15/mo (30,000 emails) | Transactional + Marketing |
| **Resend** | 3,000 emails/month | $20/mo (50,000 emails) | Developer-friendly, Modern |
| **Brevo (Sendinblue)** | 300 emails/day | $25/mo (20,000 emails) | Marketing automation |
| **Amazon SES** | 62,000 emails/month (if using EC2) | $0.10 per 1,000 emails | High volume, Low cost |
| **Postmark** | 100 emails/month | $15/mo (10,000 emails) | Excellent deliverability |

**Recommendation:** Continue with **Mailjet** - the free tier is generous, and pricing is competitive for growth.

---

## Cost-Saving Strategies

### 1. Switch to Cloudflare R2 for File Storage

**Why:** AWS S3 and similar services charge for bandwidth (egress). Every time a user views an image or downloads a file, you pay. Cloudflare R2 has **zero egress fees**.

**Potential Savings:** 50-70% reduction in storage costs at scale

**Implementation:** R2 is S3-compatible, so minimal code changes are required.

---

### 2. Optimize Next.js for Reduced Serverless Invocations

- **Use Static Generation (SSG)** where possible for public pages
- **Implement Incremental Static Regeneration (ISR)** for semi-dynamic content
- **Cache API responses** using Vercel's Edge Cache
- **Use Edge Functions** for lightweight operations

**Potential Savings:** 30-50% reduction in hosting costs

---

### 3. Optimize Database Queries

- Add proper indexes to frequently queried columns
- Use pagination for large data sets (already implemented)
- Implement query caching where appropriate
- Monitor slow queries and optimize them

**Potential Savings:** Reduced database compute time = lower Neon bills

---

### 4. Image Optimization

- Use Next.js Image component (already implemented)
- Serve WebP format for modern browsers
- Implement lazy loading for images below the fold
- Compress images before upload

**Potential Savings:** 40-60% reduction in bandwidth usage

---

### 5. Consider VPS at Scale

When reaching 50,000+ users, a self-managed VPS (Hetzner, DigitalOcean) becomes more cost-effective than serverless platforms.

**Example Hetzner Setup:**
- CX21 VPS: €5.83/month (~$6.50)
- Docker + Nginx + PM2
- Full control over resources

**Potential Savings:** 50-70% at large scale compared to Vercel

---

### 6. Email Optimization

- Use digest emails instead of individual notifications
- Implement email queuing to spread sends
- Use webhooks for delivery tracking instead of polling

**Potential Savings:** Stay within free tiers longer

---

## Recommended Action Plan

### Phase 1: Launch (Month 1-3)
**Budget: ₦0/month**

| Service | Platform | Cost |
|---------|----------|------|
| Hosting | Vercel Free | $0 |
| Database | Neon Free | $0 |
| Storage | Cloudflare R2 Free | $0 |
| Email | Mailjet Free | $0 |
| **Total** | | **$0** |

**Actions:**
- [ ] Deploy to Vercel free tier
- [ ] Set up Neon free database
- [ ] Migrate file storage from Tigris to Cloudflare R2
- [ ] Configure Mailjet for transactional emails

---

### Phase 2: Growth (Month 4-12)
**Budget: ~₦50,000-80,000/month ($30-50)**

| Service | Platform | Cost |
|---------|----------|------|
| Hosting | Vercel Pro | $20 |
| Database | Neon Launch | $19 |
| Storage | Cloudflare R2 | ~$5 |
| Email | Mailjet Free | $0 |
| **Total** | | **~$44/month** |

**Actions:**
- [ ] Upgrade to Vercel Pro when approaching limits
- [ ] Upgrade Neon when database needs grow
- [ ] Monitor costs and optimize as needed

---

### Phase 3: Scale (Year 2+)
**Budget: ~₦150,000-250,000/month ($100-150)**

| Service | Platform | Cost |
|---------|----------|------|
| Hosting | Vercel Pro or Hetzner VPS | $20-50 |
| Database | Neon Scale | $69 |
| Storage | Cloudflare R2 | $15-25 |
| Email | Mailjet Basic | $15 |
| **Total** | | **~$120-160/month** |

**Actions:**
- [ ] Evaluate VPS migration for cost savings
- [ ] Implement advanced caching strategies
- [ ] Consider CDN for global performance

---

## Summary

| Scale | Users | Monthly Cost (USD) | Monthly Cost (NGN) |
|-------|-------|-------------------|-------------------|
| **Launch** | 0-1,000 | $0 | ₦0 |
| **Small** | 1,000-5,000 | $40-45 | ₦65,000-72,000 |
| **Medium** | 10,000-50,000 | $120-150 | ₦192,000-240,000 |
| **Large** | 100,000+ | $250-500 | ₦400,000-800,000 |

**Key Takeaways:**
1. Start free with Vercel + Neon + Cloudflare R2
2. Switch to Cloudflare R2 immediately to avoid future egress costs
3. Scale gradually - only pay for what you need
4. Consider VPS migration at large scale for maximum cost savings
5. Optimize your application to reduce resource consumption

---

## Contact & Resources

**Useful Links:**
- Vercel Pricing: https://vercel.com/pricing
- Neon Pricing: https://neon.tech/pricing
- Cloudflare R2 Pricing: https://developers.cloudflare.com/r2/pricing/
- Mailjet Pricing: https://www.mailjet.com/pricing/
- Hetzner Cloud: https://www.hetzner.com/cloud

---

*Document generated for Grabcash Platform - December 2024*
