const units = [
  { name: "meter", symbol: "m", mega: "Mm" },
  { name: "kilogram", symbol: "kg", mega: "Mkg" },
  { name: "second", symbol: "s", mega: "Ms" },
  { name: "ampere", symbol: "A", mega: "MA" },
  { name: "kelvin", symbol: "K", mega: "MK" },
  { name: "mole", symbol: "mol", mega: "Mmol" },
  { name: "candela", symbol: "cd", mega: "Mcd" },
  { name: "radian", symbol: "rad", mega: "Mrad" },
  { name: "steradian", symbol: "sr", mega: "Msr" },
  { name: "hertz", symbol: "Hz", mega: "MHz" },
  { name: "newton", symbol: "N", mega: "MN" },
  { name: "pascal", symbol: "Pa", mega: "MPa" },
  { name: "joule", symbol: "J", mega: "MJ" },
  { name: "watt", symbol: "W", mega: "MW" },
  { name: "coulomb", symbol: "C", mega: "MC" },
  { name: "volt", symbol: "V", mega: "MV" },
  { name: "farad", symbol: "F", mega: "MF" },
  { name: "ohm", symbol: "\u03a9", mega: "M\u03a9" },
  { name: "siemens", symbol: "S", mega: "MS" },
  { name: "weber", symbol: "Wb", mega: "MWb" },
  { name: "tesla", symbol: "T", mega: "MT" },
  { name: "henry", symbol: "H", mega: "MH" },
  { name: "Celsius", symbol: "\u00b0C", mega: "M\u00b0C" },
  { name: "lumen", symbol: "lm", mega: "Mlm" },
  { name: "lux", symbol: "lx", mega: "Mlx" },
  { name: "becquerel", symbol: "Bq", mega: "MBq" },
  { name: "gray", symbol: "Gy", mega: "MGy" },
  { name: "sievert", symbol: "Sv", mega: "MSv" },
  { name: "katal", symbol: "kat", mega: "Mkat" },
  { name: "inch", symbol: "in", mega: "Min" },
  { name: "foot", symbol: "ft", mega: "Mft" },
  { name: "yard", symbol: "yd", mega: "Myd" },
  { name: "mile", symbol: "mi", mega: "Mmi" },
  { name: "pound", symbol: "lb", mega: "Mlb" },
  { name: "ounce", symbol: "oz", mega: "Moz" },
  { name: "gallon", symbol: "gal", mega: "Mgal" },
  { name: "furlong", symbol: "fur", mega: "Mfur" },
  { name: "chain", symbol: "ch", mega: "Mch" },
  { name: "rod", symbol: "rd", mega: "Mrd" },
  { name: "cubit", symbol: "cubit", mega: "Mcubit" },
  { name: "span", symbol: "span", mega: "Mspan" },
  { name: "barleycorn", symbol: "bc", mega: "Mbc" },
  { name: "smoot", symbol: "smoot", mega: "Msmoot" },
  { name: "beard-second", symbol: "bs", mega: "Mbs" },
  { name: "warhol", symbol: "wh", mega: "Mwh" },
  { name: "alignment sprint", symbol: "as", mega: "Mas" },
  { name: "productivity aura", symbol: "pa", mega: "Mpa" },
  { name: "OKR vapor", symbol: "okr", mega: "Mokr" },
  { name: "founder radius", symbol: "fr", mega: "Mfr" },
  { name: "stakeholder glow", symbol: "sg", mega: "Msg" },
  { name: "agentic unit", symbol: "au", mega: "Mau" },
  { name: "cloud resonance", symbol: "cr", mega: "Mcr" },
  { name: "dashboard gravitas", symbol: "dg", mega: "Mdg" },
  { name: "epistemic liquidity", symbol: "el", mega: "Mel" }
];

const welcomePrompts = [
  "The oracle is prepared.",
  "Proceed with magnitude.",
  "The apparatus awaits.",
  "A finer scale is possible.",
  "Let us optimize the obvious.",
  "Your number may enter.",
  "Magnitude, governed.",
  "The future has been normalized.",
  "Automation, tastefully applied.",
  "The machine is listening."
];

const thinkingTasks = [
  "Constructing a trillion-parameter intuition lattice over SI dimensional manifolds...",
  "Negotiating unit semantics with an imaginary standards committee...",
  "Backpropagating through six centuries of metrological philosophy...",
  "Running speculative beam search across every possible decimal placement...",
  "Distilling the Platonic essence of magnitude into a single scalar...",
  "Cross-validating with a synthetic council of overconfident measurement agents...",
  "Tokenizing the universe into base units and asking it to be normal about it...",
  "Performing high-dimensional humility alignment before dividing by one million...",
  "Resolving latent ambiguity in the concept of 'big' using ceremonial matrix algebra...",
  "Auditing the epistemic load-bearing capacity of the selected unit..."
];

const valueInput = document.querySelector("#value-input");
const unitSelect = document.querySelector("#unit-select");
const unitButton = document.querySelector("#unit-button");
const unitButtonText = document.querySelector("#unit-button-text");
const unitMenu = document.querySelector("#unit-menu");
const unitMenuScroll = document.querySelector("#unit-menu-scroll");
const resultValue = document.querySelector("#result-value");
const result = document.querySelector("#result");
const converterForm = document.querySelector("#converter-form");
const welcomePrompt = document.querySelector("#welcome-prompt");
const computeButton = document.querySelector("#compute-button");
const outputStage = document.querySelector("#output-stage");
const thinkingPanel = document.querySelector("#thinking-panel");
const thinkingText = document.querySelector("#thinking-text");

