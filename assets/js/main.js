// Crystal Tech Services — shared site behavior (no motion/animation by design)

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("mobile-open");
    });
  }

  /* IDF — Employee ID Verification */
  var idfButton = document.querySelector("[data-idf-open]");
  var idfOverlay = document.querySelector("[data-idf-overlay]");
  var idfClose = document.querySelector("[data-idf-close]");
  var idfForm = document.querySelector("[data-idf-form]");
  var idfInput = document.querySelector("[data-idf-input]");
  var idfResult = document.querySelector("[data-idf-result]");

  // Placeholder directory — sequential IDs assigned for this demo feature.
  // Replace with real HR data before production use.
  var employeeDirectory = {
    "CTS-1001": {
      name: "Ahmad Qasim Zolal",
      position: "General Manager · Cybersecurity Specialist",
      experience: "Not specified in company records"
    },
    "CTS-1002": {
      name: "Abdul Matin Ebrahimi",
      position: "Director · IT Expert",
      experience: "6+ years"
    },
    "CTS-1003": {
      name: "Ramin Afzali",
      position: "Senior Software Developer",
      experience: "6+ years"
    }
  };

  function openIdfModal() {
    if (!idfOverlay) return;
    idfOverlay.classList.add("open");
    if (idfResult) {
      idfResult.classList.remove("show", "found", "not-found");
      idfResult.innerHTML = "";
    }
    if (idfInput) {
      idfInput.value = "";
      idfInput.focus();
    }
  }

  function closeIdfModal() {
    if (idfOverlay) idfOverlay.classList.remove("open");
  }

  if (idfButton) idfButton.addEventListener("click", openIdfModal);
  if (idfClose) idfClose.addEventListener("click", closeIdfModal);
  if (idfOverlay) {
    idfOverlay.addEventListener("click", function (e) {
      if (e.target === idfOverlay) closeIdfModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeIdfModal();
  });

  if (idfForm) {
    idfForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = (idfInput.value || "").trim().toUpperCase();
      var record = employeeDirectory[raw];

      if (!idfResult) return;
      idfResult.classList.add("show");

      if (record) {
        idfResult.classList.remove("not-found");
        idfResult.classList.add("found");
        idfResult.innerHTML =
          '<div class="idf-result-name">' + record.name + "</div>" +
          '<div class="idf-result-row"><strong>Position:</strong> ' + record.position + "</div>" +
          '<div class="idf-result-row"><strong>Experience:</strong> ' + record.experience + "</div>";
      } else {
        idfResult.classList.remove("found");
        idfResult.classList.add("not-found");
        idfResult.innerHTML = "<div><strong>No employee found</strong> for ID “" + idfInput.value + "”. Please check the ID and try again.</div>";
      }
    });
  }
});
