/** Visible break between major landing sections */
export default function SectionDivider() {
  return (
    <div
      className="border-t border-nav-border bg-bg py-6 md:py-8"
      aria-hidden
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border2" />
          <div className="h-1 w-16 shrink-0 rounded-full bg-accent/60" />
          <div className="h-px flex-1 bg-border2" />
        </div>
      </div>
    </div>
  );
}
