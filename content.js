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

// Function to get current job ID from URL
function getCurrentJobId() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentJobId = urlParams.get('currentJobId');
  return currentJobId;
}

// Function to get next job ID from the list
function getNextJobId() {
  const jobList = document.querySelector('.jtEqQduMjDOqUPIGtTJPeUXmGVrnzaRhNcQ');
  if (!jobList) return null;

  const jobItems = jobList.querySelectorAll('li[data-occludable-job-id]');
  const currentJobId = getCurrentJobId();
  
  let foundCurrent = false;
  for (const item of jobItems) {
    const jobId = item.getAttribute('data-occludable-job-id');
    if (foundCurrent) {
      return jobId;
    }
    if (jobId === currentJobId) {
      foundCurrent = true;
    }
  }
  return null;
}

// Function to navigate to the next job
function clickNextJobInList() {
  const jobList = document.querySelector('.jtEqQduMjDOqUPIGtTJPeUXmGVrnzaRhNcQ');
  if (!jobList) return false;

  const currentJobId = getCurrentJobId();
  const jobItems = Array.from(jobList.querySelectorAll('li[data-occludable-job-id]'));
  
  // Find current job index
  const currentIndex = jobItems.findIndex(item => 
    item.getAttribute('data-occludable-job-id') === currentJobId
  );
  
  if (currentIndex === -1 || currentIndex >= jobItems.length - 1) return false;
  
  // Find and click the next job's link
  const nextJobItem = jobItems[currentIndex + 1];
  const jobLink = nextJobItem.querySelector('a.job-card-container__link');
  
  if (jobLink) {
    jobLink.click();
    return true;
  }
  
  return false;
}

// Function to wait for job details to load
function waitForJobLoad(callback, maxAttempts = 10) {
  let attempts = 0;
  const checkInterval = setInterval(() => {
    attempts++;
    const buttons = findButtonsByType("easyApply");
    if (buttons.length > 0 || attempts >= maxAttempts) {
      clearInterval(checkInterval);
      callback();
    }
  }, 1000);
}

function autoApply() {
  injectControlPanel();
  let buttons = findButtonsByType("easyApply");
  
  // If no Easy Apply button is found, try to move to next job
  if (!buttons.length) {
    if (!isPaused) {
      if (clickNextJobInList()) {
        // Wait for the new job details to load and retry
        waitForJobLoad(() => {
          if (!isPaused) autoApply();
        });
      }
    }
    return;
  }
  
  // Start the application process
  buttons[0].click();

  if (autoApplyInterval) clearInterval(autoApplyInterval);
  autoApplyInterval = setInterval(() => {
    if (isPaused) return;
    
    // Handle submission
    if (clickButtonByType("submit", () => {
      setTimeout(() => {
        // Click done button after submission
        clickButtonByType("done", () => {
          // After clicking done, wait and move to next job
          setTimeout(() => {
            if (!isPaused) {
              if (clickNextJobInList()) {
                // Wait for the new job to load before continuing
                waitForJobLoad(() => {
                  if (!isPaused) autoApply();
                });
              }
            }
          }, 1500);
        });
      }, 2000);
    })) return;

    // Handle review and next buttons
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

  