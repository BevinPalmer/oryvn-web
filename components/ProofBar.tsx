const ITEMS = [
  "Knows Camera Raw",
  "Non-destructive by default",
  "Smarter than Photoshop AI",
  "No learning curve",
  "Works like a person",
];

export default function ProofBar() {
  return (
    <section className="border-y border-nav-border bg-surface py-5">
      <p className="mx-auto max-w-5xl px-5 text-center text-[13px] text-text-muted md:px-8 md:text-[14px]">
        {ITEMS.map((item, i) => (
          <span key={item}>
            {i > 0 ? <span className="text-text-ghost"> · </span> : null}
            {item}
          </span>
        ))}
      </p>
    </section>
  );
}
