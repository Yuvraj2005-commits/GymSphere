<div align="center">

# GymSphere

Modern Gym Management SaaS built with Next.js 16.

Manage members, trainers, attendance, payments, memberships, and authentication from a modern dashboard.

### Live Demo

**https://gymsphere-app.vercel.app**

</div>

---

## Overview

GymSphere is a modern Gym Management SaaS designed to simplify daily gym operations through a clean dashboard and secure authentication. It helps gym owners manage memberships, trainers, attendance, and payments while providing a scalable full-stack architecture built with Next.js and PostgreSQL.

---

## Preview

### Landing Page

<p align="center">
<img src="./screenshots/landing.png" width="100%">
</p>

---

### Login

<p align="center">
<img src="./screenshots/login.png" width="100%">
</p>

---

### Register

<p align="center">
<img src="./screenshots/register.png" width="100%">
</p>

---

### Email Verification

<p align="center">
<img src="./screenshots/verify-email.png" width="100%">
</p>

---

### Dashboard

<p align="center">
<img src="./screenshots/dashboard.png" width="100%">
</p>

---

### Members

<p align="center">
<img src="./screenshots/members.png" width="100%">
</p>

---

### Add Member

<p align="center">
<img src="./screenshots/add-member.png" width="100%">
</p>

---

### Membership Plans

<p align="center">
<img src="./screenshots/plans.png" width="100%">
</p>

---

### Create Plan

<p align="center">
<img src="./screenshots/create-plan.png" width="100%">
</p>

---

### Attendance

<p align="center">
<img src="./screenshots/attendance.png" width="100%">
</p>

---

### Payments

<p align="center">
<img src="./screenshots/payments.png" width="100%">
</p>

---

### Record Payment

<p align="center">
<img src="./screenshots/record-payment.png" width="100%">
</p>

---

### Trainer Management

<p align="center">
<img src="./screenshots/trainers.png" width="100%">
</p>

---

### Forgot Password

<p align="center">
<img src="./screenshots/forgot-password.png" width="100%">
</p>

---

### Reset Password

<p align="center">
<img src="./screenshots/reset-password.png" width="100%">
</p>

---

## Features

### Authentication

- Email & Password Authentication
- Google OAuth Login
- Email OTP Verification
- Forgot Password
- Password Reset via Email
- Secure Session Management

### Dashboard

- Revenue Overview
- Member Statistics
- Membership Statistics
- Attendance Summary

### Member Management

- Create Members
- Update Members
- Delete Members
- Membership Status
- Height & Weight Tracking
- Emergency Contacts

### Membership Plans

- Create Plans
- Edit Plans
- Delete Plans
- Flexible Pricing
- Custom Duration

### Payments

- Record Payments
- Payment History
- Revenue Tracking

### Attendance

- Member Check-In
- Member Check-Out
- Attendance History

### Trainers

- Trainer Management

### User Experience

- Responsive Layout
- Dark Mode
- Form Validation
- Toast Notifications
- Modern UI

---

## Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Frontend | React 19 |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Authentication | NextAuth |
| Email | Resend |
| OAuth | Google |
| Validation | Zod |
| Forms | React Hook Form |

---

## Project Structure

```text
src
├── actions
├── app
├── components
├── emails
├── lib
├── providers
├── types
└── validations
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Yuvraj2005-commits/gymsphere.git
```

```bash
cd gymsphere
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
DATABASE_URL=

DIRECT_URL=

AUTH_SECRET=

AUTH_URL=http://localhost:3000

AUTH_GOOGLE_ID=

AUTH_GOOGLE_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Push Database

```bash
npx prisma db push
```

Run

```bash
npm run dev
```

---

## Production

- Vercel
- Neon PostgreSQL
- Prisma
- Resend
- Google OAuth

---

## Roadmap

### Version 1

- Authentication
- OTP Verification
- Google Authentication
- Dashboard
- Members
- Membership Plans
- Attendance
- Payments
- Trainers

### Version 2

- QR Code Attendance
- Revenue Charts
- PDF Invoices
- Membership Expiry Notifications
- Advanced Search
- Member Photos

### Version 3

- AI Workout Generator
- AI Diet Planner
- AI Business Analytics
- Mobile Application

---

## Future Improvements

- Multi-Gym Support
- Role-Based Access
- Online Payments
- SMS Notifications
- REST API
- Mobile App

---

## Contributing

Contributions, suggestions and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## License

MIT License

---

<div align="center">

Built with Next.js, Prisma, PostgreSQL and Tailwind CSS.

</div>