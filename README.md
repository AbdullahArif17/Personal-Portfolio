# Abdullah Arif - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a beautiful dark theme, smooth animations, and a contact form with email integration.

## ✨ Features

- **Modern Design**: Clean, professional design with dark theme
- **Responsive**: Fully responsive across all devices
- **Smooth Animations**: Powered by Framer Motion
- **Contact Form**: Integrated with Resend for email functionality
- **CMS Integration**: Sanity CMS for content management
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance**: Optimized with Next.js 15 and Turbopack
- **Accessibility**: ARIA labels and keyboard navigation
- **Theme Toggle**: Light/Dark mode support
- **Analytics**: Google Analytics integration
- **AI Portfolio Chat**: Session-based RAG assistant grounded in CV and live GitHub data with Upstash Vector

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **CMS**: Sanity
- **Email**: Resend
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity CMS Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-07-08

   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key

   # Google Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id

   # Server-only FastAPI chat backend URL
   PORTFOLIO_CHAT_API_URL=https://your-portfolio-api.vercel.app
   ```

4. **Set up Sanity CMS**
   ```bash
   npm run sanity dev
   ```
   This will open Sanity Studio where you can manage your content.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Configuration

### Sanity CMS Setup
1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Copy your project ID and dataset name
3. Update the environment variables
4. Run `npm run sanity dev` to start the studio

### Email Setup (Resend)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update the `RESEND_API_KEY` in your environment variables
4. Update the email address in `src/app/api/contact/route.ts`

### Google Analytics (Optional)
1. Create a Google Analytics 4 property
2. Get your measurement ID
3. Add it to your environment variables

### AI Portfolio Chat

The floating chat widget sends requests only to the local `/api/chat` route, which proxies to the FastAPI service so the backend URL is never read by client-side code. Copy `.env.example` to `.env.local`, set `PORTFOLIO_CHAT_API_URL`, and see `backend/README.md` for Upstash Vector, Gemini, ingestion, and Vercel deployment instructions. `NEXT_PUBLIC_CHAT_API_URL` remains supported as a legacy fallback, but the server-only variable is preferred.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── hero.tsx       # Hero section
│   ├── about.tsx      # About section
│   ├── skills.tsx     # Skills section
│   ├── projects.tsx   # Projects section
│   ├── contact.tsx    # Contact section
│   ├── navigation.tsx # Navigation component
│   └── theme-toggle.tsx # Theme toggle
├── sanity/            # Sanity CMS configuration
│   ├── schemaTypes/   # Content schemas
│   └── lib/          # Sanity utilities
└── types/            # TypeScript type definitions
```

## 🎨 Customization

### Colors and Theme
- Update colors in `tailwind.config.ts`
- Modify theme variables in `src/app/globals.css`

### Content
- Update personal information in components
- Add/remove sections as needed
- Customize animations in Framer Motion components

### Styling
- Modify component styles in their respective files
- Update global styles in `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: abdullaharif893@gmail.com
- **LinkedIn**: [Abdullah Arif](https://www.linkedin.com/in/abdullah-arif-89ab862b4/)
- **GitHub**: [AbdullahArif17](https://github.com/AbdullahArif17)

---

Made with ❤️ by Abdullah Arif
