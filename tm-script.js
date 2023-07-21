// ==UserScript==
// @name         Lessons squares
// @version      1
// @match        http*://www.howtostudykorean.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var bannerStyle = {
    backgroundColor: "#272727",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    position: "relative",
    width: "100%",
  };

  var unitBlockStyle = {
    alignSelf: "start",
    display: "grid",
    gap: "5px",
    gridTemplateColumns: "repeat(5, 1fr)",
    margin: "10px",
  };

  var unitLabelStyle = {
    color: "white",
    gridColumn: "1 / span 5",
    marginBottom: "10px",
  };

  var checkboxStyle = {
    appearance: "none",
    border: "1px solid white",
    cursor: "pointer",
    height: "20px",
    margin: "2px",
    width: "20px",
  };

  var checkboxToggleStyle = (checked) => ({
    backgroundColor: checked ? "green" : "#272727",
  });

  injectBanner();

  function injectBanner() {
    const banner = createBanner();
    const mainHeading = document.getElementById("page-titlebar");
    mainHeading.parentNode.insertBefore(banner, mainHeading);
  }

  function createBanner() {
    const banner = div({ styles: bannerStyle });

    const unitLessonCounts = [25, 25, 25, 25, 25, 25, 8];
    for (let i = 0; i < unitLessonCounts.length; i++) {
      const unitBlock = createUnitBlock(i + 1, unitLessonCounts[i]);
      banner.appendChild(unitBlock);
    }

    return banner;
  }

  function createUnitBlock(unitNumber, lessonCount) {
    const unitBlock = div({ styles: unitBlockStyle });

    const unitLabel = div({
      properties: { textContent: "Unit " + unitNumber + ":" },
      styles: unitLabelStyle,
    });
    unitBlock.appendChild(unitLabel);

    for (let i = 0; i < lessonCount; i++) {
      const lessonCheckboxIndex = (unitNumber - 1) * 25 + i;
      const lessonCheckbox = checkbox({
        checked: !!localStorage.getItem("checkbox" + lessonCheckboxIndex),
        onChange: (event) => {
          const checkbox = event.currentTarget;
          styleElement(checkbox, checkboxToggleStyle(checkbox.checked));
          localStorage.setItem(
            "checkbox" + lessonCheckboxIndex,
            checkbox.checked ? "true" : ""
          );
        },
        styles: checkboxStyle,
      });
      styleElement(lessonCheckbox, checkboxToggleStyle(lessonCheckbox.checked));
      unitBlock.appendChild(lessonCheckbox);
    }

    return unitBlock;
  }

  // Helper functions

  function div({ styles, properties }) {
    return createElement({
      type: "div",
      styles,
      properties,
    });
  }

  function checkbox({ checked, onChange, styles }) {
    return createElement({
      type: "input",
      onChange,
      styles,
      attributes: { type: "checkbox" },
      properties: { checked },
    });
  }

  function createElement({
    type,
    onChange,
    styles = {},
    attributes = {},
    properties = {},
  }) {
    const element = document.createElement(type);
    if (onChange) {
      element.onchange = onChange;
    }
    Object.entries(attributes).forEach(([attr, value]) => {
      element.setAttribute(attr, value);
    });
    Object.entries(properties).forEach(([prop, value]) => {
      element[prop] = value;
    });
    styleElement(element, styles);

    return element;
  }

  function styleElement(element, styles) {
    Object.entries(styles).forEach(([selector, value]) => {
      element.style[selector] = value;
    });
  }
})();
