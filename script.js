const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const tileBoard = document.querySelector("#tileBoard");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (tileBoard) {
  const tileCount = window.matchMedia("(max-width: 720px)").matches ? 45 : 60;

  for (let index = 0; index < tileCount; index += 1) {
    const tile = document.createElement("span");
    tile.className = "tile";
    tile.style.animationDelay = `${(index % 12) * 120}ms`;
    tile.style.animationDuration = `${4200 + (index % 7) * 320}ms`;
    tileBoard.appendChild(tile);
  }

  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    tileBoard.style.transform = `rotate(-2deg) translate(${x}px, ${y}px)`;
  });
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim() || "there";

    formNote.textContent = `Thanks, ${name}. Your inquiry is ready to connect to a real inbox.`;
    contactForm.reset();
  });
}
