// One-off generator for the permanent /connect QR code. Run with:
//   node scripts/generate-qr.js
//
// Encodes the bare production URL — this QR never needs to change again.
// The /connect page is static and its links live in src/data/connect.ts;
// editing them and redeploying never affects this code. High error
// correction ('H') and a generous quiet zone are prioritized over any
// branding/logo insertion, per the requirement that scan reliability
// wins over aesthetics.

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const TARGET_URL = "https://kashtieducare.com/connect";
const OUT_DIR = path.join(__dirname, "..", "public", "qr");

const options = {
  errorCorrectionLevel: "H",
  margin: 4, // quiet zone, in QR "modules" — qrcode's recommended minimum is 4
  color: {
    dark: "#128b62", // --kashti-green
    light: "#fdfdfd", // --kashti-bg-light
  },
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  await QRCode.toFile(path.join(OUT_DIR, "kashti-connect.svg"), TARGET_URL, {
    ...options,
    type: "svg",
  });

  await QRCode.toFile(path.join(OUT_DIR, "kashti-connect.png"), TARGET_URL, {
    ...options,
    type: "png",
    width: 1024,
  });

  console.log(`QR generated for ${TARGET_URL}`);
  console.log(`  ${path.join(OUT_DIR, "kashti-connect.svg")}`);
  console.log(`  ${path.join(OUT_DIR, "kashti-connect.png")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
