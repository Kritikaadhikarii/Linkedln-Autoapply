function injectControlPanel() {
  if (document.getElementById("autoapply-control-panel")) return;
  const panel = document.createElement("div");
  panel.id = "autoapply-control-panel";
  Object.assign(panel.style, {
    position: "fixed",
    top: "40px",
    right: "40px",
    zIndex: 99999,
    background: "linear-gradient(135deg, #f8fafc 60%, #e3e7ed 100%)",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    color: "#222",
    fontFamily: "Segoe UI, Arial, sans-serif",
    width: "270px",
    padding: "18px 28px 12px 16px", // increased right padding
    userSelect: "none",
    cursor: "move",
    border: "none",
  });

  // Drag logic
  let isDragging = false,
    dragOffsetX = 0,
    dragOffsetY = 0;
  panel.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - panel.getBoundingClientRect().left;
    dragOffsetY = e.clientY - panel.getBoundingClientRect().top;
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      panel.style.top = e.clientY - dragOffsetY + "px";
      panel.style.right = "";
      panel.style.left = e.clientX - dragOffsetX + "px";
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
  });

  // Title with LinkedIn SVG icon
  const titleRow = document.createElement("div");
  Object.assign(titleRow.style, {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  });

  const title = document.createElement("div");
  title.style.display = "flex";
  title.style.flexDirection = "column";
  title.style.flex = "1 1 auto";
  title.style.overflow = "hidden";
  title.style.marginTop = "0";
  title.style.marginBottom = "0";

  const line1 = document.createElement("span");
  line1.textContent = "AutoApply by";
  Object.assign(line1.style, {
    fontSize: "1.05em",
    color: "#0073b1",
    fontWeight: "600",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  });

  const line2 = document.createElement("span");
  line2.textContent = "KritikaAdhikari";
  Object.assign(line2.style, {
    fontSize: "1.05em",
    color: "#0073b1",
    fontWeight: "600",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginTop: "-2px",
  });

  title.appendChild(line1);
  title.appendChild(line2);

  // LinkedIn SVG icon as a clickable link
  const linkedinLink = document.createElement("a");
  linkedinLink.href = "https://www.linkedin.com/in/kritikaadhikari/";
  linkedinLink.target = "_blank";
  linkedinLink.title = "Connect on LinkedIn";
  Object.assign(linkedinLink.style, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    background: "#e3e7ed",
    transition: "background 0.2s",
    marginLeft: "2px",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
  });
  linkedinLink.onmouseover = function () {
    linkedinLink.style.background = "#cfd8e3";
  };
  linkedinLink.onmouseout = function () {
    linkedinLink.style.background = "#e3e7ed";
  };
  linkedinLink.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 48 48">
