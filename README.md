<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Apoorva Gururaja Portfolio Website


A modern portfolio website built with React, TypeScript, and Vite featuring AI-powered chat functionality.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Gemini API Key** (optional, for AI chat functionality)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > **Note:** Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   >
   > The API key is optional - the site will work without it, but the AI chat feature will be disabled.
   >
   > **Contact Form:** The contact form uses mailto links to open your default email client with pre-filled content. No additional setup required!

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
├── components/     # Reusable React components
├── pages/          # Page components
├── services/       # API services (Gemini integration)
├── constants.ts    # App constants and data
├── types.ts        # TypeScript type definitions
└── vite.config.ts  # Vite configuration
```

## Features

- 🎨 Modern, responsive UI with dark mode
- 🤖 AI-powered chat assistant (Gemini integration)
- 🎯 Portfolio showcase
- 📱 Mobile-friendly design
- ⚡ Fast development with Vite
