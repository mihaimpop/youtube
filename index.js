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
  console.log(`Detected OS: ${os}`);

  const androidIntentLink =
    'intent://www.youtube.com/@meMihai#Intent;scheme=https;package=com.google.android.youtube;end';
  const androidYouTubeSchemeLink = 'youtube://www.youtube.com/@meMihai';
  const iOSLink = 'vnd.youtube://www.youtube.com/@meMihai';
  const fallbackLink = 'https://youtube.com/@meMihai';

  if (os === ANDROID_PHONE) {
    console.log('Attempting to open YouTube app via Intent URL.');
    window.location.href = androidIntentLink;
    setTimeout(() => {
      console.log('Attempting to open YouTube app via YouTube URI scheme.');
      window.location.href = androidYouTubeSchemeLink;
      setTimeout(() => {
        console.log('Falling back to YouTube mobile website.');
        window.location.href = fallbackLink;
      }, 3000);
    }, 3000);
  } else if (os === IOS_PHONE) {
    console.log('Attempting to open YouTube app via custom scheme.');
    window.location.href = iOSLink;
    setTimeout(() => {
      console.log('Falling back to YouTube mobile website.');
      window.location.href = fallbackLink;
    }, 3000);
  } else {
    console.log(
      'Operating system unknown. Redirecting to YouTube mobile website.',
    );
    window.location.href = fallbackLink;
  }
});
