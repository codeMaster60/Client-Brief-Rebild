const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_92c5a48e-8623-473f-a5a1-8db9258d7044/artifacts/2ssxz91z_image.png";

const SERVICES = [
  {
    id: "Videography",
    title: "Videography",
    description: "Cinematic films, content shoots, brand reels.",
    image:
      "https://images.unsplash.com/photo-1619473667509-e1ae7f940812?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjaW5lbWElMjBjYW1lcmElMjBzdHVkaW8lMjBkYXJrfGVufDB8fHx8MTc3NzUzMTM5Nnww&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "Photography",
    title: "Photography",
    description: "Brand, product, lifestyle and editorial shoots.",
    image:
      "https://images.unsplash.com/photo-1768818653161-0ad28dede131?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW8lMjBkYXJrfGVufDB8fHx8MTc3NzUzMTM5MXww&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "Meta Ads",
    title: "Meta Ads",
    description: "Paid Facebook & Instagram performance campaigns.",
    image:
      "https://images.unsplash.com/photo-1764258559965-6de87677a260?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMGRpZ2l0YWwlMjBhYnN0cmFjdCUyMGxpbmVzfGVufDB8fHx8MTc3NzUzMTM5Nnww&ixlib=rb-4.1.0&q=85",
  },
];

const STEPS = ["Services", "Company", "Brand & Audience", "Goals & Budget", "Assets"];
const GOAL_OPTIONS = [
  "Lead generation",
  "Online sales",
  "Brand awareness",
  "Website traffic",
  "App installs",
  "Engagement / community",
  "Footfall to physical store",
];
const BUDGETS = [
  "Under INR 25,000 / month",
  "INR 25,000 - INR 75,000 / month",
  "INR 75,000 - INR 2,00,000 / month",
  "INR 2,00,000 - INR 5,00,000 / month",
  "INR 5,00,000+ / month",
  "Not sure - recommend something",
];

const initialState = {
  services: [],
  company_name: "",
  website: "",
  industry: "",
  contact_name: "",
  contact_role: "",
  email: "",
  phone: "",
  company_location: "",
  brand_description: "",
  brand_voice: "",
  usp: "",
  target_audience: "",
  target_locations: "",
  target_age_range: "",
  primary_goals: [],
  monthly_budget: "",
  start_date: "",
  campaign_duration: "",
  competitors: "",
  success_metrics: "",
  has_facebook_page: "",
  has_instagram: "",
  has_meta_business: "",
  previous_ads_experience: "",
  has_creative_assets: "",
  additional_notes: "",
};

const state = {
  step: 0,
  data: { ...initialState },
  files: [],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  logo: $("#brandLogo"),
  stepTitle: $("#stepTitle"),
  stepCounter: $("#stepCounter"),
  progressBars: $("#progressBars"),
  stepContent: $("#stepContent"),
  backButton: $("#backButton"),
  nextButton: $("#nextButton"),
  submitButton: $("#submitButton"),
  briefForm: $("#briefForm"),
  formView: $("#formView"),
  thankYouView: $("#thankYouView"),
  adminView: $("#adminView"),
  referenceId: $("#referenceId"),
  toast: $("#toast"),
  adminList: $("#adminList"),
  adminDetail: $("#adminDetail"),
  adminCount: $("#adminCount"),
};

els.logo.src = LOGO_URL;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}

function field(name, label, options = {}) {
  const value = escapeHtml(state.data[name]);
  const required = options.required ? "<b>*</b>" : "";
  const hint = options.hint ? `<small>${escapeHtml(options.hint)}</small>` : "";
  const placeholder = escapeHtml(options.placeholder || "");
  const type = options.type || "text";
  const control =
    options.textarea
      ? `<textarea class="textarea" id="${name}" data-field="${name}" placeholder="${placeholder}">${value}</textarea>`
      : `<input class="input" id="${name}" data-field="${name}" type="${type}" value="${value}" placeholder="${placeholder}" />`;

  return `
    <div class="field">
      <label for="${name}">${escapeHtml(label)} ${required}</label>
      ${control}
      ${hint}
    </div>
  `;
}


