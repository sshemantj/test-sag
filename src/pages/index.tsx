import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import CustomQrScanner from "@/components/customQrScanner";
import CustomHtml5Qrcode from "@/components/customHtml5";
import { isAndroid, isIphone } from "@/utils/checkDevice";

export default function Home() {
  const [currentDevice, setCurrentDevice] = useState<
    "iphone" | "android" | "other"
  >("other");

  useLayoutEffect(() => {
    if (isIphone()) {
      setCurrentDevice("iphone");
    } else if (isAndroid()) {
      setCurrentDevice("android");
    }
  }, []);

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

  const qrCodeSuccessCallback = (decodedText: string) => {
    alert(decodedText);
  };
  const qrCodeErrorCallback = (error: string) => {
    console.log(error);
  };

  return (
    <>
      <Head>
        <title>Test Scan</title>
      </Head>
      <main>
        <h1>current device:= {currentDevice}</h1>
        {currentDevice === "iphone" && (
          <CustomHtml5Qrcode
            {...{ qrCodeSuccessCallback, qrCodeErrorCallback }}
          />
        )}
        {currentDevice === "android" && (
          <CustomQrScanner
            {...{ qrCodeSuccessCallback, qrCodeErrorCallback }}
          />
        )}
      </main>
    </>
  );
}
