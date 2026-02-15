// User footer
export function footer() {
  return `
  <!-- ===== CTA Section ===== -->
  <section class="py-5 text-white text-center"
    style="background: linear-gradient(90deg, #2563eb, #9333ea);">
    <div class="container">

      <div class="mb-3">
        <i class="fa-solid fa-store fs-1"></i>
      </div>

      <h2 class="fw-bold" id="ctaTitle"></h2>
      <p class="mb-4" id="ctaDesc"></p>

      <a href="#" id="ctaBtn" class="btn btn-light px-4 py-2 fw-semibold">
        <span></span>
        <i class="fa-solid fa-arrow-right ms-2"></i>
      </a>

    </div>
  </section>

  <!-- ===== Footer ===== -->
  <footer class="text-light pt-5 footer-bg">
    <div class="container">

      <div class="row g-4 text-start">

        <!-- Brand -->
        <div class="col-lg-3 col-12">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div class="fw-bold btn btn-primary rounded">E</div>
            <span class="fw-bold fs-5" id="brandName"></span>
          </div>
          <p class="small text-secondary" id="brandDesc"></p>

          <div class="d-flex gap-3" id="socialLinks"></div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-12">
          <h6 class="fw-bold mb-3">Quick Links</h6>
          <ul class="list-unstyled d-flex flex-column gap-2" id="quickLinks"></ul>
        </div>

        <!-- Customer Service -->
        <div class="col-lg-3 col-12">
          <h6 class="fw-bold mb-3">Customer Service</h6>
          <ul class="list-unstyled d-flex flex-column gap-2" id="serviceLinks"></ul>
        </div>

        <!-- Contact -->
        <div class="col-lg-3 col-12">
          <h6 class="fw-bold mb-3">Contact Us</h6>
          <ul class="list-unstyled d-flex flex-column gap-3 text-secondary" id="contactInfo"></ul>
        </div>

      </div>

      <hr class="border-secondary my-4">

      <p class="text-center small text-secondary mb-0">
        © <span id="year"></span> <span id="copyName"></span>. All rights reserved.
      </p>

    </div>
  </footer>
  `;
}

export function initFooter() {

  /* ===== DATA ===== */
  const footerData = {
    brand: {
      name: "E-Shop",
      desc: "Your trusted online marketplace for quality products at great prices.",
    },

    cta: {
      title: "Start Selling on Our Platform",
      desc: "Join thousands of successful sellers. Create your seller account today!",
      text: "Become a Seller",
      link: "#"
    },

    social: [
      { icon: "fa-facebook", link: "#" },
      { icon: "fa-twitter", link: "#" },
      { icon: "fa-instagram", link: "#" }
    ],

    quickLinks: ["Home", "Products", "About Us", "Contact"],

    serviceLinks: [
      "Help Center",
      "Track Order",
      "Returns & Refunds",
      "Shipping Info"
    ],

    contact: [
      { icon: "fa-location-dot", text: "123 Commerce Street, City, State 12345" },
      { icon: "fa-phone", text: "+1 (555) 123-4567" },
      { icon: "fa-envelope", text: "support@eshop.com" }
    ]
  };

  /* ===== CTA ===== */
  $("#ctaTitle").text(footerData.cta.title);
  $("#ctaDesc").text(footerData.cta.desc);
  $("#ctaBtn span").text(footerData.cta.text);
  $("#ctaBtn").attr("href", footerData.cta.link);

  /* ===== Brand ===== */
  $("#brandName").text(footerData.brand.name);
  $("#brandDesc").text(footerData.brand.desc);
  $("#copyName").text(footerData.brand.name);

  /* ===== Social ===== */
  footerData.social.forEach(s => {
    $("#socialLinks").append(`
      <a href="${s.link}" class="text-light">
        <i class="fa-brands ${s.icon} fs-5"></i>
      </a>
    `);
  });

  /* ===== Quick Links ===== */
  footerData.quickLinks.forEach(link => {
    $("#quickLinks").append(`
      <li>
        <a href="#" class="text-secondary text-decoration-none">${link}</a>
      </li>
    `);
  });

  /* ===== Service Links ===== */
  footerData.serviceLinks.forEach(link => {
    $("#serviceLinks").append(`
      <li>
        <a href="#" class="text-secondary text-decoration-none">${link}</a>
      </li>
    `);
  });

  /* ===== Contact ===== */
  footerData.contact.forEach(item => {
    $("#contactInfo").append(`
      <li>
        <i class="fa-solid ${item.icon} me-2"></i>
        ${item.text}
      </li>
    `);
  });

  /* ===== Year ===== */
  $("#year").text(new Date().getFullYear());
}
