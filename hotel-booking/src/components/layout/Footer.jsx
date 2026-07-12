import { Sparkles, Camera, Send, Globe } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Partners"],
  },
  {
    title: "Support",
    links: ["Help center", "Cancellation", "Safety", "Contact us"],
  },
  {
    title: "Discover",
    links: ["Deals & offers", "Destinations", "Travel guides", "Gift cards"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber text-ink">
                <Sparkles size={18} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-extrabold">
                Stay<span className="text-amber">Go</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Your perfect stay, at the best price. Discover and shortlist
              handpicked hotels across India.
            </p>
            <div className="mt-5 flex gap-3">
              {[Camera, Send, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-amber/60 hover:text-amber"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-cloud"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} StayGo. Built for the demo hotels API.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cloud">Privacy</a>
            <a href="#" className="hover:text-cloud">Terms</a>
            <a href="#" className="hover:text-cloud">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
