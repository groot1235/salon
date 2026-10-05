import { Phone } from "lucide-react";
import { FOOTER_DATA } from "@/lib/data";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-slate-200 pt-16 pb-12 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand & Social */}
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-3">
              {FOOTER_DATA.brandName}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs mb-6">
              {FOOTER_DATA.description}
            </p>

            {/* 2 Square 1px-bordered Icon Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={FOOTER_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-900 rounded-none hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={FOOTER_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-900 rounded-none hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200"
                aria-label="Contact us on WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-4">
              LINKS
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_DATA.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-slate-400 mb-4">
              CONTACT
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <p className="leading-relaxed text-slate-600">
                {FOOTER_DATA.contact.branches}
              </p>
              <p>
                <a
                  href={`tel:${FOOTER_DATA.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-slate-900 transition-colors"
                >
                  {FOOTER_DATA.contact.phone}
                </a>
              </p>
              <p className="text-slate-400">{FOOTER_DATA.contact.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>{FOOTER_DATA.copyright}</div>
          <div className="flex items-center gap-6">
            {FOOTER_DATA.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-slate-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