<path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
</svg>
  `;

  // Website SVG icon as a clickable link
  const websiteLink = document.createElement("a");
  websiteLink.href = "https://kritikaadhikari.com.np";
  websiteLink.target = "_blank";
  websiteLink.title = "Visit Website";
  Object.assign(websiteLink.style, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    background: "#e3e7ed",
    transition: "background 0.2s",
    marginLeft: "2px",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
  });
  websiteLink.onmouseover = function () {
    websiteLink.style.background = "#cfd8e3";
  };
  websiteLink.onmouseout = function () {
    websiteLink.style.background = "#e3e7ed";
  };
  websiteLink.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 120 120">
<path d="M112.313,90.466l-9.174-5.406C106.249,78.701,108,71.556,108,64c0-26.51-21.49-48-48-48 S12,37.49,12,64c0,26.51,21.49,48,48,48c9.74,0,18.796-2.909,26.364-7.895l0.412,3.475l6.674-8.95l8.792,13.37l7.807-5.134 l-8.792-13.37L112.313,90.466z" opacity=".35"></path><circle cx="60" cy="60" r="48" fill="#0075ff"></circle><path d="M60,22c6.609,0,14,17.961,14,42h6c0-23.269-7.009-48-20-48S40,40.731,40,64h6 C46,39.961,53.391,22,60,22z" opacity=".35"></path><path fill="#a4e2f1" d="M60,108c-12.991,0-20-24.731-20-48s7.009-48,20-48s20,24.731,20,48S72.991,108,60,108z M60,18 c-6.609,0-14,17.961-14,42s7.391,42,14,42s14-17.961,14-42S66.609,18,60,18z"></path><rect width="89" height="6" x="15" y="61" opacity=".35"></rect><rect width="89" height="6" x="15" y="57" fill="#a4e2f1"></rect><path d="M30.905,96.113l-4.258-4.228C35.537,82.931,47.382,78,60,78c12.554,0,24.357,4.889,33.234,13.766l-4.242,4.242 C81.248,88.265,70.952,84,60,84C48.993,84,38.66,88.302,30.905,96.113z" opacity=".35"></path><path fill="#a4e2f1" d="M30.905,93.113l-4.258-4.228C35.537,79.931,47.382,75,60,75c12.554,0,24.357,4.889,33.234,13.766 l-4.242,4.242C81.248,85.265,70.952,81,60,81C48.993,81,38.66,85.302,30.905,93.113z"></path><path d="M60,48c-12.617,0-24.461-4.931-33.352-13.884l4.258-4.228C38.662,37.699,48.994,42,60,42s21.339-4.301,29.094-12.112 l4.258,4.228C84.462,43.069,72.617,48,60,48z" opacity=".35"></path><path fill="#a4e2f1" d="M60,45c-12.617,0-24.461-4.931-33.352-13.884l4.258-4.228C38.662,34.699,48.994,39,60,39 s21.339-4.301,29.094-12.112l4.258,4.228C84.462,40.069,72.617,45,60,45z"></path><path fill="#a4e2f1" d="M60,18c23.159,0,42,18.841,42,42s-18.841,42-42,42S18,83.159,18,60S36.841,18,60,18 M60,12 c-26.51,0-48,21.49-48,48s21.49,48,48,48s48-21.49,48-48S86.51,12,60,12L60,12z"></path><polygon fill="#9500ba" points="112.313,86.466 82.187,69 86.289,103.581 93.451,94.63 102.243,108 110.05,102.866 101.258,89.496"></polygon>
</svg>
  `;

  titleRow.appendChild(title);
  titleRow.appendChild(linkedinLink);
  titleRow.appendChild(websiteLink);
  panel.appendChild(titleRow);

  // Pause/Resume button
  const pauseBtn = document.createElement("button");
  Object.assign(pauseBtn.style, {
    width: "100%",
    marginTop: "10px",
    padding: "10px 0",
    fontSize: "1em",
    border: "none",
    borderRadius: "8px",
    background: "#0073b1",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.07)",
    display: "block",
  });
  pauseBtn.onmouseover = function () {
    pauseBtn.style.background = "#005983";
    pauseBtn.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  };
  pauseBtn.onmouseout = function () {
    pauseBtn.style.background = "#0073b1";
    pauseBtn.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.07)";
  };
  pauseBtn.textContent = "Pause";
  pauseBtn.onclick = () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    if (!isPaused) {
      if (autoApplyInterval) clearInterval(autoApplyInterval);
      autoApply(); // Restart auto-apply process
    }
  };
  panel.appendChild(pauseBtn);

  // Spacebar toggles pause/resume
  window.addEventListener("keydown", function (e) {
    if (
      document.getElementById("autoapply-control-panel") &&
      e.code === "Space" &&
      !e.repeat &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? "Resume" : "Pause";
      if (!isPaused) {
        if (autoApplyInterval) clearInterval(autoApplyInterval);
        autoApply();
      }
      e.preventDefault();
    }
  });

  // Close (cross) button
  const closeBtn = document.createElement("button");
  Object.assign(closeBtn.style, {
    fontSize: "18px",
    lineHeight: "18px",
    border: "none",
    background: "transparent",
    color: "#0073b1",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    transition: "background 0.2s",
    marginBottom: "10px",
  });
  closeBtn.onmouseover = function () {
    closeBtn.style.background = "#e3e7ed";
  };
  closeBtn.onmouseout = function () {
    closeBtn.style.background = "transparent";
  };
  closeBtn.innerHTML = "&times;";
  closeBtn.title = "Close";
  closeBtn.onclick = () => {
    panel.remove();
    if (autoApplyInterval) clearInterval(autoApplyInterval);
  };
  panel.appendChild(closeBtn);

  document.body.appendChild(panel);
}
