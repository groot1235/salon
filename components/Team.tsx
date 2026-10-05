import Image from "next/image";
import { TEAM_DATA } from "@/lib/data";

export default function Team() {
  return (
    <section id="team" className="bg-slate-50 py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {TEAM_DATA.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900">
            {TEAM_DATA.heading}
          </h2>
        </div>

        {/* 3 Equal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM_DATA.members.map((member) => (
            <div key={member.name} className="flex flex-col">
              {/* Portrait Image (aspect 3/4) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200 rounded-none">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover rounded-none transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Name & Role */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-900 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {member.role}, {member.branch}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
