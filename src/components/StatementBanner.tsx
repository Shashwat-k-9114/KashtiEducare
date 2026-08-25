import { Reveal, StaggerGrid, StaggerItem } from "./motion";
import { WakeLine } from "./WakeLine";

const ribbonTagsRowOne = [
  "Industry",
  "Experts",
  "Immersion",
  "Capability",
  "Direction",
  "Technology",
];
const ribbonTagsRowTwo = ["Community", "Global Exposure"];

export function StatementBanner() {
  return (
    <section className="relative overflow-hidden bg-kashti-statement-bg px-6 py-20 text-center lg:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="font-display pointer-events-none absolute inset-0 flex items-center justify-between px-4 text-[9vw] leading-none font-bold whitespace-nowrap text-white/[0.03] select-none"
      >
        <span>Academia</span>
        <span>Real World</span>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <WakeLine tone="onDark" className="mx-auto h-6 w-full max-w-xl" />

        <StaggerGrid className="mt-4 flex flex-wrap items-center justify-center gap-2" stagger={0.05}>
          {ribbonTagsRowOne.map((tag) => (
            <StaggerItem key={tag} className="inline-block">
              <span className="font-mono-label inline-block rounded-full border border-white/25 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/70 uppercase">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <StaggerGrid className="mt-2 flex flex-wrap items-center justify-center gap-2" stagger={0.05} delayChildren={0.3}>
          {ribbonTagsRowTwo.map((tag) => (
            <StaggerItem key={tag} className="inline-block">
              <span className="font-mono-label inline-block rounded-full border border-white/25 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/70 uppercase">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal delay={0.15}>
          <p className="font-display mt-10 text-2xl leading-snug font-medium text-white sm:text-3xl lg:text-4xl">
            Kashti is building the{" "}
            <span className="text-kashti-gold italic">experience layer</span>{" "}
            between education and the real world.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
