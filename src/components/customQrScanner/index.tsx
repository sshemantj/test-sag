import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

interface IProps {
  qrCodeSuccessCallback: (_: string) => void;
  qrCodeErrorCallback: (_: string) => void;
}

const CustomQrScanner = (props: IProps) => {
  const { qrCodeSuccessCallback, qrCodeErrorCallback } = props;

  const videoRef = useRef(null);
  const startScan = () => {
    if (videoRef && videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => qrCodeSuccessCallback(result.data),
        {
          preferredCamera: "environment",
        }
      );
      qrScanner.start();
    }
  };
  useEffect(() => {
    startScan();
  }, [videoRef]);
  return <video style={{ width: "100%" }} ref={videoRef}></video>;
};

export default CustomQrScanner;
