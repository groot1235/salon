import { Star } from "lucide-react";
import { REVIEWS_DATA } from "@/lib/data";

export default function Reviews() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {REVIEWS_DATA.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900">
            {REVIEWS_DATA.heading}
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS_DATA.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border border-slate-200 bg-white p-6 rounded-none flex flex-col justify-between"
            >
              <div>
                {/* 5 Filled Black Stars */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-slate-900 text-slate-900"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[13px] leading-relaxed text-slate-600 mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Name */}
              <div className="text-xs font-medium text-slate-900">
                {review.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
