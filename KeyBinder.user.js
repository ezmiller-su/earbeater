// ==UserScript==
// @name         EarBeater KeyBinder
// @version      1.0
// @description  Maps keys to buttons for a faster more intuitive experience.
// @author       ejmlr
// @match        *.earbeater.com/online-ear-training/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=earbeater.com
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/ezmiller-su/earbeater/main/KeyBinder.user.js
// @updateURL    https://raw.githubusercontent.com/ezmiller-su/earbeater/main/KeyBinder.user.js
// ==/UserScript==

(function() {
    'use strict';

    const customCSS = `
        .v-btn--small {height: auto !important;}
    `;
    GM_addStyle(customCSS);

  const keyToButtonSelector = {
    'Escape': 'button.v-btn--flat:nth-child(3) > div:nth-child(1)', //return to menu
    ' ': '.repeat-next-buttons > button:nth-child(2)', //next question
    'r': 'button.button:nth-child(1)', //replay interval
    't': '.ma-0', //begin or restart test
    '1': 'button.text-none:nth-child(1)',
    '2': 'button.text-none:nth-child(2)',
    '3': 'button.text-none:nth-child(3)',
    '4': 'button.text-none:nth-child(4)',
    '5': 'button.text-none:nth-child(5)',
    '6': 'button.text-none:nth-child(6)',
    '7': 'button.text-none:nth-child(7)',
    '8': 'button.text-none:nth-child(8)',
    '9': 'button.text-none:nth-child(9)',
    '0': 'button.text-none:nth-child(10)',
    '-': 'button.text-none:nth-child(11)',
    '=': 'button.text-none:nth-child(12)'
  };

    const interval = setInterval(() => {
        let allFound = true;

        Object.entries(keyToButtonSelector).forEach(([key, buttonSelector]) => {
            const target = document.querySelector(`${buttonSelector} > div:nth-child(1)`);
            if (target) {
                if (!target.dataset.bound) {
                    target.appendChild(document.createElement('br'));
                    target.appendChild(document.createTextNode(`(${key})`));
                    target.dataset.bound = 'true';
                }
            } else {
                allFound = false;
            }
        });
        if (allFound) clearInterval(interval);
    }, 500);

    document.addEventListener('keydown', function (event) {
        if (event.metaKey) return;

        const selector = keyToButtonSelector[event.key];
        if (!selector) return;

        const button = document.querySelector(selector);
        if (button) {
            button.click();
        }
    });
})();
