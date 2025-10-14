export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full" style={{ background: "var(--mg-green)" }} />
          <span className="font-semibold">MailGenie — Smart Email Writing Assistant.</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Privacy
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Terms
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
