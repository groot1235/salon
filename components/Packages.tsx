import { PACKAGES_DATA, SITE_CONFIG } from "@/lib/data";

export default function Packages() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {PACKAGES_DATA.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900">
            {PACKAGES_DATA.heading}
          </h2>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES_DATA.packages.map((pkg) => {
            const serviceId = pkg.name.toLowerCase().includes("essential")
              ? "pkg-essential"
              : pkg.name.toLowerCase().includes("signature")
              ? "pkg-signature"
              : "pkg-ultimate";
            const bookingAnchor = `#booking?service=${serviceId}`;

            return (
              <div
                key={pkg.name}
                className={`bg-white p-8 relative flex flex-col justify-between rounded-none ${
                  pkg.popular
                    ? "border border-slate-900"
                    : "border border-slate-200"
                }`}
              >
                {/* POPULAR badge attached to top-left of the popular card */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-6 bg-slate-900 text-white text-[9px] font-medium uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-none select-none">
                    POPULAR
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-sm font-medium text-slate-900 tracking-tight">
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="text-[28px] font-medium tracking-tight text-slate-900 mt-2 mb-6">
                    {pkg.price}
                  </div>

                  {/* Bullet list with tiny dots */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-slate-500"
                      >
                        <span className="w-1 h-1 bg-slate-400 rounded-none shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2">
                  {pkg.popular ? (
                    <a
                      href={bookingAnchor}
                      className="w-full inline-flex items-center justify-center bg-slate-900 text-white h-11 px-6 text-[13px] font-medium rounded-none hover:bg-slate-800 transition-colors duration-200"
                    >
                      Select Package
                    </a>
                  ) : (
                    <a
                      href={bookingAnchor}
                      className="w-full inline-flex items-center justify-center bg-transparent border border-slate-900 text-slate-900 h-11 px-6 text-[13px] font-medium rounded-none hover:bg-slate-900 hover:text-white transition-colors duration-200"
                    >
                      Select Package
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
