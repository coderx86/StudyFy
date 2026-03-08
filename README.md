# StudyFy - Course Management Application

A modern, full-stack course management application built with **Next.js (App Router)**, featuring authentication, dynamic data fetching from MongoDB, and a premium dark-themed UI.

![StudyFy](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb) ![NextAuth](https://img.shields.io/badge/NextAuth.js-4-purple?style=flat-square)

## Features

- **Landing Page** with Hero, Featured Courses, About, Benefits, Instructors, Stats, and CTA sections
- **Authentication** via Google OAuth and email/password with NextAuth.js
- **Course Discovery** with search and category filtering
- **Course Details** with full descriptions and meta info
- **Add Course** (protected) with Imgbb image upload
- **Manage Courses** (protected) with view and delete operations
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Image Optimization** using Next.js `<Image />` component

## Technologies

- **Frontend:** Next.js (App Router), `next/image`, `react-icons`, `react-toastify`
- **Backend/Database:** MongoDB (native driver)
- **Authentication:** NextAuth.js (Google + Credentials)
- **Image Hosting:** Imgbb API
- **Styling:** Tailwind CSS v4

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd next-auth-full
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=<your-mongodb-connection-string>
DB_NAME=studyfy

NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

NEXT_PUBLIC_IMGBB_API_KEY=<your-imgbb-api-key>
```

### 4. Seed the Database

After starting the development server, visit:

```
http://localhost:3000/api/seed
```

This will populate the database with 8 sample courses.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Route Summary

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Landing page with 7 sections |
| `/courses` | Public | Course listing with search and filter |
| `/courses/[id]` | Public | Individual course detail page |
| `/login` | Public | Login with Google or credentials |
| `/register` | Public | Create a new account |
| `/add-course` | Protected | Add a new course with image upload |
| `/manage-courses` | Protected | View and delete courses |
| `/api/courses` | API | GET all / POST new course |
| `/api/courses/[id]` | API | GET / DELETE single course |
| `/api/seed` | API | Seed database with sample courses |

## Live Demo

[Deployed on Vercel](https://studyfy-inky.vercel.app/)
