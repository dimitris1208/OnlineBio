import { ImageResponse } from "next/og";

export const alt = "Dimitris Stragalinos — I build ideas into things that actually work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lime = "#c8ff2e";
const ink = "#07080b";

const step = (label: string, solid = false) => (
  <div
    style={{
      display: "flex",
      border: `4px solid ${solid ? lime : "#f2f4ef"}`,
      background: solid ? lime : ink,
      color: solid ? ink : "#f2f4ef",
      padding: "10px 26px",
      fontSize: 30,
      letterSpacing: 4,
    }}
  >
    {label}
  </div>
);

const wire = <div style={{ display: "flex", width: 110, height: 4, background: lime }} />;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          color: "#f2f4ef",
          padding: "64px 72px",
          borderLeft: `14px solid ${lime}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: lime }}>
          DIMITRIS STRAGALINOS · INTEGRATION ENGINEER
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
          <div style={{ display: "flex", color: lime }}>Hi, I’m Dimitris —</div>
          <div style={{ display: "flex" }}>I build ideas into things</div>
          <div style={{ display: "flex" }}>that actually work.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {step("IDEA")}
          {wire}
          {step("BUILD")}
          {wire}
          {step("WORKS", true)}
        </div>
      </div>
    ),
    size
  );
}
