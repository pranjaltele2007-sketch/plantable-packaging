// Plantable Packaging - Interactive Web App
// Founder: Rudra Morkhade | Pune, India

document.addEventListener('DOMContentLoaded', () => {
  initPrototypeGallery();
  initJourneySimulator();
  initB2BCalculator();
  initSeedSelector();
  initSampleModal();
  initImpactSimulator();
  initFAQ();
  initMobileMenu();
  lucide.createIcons();
});

// 1. Prototype Gallery Switcher
function initPrototypeGallery() {
  const mainImage = document.getElementById('gallery-main-img');
  const mainTitle = document.getElementById('gallery-title');
  const mainSubtitle = document.getElementById('gallery-subtitle');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  const galleryData = {
    closed: {
      src: 'assets/images/box-closed.png',
      title: 'Precision Die-Cut Interlocking Box',
      subtitle: 'Engineered for seamless shipping protection without synthetic glues or toxic tapes.'
    },
    open: {
      src: 'assets/images/box-open.png',
      title: 'Flaps Open: The Unboxing Experience',
      subtitle: 'Smooth interior fold lines, non-toxic vegetable ink printing, and tactile organic texture.'
    },
    presentation: {
      src: 'assets/images/prototype-presentation.png',
      title: 'Complete Prototype Presentation Kit',
      subtitle: 'Prototype dimensions: 10 x 8 x 3.5 cm — ideal for organic soaps, cosmetics, and luxury gifts.'
    },
    texture: {
      src: 'assets/images/texture-zoom.png',
      title: 'Macro Seed Paper Texture',
      subtitle: 'Cold-pressed recycled cotton rag pulp with embedded, high-germination non-GMO seeds.'
    }
  };

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('ring-2', 'ring-emerald-600', 'border-transparent', 'bg-emerald-50'));
      thumb.classList.add('ring-2', 'ring-emerald-600', 'bg-emerald-50');

      const view = thumb.getAttribute('data-view');
      if (galleryData[view]) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = galleryData[view].src;
          mainTitle.textContent = galleryData[view].title;
          mainSubtitle.textContent = galleryData[view].subtitle;
          mainImage.style.opacity = '1';
        }, 150);
      }
    });
  });
}

// 2. Interactive Plantable Journey (5-Step Simulator)
function initJourneySimulator() {
  const steps = [
    {
      num: 1,
      name: "Unbox with Joy",
      icon: "package",
      desc: "Your customer receives their order in a gorgeous, earthy textured box made from 100% recycled paper pulp. No plastic tape, no guilt.",
      tip: "Over 82% of customers photograph and share seed paper unboxings on Instagram and Pinterest."
    },
    {
      num: 2,
      name: "Tear into Pieces",
      icon: "scissors",
      desc: "Once the product is removed, tear the seed paper box into small 2 to 3 cm pieces. This allows the roots to easily penetrate the soil as it decomposes.",
      tip: "The embedded seeds are carefully safeguarded during cold-slurry processing so embryos stay fully viable."
    },
    {
      num: 3,
      name: "Soak for 6-8 Hours",
      icon: "droplet",
      desc: "Place the torn paper fragments in a bowl of fresh water for 6 to 8 hours. The moisture softens the natural starch binder and awakens the seed embryos.",
      tip: "You will notice the fibrous cotton pulp becoming supple and ready to integrate into potting soil."
    },
    {
      num: 4,
      name: "Plant in Soil",
      icon: "sprout",
      desc: "Place the soaked paper fragments into a plant pot or garden bed, covering lightly with 2-3 cm of potting soil. Water gently to maintain moisture.",
      tip: "Works wonderfully in small hostel desk pots, balcony planters, or open soil beds!"
    },
    {
      num: 5,
      name: "Bloom & Harvest",
      icon: "flower-2",
      desc: "Place in natural sunlight and water daily. In 5-10 days, vibrant green sprouts appear, blooming into fresh Tulsi, Mint, or Marigold flowers!",
      tip: "The paper completely biodegrades into natural organic compost, leaving zero trash behind."
    }
  ];

  let currentStep = 0;
  const stepButtons = document.querySelectorAll('.journey-step-btn');
  const stepNumber = document.getElementById('journey-num');
  const stepName = document.getElementById('journey-name');
  const stepDesc = document.getElementById('journey-desc');
  const stepTip = document.getElementById('journey-tip');
  const progressBar = document.getElementById('journey-progress-bar');
  const prevBtn = document.getElementById('journey-prev');
  const nextBtn = document.getElementById('journey-next');

  function renderStep(index) {
    currentStep = index;
    const step = steps[index];

    stepButtons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('bg-emerald-700', 'text-white', 'shadow-md');
        btn.classList.remove('bg-emerald-50', 'text-emerald-900');
      } else {
        btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-md');
        btn.classList.add('bg-emerald-50', 'text-emerald-900');
      }
    });

    stepNumber.textContent = `STEP 0${step.num} OF 05`;
    stepName.textContent = step.name;
    stepDesc.textContent = step.desc;
    stepTip.textContent = step.tip;
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;

    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === steps.length - 1 ? 'Start Over' : 'Next Step →';
    lucide.createIcons();
  }

  stepButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => renderStep(idx));
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) renderStep(currentStep - 1);
    });
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        renderStep(currentStep + 1);
      } else {
        renderStep(0);
      }
    });
  }

  renderStep(0);
}

