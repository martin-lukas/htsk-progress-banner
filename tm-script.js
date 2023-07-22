// ==UserScript==
// @name         Lessons squares
// @version      1
// @match        http*://www.howtostudykorean.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const bgColor = "#272727";

  injectBanner();

  function injectBanner() {
    const banner = document.createElement("div");
    banner.style.width = "100%";
    banner.style.backgroundColor = bgColor;
    banner.style.display = "flex";
    banner.style.justifyContent = "space-around";
    banner.style.flexWrap = "wrap";
    banner.style.position = "relative";

    const unitLessonCounts = [25, 25, 25, 25, 25, 25, 8];
    unitLessonCounts.forEach((count, i) =>
      banner.appendChild(createUnit(i + 1, count))
    );

    // Find the target div and insert the banner above it
    const targetDiv = document.getElementById("page-titlebar");
    targetDiv.parentNode.insertBefore(banner, targetDiv);
  }

  function createUnit(unitNumber, lessonCount) {
    const unit = document.createElement("div");
    unit.style.display = "grid";
    unit.style.gridTemplateColumns = "repeat(5, 1fr)";
    unit.style.gap = "5px";
    unit.style.margin = "10px";
    unit.style.alignSelf = "start";

    const label = document.createElement("div");
    label.textContent = `Unit ${unitNumber}:`;
    label.style.color = "white";
    label.style.marginBottom = "10px";
    label.style.gridColumn = "1 / span 5";

    unit.appendChild(label);

    for (let i = 0; i < lessonCount; i++)
      unit.appendChild(createCheckbox((unitNumber - 1) * 25 + i));

    return unit;
  }

  function createCheckbox(index) {
    const checkbox = document.createElement("input");

    checkbox.checked = !!localStorage.getItem("checkbox" + index);

    checkbox.type = "checkbox";
    checkbox.style.margin = "2px";
    checkbox.style.appearance = "none";
    checkbox.style.width = "20px";
    checkbox.style.height = "20px";
    checkbox.style.border = "1px solid white";
    checkbox.style.cursor = "pointer";
    checkbox.style.backgroundColor = checkbox.checked ? "green" : bgColor;

    checkbox.onchange = function () {
      checkbox.style.backgroundColor = checkbox.checked ? "green" : bgColor;
      // Save the state to local storage
      localStorage.setItem("checkbox" + index, checkbox.checked ? "true" : "");
    };

    return checkbox;
  }
})();
