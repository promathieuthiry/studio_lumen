import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030303",
          borderRadius: 36,
          fontSize: 108,
          fontWeight: 300,
          letterSpacing: -2,
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        SL
      </div>
    ),
    { ...size }
  );
}