// 3. Dynamic B2B Bulk Price & Savings Calculator
function initB2BCalculator() {
  const qtyInput = document.getElementById('calc-qty');
  const qtyDisplay = document.getElementById('calc-qty-display');
  const sizeSelect = document.getElementById('calc-size');
  const seedSelect = document.getElementById('calc-seed');
  const printSelect = document.getElementById('calc-print');

  const unitPriceEl = document.getElementById('calc-unit-price');
  const totalPriceEl = document.getElementById('calc-total-price');
  const savingsEl = document.getElementById('calc-savings');
  const plasticAvoidedEl = document.getElementById('calc-plastic');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');

  // Base pricing tiers based on local Indian manufacturing vs imported alternatives
  function calculatePricing() {
    const qty = parseInt(qtyInput.value, 10);
    qtyDisplay.textContent = Number(qty).toLocaleString('en-IN') + ' boxes';

    // Base price per box by size
    let basePrice = 24.0; // standard soap/cosmetic box (10x8x3.5cm)
    const size = sizeSelect.value;
    if (size === 'small') basePrice = 18.0;      // 7x7x3 cm (Jewelry/Lip balms)
    else if (size === 'medium') basePrice = 24.0; // 10x8x3.5 cm (Standard prototype)
    else if (size === 'large') basePrice = 36.0;  // 18x12x6 cm (Gift box/Apparel)
    else if (size === 'mailer') basePrice = 32.0; // Rigid Die-Cut Mailer

    // Seed modifier
    let seedMod = 0;
    if (seedSelect.value === 'herbs') seedMod = 1.5;
    else if (seedSelect.value === 'veggies') seedMod = 2.0;

    // Printing modifier
    let printMod = 0;
    if (printSelect.value === '1color') printMod = 1.0;
    else if (printSelect.value === 'multicolor') printMod = 2.5;

    // Volume discount tiers (local Indian micro-batch scaling)
    let discount = 0.0;
    if (qty >= 10000) discount = 0.35;
    else if (qty >= 5000) discount = 0.28;
    else if (qty >= 2500) discount = 0.22;
    else if (qty >= 1000) discount = 0.15;
    else if (qty >= 500) discount = 0.08;

    const unitPrice = Math.max(12.5, (basePrice + seedMod + printMod) * (1 - discount));
    const totalPrice = unitPrice * qty;

    // Benchmark against imported seed paper (e.g., Botanical PaperWorks / noissue: approx ₹95 - ₹130 per unit with customs & shipping)
    const importedUnitCost = 110.0;
    const importedTotal = importedUnitCost * qty;
    const savings = Math.max(0, importedTotal - totalPrice);

    // Eco impact
    const plasticAvoidedKg = ((qty * 0.038)).toFixed(1); // avg plastic tape + mailer weight avoided in kg

    unitPriceEl.textContent = `₹${unitPrice.toFixed(2)}`;
    totalPriceEl.textContent = `₹${Math.round(totalPrice).toLocaleString('en-IN')}`;
    savingsEl.textContent = `₹${Math.round(savings).toLocaleString('en-IN')}`;
    plasticAvoidedEl.textContent = `${Number(plasticAvoidedKg).toLocaleString('en-IN')} kg`;

    // WhatsApp lead link
    if (whatsappQuoteBtn) {
      const msg = encodeURIComponent(
        `Hi Rudra! I used your calculator on the Plantable Packaging website:\n` +
        `• Quantity: ${qty} units\n` +
        `• Size: ${sizeSelect.options[sizeSelect.selectedIndex].text}\n` +
        `• Seed: ${seedSelect.options[seedSelect.selectedIndex].text}\n` +
        `• Print: ${printSelect.options[printSelect.selectedIndex].text}\n` +
        `• Estimated Quote: ₹${unitPrice.toFixed(2)}/unit (Total: ₹${Math.round(totalPrice)})\n` +
        `Please share formal sample details and custom artwork template!`
      );
      whatsappQuoteBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  }

  [qtyInput, sizeSelect, seedSelect, printSelect].forEach(el => {
    el.addEventListener('input', calculatePricing);
    el.addEventListener('change', calculatePricing);
  });

  calculatePricing();
}

// 4. Seed Variety Selector
function initSeedSelector() {
  const seedCards = document.querySelectorAll('.seed-card');
  const previewName = document.getElementById('seed-preview-name');
  const previewLatin = document.getElementById('seed-preview-latin');
  const previewDays = document.getElementById('seed-preview-days');
  const previewSun = document.getElementById('seed-preview-sun');
  const previewDesc = document.getElementById('seed-preview-desc');
  const previewBadge = document.getElementById('seed-preview-badge');

  const seedData = {
    tulsi: {
      name: "Holy Basil (Krishna Tulsi)",
      latin: "Ocimum tenuiflorum",
      days: "4 - 7 Days",
      sun: "Direct Sun (4-6 hrs)",
      badge: "India's #1 Choice",
      desc: "Sacred, aromatic, and packed with antioxidants. A beloved household herb that sprouts with exceptional vigour in any Indian climate, offering high germination rates even for beginner gardeners."
    },
    marigold: {
      name: "French Royal Marigold",
      latin: "Tagetes patula",
      days: "5 - 8 Days",
      sun: "Full Sunlight",
      badge: "Vibrant Blooms",
      desc: "Radiant golden and crimson blossoms that naturally repel garden pests and attract honeybees and butterflies. Perfect for festive gifting, wedding favor boxes, and celebration packaging."
    },
    mint: {
      name: "Peppermint & Spearmint",
      latin: "Mentha piperita",
      days: "7 - 10 Days",
      sun: "Partial / Indoor Bright",
      badge: "Desk-Friendly",
      desc: "The ultimate student and urban resident favourite. Compact, fragrant, and thrives in small indoor desktop mugs or balcony planters. Ideal for morning tea and fresh kitchen garnishes."
    },
    tomato: {
      name: "Cherry Tomato & Chili Mix",
      latin: "Solanum lycopersicum",
      days: "6 - 9 Days",
      sun: "Full Sunlight",
      badge: "Kitchen Garden",
      desc: "An exciting edible harvest for home chefs. The packaging transforms into sweet cherry tomato plants or fiery bird's eye chilies within 60 days of planting."
    },
    wildflower: {
      name: "Bee & Butterfly Pollinator Mix",
      latin: "Wildflower Blend",
      days: "5 - 10 Days",
      sun: "Full / Partial Sun",
      badge: "Biodiversity Booster",
      desc: "A carefully curated blend of native Indian wildflowers designed to restore urban biodiversity. Each planted box becomes a micro-haven for local pollinators."
    }
  };

  seedCards.forEach(card => {
    card.addEventListener('click', () => {
      seedCards.forEach(c => c.classList.remove('border-emerald-600', 'bg-emerald-50', 'ring-2', 'ring-emerald-500'));
      card.classList.add('border-emerald-600', 'bg-emerald-50', 'ring-2', 'ring-emerald-500');

      const key = card.getAttribute('data-seed');
      const data = seedData[key];
      if (data) {
        previewName.textContent = data.name;
        previewLatin.textContent = data.latin;
        previewDays.textContent = data.days;
        previewSun.textContent = data.sun;
        previewDesc.textContent = data.desc;
        previewBadge.textContent = data.badge;
      }
    });
  });
}

// 5. Sample Box Request Modal & Form
function initSampleModal() {
  const modal = document.getElementById('sample-modal');
  const openBtns = document.querySelectorAll('.open-sample-modal');
  const closeBtn = document.getElementById('close-sample-modal');
  const form = document.getElementById('sample-form');
  const formContent = document.getElementById('sample-form-content');
  const successContent = document.getElementById('sample-success-content');
  const trackingNumber = document.getElementById('sample-tracking-num');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const brandName = document.getElementById('sample-brand').value;
      const founderName = document.getElementById('sample-name').value;
      const city = document.getElementById('sample-city').value;

      const randomId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
      trackingNumber.textContent = randomId;

      formContent.classList.add('hidden');
      successContent.classList.remove('hidden');

      // Update success text
      document.getElementById('sample-success-msg').textContent =
        `Thank you ${founderName}! Your complimentary Plantable Packaging Kit for "${brandName}" is being prepared for dispatch to ${city}. You will receive delivery updates on WhatsApp.`;
    });
  }
}

