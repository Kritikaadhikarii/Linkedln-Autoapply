document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("autoApplyBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "autoApply" }, (response) => {
        if (chrome.runtime.lastError) {
          alert(
            "AutoApply could not be triggered. Please reload the LinkedIn job page and try again."
          );
        } else if (response && response.status === "clicked") {
        }
      });
    });
  });

  document.getElementById("refreshBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});
