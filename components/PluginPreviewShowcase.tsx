export default function PluginPreviewShowcase() {
  return (
    <section id="plugin-preview" className="scroll-mt-16 border-b border-nav-border bg-bg py-16 md:py-20">
      <div className="mx-auto max-w-[340px] px-5">
        <div className="flex max-h-[600px] flex-col overflow-hidden rounded-lg border border-border bg-surface2 shadow-xl">
          <div className="flex shrink-0 items-center justify-between border-b border-border2 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              ORYVN
            </span>
            <span className="rounded-full border border-border2 bg-surface2 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">
              Pro
            </span>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-hidden p-4 text-[13px] leading-snug">
            <div className="flex justify-start">
              <div className="bubble-oryvn max-w-[92%] px-3.5 py-2.5">
                Open on a document and tell me what you need.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bubble-user max-w-[92%] px-3.5 py-2.5">
                this skin is reading too orange — fix it, keep it natural
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bubble-oryvn max-w-[92%] px-3.5 py-2.5">
                Pulling the reds and yellows back. Keeping the warmth, removing the cast.
              </div>
            </div>

            <div className="rounded border border-nav-border bg-surface3 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-label text-ok">
                ✓ Applied to document
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
                Selective Color — reds −18, Hue / Saturation — yellows −8°, Skin Tone Balance — +4
                warm
              </p>
            </div>

            <div className="flex justify-end">
              <div className="bubble-user max-w-[92%] px-3.5 py-2.5">now add a golden hour grade</div>
            </div>
            <div className="flex justify-start">
              <div className="bubble-oryvn max-w-[92%] px-3.5 py-2.5">
                Done. Warm curves lift in the mids, vibrance up, amber push in the highlights.
              </div>
            </div>

            <div className="rounded border border-nav-border bg-surface3 p-3">
              <div className="space-y-2">
                {[
                  { label: "Warmth", v: 72 },
                  { label: "Vibrance", v: 40 },
                  { label: "Highlights", v: 55 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-[11px] text-text-muted">
                      <span>{row.label}</span>
                      <span className="text-text-secondary">{row.v}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border2">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${row.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["Adjust skin", "Save preset", "Organize layers"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border2 bg-surface3 px-2.5 py-1 text-[11px] text-text-secondary"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="h-6 w-6 shrink-0 rounded-full bg-accent/30" aria-hidden />
              <div className="flex gap-1 rounded-full bg-surface3 px-3 py-2">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-border2 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface3 py-2 pl-3 pr-2">
              <span className="min-w-0 flex-1 truncate text-[13px] text-text-dim">
                message Oryvn…
              </span>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-black"
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
