import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/** 512px logo for schema.org Organization.logo. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f4ee" }}>
        <div style={{ position: "relative", width: 400, height: 360, display: "flex", border: "26px solid #0f5c5e" }}>
          <div style={{ position: "absolute", left: 24, top: 24, width: 150, height: 260, background: "#d6ebe7", border: "12px solid #0f5c5e" }} />
          <div style={{ position: "absolute", left: 150, top: 24, width: 178, height: 260, background: "#ffffff", border: "12px solid #9a5b2e" }} />
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
