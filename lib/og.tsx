import { ImageResponse } from "next/og";
import { business } from "../content/business";

export const ogSize = { width: 1200, height: 630 };

/** Page-specific Open Graph card: config label, H1, brand, on a framed glass panel. */
export function renderOg(title: string, label = "XO") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #d6ebe7 0%, #f7f4ee 70%)",
          padding: 48,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "3px solid #0f5c5e",
            boxShadow: "inset 0 0 0 10px rgba(255,255,255,0.6)",
            padding: 56,
            background: "rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#7e4924", fontWeight: 700 }}>{label}</div>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.05, color: "#1c2626", fontWeight: 700, maxWidth: 950 }}>{title}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", fontSize: 30, color: "#0f5c5e", fontWeight: 600 }}>{business.brandName}</div>
            <div style={{ display: "flex", flexDirection: "column", width: 260 }}>
              <div style={{ height: 3, background: "#b9c2c4", marginBottom: 6 }} />
              <div style={{ height: 3, background: "#b9c2c4" }} />
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
