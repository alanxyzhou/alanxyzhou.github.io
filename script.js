import { units } from './consts/units.js';
import { welcomePrompts } from './consts/splash.js';
import { thinkingTasks, getThinkingIntervalDuration, getThinkingDuration, promptUpgradeAfter } from './consts/thinking.js';

const valueInput = document.querySelector("#value-input");
const unitSelect = document.querySelector("#unit-select");
const unitButton = document.querySelector("#unit-button");
const unitButtonText = document.querySelector("#unit-button-text");
const unitMenu = document.querySelector("#unit-menu");
const unitMenuScroll = document.querySelector("#unit-menu-scroll");
const resultValue = document.querySelector("#result-value");
const result = document.querySelector("#result");
const converterForm = document.querySelector("#converter-form");
const brand = document.querySelector(".brand");
const welcomePrompt = document.querySelector("#welcome-prompt");
const computeButton = document.querySelector("#compute-button");
const outputStage = document.querySelector("#output-stage");
const thinkingPanel = document.querySelector("#thinking-panel");
const thinkingText = document.querySelector("#thinking-text");

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

  unitButtonText.textContent = `${unit.name} (${unit.symbol})`;
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
  if (usedThinkingTaskIndices.size >= thinkingTasks.length) {
    usedThinkingTaskIndices.clear();
  }

  let taskIndex;
  do {
    taskIndex = Math.floor(Math.random() * thinkingTasks.length);
  } while (usedThinkingTaskIndices.has(taskIndex));

  usedThinkingTaskIndices.add(taskIndex);
  thinkingText.textContent = thinkingTasks[taskIndex];
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

const fitTextToWidth = (element, maxFontSize) => {
  if (!element) return;

  const parent = element.parentElement;
  if (!parent) return;

  // Use a stable reference width from the parent
  const maxWidth = parent.clientWidth * 0.95;
  if (maxWidth <= 0) return;

  // Temporarily disable constraints that interfere with measuring the "natural" width
  const originalWidth = element.style.width;
  const originalDisplay = element.style.display;
  const originalWhiteSpace = element.style.whiteSpace;

  element.style.width = "max-content";
  element.style.display = "block";
  element.style.whiteSpace = "nowrap";

  let low = 8;
  let high = maxFontSize;
  let best = 8;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    element.style.fontSize = `${mid}px`;

    // Measure the natural width of the text at this font size
    if (element.offsetWidth <= maxWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // Restore original styles and apply the best font size
  element.style.width = originalWidth;
  element.style.display = originalDisplay;
  element.style.whiteSpace = originalWhiteSpace;
  element.style.fontSize = `${best}px`;
};

const fitAllText = () => {
  window.requestAnimationFrame(() => {
    fitTextToWidth(brand, 32);
    fitTextToWidth(welcomePrompt, 72);
    fitResultToStage();
  });
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
  fitAllText();
};


let thinkingMessageInterval = null;
let thinkingTimeout = null;
let computeCount = 0;
const usedThinkingTaskIndices = new Set();

const runComputation = () => {
  if (!valueInput.value.trim()) {
    return;
  }

  computeCount++;

  window.clearInterval(thinkingMessageInterval);
  window.clearTimeout(thinkingTimeout);

  result.classList.remove("is-muted");
  setThinkingText();
  setLoadingState(true);

  thinkingMessageInterval = window.setInterval(setThinkingText, getThinkingIntervalDuration());
  thinkingTimeout = window.setTimeout(() => {
    window.clearInterval(thinkingMessageInterval);
    const computation = computeResultText();
    resultValue.textContent = computation.text;
    result.classList.toggle("is-muted", computation.isError);
    setLoadingState(false);

    if (computeCount >= promptUpgradeAfter) {
      document.getElementById("upgrade-pricing-container").classList.add("is-visible");
    }

    window.requestAnimationFrame(fitAllText);
  }, getThinkingDuration());
};

renderUnitOptions();
unitSelect.value = "m";
updateUnitButton();
setRandomWelcomePrompt();
result.classList.add("is-muted");
fitAllText();

valueInput.addEventListener("input", sanitizeDecimalInput);
window.addEventListener("resize", fitAllText);
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
