const paths = {
  pizza: "M4 20 12 4l8 16H4Z M8.5 20a3.5 3.5 0 0 1 7 0",
  pasta: "M4 12h16a8 8 0 0 1-16 0Z M8 12V8.5M12 12V6M16 12V8.5",
  flame:
    "M12 2c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-.5-2-1-2 1.5 1 2.5 3 2.5 4.5A5.5 5.5 0 1 1 6 11.5C6 8 9 6 12 2Z",
  fish: "M3 12s3-4 8-4c4 0 6 2 8 4-2 2-4 4-8 4-5 0-8-4-8-4Zm14-3 3-2v10l-3-2M8 12h.01",
  dessert: "M5.5 11h13l-1.7 8.5a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L5.5 11Z M3.5 11a8.5 8.5 0 0 1 17 0",
  wine: "M8 3h8l-1.1 7.2a2.9 2.9 0 0 1-5.8 0L8 3Z M12 13.5V20M8.5 20h7",
  starter:
    "M6.5 2v6.5a2 2 0 0 0 4 0V2M8.5 8.5V21M16.8 2c-1.9 0-3.4 2.2-3.4 5.3s1.5 5.2 3.4 5.2V21",
  rice: "M4 13h16a8 8 0 0 1-16 0Z M9.5 13 7.5 3M15 13l2.5-10.5",
  drink:
    "M7 7h10l-1.1 12.2a2 2 0 0 1-2 1.8h-3.8a2 2 0 0 1-2-1.8L7 7Z M9 7 8.2 3h7.6L15 7M13.3 3V1.2",
  arrowRight: "M4 12h15M12 5.5 19 12l-7 6.5",
  arrowUpRight: "M6.5 17.5 17.5 6.5M7.5 6.5h10v10",
  pin: "M12 21.5S5 15 5 9.5a7 7 0 1 1 14 0c0 5.5-7 12-7 12Zm0-8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  phone:
    "M5 3.5h3.2l2 5-2.7 1.6a11.5 11.5 0 0 0 5.4 5.4l1.6-2.7 5 2v3.2a2 2 0 0 1-2.1 2C9.6 19.5 4.5 14.4 3 6.6A2 2 0 0 1 5 3.5Z",
  clock: "M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Zm0-14.5v5l3.8 2.2",
  instagram:
    "M6.5 2.5h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4Zm5.5 5A3.5 3.5 0 1 0 12 14.5 3.5 3.5 0 0 0 12 7.5ZM17.3 5.7h.01",
  facebook:
    "M14.5 9V6.8a1 1 0 0 1 1-1H17.5V2.5H14.7A4.6 4.6 0 0 0 10.1 7.1V9H7.5v3h2.6v9.5h3.9V12h2.7l.4-3h-3.1Z",
  whatsapp:
    "M5.5 18.5 4 22l3.6-1.4A9.5 9.5 0 1 0 4 13.5M7.5 9c0 5 3.6 8.5 8.5 8.5",
  close: "M6 6l12 12M18 6 6 18",
  chevronLeft: "M15.5 5 8.5 12l7 7",
  chevronRight: "M8.5 5l7 7-7 7",
  menu: "M4 6.5h16M4 12h16M4 17.5h16",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  quote: "M8 9c-2.5 0-4 2-4 4.5S5.5 18 8 18v-2c-1.2 0-2-.9-2-2.2C6 12.5 6.8 11 8 11V9Zm9 0c-2.5 0-4 2-4 4.5S14.5 18 17 18v-2c-1.2 0-2-.9-2-2.2C15 12.5 15.8 11 17 11V9Z",
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
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
