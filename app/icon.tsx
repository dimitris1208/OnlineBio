import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
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
          background: "#07080b",
          color: "#c8ff2e",
          fontSize: 132,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        D/
      </div>
    ),
    size
  );
}
