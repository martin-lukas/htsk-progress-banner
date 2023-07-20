// ==UserScript==
// @name         Lessons squares
// @version      1
// @match        http*://www.howtostudykorean.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function createCheckbox(index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.margin = '2px';
    checkbox.style.appearance = 'none';
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';
    checkbox.style.border = '1px solid #fff';
    checkbox.style.backgroundColor = '#fff';
    checkbox.style.cursor = 'pointer';

    // Restore the state from local storage
    const checked = localStorage.getItem('checkbox' + index);
    checkbox.checked = !!checked;

    checkbox.onchange = function() {
      // Update the color
      checkbox.style.backgroundColor = checkbox.checked ? 'green' : '#fff';
      // Save the state to local storage
      localStorage.setItem('checkbox' + index, checkbox.checked ? 'true' : '');
    };

    // Update the color
    checkbox.style.backgroundColor = checkbox.checked ? 'green' : '#fff';

    return checkbox;
  }

  function createUnit(unitNumber, lessonCount) {
    const unit = document.createElement('div');
    unit.style.display = 'grid';
    unit.style.gridTemplateColumns = 'repeat(5, 1fr)';
    unit.style.gridGap = '5px';
    unit.style.margin = '10px';
    unit.style.alignSelf = "start";

    const label = document.createElement('div');
    label.textContent = 'Unit ' + unitNumber + ':';
    label.style.color = '#fff';
    label.style.marginBottom = '10px';
    label.style.gridColumn = '1 / span 5';

    unit.appendChild(label);

    for (let i = 0; i < lessonCount; i++) {
      const checkbox = createCheckbox((unitNumber - 1) * 25 + i);
      unit.appendChild(checkbox);
    }

    return unit;
  }

  function injectBanner() {
    const banner = document.createElement('div');
    banner.style.width = '100%';
    banner.style.backgroundColor = '#272727';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'space-around';
    banner.style.flexWrap = 'wrap';
    banner.style.position = 'relative';
    banner.style.zIndex = '0';

    const unitLessonCounts = [25, 25, 25, 25, 25, 25, 8];
    for (let i = 0; i < unitLessonCounts.length; i++) {
      const unit = createUnit(i + 1, unitLessonCounts[i]);
      banner.appendChild(unit);
    }

    // Find the target div and insert the banner above it
    const targetDiv = document.getElementById('page-titlebar');
    targetDiv.parentNode.insertBefore(banner, targetDiv);
  }


  injectBanner();

})();
