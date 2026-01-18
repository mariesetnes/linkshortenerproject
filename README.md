# Link Shortener Project

A modern, full-featured link shortener application built with Next.js 16, React 19, TypeScript, and cutting-edge web technologies.

## 🚀 Features

- **URL Shortening**: Create short, memorable links from long URLs
- **Custom Short Codes**: Choose your own custom short codes
- **User Authentication**: Secure sign-in/sign-up with Clerk
- **Link Management**: View, edit, and delete your links
- **Click Analytics**: Track clicks and engagement
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Type-Safe**: Built with TypeScript and Drizzle ORM

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.3](https://nextjs.org) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **UI Library**: [React 19.2.3](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Components**: [shadcn/ui](https://ui.shadcn.com) (New York style)
- **Database**: [Neon PostgreSQL](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Clerk](https://clerk.com)
- **Icons**: [Lucide React](https://lucide.dev)

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- A Neon database account
- A Clerk account

## 🏁 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd linkshortenerproject
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

See [Deployment Guide](./docs/deployment.md) for detailed setup instructions.

### 3. Set Up Database

```bash
# Generate and push database schema
npx drizzle-kit generate
npx drizzle-kit push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📚 Documentation

Comprehensive documentation for developers and AI coding assistants:

- **[AGENTS.md](./AGENTS.md)** - Main entry point for AI agent instructions
- **[Architecture Guidelines](./docs/architecture.md)** - Project structure and principles
- **[Coding Standards](./docs/coding-standards.md)** - TypeScript, React, and styling standards
- **[Component Patterns](./docs/component-patterns.md)** - React component best practices
- **[Database Guidelines](./docs/database.md)** - Drizzle ORM patterns
- **[API & Server Actions](./docs/api-server-actions.md)** - Server-side logic patterns
- **[Authentication](./docs/authentication.md)** - Clerk integration guide
- **[Testing Guidelines](./docs/testing.md)** - Testing strategies (future)
- **[Deployment](./docs/deployment.md)** - Environment setup and deployment

## 🗂️ Project Structure

```
/app                    # Next.js App Router
  /actions              # Server Actions
  /api                  # API Routes
  layout.tsx            # Root layout with Clerk
  page.tsx              # Home page
  globals.css           # Global styles

/components             # React components
  /ui                   # shadcn/ui components

/db                     # Database layer
  schema.ts             # Drizzle ORM schema
  index.ts              # Database connection

/lib                    # Shared utilities
  utils.ts              # Helper functions

/docs                   # Documentation
  *.md                  # Various guides

/public                 # Static assets
```

## 🔨 Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit push     # Push schema changes
npx drizzle-kit studio   # Open Drizzle Studio

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit         # Type check
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

See the [Deployment Guide](./docs/deployment.md) for detailed instructions.

## 🤝 Contributing

This project follows strict coding standards:

1. Read [AGENTS.md](./AGENTS.md) for AI agent guidelines
2. Follow [Coding Standards](./docs/coding-standards.md)
3. Write type-safe TypeScript code
4. Test your changes thoroughly
5. Submit a pull request

## 📝 Key Conventions

- **Server Components by default** - Only use Client Components when needed
- **TypeScript strict mode** - No `any` types
- **Tailwind for styling** - Utility-first CSS
- **Type-safe database queries** - Drizzle ORM inference
- **Server Actions for mutations** - Type-safe form handling
- **Clerk for authentication** - Never roll your own auth

## 🔐 Security

- Environment variables properly configured
- Clerk handles authentication
- SQL injection protection via Drizzle ORM
- XSS protection via React
- Input validation on all forms
- Rate limiting recommended for production

## 📄 License

[MIT License](LICENSE) - feel free to use this project for learning or as a base for your own link shortener.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Authentication by [Clerk](https://clerk.com)
- Database by [Neon](https://neon.tech)
- ORM by [Drizzle](https://orm.drizzle.team)

## 📞 Support

For issues or questions:
- Check the [documentation](./docs)
- Review [AGENTS.md](./AGENTS.md)
- Open an issue on GitHub

---

**Happy coding!** 🎉
