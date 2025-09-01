// Smooth scrolling and active link highlight
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 50,
      behavior: "smooth",
    });

    document
      .querySelectorAll("nav a")
      .forEach((a) => a.classList.remove("active"));
    this.classList.add("active");
  });
});

// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(`Thank you for contacting me, ${name}! I will get back to you soon.`);
  this.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Splash animation on button click
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const splash = document.createElement("span");
    splash.classList.add("splash");

    const rect = btn.getBoundingClientRect();
    splash.style.left = `${e.clientX - rect.left}px`;
    splash.style.top = `${e.clientY - rect.top}px`;
    splash.style.width = splash.style.height = "100px";

    btn.appendChild(splash);
    setTimeout(() => splash.remove(), 600);
  });
});
