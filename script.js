import { defaultUnits, units } from './consts/units.js';
import { welcomePrompts } from './consts/splash.js';
import { thinkingTasks, getThinkingIntervalDuration, getThinkingDuration, promptUpgradeAfter } from './consts/thinking.js';
import { maxExtraFeatures } from './consts/max-features.js';

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
const rolodex = document.querySelector("#welcome-prompt");
const computeButton = document.querySelector("#compute-button");
const outputStage = document.querySelector("#output-stage");
const thinkingPanel = document.querySelector("#thinking-panel");
const thinkingText = document.querySelector("#thinking-text");
const upgradePricingContainer = document.querySelector("#upgrade-pricing-container");
const comedianMessage = document.querySelector("#snooper-deterrant");
const sourceGuard = document.querySelector("#source-guard");
const sourceGuardText = document.querySelector("#source-guard-text");
const maxMoreButton = document.querySelector("#max-more-button");
const maxBaseFeaturesList = document.querySelector("#max-base-features");
const maxTier = document.querySelector(".tier-max");
const comedianValues = new Set([67, 69, 420]);
const nativeUnitMedia = window.matchMedia("(max-width: 560px), (pointer: coarse)");

const formatScientific = (digits, exponent) => {
  const mantissaDigits = digits.slice(0, 7);
  const mantissa = mantissaDigits.length > 1
    ? `${mantissaDigits[0]}.${mantissaDigits.slice(1)}`
    : mantissaDigits;

  return `${mantissa.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")}e${exponent >= 0 ? "+" : ""}${exponent}`;
};

const addThousandsSeparators = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatMegaNumber = (input) => {
  const [wholePart = "", fractionPart = ""] = input.split(".");
  const rawDigits = `${wholePart}${fractionPart}`.replace(/^0+/, "");

  if (!rawDigits) {
    return "0";
  }

  const scale = -(fractionPart.length + 6);
  const trailingZeroCount = rawDigits.length - rawDigits.replace(/0+$/, "").length;
  const significantDigits = rawDigits.replace(/0+$/, "") || "0";
  const exponent = significantDigits.length - 1 + trailingZeroCount + scale;

  if (significantDigits.length > 12 || exponent <= -7 || exponent >= 12) {
    return formatScientific(significantDigits, exponent);
  }

  const decimalIndex = rawDigits.length + scale;
  let integerPart;
  let decimalPart = "";

  if (decimalIndex <= 0) {
    integerPart = "0";
    decimalPart = `${"0".repeat(Math.abs(decimalIndex))}${rawDigits}`;
  } else if (decimalIndex >= rawDigits.length) {
    integerPart = `${rawDigits}${"0".repeat(decimalIndex - rawDigits.length)}`;
  } else {
    integerPart = rawDigits.slice(0, decimalIndex);
    decimalPart = rawDigits.slice(decimalIndex);
  }

  const trimmedDecimalPart = decimalPart.replace(/0+$/, "");
  const decimalSuffix = trimmedDecimalPart ? `.${trimmedDecimalPart}` : "";
  return `${addThousandsSeparators(integerPart)}${decimalSuffix}`;
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

const getRandomSiUnitSymbol = () => {
  return defaultUnits[Math.floor(Math.random() * defaultUnits.length)]?.symbol ?? "m";
};

const getTextWidth = (() => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  return (text, fontSize, fontFamily, fontWeight) => {
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  };
})();

const fitBoxText = (element, text, maxFontSize, minFontSize, reservedWidth = 0) => {
  const bounds = element.getBoundingClientRect();
  const availableWidth = bounds.width - reservedWidth;
  if (availableWidth <= 0 || !text) {
    return;
  }

  const styles = window.getComputedStyle(element);
  const fontFamily = styles.fontFamily;
  const fontWeight = styles.fontWeight;
  let low = minFontSize;
  let high = maxFontSize;
  let best = minFontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (getTextWidth(text, mid, fontFamily, fontWeight) <= availableWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  element.style.fontSize = `${best}px`;
};

const fitMobileControlText = () => {
  const selectedUnit = getSelectedUnit();
  const unitLabel = selectedUnit ? `${selectedUnit.name} (${selectedUnit.symbol})` : "";

  if (!nativeUnitMedia.matches) {
    valueInput.style.removeProperty("font-size");
    unitSelect.style.removeProperty("font-size");
    fitBoxText(unitButton, unitLabel, 16, 10, 52);
    return;
  }

  fitBoxText(valueInput, valueInput.value || valueInput.placeholder, 18, 12, 24);
  fitBoxText(unitButton, unitLabel, 18, 12, 66);
};

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

  fitMobileControlText();
};