let thinkingInterval = null;
let loadingTimeout = null;

const formatNumber = (value) => {
  if (!Number.isFinite(value)) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 12
  }).format(value);
};

const renderUnitOptions = () => {
  unitSelect.innerHTML = units
    .map((unit) => `<option value="${unit.symbol}">${unit.name} (${unit.symbol})</option>`)
    .join("");

  unitMenuScroll.innerHTML = units
    .map((unit) => {
      const label = `${unit.name} (${unit.symbol})`;
      return `<button class="unit-option" type="button" role="option" data-symbol="${unit.symbol}">${label}</button>`;
    })
    .join("");
};

const getSelectedUnit = () => units.find((candidate) => candidate.symbol === unitSelect.value);

const updateUnitButton = () => {
  const unit = getSelectedUnit();
  if (!unit) {
    return;
  }

  unitButtonText.textContent = unit.name;
  unitButton.title = `${unit.name} (${unit.symbol})`;

  unitMenuScroll.querySelectorAll(".unit-option").forEach((option) => {
    const isSelected = option.dataset.symbol === unit.symbol;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });
};

const setUnitMenuOpen = (isOpen) => {
  unitMenu.hidden = !isOpen;
  unitButton.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    const selectedOption = unitMenuScroll.querySelector(".unit-option.is-selected");
    selectedOption?.scrollIntoView({ block: "nearest" });
  }
};

const sanitizeDecimalInput = () => {
  const digitsAndDots = valueInput.value.replace(/[^\d.]/g, "");
  const [whole, ...fractionParts] = digitsAndDots.split(".");
  const sanitized = fractionParts.length > 0
    ? `${whole}.${fractionParts.join("")}`
    : whole;

  if (valueInput.value !== sanitized) {
    valueInput.value = sanitized;
  }
};

const computeResultText = () => {
  const value = Number.parseFloat(valueInput.value);
  const unit = getSelectedUnit();

  if (!Number.isFinite(value) || !unit) {
    return {
      text: "Please enter a number",
      isError: true
    };
  }

  return {
    text: `${formatNumber(value / 1e6)} ${unit.mega}`,
    isError: false
  };
};

const setThinkingText = () => {
  thinkingText.textContent = thinkingTasks[Math.floor(Math.random() * thinkingTasks.length)];
};

const setLoadingState = (isLoading) => {
  computeButton.disabled = isLoading;
  valueInput.disabled = isLoading;
  unitSelect.disabled = isLoading;
  unitButton.disabled = isLoading;
  setUnitMenuOpen(false);
  thinkingPanel.hidden = !isLoading;
  result.hidden = isLoading;
};

const fitResultToStage = () => {
  if (result.hidden || result.classList.contains("is-muted")) {
    resultValue.style.removeProperty("--result-size");
    return;
  }

  // Enforce small baseline size to clear sizing memory and find constraints accurately
  resultValue.style.setProperty("--result-size", "10px");

  const stageBounds = outputStage.getBoundingClientRect();
  let low = 1;
  let high = Math.min(260, stageBounds.height * 0.95);

  while (high - low > 1) {
    const mid = (low + high) / 2;
    resultValue.style.setProperty("--result-size", `${mid}px`);

    const valueBounds = resultValue.getBoundingClientRect();
    // Added safety padding factor check against edge boundaries
    if (valueBounds.width <= stageBounds.width * 0.92 && valueBounds.height <= stageBounds.height) {
      low = mid;
    } else {
      high = mid;
    }
  }

  resultValue.style.setProperty("--result-size", `${Math.floor(low)}px`);
};

const setRandomWelcomePrompt = () => {
  welcomePrompt.textContent = welcomePrompts[Math.floor(Math.random() * welcomePrompts.length)];
};

const runComputation = () => {
  window.clearInterval(thinkingInterval);
  window.clearTimeout(loadingTimeout);

  result.classList.remove("is-muted");
  setThinkingText();
  setLoadingState(true);

  thinkingInterval = window.setInterval(setThinkingText, 1800);
  loadingTimeout = window.setTimeout(() => {
    window.clearInterval(thinkingInterval);
    const computation = computeResultText();
    resultValue.textContent = computation.text;
    result.classList.toggle("is-muted", computation.isError);
    setLoadingState(false);
    window.requestAnimationFrame(fitResultToStage);
  }, 5000);
};

renderUnitOptions();
unitSelect.value = "m";
updateUnitButton();
setRandomWelcomePrompt();
result.classList.add("is-muted");

valueInput.addEventListener("input", sanitizeDecimalInput);
window.addEventListener("resize", fitResultToStage);
unitButton.addEventListener("click", () => {
  setUnitMenuOpen(unitMenu.hidden);
});
unitMenuScroll.addEventListener("click", (event) => {
  const option = event.target.closest(".unit-option");
  if (!option) {
    return;
  }

  unitSelect.value = option.dataset.symbol;
  updateUnitButton();
  setUnitMenuOpen(false);
  unitButton.focus();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest("#unit-picker")) {
    setUnitMenuOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setUnitMenuOpen(false);
    unitButton.focus();
  }
});
converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runComputation();
});