function pill(label, selected, action, value = label) {
  return `<button class="pill ${selected ? "selected" : ""}" type="button" data-action="${action}" data-value="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
}

function renderShell() {
  els.stepTitle.textContent = STEPS[state.step];
  els.stepCounter.textContent = `Step ${String(state.step + 1).padStart(2, "0")} / 05`;
  els.progressBars.innerHTML = STEPS.map((_, i) => `<span class="${i <= state.step ? "active" : ""}"></span>`).join("");

  $$(".step-nav-item").forEach((button, index) => {
    button.classList.toggle("active", index === state.step);
    button.classList.toggle("done", index < state.step);
  });

  els.backButton.disabled = state.step === 0;
  els.nextButton.classList.toggle("hidden", state.step === STEPS.length - 1);
  els.submitButton.classList.toggle("hidden", state.step !== STEPS.length - 1);
}

function renderStep() {
  renderShell();

  if (state.step === 0) {
    els.stepContent.innerHTML = `
      <p class="intro-text">
        Choose the services you're interested in. Pick one or more. We'll tailor
        the rest of this brief based on what you select.
      </p>
      <div class="service-grid">
        ${SERVICES.map((service) => {
          const selected = state.data.services.includes(service.id);
          return `
            <button class="service-card ${selected ? "selected" : ""}" type="button" data-action="toggle-service" data-value="${service.id}">
              <img src="${service.image}" alt="" />
              <span class="service-kicker">Service</span>
              <span class="check-box">${selected ? "✓" : ""}</span>
              <span class="service-card-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
              </span>
              ${selected ? '<span class="selected-line"></span>' : ""}
            </button>
          `;
        }).join("")}
      </div>
      ${state.data.services.length ? `<p class="selected-summary">${state.data.services.length} selected · ${escapeHtml(state.data.services.join(" · "))}</p>` : ""}
    `;
  }

  if (state.step === 1) {
    els.stepContent.innerHTML = `
      <div class="field-grid">
        ${field("company_name", "Company / Brand name", { required: true, placeholder: "Acme Studios" })}
        ${field("website", "Website", { placeholder: "https://" })}
        ${field("industry", "Industry / category", { required: true , placeholder: "e.g. D2C skincare, real estate, F&B" })}
        ${field("company_location", "Headquarters / city", { placeholder: "Mumbai, India" })}
        ${field("contact_name", "Your name", { required: true, placeholder: "Full name" })}
        ${field("contact_role", "Role / designation", { placeholder: "Founder, Marketing Lead, etc." })}
        ${field("email", "Email", { required: true, type: "email", placeholder: "you@brand.com" })}
        ${field("phone", "Phone / WhatsApp", { required: true, placeholder: "+91 ..." })}
      </div>
    `;
  }

  if (state.step === 2) {
    els.stepContent.innerHTML = `
      <div class="stack">
        ${field("brand_description", "Tell us about your brand", {
          textarea: true,
          hint: "What you sell, who you sell to, and why you exist.",
          placeholder: "A short paragraph describing your brand, products and positioning...",
        })}
        <div class="field-grid">
          ${field("brand_voice", "Brand voice / tone", { placeholder: "Bold, witty, premium, minimal..." })}
          ${field("usp", "What makes you different?", { placeholder: "Your unique selling point in one line." })}
        </div>
        ${field("target_audience", "Who is your ideal customer?", {
          textarea: true,
          placeholder: "Describe your target audience - age, gender, lifestyle, interests, pain points.",
        })}
        <div class="field-grid">
          ${field("target_locations", "Target locations", { required: true ,placeholder: "Cities / regions / countries" })}
          ${field("target_age_range", "Target age range", { required: true ,placeholder: "e.g. 22 - 38" })}
        </div>
      </div>
    `;
  }

  if (state.step === 3) {
    const hasMeta = state.data.services.includes("Meta Ads");
    els.stepContent.innerHTML = `
      <div class="stack">
        <div class="field">
          <label>Primary goals <b>*</b></label>
          <small>Select all that apply.</small>
          <div class="pill-group">
            ${GOAL_OPTIONS.map((goal) => pill(goal, state.data.primary_goals.includes(goal), "toggle-goal")).join("")}
          </div>
        </div>
        <div class="field">
          <label>Monthly marketing budget</label>
          <small>Approximate monthly spend you're comfortable with.</small>
          <div class="pill-group">
            ${BUDGETS.map((budget) => pill(budget, state.data.monthly_budget === budget, "set-budget")).join("")}
          </div>
        </div>
        <div class="field-grid">
          ${field("start_date", "When would you like to start?", { type: "date" })}
          ${field("campaign_duration", "Engagement length", { required: true,placeholder: "One-off, 3 months, ongoing retainer..." })}
        </div>
        ${field("competitors", "Top 2-3 competitors", {
          hint: "Brands we should benchmark or beat.",
          placeholder: "@brand1, @brand2, brand3.com",
        })}
        ${field("success_metrics", "What does success look like?", {
          textarea: true,
          hint: "The KPIs that matter to you - ROAS, CPL, followers, sales, etc.",
          placeholder: "e.g. CPL under INR 150, 3x ROAS in 90 days, 10K qualified leads...",
        })}
        ${hasMeta ? renderMetaBox() : ""}
      </div>
    `;
  }

  if (state.step === 4) {
    els.stepContent.innerHTML = `
      <div class="stack">
        <div class="field">
          <label>Upload brand assets</label>
          <small>Logo, brand guidelines, product photos, mood references, past work - anything that helps us understand the brand.</small>
          <div class="upload-zone" id="uploadZone">
            <div>
              <div class="upload-icon">⇧</div>
              <h3>Drop your brand assets here</h3>
              <p>Logo, brand guidelines, references, photos or videos · Max 50MB each</p>
              <strong>Click to browse</strong>
            </div>
            <input class="file-input" id="fileInput" type="file" multiple />
          </div>
          ${renderFileList()}
        </div>
        ${field("additional_notes", "Anything else we should know?", {
          textarea: true,
          placeholder: "Constraints, do's & don'ts, internal team, references you love...",
        })}
        ${renderSummary()}
      </div>
    `;
    bindUpload();
  }

  bindDynamicEvents();
}

function renderMetaBox() {
  return `
    <div class="meta-box stack">
      <span class="eyebrow">Meta Ads · Quick check</span>
      <div class="field-grid">
        <div class="field"><label>Active Facebook page?</label><div class="pill-group">${["Yes", "No"].map((v) => pill(v, state.data.has_facebook_page === v, "set-field:has_facebook_page")).join("")}</div></div>
        <div class="field"><label>Active Instagram?</label><div class="pill-group">${["Yes", "No"].map((v) => pill(v, state.data.has_instagram === v, "set-field:has_instagram")).join("")}</div></div>
        <div class="field"><label>Meta Business Manager set up?</label><div class="pill-group">${["Yes", "No", "Not sure"].map((v) => pill(v, state.data.has_meta_business === v, "set-field:has_meta_business")).join("")}</div></div>
        <div class="field"><label>Existing creative assets?</label><div class="pill-group">${["Yes", "Some", "No"].map((v) => pill(v, state.data.has_creative_assets === v, "set-field:has_creative_assets")).join("")}</div></div>
      </div>
      ${field("previous_ads_experience", "Previous Meta Ads experience", {
        textarea: true,
        placeholder: "What's worked, what hasn't, past spend, past results...",
      })}
    </div>
  `;
}

function renderFileList() {
  if (!state.files.length) return "";
  return `
    <ul class="file-list">
      ${state.files.map((file, index) => `
        <li>
          <div>
            <div class="file-name">${escapeHtml(file.name)}</div>
            <div class="file-size">${formatSize(file.size)}</div>
          </div>
          <button class="remove-file" type="button" data-action="remove-file" data-index="${index}" aria-label="Remove ${escapeHtml(file.name)}">×</button>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderSummary() {
  return `
    <div class="summary-box">
      <span class="eyebrow">Quick summary</span>
      <dl class="summary-grid">
        <div><dt>Services</dt><dd>${escapeHtml(state.data.services.join(", ") || "-")}</dd></div>
        <div><dt>Company</dt><dd>${escapeHtml(state.data.company_name || "-")}</dd></div>
        <div><dt>Contact</dt><dd>${escapeHtml(`${state.data.contact_name || "-"} · ${state.data.email || "-"}`)}</dd></div>
        <div><dt>Budget</dt><dd>${escapeHtml(state.data.monthly_budget || "-")}</dd></div>
        <div><dt>Files attached</dt><dd>${state.files.length}</dd></div>
      </dl>
    </div>
  `;
}

function bindDynamicEvents() {
  $$("[data-field]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.data[event.target.dataset.field] = event.target.value;
    });
  });

  $$("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.dataset.action;
      const value = el.dataset.value;

      if (action === "toggle-service") toggleArrayValue(state.data.services, value);
      if (action === "toggle-goal") toggleArrayValue(state.data.primary_goals, value);
      if (action === "set-budget") state.data.monthly_budget = value;
      if (action.startsWith("set-field:")) state.data[action.split(":")[1]] = value;
      if (action === "remove-file") state.files.splice(Number(el.dataset.index), 1);

      renderStep();
    });
  });
}

function bindUpload() {
  const uploadZone = $("#uploadZone");
  const fileInput = $("#fileInput");
  if (!uploadZone || !fileInput) return;

  uploadZone.addEventListener("click", () => fileInput.click());
  uploadZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadZone.classList.add("dragging");
  });
  uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("dragging"));
  uploadZone.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadZone.classList.remove("dragging");
    addFiles(event.dataTransfer.files);
  });
  fileInput.addEventListener("change", () => addFiles(fileInput.files));
}

function addFiles(fileList) {
  [...fileList].forEach((file) => {
    if (file.size > 50 * 1024 * 1024) {
      showToast(`${file.name} is over 50MB and was skipped.`);
      return;
    }
    state.files.push({
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    });
  });
  renderStep();
}

function toggleArrayValue(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) array.splice(index, 1);
  else array.push(value);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function canContinue() {
  // STEP 0 → services
  if (state.step === 0) {
    if (!state.data.services.length) {
      showToast("Pick at least one service.");
      return false;
    }
    return true;
  }

  // STEP 1 → company + contact
  if (state.step === 1) {
    if (!state.data.company_name.trim()) {
      showToast("Company name is required.");
      return false;
    }

    if (!state.data.industry.trim()) {
      showToast("Industry is required.");
      return false;
    }

    if (!state.data.contact_name.trim()) {
      showToast("Your name is required.");
      return false;
    }

    if (!state.data.phone.trim()) {
      showToast("Phone number is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email)) {
      showToast("Enter a valid email.");
      return false;
    }

    return true;
  }

  // STEP 2 → audience
  if (state.step === 2) {
    if (!state.data.target_locations.trim()) {
      showToast("Target location is required.");
      return false;
    }

    if (!state.data.target_age_range.trim()) {
      showToast("Target age range is required.");
      return false;
    }

    return true;
  }

  // STEP 3 → goals & budget
  if (state.step === 3) {
    if (!state.data.primary_goals.length) {
      showToast("Select at least one goal.");
      return false;
    }

    if (!state.data.monthly_budget) {
      showToast("Select a monthly budget.");
      return false;
    }

    if (!state.data.campaign_duration.trim()) {
      showToast("Engagement length is required.");
      return false;
    }

    // Meta Ads checks (only if selected)
    if (state.data.services.includes("Meta Ads")) {
      if (!state.data.has_facebook_page) {
        showToast("Meta Ads: Facebook page status required.");
        return false;
      }

      if (!state.data.has_instagram) {
        showToast("Meta Ads: Instagram status required.");
        return false;
      }

      if (!state.data.has_meta_business) {
        showToast("Meta Ads: Business Manager status required.");
        return false;
      }

      if (!state.data.has_creative_assets) {
        showToast("Meta Ads: Creative assets info required.");
        return false;
      }
    }

    return true;
  }

  return true;
}

function goNext() {
  if (!canContinue()) {
    showToast("Please fill the required fields before continuing.");
    return;
  }
  state.step = Math.min(state.step + 1, STEPS.length - 1);
  renderStep();
}

function goBack() {
  state.step = Math.max(state.step - 1, 0);
  renderStep();
}

function showSuccessFlow() {
  const flash = document.getElementById("flashSubmitted");
  const thankYou = document.getElementById("thankYouView");
  const formView = document.getElementById("formView");

  // hide form
  formView.style.display = "none";
  

  // show flash animation
  flash.classList.add("active");

  // after 2s → switch to thank you
  setTimeout(() => {
    flash.classList.remove("active");
    thankYou.classList.remove("hidden");
  }, 2000);
}



async function saveSubmission() {
  if (!state.data.services.length) {
    state.step = 0;
    renderStep();
    showToast("Please select at least one service.");
    return;
  }

  if (!state.data.company_name.trim() || !state.data.contact_name.trim() || !state.data.email.trim()) {
    state.step = 1;
    renderStep();
    showToast("Please complete the company and contact step.");
    return;
  }

  // 👇 Prepare email content
  const templateParams = {
  company: state.data.company_name,
  industry: state.data.industry,
  website: state.data.website,
  company_location: state.data.company_location,

  name: state.data.contact_name,
  email: state.data.email,
  phone: state.data.phone,
  contact_role: state.data.contact_role,

  services: state.data.services.join(", "),
  goals: state.data.primary_goals.join(", "),
  budget: state.data.monthly_budget,

  brand_description: state.data.brand_description,
  usp: state.data.usp,
  brand_voice: state.data.brand_voice,

  target_audience: state.data.target_audience,
  target_locations: state.data.target_locations,
  target_age_range: state.data.target_age_range,

  start_date: state.data.start_date,
  campaign_duration: state.data.campaign_duration,
  competitors: state.data.competitors,
  success_metrics: state.data.success_metrics,

  notes: state.data.additional_notes
};

  try {
    // 🔴 Replace these IDs from EmailJS dashboard
    await emailjs.send(
      "service_z7dnxnm",
      "template_kt0nozk",
      templateParams
    );

    showSuccessFlow(); // 👈 animation first
   

  } catch (error) {
    console.error(error);
    showToast("Failed to send. Try again.");
  }
}

function showThankYou(id) {
  els.formView.classList.add("hidden");
  els.adminView.classList.add("hidden");
  els.thankYouView.classList.remove("hidden");
  els.referenceId.textContent = `Reference · ${id.slice(0, 8)}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  state.step = 0;
  state.data = { ...initialState };
  state.files = [];
  els.thankYouView.classList.add("hidden");
  els.adminView.classList.add("hidden");
  els.formView.classList.remove("hidden");
  renderStep();
}

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem("rebild_submissions") || "[]");
  } catch {
    return [];
  }
}