// 6. Impact Simulator
function initImpactSimulator() {
  const impactSlider = document.getElementById('impact-slider');
  const impactDisplay = document.getElementById('impact-slider-display');
  const treesEl = document.getElementById('impact-trees');
  const plantsEl = document.getElementById('impact-plants');
  const plasticAvoidedEl = document.getElementById('impact-plastic');
  const co2El = document.getElementById('impact-co2');

  function updateImpact() {
    const boxes = parseInt(impactSlider.value, 10);
    impactDisplay.textContent = Number(boxes).toLocaleString('en-IN') + ' monthly shipments';

    // 100 boxes = ~4 plants germinated (40% average planting rate), 3.8kg plastic avoided, 0.08 trees saved
    const plants = Math.round(boxes * 0.42);
    const plasticKg = (boxes * 0.038).toFixed(1);
    const trees = (boxes * 0.0007).toFixed(1);
    const co2Kg = (boxes * 0.12).toFixed(1);

    plantsEl.textContent = plants.toLocaleString('en-IN') + '+';
    plasticAvoidedEl.textContent = `${plasticKg} kg`;
    treesEl.textContent = `${trees} Trees`;
    co2El.textContent = `${co2Kg} kg`;
  }

  if (impactSlider) {
    impactSlider.addEventListener('input', updateImpact);
    updateImpact();
  }
}

// 7. FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    header.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');
      
      // Close all
      faqItems.forEach(other => {
        other.querySelector('.faq-answer').classList.add('hidden');
        other.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 8. Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}
