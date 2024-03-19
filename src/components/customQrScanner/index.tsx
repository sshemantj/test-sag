import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

interface IProps {
  qrCodeSuccessCallback: (_: string) => void;
  qrCodeErrorCallback: (_: string) => void;
}

const CustomQrScanner = (props: IProps) => {
  const { qrCodeSuccessCallback, qrCodeErrorCallback } = props;
  const [cameraList, setCameraList] = useState<any>();

  const videoRef = useRef(null);
  const startScan = () => {
    if (videoRef && videoRef.current) {
      QrScanner.listCameras().then((res) => setCameraList(res));
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
  return (
    <div>
      <p>camera list := {JSON.stringify(cameraList)}</p>
      <video style={{ width: "100%" }} ref={videoRef}></video>;
    </div>
  );
};

export default CustomQrScanner;