const syncUnitPickerMode = () => {
  const useNativeSelect = nativeUnitMedia.matches;
  unitSelect.setAttribute("aria-hidden", String(!useNativeSelect));
  unitSelect.tabIndex = useNativeSelect ? 0 : -1;

  if (useNativeSelect) {
    setUnitMenuOpen(false);
  }
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
  const inputText = valueInput.value.trim();
  const exactValue = Number(valueInput.value);
  const unit = getSelectedUnit();

  if (!/\d/.test(inputText) || !unit) {
    return {
      text: "Please enter a number",
      isError: true,
      isTopLevel: false
    };
  }

  return {
    text: `${formatMegaNumber(inputText)} ${unit.mega}`,
    isError: false,
    isTopLevel: comedianValues.has(exactValue)
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

  if (isLoading) {
    comedianMessage.hidden = true;
  }
};

const getLineHeight = (element, fontSize) => {
  const computedLineHeight = window.getComputedStyle(element).lineHeight;
  const lineHeight = Number.parseFloat(computedLineHeight);
  return Number.isFinite(lineHeight) ? lineHeight : fontSize * 1.2;
};

const fitTextToWidth = (element, maxFontSize, options = {}) => {
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
  const originalOverflowWrap = element.style.overflowWrap;

  const minFontSize = options.minFontSize ?? 8;
  const mobileTwoLines = options.mobileTwoLines && window.matchMedia("(max-width: 560px)").matches;
  const maxLines = options.maxLines ?? (mobileTwoLines ? 2 : 1);

  const findBestFontSize = (lineCount) => {
    const allowWrapping = lineCount > 1;
    element.style.width = allowWrapping ? `${maxWidth}px` : "max-content";
    element.style.display = "block";
    element.style.whiteSpace = allowWrapping ? "normal" : "nowrap";
    element.style.overflowWrap = allowWrapping ? "anywhere" : originalOverflowWrap;

    let low = minFontSize;
    let high = maxFontSize;
    let best = minFontSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      element.style.fontSize = `${mid}px`;

      const textBounds = element.getBoundingClientRect();
      const lineHeight = getLineHeight(element, mid);
      const fitsWidth = allowWrapping ? element.scrollWidth <= maxWidth + 1 : element.offsetWidth <= maxWidth;
      const fitsLines = textBounds.height <= lineHeight * lineCount + 1;

      if (fitsWidth && fitsLines) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return best;
  };

  let best = findBestFontSize(maxLines);
  if (options.preferSingleLine && maxLines > 1) {
    const singleLineBest = findBestFontSize(1);
    best = singleLineBest >= (options.singleLineMinFontSize ?? minFontSize)
      ? singleLineBest
      : best;
  }

  // Restore original styles and apply the best font size
  element.style.width = originalWidth;
  element.style.display = originalDisplay;
  element.style.whiteSpace = originalWhiteSpace;
  element.style.overflowWrap = originalOverflowWrap;
  element.style.fontSize = `${best}px`;
};

let fitHeadingFrameId = null;

const fitHeadingText = () => {
  if (fitHeadingFrameId !== null) {
    return;
  }

  fitHeadingFrameId = window.requestAnimationFrame(() => {
    fitHeadingFrameId = null;
    if (window.matchMedia("(max-width: 560px)").matches) {
      brand.style.removeProperty("font-size");
    } else {
      fitTextToWidth(brand, 32);
    }
    const isMobileRolodex = window.matchMedia("(max-width: 560px)").matches;
    if (isMobileRolodex) {
      rolodex.style.removeProperty("font-size");
    } else {
      fitTextToWidth(rolodex, 72, {
        maxLines: 1,
        minFontSize: 24
      });
    }
  });
};

let fitOutputFrameId = null;

const fitOutputText = () => {
  if (fitOutputFrameId !== null) {
    return;
  }

  fitOutputFrameId = window.requestAnimationFrame(() => {
    fitOutputFrameId = null;
    fitResultToStage();
    fitSourceGuardText();
    fitMobileControlText();
  });
};

const fitAllText = () => {
  fitHeadingText();
  fitOutputText();
};

const fitSourceGuardText = () => {
  if (!sourceGuard || !sourceGuardText) return;

  const guardBounds = sourceGuard.getBoundingClientRect();
  const maxWidth = guardBounds.width - 48;
  const maxHeight = guardBounds.height - 48;

  if (maxWidth <= 0 || maxHeight <= 0 || !sourceGuardText.textContent.trim()) {
    return;
  }

  sourceGuardText.style.width = `${Math.min(760, maxWidth)}px`;

  let low = 8;
  let high = 96;
  let best = low;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    sourceGuardText.style.setProperty("--source-guard-size", `${mid}px`);

    const textBounds = sourceGuardText.getBoundingClientRect();

    if (textBounds.width <= maxWidth && textBounds.height <= maxHeight) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  sourceGuardText.style.setProperty("--source-guard-size", `${best}px`);
};

const fitResultToStage = () => {
  if (result.hidden || result.classList.contains("is-muted")) {
    resultValue.style.removeProperty("--result-size");
    resultValue.style.removeProperty("width");
    resultValue.style.removeProperty("white-space");
    return;
  }

  const stageBounds = outputStage.getBoundingClientRect();
  const maxWidth = Math.floor(stageBounds.width * 0.92);
  if (maxWidth <= 0) return;
  const fixedStageHeight = Number.parseFloat(window.getComputedStyle(outputStage).getPropertyValue("--output-stage-height"));
  const fitHeight = outputStage.classList.contains("has-upgrade-visible") && Number.isFinite(fixedStageHeight)
    ? fixedStageHeight
    : stageBounds.height;

  // Enforce small baseline size to clear sizing memory and find constraints accurately
  resultValue.style.setProperty("--result-size", "10px");
  resultValue.style.width = `${maxWidth}px`;
  resultValue.style.whiteSpace = "nowrap";

  let low = 1;
  let high = Math.min(260, Math.max(fitHeight * 0.95, 80));

  while (high - low > 1) {
    const mid = (low + high) / 2;
    resultValue.style.setProperty("--result-size", `${mid}px`);

    const valueBounds = resultValue.getBoundingClientRect();
    const fitsWidth = resultValue.scrollWidth <= maxWidth + 1;
    const fitsHeight = valueBounds.height <= fitHeight;

    if (fitsWidth && fitsHeight) {
      low = mid;
    } else {
      high = mid;
    }
  }

  resultValue.style.setProperty("--result-size", `${Math.floor(low)}px`);
};

let currentRolodexIndex = -1;
const recentRolodexIndices = [];
const recentRolodexLimit = Math.floor(welcomePrompts.length / 2);

const getNextRolodexIndex = () => {
  if (welcomePrompts.length <= 1) {
    return 0;
  }

  const blockedIndices = new Set(recentRolodexIndices);
  const candidates = welcomePrompts
    .map((_, index) => index)
    .filter((index) => !blockedIndices.has(index));
  const pool = candidates.length > 0
    ? candidates
    : welcomePrompts.map((_, index) => index).filter((index) => index !== currentRolodexIndex);

  return pool[Math.floor(Math.random() * pool.length)];
};

const setRandomRolodexMessage = () => {
  currentRolodexIndex = getNextRolodexIndex();
  recentRolodexIndices.push(currentRolodexIndex);
  while (recentRolodexIndices.length > recentRolodexLimit) {
    recentRolodexIndices.shift();
  }

  rolodex.textContent = welcomePrompts[currentRolodexIndex];
  fitHeadingText();
};

const rotateRolodexMessage = () => {
  rolodex.classList.add("is-transitioning");

  window.setTimeout(() => {
    setRandomRolodexMessage();
    rolodex.classList.remove("is-transitioning");
  }, 450);
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
    comedianMessage.hidden = !computation.isTopLevel;
    result.classList.toggle("is-muted", computation.isError);
    setLoadingState(false);

    if (computeCount >= promptUpgradeAfter) {
      upgradePricingContainer.classList.add("is-visible");
      outputStage.classList.add("has-upgrade-visible");
    }

    fitOutputText();
  }, getThinkingDuration());
};

