const WINDOWS_PHONE = 'Windows Phone';
const ANDROID_PHONE = 'Android';
const IOS_PHONE = 'iOS';
const UNKNOWN = 'unknown';

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return WINDOWS_PHONE;
  }

  if (/android/i.test(userAgent)) {
    return ANDROID_PHONE;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return IOS_PHONE;
  }

  return UNKNOWN;
}

window.onload = function () {
  const os = getMobileOperatingSystem();
  const androidLink =
    'intent://www.youtube.com/@meMihai#Intent;package=com.google.android.youtube;scheme=https;end';
  const iOSLink = 'vnd.youtube://www.youtube.com/@meMihai';
  const fallbackLink = 'https://youtube.com/@meMihai';

  switch (os) {
    case ANDROID_PHONE: {
      window.location = androidLink;
      window.setTimeout(function () {
        window.location = fallbackLink;
      }, 25);
    }
    case IOS_PHONE: {
      window.location = iOSLink;
      window.setTimeout(function () {
        window.location = fallbackLink;
      }, 25);
    }
    case UNKNOWN: {
      window.location = fallbackLink;
    }
  }

  function killPopup() {
    window.removeEventListener('pagehide', killPopup);
  }
  window.addEventListener('pagehide', killPopup);
};
