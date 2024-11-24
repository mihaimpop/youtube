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
  const redirectTimeout = 2000;
  const androidLink =
    'intent://www.youtube.com/@meMihai#Intent;package=com.google.android.youtube;scheme=https;end';
  const iOSLink = 'vnd.youtube://www.youtube.com/@meMihai';
  const fallbackLink = 'https://youtube.com/@meMihai';

  switch (os) {
    case ANDROID_PHONE: {
      window.location = androidLink;
      window.setTimeout(function () {
        window.location = fallbackLink;
      }, redirectTimeout);
      break;
    }
    case IOS_PHONE: {
      window.location = iOSLink;
      window.setTimeout(function () {
        window.location = fallbackLink;
      }, redirectTimeout);
      break;
    }
    case UNKNOWN: {
      window.location = fallbackLink;
      break;
    }
  }

  function killPopup() {
    window.removeEventListener('pagehide', killPopup);
  }
  window.addEventListener('pagehide', killPopup);
});
