🌸 Aura Scents — Luxury Perfume E-Commerce

Aura Scents is a modern, responsive luxury perfume e-commerce platform built with Vite + React + TypeScript and powered by Supabase for backend services.
The project includes a full shopping experience and a secure admin dashboard for product and order management.

✨ Features
🛍️ Customer Features

Modern luxury UI inspired by premium perfume brands

Browse perfumes with filters and sorting

Product details page

Shopping cart with quantity management

Checkout with order creation

Order confirmation page

🔐 Admin Features

Secure admin authentication (Supabase Auth)

Protected admin routes

Products management (Create / Update / Delete)

Upload product images (Supabase Storage)

Orders management and status updates

Order confirmation workflow

Automatic email sent to customer when order is confirmed

🧱 Tech Stack
Frontend

Vite

React + TypeScript

Tailwind CSS

shadcn/ui

React Router

React Query

Backend (BaaS)

Supabase

PostgreSQL Database

Authentication

Storage (product images)

Row Level Security (RLS)

Edge Functions (emails)

Other Tools

Lovable (UI generation & rapid iteration)

Lucide Icons

📂 Project Structure
src/
├── components/
│   ├── layout/
│   ├── products/
│   ├── ui/
├── context/
│   └── CartContext.tsx
├── hooks/
│   └── useProducts.ts
├── lib/
│   └── supabase.ts
├── pages/
│   ├── Index.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   ├── Admin/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   └── Orders.tsx
└── types/
    └── product.ts