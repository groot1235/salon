import { SERVICES_DATA } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {SERVICES_DATA.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900">
            {SERVICES_DATA.heading}
          </h2>
        </div>

        {/* 4 Cards Joined Edge-to-Edge with 1px dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-slate-200 border border-slate-200 gap-px rounded-none overflow-hidden">
          {SERVICES_DATA.services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 relative flex flex-col justify-between group transition-colors duration-150 min-h-[260px]"
            >
              <div>
                {/* Large Numeral (01-04) */}
                <span className="text-[40px] leading-none font-medium text-slate-900 tracking-tight block select-none">
                  {service.number}
                </span>

                {/* Service Title */}
                <h3 className="text-base font-medium text-slate-900 mt-6 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-8 pt-4">
                <span className="text-[13px] font-medium text-slate-900 block">
                  {service.price}
                </span>
              </div>

              {/* 4px bar at bottom (active on 04 or on hover) */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-slate-300 transition-opacity duration-200 ${
                  service.isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
