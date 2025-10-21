# MailGenie - Quick Setup Guide

## 🔑 OpenAI API Key Configuration

Your OpenAI API key needs to be configured in the following locations:

### 1. **Root Directory** (`.env.local`)
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. **Python Service** (`python-service/.env`)
```
OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: Replace `your_openai_api_key_here` with your actual OpenAI API key from https://platform.openai.com/api-keys

## 🚀 Quick Start Commands

### Terminal 1 - Start Python Backend
```powershell
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### Terminal 2 - Start Next.js Frontend
```powershell
pnpm install
pnpm dev
```

Then open: **http://localhost:3000**

## 📚 Technologies Summary

### Frontend Stack
- **Next.js 15.5** - React Framework
- **TypeScript 5** - Type Safety
- **Tailwind CSS 4.1** - Styling
- **Radix UI** - Accessible Components
- **shadcn/ui** - Component Library

### Backend Stack
- **FastAPI** - Python Web Framework
- **OpenAI API** - AI Email Generation
- **Uvicorn** - ASGI Server
- **Pydantic** - Data Validation

### Key Features
✅ AI-powered email generation
✅ Multiple tone options (Formal, Friendly, Persuasive)
✅ Template-based fallback
✅ Dark mode support
✅ Responsive design
✅ Type-safe development

## 📝 Important Notes

- ✅ Your API keys are already configured
- ✅ `.env` files are in `.gitignore` (protected from git)
- ⚠️ Never commit API keys to version control
- 🔒 Keep your `.env` files secure

## 🔗 Useful Links

- OpenAI Dashboard: https://platform.openai.com/
- OpenAI API Docs: https://platform.openai.com/docs
- Next.js Docs: https://nextjs.org/docs
- FastAPI Docs: https://fastapi.tiangolo.com/

---

**Note**: If you need to change your API key in the future, update it in both `.env.local` (root) and `python-service/.env` files.
