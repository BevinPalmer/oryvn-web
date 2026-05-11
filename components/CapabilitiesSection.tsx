const CAPS = [
  {
    title: "Skin retouching",
    body: "Frequency separation, dodge & burn, skin tone correction at a working beauty retoucher level",
  },
  {
    title: "Color & grading",
    body: "Camera Raw, curves, selective color, luminosity masking. Knows fashion grade vs commercial grade",
  },
  {
    title: "Layer intelligence",
    body: "Smart objects, adjustment layers, proper grouping. Your file stays industry-ready",
  },
  {
    title: "File organization",
    body: "Knows industry naming conventions. Always duplicates before touching originals",
  },
  {
    title: "Creative direction",
    body: "Understands briefs. \"Make her look tired but beautiful\" is an instruction it can execute",
  },
  {
    title: "No AI slop",
    body: "Checks its own output. Won't hand you something that looks fake or over-processed",
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-[calc(52px+1rem)] border-b border-nav-border bg-bg py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-center label-caps text-text-dim">What Oryvn knows</p>
        <h2 className="mt-4 text-center font-headline text-[clamp(1.75rem,4vw,2.75rem)] text-text-primary">
          Trained at the top.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.75] text-text-muted">
          Every capability is built the way a senior retoucher would work — fast, precise, and
          respectful of your file.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPS.map((c) => (
            <div
              key={c.title}
              className="border border-[#1e1e1e] bg-surface p-4 sm:p-6 md:p-8"
            >
              <h3 className="font-headline text-lg text-[#d0d0d0]">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
