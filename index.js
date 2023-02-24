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
  if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
  }

  return "unknown";
}




window.onload = function() {
  const os = getMobileOperatingSystem();

  switch(os) {
    case "Android": {
      window.location.href = "intent://www.youtube.com/@meMihai#Intent;package=com.google.android.youtube;scheme=https;end";
      window.setTimeout(function() {
        window.location = "https://youtube.com/@meMihai";
    }, 25);
    }
    case "iOS":{
      // window.location.replace("youtube://www.youtube.com/channel/@meMihai");
      window.location.href = "vnd.youtube://@meMihai";
      window.setTimeout(function() {
        window.location = "https://youtube.com/@meMihai";
    }, 25);
    }
    case "unknown": {
      window.location.href = "https://youtube.com/@meMihai";
    }
      // window.location.replace("https://youtube.com/@meMihai");
  }

  function killPopup() {
      window.removeEventListener('pagehide', killPopup);
  }
  window.addEventListener('pagehide', killPopup);
};
