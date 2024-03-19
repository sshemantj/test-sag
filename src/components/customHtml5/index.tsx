import { useEffect } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

interface IProps {
  qrCodeSuccessCallback: (_: string) => void;
  qrCodeErrorCallback: (_: string) => void;
}

let isCameraStarted = false;

const formatsToSupport = Object.values(Html5QrcodeSupportedFormats).filter(
  (item) => Number.isInteger(item)
) as Html5QrcodeSupportedFormats[];

const startScan = (
  successCb: (_: string) => void,
  errorCb: (_: string) => void
) => {
  const html5QrCode = new Html5Qrcode("reader", {
    formatsToSupport,
    verbose: true,
  });
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };
  html5QrCode.start(
    {
      facingMode:
        process.env.NODE_ENV === "development" ? "user" : "environment",
    },
    config,
    successCb,
    errorCb
  );
};

const CustomHtml5Qrcode = (props: IProps) => {
  const { qrCodeSuccessCallback, qrCodeErrorCallback } = props;
  useEffect(() => {
    if (!isCameraStarted) {
      isCameraStarted = true;
      startScan(qrCodeSuccessCallback, qrCodeErrorCallback);
    }
  }, []);

  return <div id="reader"></div>;
};

export default CustomHtml5Qrcode;
