// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

function show() {
  var p = document.getElementById("pwd");
  p.setAttribute("type", "text");
}

function hide() {
  var p = document.getElementById("pwd");
  p.setAttribute("type", "password");
}

var pwShown = 0;

document.getElementById("eye").addEventListener(
  "click",
  function () {
    if (pwShown == 0) {
      pwShown = 1;
      show();
    } else {
      pwShown = 0;
      hide();
    }
  },
  false
);

const form = document.querySelector(".loginSubimt");
const err = document.querySelector(".err");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let user = {
    username: e.target.elements.username.value,
    password: e.target.elements.password.value,
  };

  let response = await fetch("/admin/login ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  if (result.status === "success") {
    window.location.assign("/admin/dashboard");
  } else {
    alert(`check username and password`);
  }
});
