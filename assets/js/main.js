// Versifio — minimal interactions.
// Two things only: reveal-on-scroll, and signup-form placeholder behavior.
// Email endpoint is TBD (see VERSIFIO.md). Form currently no-ops with a
// friendly confirmation so the UX is testable. Wire the real ESP when
// the offer is decided.

(function () {
  "use strict";

  // ─── Reveal-on-scroll ────────────────────────────────────────
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    // No IO support — just show them.
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // ─── Signup form (placeholder behavior) ──────────────────────
  const form = document.getElementById("signup-form");
  const feedback = document.getElementById("signup-feedback");

  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = form.querySelector("input[type=email]");
      const email = (emailInput.value || "").trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.textContent = "Please enter a valid email.";
        feedback.classList.add("error");
        return;
      }

      // TODO: replace with real ESP endpoint (Beehiiv / Buttondown / etc).
      // For now: accept silently so the UX flow is correct end-to-end.
      feedback.classList.remove("error");
      feedback.textContent = "Thank you. The first issue is on its way.";
      emailInput.value = "";
    });
  }
})();
