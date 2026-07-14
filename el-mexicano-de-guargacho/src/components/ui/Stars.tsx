export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-terracota">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "" : "text-terracota/25"}>
          ★
        </span>
      ))}
    </div>
  );
}
