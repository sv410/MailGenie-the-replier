# MailGenie Browser Extension

A Chrome/Edge browser extension to generate professional emails using MailGenie's AI-powered service.

## Features

- 🎨 Generate emails in multiple tones (Formal, Friendly, Persuasive)
- ⚡ Quick access from browser toolbar
- 🔒 Configurable API endpoint
- 💅 Clean, modern UI

## Installation

### Chrome / Edge

1. Download or clone this repository
2. Open `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `extension` folder from this project
6. Pin the MailGenie extension to your toolbar

## Configuration

1. Click the MailGenie extension icon
2. In the "API Base URL" field, enter:
   - For local development: `http://localhost:3000`
   - For production: Your deployed site URL (e.g., `https://your-site.vercel.app`)
3. The extension will remember your settings

## Usage

1. Click the MailGenie extension icon
2. Enter your email prompt (e.g., "Request a meeting with the marketing team")
3. Select your desired tone (Formal, Friendly, or Persuasive)
4. Click "Generate Email"
5. Copy the generated email to use anywhere

## How It Works

The extension calls your MailGenie deployment's `/api/generate` endpoint:

```
Extension → Your Site (/api/generate) → Python Service → OpenAI API → Generated Email
```

## Files

- `manifest.json` - Extension manifest and configuration
- `popup.html` - Extension UI
- `popup.js` - Extension logic and API calls
- `styles.css` - Extension styling

## Permissions

The extension requires:
- `activeTab` - To access the current tab (minimal permissions)
- Host permissions for your API endpoint

## License

MIT License - See main project LICENSE file
