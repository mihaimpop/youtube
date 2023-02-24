function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}




window.onload = function() {
  const os = getMobileOperatingSystem();

  switch(os) {
    case "Android":
      window.location.replace("intent://www.youtube.com/@meMihai#Intent;package=com.google.android.youtube;scheme=https;end");
    case "iOS":
      // window.location.replace("youtube://www.youtube.com/channel/@meMihai");
      window.location.replace("vnd.youtube://@meMihai");
    default:
      window.location.replace("http://www.google.com");
      // window.location.replace("https://youtube.com/@meMihai");
  }

  function killPopup() {
      window.removeEventListener('pagehide', killPopup);
  }
  window.addEventListener('pagehide', killPopup);
};

console.log('ndfsdfv')