const isDesktopInspectionSurface = () => window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 821px)").matches
  && navigator.maxTouchPoints === 0;

const showSourceGuard = () => {
  if (!isDesktopInspectionSurface()) {
    return;
  }

  fitSourceGuardText();
  document.body.classList.add("is-a-little-bitch");
  sourceGuard.setAttribute("aria-hidden", "false");
};

renderUnitOptions();
unitSelect.value = getRandomSiUnitSymbol();
updateUnitButton();
syncUnitPickerMode();
setRandomRolodexMessage();
window.requestAnimationFrame(() => {
  rolodex.classList.remove("is-transitioning");
});
window.setInterval(rotateRolodexMessage, 6000);
result.classList.add("is-muted");
fitAllText();

valueInput.addEventListener("input", sanitizeDecimalInput);
window.addEventListener("resize", fitAllText);
const syncResponsiveControls = () => {
  syncUnitPickerMode();
  fitMobileControlText();
};

if (typeof nativeUnitMedia.addEventListener === "function") {
  nativeUnitMedia.addEventListener("change", syncResponsiveControls);
} else {
  nativeUnitMedia.addListener(syncResponsiveControls);
}
unitSelect.addEventListener("change", updateUnitButton);
valueInput.addEventListener("input", fitMobileControlText);
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
  if (isDesktopInspectionSurface() && event.key === "F12") {
    event.preventDefault();
    showSourceGuard();
    return;
  }

  if (event.key === "Escape") {
    setUnitMenuOpen(false);
    unitButton.focus();
  }
});
converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runComputation();
});

maxMoreButton.addEventListener("click", () => {
  maxBaseFeaturesList.insertAdjacentHTML(
    "beforeend",
    maxExtraFeatures.map((feature) => `<li>${feature}</li>`).join("")
  );
  maxTier.classList.add("is-expanded");
  maxMoreButton.hidden = true;
});
