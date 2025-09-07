# RabbitLife Runner Portal

A modern running community platform built with Next.js 15, featuring user registration, running result tracking, leaderboards, and AI-powered coaching.

## 🚀 Features

- **User Management**: Registration, authentication, and profile management
- **Running Results**: Submit and track running activities with photos
- **Leaderboard**: Real-time rankings and statistics
- **AI Coach**: Intelligent running advice and tips
- **Gallery**: Photo sharing and community features
- **Responsive Design**: Optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Animation**: Framer Motion
- **Authentication**: JWT with bcrypt
- **Database**: MongoDB with Mongoose
- **AI**: Google Generative AI (Gemini)
- **Image Processing**: Next.js Image Optimization

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd engdev-port
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── components/     # Reusable components
│   ├── gallery/        # Gallery pages
│   ├── leaderboard/    # Leaderboard pages
│   ├── running-result/ # Running result pages
│   └── ...
├── lib/                # Utility libraries
└── models/             # Data models
```

## 🎯 Performance Optimizations

- **Turbopack**: Fast development and build times
- **Image Optimization**: WebP/AVIF formats with caching
- **Bundle Optimization**: Tree-shaking and code splitting
- **Compression**: Gzip compression enabled
- **Caching**: Optimized cache strategies

## 🚀 Deployment

The application is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

## 📝 Environment Variables

Required environment variables:
- `JWT_SECRET` - Secret key for JWT tokens
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Generative AI API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 