function showAdmin() {
  els.formView.classList.add("hidden");
  els.thankYouView.classList.add("hidden");
  els.adminView.classList.remove("hidden");
  renderAdmin();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAdmin() {
  const submissions = getSubmissions();
  els.adminCount.textContent = `${submissions.length} ${submissions.length === 1 ? "brief" : "briefs"} received.`;
  els.adminDetail.classList.add("hidden");

  if (!submissions.length) {
    els.adminList.innerHTML = `<div class="empty-state">No submissions yet. Submit a test brief from the form first.</div>`;
    return;
  }

  els.adminList.innerHTML = submissions.map((item) => `
    <button class="admin-card" type="button" data-admin-id="${item.id}">
      <div>
        <h3>${escapeHtml(item.company_name)}</h3>
        <p>${escapeHtml(item.contact_name)}</p>
      </div>
      <div>
        <p>${escapeHtml(item.email)}</p>
        <p class="admin-card-meta">${escapeHtml(item.phone || "-")}</p>
      </div>
      <div class="tag-list">
        ${(item.services || []).map((service) => `<span class="tag">${escapeHtml(service)}</span>`).join("")}
      </div>
      <div class="admin-card-meta">${new Date(item.submitted_at).toLocaleDateString()}</div>
    </button>
  `).join("");

  $$("[data-admin-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = submissions.find((entry) => entry.id === button.dataset.adminId);
      renderAdminDetail(item);
    });
  });
}

