// Sokratix wordmark with a question-mark "o" motif.
export default function Logo({ className = "" }) {
  return (
    <span
      className={`font-display text-xl font-bold tracking-tight ${className}`}
      aria-label="Sokratix"
    >
      S
      <span className="relative text-red">
        o
        <span className="absolute -right-1 -top-1 text-[0.6em] text-red">?</span>
      </span>
      kratix
    </span>
  );
}
