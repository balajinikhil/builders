const close = document.querySelector(".close");
const cookieBanner = document.querySelector(".cookie-banner");
document.addEventListener("DOMContentLoaded", () => {
  const consent = JSON.stringify(localStorage.getItem("cookie-consent-jireh"));
  console.log(consent);

  if (consent != "null") {
    cookieBanner.style.display = "none";
  }
});

// console.log(close);

close.addEventListener("click", (e) => {
  cookieBanner.style.display = "none";
  localStorage.setItem("cookie-consent-jireh", "true");
});