function renderAdminDetail(item) {
  const rows = [
    ["Company", item.company_name],
    ["Website", item.website],
    ["Industry", item.industry],
    ["Location", item.company_location],
    ["Contact", item.contact_name],
    ["Role", item.contact_role],
    ["Email", item.email],
    ["Phone", item.phone],
    ["Brand description", item.brand_description],
    ["Brand voice", item.brand_voice],
    ["USP", item.usp],
    ["Target audience", item.target_audience],
    ["Target locations", item.target_locations],
    ["Age range", item.target_age_range],
    ["Primary goals", (item.primary_goals || []).join(", ")],
    ["Monthly budget", item.monthly_budget],
    ["Start date", item.start_date],
    ["Engagement length", item.campaign_duration],
    ["Competitors", item.competitors],
    ["Success metrics", item.success_metrics],
    ["Meta Ads readiness", [item.has_facebook_page, item.has_instagram, item.has_meta_business, item.has_creative_assets].filter(Boolean).join(" / ")],
    ["Previous ads", item.previous_ads_experience],
    ["Additional notes", item.additional_notes],
    ["Files", (item.files || []).map((file) => `${file.name} (${formatSize(file.size)})`).join("\n")],
  ];

  els.adminDetail.innerHTML = `
    <h3>${escapeHtml(item.company_name)} brief</h3>
    <dl class="detail-grid">
      ${rows.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "-")}</dd>`).join("")}
    </dl>
  `;
  els.adminDetail.classList.remove("hidden");
  els.adminDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

els.nextButton.addEventListener("click", goNext);
els.backButton.addEventListener("click", goBack);
els.briefForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveSubmission();
});
$("#newBriefButton").addEventListener("click", resetForm);
$("#homeButton").addEventListener("click", resetForm);
$("#adminOpen").addEventListener("click", showAdmin);
$("#closeAdmin").addEventListener("click", resetForm);

$$("[data-step-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = Number(button.dataset.stepTarget);

    // allow forward navigation but validate first
    if (target > state.step) {
      if (!canContinue()) return;
    }

    state.step = target;
    renderStep();
  });
});

renderStep();
