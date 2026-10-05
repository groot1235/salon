import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WORK_DATA } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" className="bg-white py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1: Slate-50 Text Box */}
          <div className="bg-slate-50 p-8 sm:p-10 flex flex-col justify-between rounded-none">
            <div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
                {WORK_DATA.eyebrow}
              </span>

              <h2 className="text-2xl font-medium tracking-tight text-slate-900 mb-4 leading-snug">
                {WORK_DATA.heading}
              </h2>

              <p className="text-[14px] leading-relaxed text-slate-600 mb-8">
                {WORK_DATA.description}
              </p>
            </div>

            <div>
              <a
                href={WORK_DATA.linkHref}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-900 transition-colors duration-200 hover:text-slate-600"
              >
                <span>{WORK_DATA.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columns 2-3: 2x2 Image Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-1">
              {WORK_DATA.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[11/10] overflow-hidden bg-slate-100 rounded-none"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 360px"
                    className="object-cover rounded-none transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
