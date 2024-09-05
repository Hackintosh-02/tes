import React, { useRef } from "react";
import { useQRCode } from "next-qrcode";

interface QRCodeGeneratorProps {
  bookingID: string;
}

const QRCodeGenerator = ({ bookingID }: QRCodeGeneratorProps) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null); // Ref for div instead of canvas
  const { Canvas } = useQRCode();

  // Function to download the QR code
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;

    // Find the canvas inside the div
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (!canvas) return;

    // Convert canvas to data URL and trigger download
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={qrCodeRef}>
        <Canvas
          text={bookingID}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFBF60FF",
            },
          }}
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="bg-primary text-black px-4 py-2 mt-4 rounded"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
