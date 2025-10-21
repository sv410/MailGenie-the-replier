const els = {
  prompt: document.getElementById('prompt'),
  tone: document.getElementById('tone'),
  generate: document.getElementById('generate'),
  result: document.getElementById('result'),
  subject: document.getElementById('subject'),
  email: document.getElementById('email'),
  copySubject: document.getElementById('copySubject'),
  copyEmail: document.getElementById('copyEmail'),
  openOptions: document.getElementById('openOptions'),
  settings: document.getElementById('settings'),
  apiBase: document.getElementById('apiBase'),
  saveSettings: document.getElementById('saveSettings'),
  closeSettings: document.getElementById('closeSettings'),
  openApp: document.getElementById('openApp')
}

function setLoading(isLoading) {
  els.generate.disabled = isLoading
  els.generate.textContent = isLoading ? 'Generating…' : 'Generate'
}

async function getApiBase() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['apiBase'], (items) => {
      resolve(items.apiBase || 'http://localhost:3000')
    })
  })
}

function showResult(subject, email) {
  els.subject.textContent = subject
  els.email.textContent = email
  els.result.classList.remove('hidden')
}

function showSettings() {
  els.settings.classList.remove('hidden')
  getApiBase().then((base) => {
    els.apiBase.value = base
  })
}

function hideSettings() {
  els.settings.classList.add('hidden')
}

els.openOptions.addEventListener('click', showSettings)
els.closeSettings.addEventListener('click', hideSettings)
els.saveSettings.addEventListener('click', () => {
  chrome.storage.sync.set({ apiBase: els.apiBase.value || 'http://localhost:3000' }, () => {
    hideSettings()
  })
})

els.copySubject.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(els.subject.textContent || '') } catch {}
})

els.copyEmail.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(els.email.textContent || '') } catch {}
})

els.openApp.addEventListener('click', async (e) => {
  e.preventDefault()
  const base = await getApiBase()
  const url = (base || 'http://localhost:3000').replace(/\/$/, '') + '/try'
  try { window.open(url, '_blank', 'noopener') } catch {}
})
els.generate.addEventListener('click', async () => {
  setLoading(true)
  els.result.classList.add('hidden')
  try {
    const base = await getApiBase()
    const res = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: els.prompt.value || 'Your request', tone: els.tone.value || 'Formal' }),
    })
    const json = await res.json()
    if (json && json.subject && json.email) {
      showResult(json.subject, json.email)
    } else {
      showResult('Generated Email', 'No content received. Please try again.')
    }
  } catch (e) {
    showResult('Generated Email', 'There was an error generating the email. Please check API Base settings.')
  } finally {
    setLoading(false)
  }
})