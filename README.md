# MailGenie (the replier)

🚀 **MailGenie** is an AI-powered email generation tool that helps you craft professional, context-aware email replies instantly. Built with modern web technologies and powered by OpenAI's GPT models.

![MailGenie](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-teal?style=flat&logo=fastapi)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Multiple Tone Options**: Generate emails in Formal, Friendly, or Persuasive tones
- 📧 **Template-Based Generation**: Pre-built templates for common email scenarios
- 🤖 **AI-Powered**: Uses OpenAI GPT models for intelligent email composition
- ⚡ **Fast & Responsive**: Built with Next.js 15 for optimal performance
- 🎯 **Smart Fallback**: Works even without OpenAI API (basic template mode)
- 💅 **Beautiful UI**: Modern, accessible interface with Radix UI components
- 🌙 **Dark Mode**: Full dark mode support with next-themes

## 🛠️ Technologies Used

### Frontend
- **[Next.js 15.5](https://nextjs.org/)** - React framework for production
- **[React 18.3](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[SWR](https://swr.vercel.app/)** - Data fetching and caching
- **[Recharts](https://recharts.org/)** - Chart library
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server
- **[Pydantic](https://docs.pydantic.dev/)** - Data validation
- **[OpenAI Python SDK](https://github.com/openai/openai-python)** - OpenAI API integration

### Package Manager
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Python 3.8+ installed
- pnpm installed (`npm install -g pnpm`)
- OpenAI API key (required for AI-powered generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sv410/MailGenie-the-replier.git
   cd MailGenie-the-replier
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install Python backend dependencies**
   ```bash
   cd python-service
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI API Key (Required for AI-powered email generation)
   # IMPORTANT: Never commit your secret API keys to version control. Add your key below.
   OPENAI_API_KEY=<your-openai-api-key-here>
   # OpenAI Model (Optional, defaults to gpt-4o-mini)
   OPENAI_MODEL=gpt-4o-mini
   
   # Python Service URL (Optional, defaults to http://127.0.0.1:8001)
   PYTHON_SERVICE_URL=http://127.0.0.1:8001
   ```
   
   **For the Python service**, create a `.env` file inside the `python-service` directory:
   ```env
   # OpenAI API Key
   OPENAI_API_KEY=<your-openai-api-key-here>
   
   # OpenAI Model (Optional)
   OPENAI_MODEL=gpt-4o-mini
   ```

### Running the Application

1. **Start the Python backend service** (in a separate terminal):
   ```bash
   cd python-service
   uvicorn main:app --reload --port 8001
   ```

2. **Start the Next.js development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
MailGenie(the replier)/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── generate/        # Email generation endpoint
│   │   └── templates/       # Template fetching endpoint
│   ├── try/                 # Try page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── features.tsx         # Features section
│   ├── footer.tsx           # Footer component
│   ├── hero.tsx             # Hero section
│   ├── how-it-works.tsx     # How it works section
│   ├── navbar.tsx           # Navigation bar
│   ├── pricing.tsx          # Pricing section
│   └── prompt-demo.tsx      # Demo component
├── python-service/          # FastAPI backend
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── data/                    # Static data
│   └── prompts.json         # Email templates
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── public/                  # Static assets
│   └── images/              # Image files
├── hooks/                   # Custom React hooks
├── styles/                  # Additional styles
└── package.json             # Node.js dependencies
```

## 🔑 Where is the OpenAI API Key Used?

The OpenAI API key is used in the following locations:

### 1. **Python FastAPI Service** (`python-service/main.py`)
   - **Environment Variable**: `OPENAI_API_KEY`
   - **Purpose**: Powers the AI email generation using OpenAI's GPT models
   - **Location in code**: Lines 68-75
   - **Fallback**: If no API key is provided, the service falls back to template-based generation

### 2. **Environment Configuration**
   - **Frontend** (`.env.local`): Not directly used in frontend, but can be passed to backend
   - **Backend** (`python-service/.env`): Primary location for the API key
   
### 3. **How it Works**
   ```
   User Input → Next.js API Route → Python FastAPI Service → OpenAI API → Generated Email
   ```

## 🎨 Available Email Tones

- **Formal**: Professional and respectful tone for business communications
- **Friendly**: Casual and warm tone for informal interactions
- **Persuasive**: Convincing and compelling tone for proposals

## 🏗️ Build for Production

```bash
# Build the Next.js application
pnpm build

# Start the production server
pnpm start

# In a separate terminal, run the Python service
cd python-service
uvicorn main:app --host 0.0.0.0 --port 8001
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Repository**: [https://github.com/sv410/MailGenie-the-replier](https://github.com/sv410/MailGenie-the-replier)
- **Author**: sv410

## 🙏 Acknowledgments

- OpenAI for their powerful GPT models
- Vercel for Next.js and hosting platform
- shadcn for the beautiful UI components
- Radix UI for accessible primitives

---

Made with ❤️ by sv410
