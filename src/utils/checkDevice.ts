const isIphone = () => {
  const iOS_1to12 = /iPad|iPhone|iPod/.test(navigator.platform);

  const iOS13_iPad =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  const isIOS1to12 = () => {
    var audio = new Audio();
    audio.volume = 0.5;
    return audio.volume === 1;
  };

  // @ts-ignore
  const isIOS = !window.MSStream && (iOS_1to12 || iOS13_iPad || isIOS1to12());
  return isIOS;
};

const isAndroid = () => {
  if (typeof window !== "undefined") {
    const test = /(android)/i.test(window.navigator.userAgent);
    return test;
  }
  return false;
};

export { isIphone, isAndroid };
