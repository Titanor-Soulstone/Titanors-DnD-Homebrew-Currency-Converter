// Function to check and apply dark mode preference
function checkAndApplyDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunMoon = document.getElementById('sunMoon');
  const darkModeCookie = getCookie('darkMode');

  if (darkModeCookie === 'enabled') {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
    sunMoon.innerHTML = '&#x1F319;'; // Moon symbol
  } else {
    darkModeToggle.checked = false;
    document.body.classList.remove('dark-mode');
    sunMoon.innerHTML = '&#x2600;'; // Sun symbol
  }
}

// Dark Mode Toggle Function
function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunMoon = document.getElementById('sunMoon');

  if (darkModeToggle.checked) {
    body.classList.add('dark-mode');
    sunMoon.innerHTML = '&#x1F319;'; // Moon symbol
    setCookie('darkMode', 'enabled', 365);
  } else {
    body.classList.remove('dark-mode');
    sunMoon.innerHTML = '&#x2600;'; // Sun symbol
    setCookie('darkMode', 'disabled', 365);
  }

  // Communicate with the iframe
  const iframe = document.getElementById('currencyTable');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ darkMode: darkModeToggle.checked }, '*');
  }
}

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

// Function to get a cookie
function getCookie(name) {
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// Function to accept cookies
function acceptCookies() {
  document.getElementById('cookieConsent').style.display = 'none';
  setCookie('cookieConsent', 'accepted', 365);

  // Check and apply dark mode preference
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunMoon = document.getElementById('sunMoon');
  const darkModeCookie = getCookie('darkMode');

  if (darkModeCookie === 'enabled') {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
    sunMoon.innerHTML = '&#x1F319;'; // Moon symbol
  } else {
    darkModeToggle.checked = false;
    document.body.classList.remove('dark-mode');
    sunMoon.innerHTML = '&#x2600;'; // Sun symbol
  }

  applyDarkModeToIframe(); // Apply dark mode styles to the iframe content
}

// Function to apply dark mode styles to iframe content
function applyDarkModeToIframe() {
  const iframe = document.querySelector('iframe');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // Apply dark mode styles to the iframe content
  const elements = iframeDoc.querySelectorAll('body, h1, h2, label, th, td, button');
  elements.forEach(element => {
    element.classList.toggle('dark-mode', document.body.classList.contains('dark-mode'));
  });
}

// Event listener for dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
  toggleDarkMode();
  applyDarkModeToIframe();
});

// Check and apply dark mode preference on initial load
window.addEventListener('load', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunMoon = document.getElementById('sunMoon');
  const darkModeCookie = getCookie('darkMode');

  if (darkModeCookie === 'enabled') {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
    sunMoon.innerHTML = '&#x1F319;'; // Moon symbol
  } else {
    darkModeToggle.checked = false;
    document.body.classList.remove('dark-mode');
    sunMoon.innerHTML = '&#x2600;'; // Sun symbol
  }

  applyDarkModeToIframe(); // Apply dark mode styles to the iframe on initial load
});

// Check and apply dark mode preference on initial load
window.addEventListener('load', function () {
  checkAndApplyDarkMode();
});

// Check and apply dark mode preference in case of cookie consent
if (getCookie('cookieConsent') === 'accepted') {
  checkAndApplyDarkMode();
}
