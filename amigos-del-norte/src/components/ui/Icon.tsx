const paths = {
  flame:
    "M12 2c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-.5-2-1-2 1.5 1 2.5 3 2.5 4.5A5.5 5.5 0 1 1 6 11.5C6 8 9 6 12 2Z",
  leaf: "M20 4C10 4 4 10 4 18c8 0 14-6 14-14ZM4 18c4-1 8-4 10-8",
  fish: "M3 12s3-4 8-4c4 0 6 2 8 4-2 2-4 4-8 4-5 0-8-4-8-4Zm14-3 3-2v10l-3-2M8 12h.01",
  drumstick:
    "M14 4a4 4 0 0 1 4 4c0 2-1.5 3-3 4.5L9 19a2.5 2.5 0 1 1-4-3l6.5-6C13 8.5 14 7 14 5",
  smile: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  bag: "M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2",
  sparkles:
    "M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  pin: "M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  phone:
    "M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.7 19 5 13.3 5 6a2 2 0 0 1 1-3Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3.5 2",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM17 6.5h.01",
  facebook: "M14 9V7a1 1 0 0 1 1-1h2V3h-2.5A4.5 4.5 0 0 0 10 7.5V9H8v3h2v9h4v-9h2.6l.4-3H14Z",
  whatsapp:
    "M6 18l-1.3 3.3L8.2 20A9 9 0 1 0 4 13.5M8 9.6c0 4.5 3.4 7.9 7.9 7.9",
  close: "M6 6l12 12M18 6 6 18",
  chevronLeft: "M15 6l-6 6 6 6",
  chevronRight: "M9 6l6 6-6 6",
  camera:
    "M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm8 3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
  menu: "M4 7h16M4 12h16M4 17h16",
} satisfies Record<string, string>;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
