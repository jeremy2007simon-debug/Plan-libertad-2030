import { ImageResponse } from "next/og";

// Favicon provisional: monogram tipográfico (mismo wordmark que
// Navbar/Footer) sobre el negro de marca, a la espera de que el
// restaurante facilite su identidad visual real. Sustituir por un
// icon.png/icon.svg de marca cuando exista.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14110d",
          color: "#c1653a",
          fontSize: 22,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
