const ANDROID_PHONE = 'Android';
const IOS_PHONE = 'iOS';
const UNKNOWN = 'unknown';

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return ANDROID_PHONE;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return IOS_PHONE;
  }

  return UNKNOWN;
}

document.addEventListener('DOMContentLoaded', function () {
  const os = getMobileOperatingSystem();
  console.log(`Detected OS: ${os}`); // For debugging purposes

  const androidLink = 'intent://www.youtube.com/@meMihai#Intent;scheme=https;package=com.google.android.youtube;end';
  const iOSLink = 'vnd.youtube://www.youtube.com/@meMihai';
  const fallbackLink = 'https://youtube.com/@meMihai';

  switch (os) {
    case ANDROID_PHONE: {
      // Attempt to open YouTube app via Intent URL
      window.location.href = androidLink;
      // Fallback to web after 3 seconds if app doesn't open
      window.setTimeout(function () {
        window.location.href = fallbackLink;
      }, 3000);
      break;
    }
    case IOS_PHONE: {
      // Attempt to open YouTube app via custom scheme
      window.location.href = iOSLink;
      // Fallback to web after 3 seconds if app doesn't open
      window.setTimeout(function () {
        window.location.href = fallbackLink;
      }, 3000);
      break;
    }
    case UNKNOWN: {
      // Directly open the fallback link
      window.location.href = fallbackLink;
      break;
    }
  }

  function killPopup() {
    window.removeEventListener('pagehide', killPopup);
  }
  window.addEventListener('pagehide', killPopup);
});
