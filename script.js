const menuBtns = document.querySelectorAll(".menu-btn");
const iconHamb = document.getElementById("icon-hamburger");
const logo = document.querySelector(".logo");
const logoMenu = document.querySelector(".menu-logo");
const iconClose = document.getElementById("icon-close");
const navbarMenu = document.querySelector(".navbar-menu");
const faq = document.querySelector(".faq-items");
const features = document.querySelector(".features-content");
const featuresList = document.querySelectorAll(".features-list");
const emailInput = document.querySelector(".email-input");
const emailSubmit = document.querySelector(".email-submit");
const errorMsg = document.querySelector(".error-msg");
const successMsg = document.querySelector(".success-msg");

// Features items
const featuresEls = [
  {
    img: "illustration-features-tab-1.svg",
    title: "Bookmark in one click",
    text: "Organize your bookmarks however you like. Our simple drag-our-drop interface gives you complete control over how you manage your favourite sites.",
  },
  {
    img: "illustration-features-tab-2.svg",
    title: "Intelligent search",
    text: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
  },
  {
    img: "illustration-features-tab-3.svg",
    title: "Share your bookmarks",
    text: "Easily share your bookmarks and collections with others. Create a sharable link that you can send at the click of a button.",
  },
];

// FAQ items
const faqItemsEls = [
  {
    title: "What is Bookmark?",
    text: "Bookmark is a sleek browser extension designed to simplify and enhance your bookmarking experience. It allows you to save and organize your favorite websites with ease, making it simple to revisit your most-loved online destinations.",
  },
  {
    title: "How can I request a new browser?",
    text: "Our team is working on adding compatibility with other browsers, most notably Opera. Stay tunes for upcoming updates.",
  },
  {
    title: "Is there a mobile app?",
    text: "Currently, Bookmark is primarily designed as a browser extension for desktop use. However, we're actively exploring options for a mobile app to make your bookmarking experience even more convenient on the go. Stay tuned for updates!",
  },
  {
    title: "What about other Chromium browsers?",
    text: "As long as this browser supports Chrome extentions, it should work.",
  },
];

// Toggle function for the menu
function toggleMenu() {
  navbarMenu.classList.toggle("active");
  iconHamb.classList.toggle("hide");
  logo.classList.toggle("hide");
  logoMenu.classList.toggle("hide");
}

menuBtns.forEach((btn) => {
  btn.addEventListener("click", toggleMenu);
});

// Function to change the tab content
const tabChange = (e) => {
  const index = e.target.dataset.position;
  const { img, title, text } = featuresEls[index];

  features.innerHTML = "";
  features.innerHTML = `<div class="feature">
          <img src="./images/${img}" alt=${title} />
          <div class="feature-text">
            <h2>${title}</h2>
            <p>${text}</p>
            <button class="feature-button">More info</button>
          </div>
        </div>
    `;
};

featuresList.forEach((item) => {
  item.addEventListener("click", tabChange);
});

// Render function for the FAQ
function renderFaq() {
  faq.innerHTML = `
  ${faqItemsEls
    .map((item) => {
      return `
    <div class="faq-item">
    <div class="faq-title">${item.title}
      <span><img class="faq-arrow" /></span>
    </div>
      <p class="faq-text">${item.text}</p>
    </div>`;
    })
    .join("")}
  `;
}

renderFaq();

faq.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("faq-title")) {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      if (item !== target.closest(".faq-item")) {
        // Remove "active" class from all FAQ items except the clicked one
        item.classList.remove("active");
      }
    });
    const faqItem = target.closest(".faq-item");
    faqItem.classList.toggle("active");
  }
});

// Check for email validity
let email = "";

emailInput.addEventListener("input", (e) => {
  email = e.target.value;
});

emailSubmit.addEventListener("click", () => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = email.match(emailRegex);

  if (isEmailValid) {
    handleValidEmail();
  } else {
    handleInvalidEmail();
  }
});

function handleValidEmail() {
  clearErrorState();
  emailInput.value = "";
  emailInput.classList.add("success");
  successMsg.style.display = "block";

  setTimeout(clearSuccessState, 1000);
}

function clearErrorState() {
  emailInput.classList.remove("error");
  errorMsg.style.display = "none";
}

function handleInvalidEmail() {
  clearSuccessState();
  emailInput.classList.add("error");
  errorMsg.style.display = "block";

  setTimeout(clearErrorState, 1000);
}

function clearSuccessState() {
  emailInput.classList.remove("success");
  successMsg.style.display = "none";
}
