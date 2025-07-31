/* 

  map of button along with their selectors and filter functions
  available for : easy apply, next, submit, done, review 
  
*/
const buttonMap = {
  easyApply: {
    selector: "button.jobs-apply-button",
    filter: (btn) => btn.textContent.trim().includes("Easy Apply"),
  },
  next: {
    selector:
      "button[data-easy-apply-next-button], button[data-live-test-easy-apply-next-button]",
  },
  submit: {
    selector:
      "#ember410, button[data-live-test-easy-apply-submit-button], button[aria-label*='Submit application'], button[data-control-name='submit_unify']",
  },
  done: {
    selector:
      "button[aria-label*='Done'], button[data-control-name='done'], button.artdeco-button",
    filter: (btn) => {
      const span = btn.querySelector("span.artdeco-button__text");
      return !span || span.textContent.trim() === "Done";
    },
  },
  review: {
    selector:
      "button[data-live-test-easy-apply-review-button], button[aria-label*='Review your application']",
  },
};

// for getting the first visible button matching selector and optional filter
function findVisibleButtons(selector, filterFn) {
  return Array.from(document.querySelectorAll(selector)).filter(
    (btn) => btn.offsetParent !== null && (!filterFn || filterFn(btn))
  );
}

function getFirstVisibleButton(selector, filterFn) {
  return findVisibleButtons(selector, filterFn)[0] || null;
}

function findButtonsByType(type) {
  const config = buttonMap[type];
  if (!config) return [];
  return findVisibleButtons(config.selector, config.filter);
}

// returns the first visible button for a type
function getButtonByType(type) {
  return findButtonsByType(type)[0] || null;
}

// clicks first visible button for a type
function clickButtonByType(type, callback) {
  const btn = getButtonByType(type);
  if (btn) {
    btn.click();
    if (callback) setTimeout(callback, 1200);
    return true;
  }
  return false;
}

// Use global variables if already declared
if (typeof autoApplyInterval === "undefined") var autoApplyInterval = null;
if (typeof isPaused === "undefined") var isPaused = false;

function resumeAutoApply() {
  if (!autoApplyInterval) {
    autoApply();
    // to click the first available button from the map in priority order
    const priority = ["submit", "review", "next", "easyApply", "done"];
    for (const type of priority) {
      if (clickButtonByType(type)) break;
    }
  } else {
    isPaused = false;
  }
}

function autoApply() {
  injectControlPanel();
  let buttons = findButtonsByType("easyApply");
  if (!buttons.length) return;
  buttons[0].click();

  if (autoApplyInterval) clearInterval(autoApplyInterval);
  autoApplyInterval = setInterval(() => {
    if (isPaused) return;
    if (
      clickButtonByType("submit", () => {
        setTimeout(() => {
          clickButtonByType("done");
        }, 2000);
      })
    )
      return;
    if (clickButtonByType("review")) return;
    clickButtonByType("next");
  }, 800);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoApply") {
    autoApply();
    sendResponse({ status: "clicked" });
  }
});
