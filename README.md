# 🪙 Grabcash — Earn by Completing Simple Social Tasks

Grabcash is a **micro-task earning platform** that connects users with businesses and creators who need engagement on their content.  
Users can **earn money** by completing small online jobs — such as liking posts, following pages, commenting, or sharing content — while businesses and creators can **grow their visibility** through verified human actions.

---

## 🚀 Features

### 🧍 For Users

- ✅ **Create an Account** and manage your profile
- 💼 **Browse and Apply** for social engagement jobs
- 💰 **Earn Cash** by completing simple verified tasks
- 🔁 **Withdraw Earnings** securely to your bank account
- 🎟️ **Subscribe to Plans** to unlock premium job opportunities

### 🧑‍💼 For Admins

- 🧾 Full **Admin Dashboard** to manage users, jobs, payouts, and activities
- 📊 **Analytics Dashboard** with user growth, revenue, and engagement metrics
- ⚙️ Manage **subscriptions**, **transactions**, and **site settings**
- 🔔 View **recent activities** like new jobs, submissions, and payouts

### 💳 Payments & Wallet

- Integrated with **Paystack** for payouts and deposits
- Automatic **payout status tracking** and **proof validation**
- Platform **commission tracking** for admins

### ✉️ Emails & Notifications

- Automated transactional emails via **Mailjet**:
  - Subscription expired
  - Account suspended / unsuspended
  - Payout success or failure
  - Contact form messages

---

## 🛠️ Tech Stack

| Layer              | Technology                                                                   |
| ------------------ | ---------------------------------------------------------------------------- |
| **Framework**      | [Next.js 14 (App Router)](https://nextjs.org/)                               |
| **Database ORM**   | [Prisma](https://www.prisma.io/)                                             |
| **Database**       | [PostgreSQL (Neon)](https://neon.tech/)                                      |
| **Authentication** | Custom (NextAuth alternative)                                                |
| **Email**          | [Mailjet](https://www.mailjet.com/)                                          |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com) + [ShadCN UI](https://ui.shadcn.com) |
| **File Uploads**   | [AWS S3](https://aws.amazon.com/s3/)                                         |
| **Payments**       | [Paystack API](https://paystack.com/docs/)                                   |

---

## 🧩 Core Architecture

Grabcash is built using a modular, scalable architecture.

```
src/
│
├── app/                    # Next.js App Router structure
│   ├── (admin)/            # Admin dashboard routes
│   ├── (member)/           # User dashboard routes
│   ├── api/                # API routes for jobs, payouts, etc.
│   ├── subscriptions/      # Subscription management
│   ├── wallet/             # Payout and balance management
│   └── layout.tsx          # Global layout
│
├── components/             # Reusable UI components
├── emails/                 # Transactional email templates
├── lib/                    # Helper utilities (db, env, auth, etc.)
├── prisma/                 # Prisma schema and migrations
└── public/                 # Static assets
```

---

## ⚙️ Environment Variables

To run Grabcash locally, create a `.env` file and add the following:

```env
DATABASE_URL="your_postgres_url_here"

PAYSTACK_SECRET_KEY="your_paystack_secret"
MAILJET_API_PUBLIC_KEY="your_mailjet_public_key"
MAILJET_API_PRIVATE_KEY="your_mailjet_private_key"
SENDER_EMAIL_ADDRESS="your_verified_sender@email.com"

AWS_ACCESS_KEY_ID="your_aws_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret"
AWS_REGION="your_aws_region"
AWS_BUCKET_NAME="your_bucket_name"
```

---

## 🧱 Database Schema Overview

Main Entities:

- `User` — account info, status, balance
- `Job` — task details, links, and instructions
- `Applicant` — user submissions for jobs
- `Payout` — withdrawal requests
- `Subscription` — plan and billing info
- `RecentActivity` — system activity logs

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tomiwa-adelae/grabcash.git
cd grabcash
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup the Database

```bash
npx prisma migrate dev
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The app will be live at [http://localhost:3000](http://localhost:3000).

---

## 📦 Deployment

- Recommended: **Vercel** (for frontend + server actions)
- Database: **Neon PostgreSQL**
- File storage: **AWS S3**
- Emails: **Mailjet**

---

## 📈 Admin Features Snapshot

| Feature            | Description                                  |
| ------------------ | -------------------------------------------- |
| 🧑‍🤝‍🧑 Users           | Manage, suspend, or restore users            |
| 💼 Jobs            | Approve or reject job postings               |
| 💸 Payments        | Handle payouts and profit tracking           |
| 📊 Analytics       | View total users, active jobs, revenue, etc. |
| ⚡ Recent Activity | Track key system events in real-time         |

---

## 📬 Contact

**Tomiwa Adelae**  
🌐 [tomiwaadelae.com](https://tomiwaadelae.com)  
📧 [hello@tomiwaadelae.com](mailto:adelaetomiwa6@gmail.com)  
🐙 [GitHub](https://github.com/tomiwa-adelae)

---

## 🧾 License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it with attribution.
