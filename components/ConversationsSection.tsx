function MiniChat({
  messages,
}: {
  messages: { side: "user" | "oryvn"; text: string }[];
}) {
  return (
    <div className="space-y-3 text-[11px] leading-snug">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.side === "user" ? "flex justify-end" : "flex justify-start"}
        >
          <div className={m.side === "user" ? "text-right" : "text-left"}>
            <div
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                m.side === "user" ? "text-text-dim" : "text-accent"
              }`}
            >
              {m.side === "user" ? "You" : "ORYVN"}
            </div>
            <div
              className={`mt-1 ${
                m.side === "user"
                  ? "bubble-user max-w-[95%] px-2.5 py-1.5"
                  : "bubble-oryvn max-w-[95%] px-2.5 py-1.5"
              }`}
            >
              {m.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  {
    title: "Fashion editorial",
    messages: [
      { side: "oryvn" as const, text: "What are we going for?" },
      { side: "user" as const, text: "Muted luxury, skin real, not plastic" },
      { side: "oryvn" as const, text: "Pulling saturation in midtones, softening micro-contrast." },
    ],
  },
  {
    title: "File cleanup",
    messages: [
      { side: "user" as const, text: "rename layers like a sane person" },
      { side: "oryvn" as const, text: "Grouped adjustments, numbered passes, duplicates locked." },
    ],
  },
  {
    title: "Creative direction",
    messages: [
      { side: "user" as const, text: "she should feel powerful but exhausted" },
      { side: "oryvn" as const, text: "Lifted eye weight, held jaw structure, cooled ambient." },
    ],
  },
  {
    title: "Technical",
    messages: [
      { side: "user" as const, text: "print delivery — 300dpi sheet, FOGRA39" },
      { side: "oryvn" as const, text: "Soft proof on, gamut warnings cleared, export staged." },
    ],
  },
];

export default function ConversationsSection() {
  return (
    <section className="border-b border-nav-border bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center font-headline text-[clamp(1.5rem,3.5vw,2.25rem)] text-text-primary">
          Feels like texting the best retoucher you know.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.75] text-text-muted">
          No menus. No settings. No learning curve. Just open Photoshop and talk to it.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-surface2 p-5 md:p-6"
            >
              <p className="label-caps text-text-dim">{card.title}</p>
              <div className="mt-4">
                <MiniChat messages={card.messages} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
