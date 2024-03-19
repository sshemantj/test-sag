import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

let myState = true;

export default function Home() {
  useEffect(() => {
    const handleStartCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (err: any) {
        console.log(err.message || "Failed to access camera.");
      }
    };
    handleStartCamera();
  }, []);

  useEffect(() => {
    const formatsToSupport = Object.values(Html5QrcodeSupportedFormats).filter(
      (item) => Number.isInteger(item)
    ) as Html5QrcodeSupportedFormats[];

    const html5QrCode = new Html5Qrcode("reader", {
      formatsToSupport,
      verbose: true,
    });
    const qrCodeSuccessCallback = (decodedText: string) => {
      alert(decodedText);
    };
    const qrCodeErrorCallback = (decodedText: string) => {
      // alert(decodedText);
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    if (myState) {
      myState = false;
      html5QrCode.start(
        {
          facingMode:
            process.env.NODE_ENV === "development" ? "user" : "environment",
        },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Test Scan</title>
      </Head>
      <main>
        <div id="reader"></div>
      </main>
    </>
  );
}
