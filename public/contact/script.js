const form = document.querySelector(".contact-form");
const errorContent = document.querySelector(".content");
let name = document.querySelector("input[name='name']");
let subject = document.querySelector("input[name='subject']");
let message = document.querySelector("textarea[name='message']");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   document.querySelector(".contact-form").submit();

  if (name.value.length > 20 || name.value.length < 3) {
    const alertMsg = document.querySelector(".button1").click();
    errorContent.innerHTML = `Name must be less than 20 characters `;
    return;
  } else if (subject.value.length > 20 || subject.value.length < 3) {
    const alertMsg = document.querySelector(".button1").click();
    errorContent.innerHTML = `Subject must be less than 20 characters `;
    return;
  } else if (message.value.length > 200 || message.value.length < 5) {
    const alertMsg = document.querySelector(".button1").click();
    errorContent.innerHTML = `Message must be less than 200 characters`;
    return;
  } else {
    let data = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      subject: e.target.elements.subject.value,
      message: e.target.elements.message.value,
    };
    let response = await fetch("/contact ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    if (result.status === "success") {
      const alertMsg = document.querySelector(".button1").click();
      errorContent.style.color = `green`;
      errorContent.innerHTML = `Thank You for contacting us`;
      e.target.elements.name.value = "";
      e.target.elements.email.value = "";
      e.target.elements.subject.value = "";
      e.target.elements.message.value = "";
    } else {
      const alertMsg = document.querySelector(".button1").click();
      errorContent.innerHTML = `Something went wrong try again`;
    }
  }
});

// form.addEventListener("click", (e) => {
//   e.preventDefault();
//   const alertMsg = document.querySelector(".button1").click();
//   errorContent.style.color = `green`;
//   errorContent.innerHTML = `<p>Thank You for contacting us</p>`;
// });

// function onSubmit(token) {
//     document.getElementById("demo-form").submit();
// }

function onSubmit(token) {
  document.querySelector(".contact-form").submit();
}
