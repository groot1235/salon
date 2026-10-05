import { Clock, Phone, MapPin } from "lucide-react";
import { CTA_DATA } from "@/lib/data";

export default function CTA() {
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900 mb-4">
          {CTA_DATA.heading}
        </h2>

        {/* One-line Paragraph */}
        <p className="text-[15px] leading-relaxed text-slate-600 mb-8 max-w-lg">
          {CTA_DATA.description}
        </p>

        {/* Inline Row of 3 Items with Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8 text-xs text-slate-500">
          <div className="inline-flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-900" />
            <span>Daily 9AM – 9PM</span>
          </div>

          <div className="inline-flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-900" />
            <a
              href="tel:+971544452502"
              className="hover:text-slate-900 transition-colors"
            >
              +971 54 445 2502
            </a>
          </div>

          <div className="inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-900" />
            <span>13 Branches Across Dubai</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div>
          <a
            href={CTA_DATA.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-slate-900 text-white h-11 px-7 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors duration-200"
          >
            {CTA_DATA.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
