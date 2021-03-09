(function () {
  'use strict';

  var namespace = 'osds';
  var keys = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    home: 'Home',
    end: 'End',
    control: 'Control',
    pageUp: 'PageUp',
    pageDown: 'PageDown',
    tab: 'Tab',
    space: 'Space',
    enter: 'Enter'
  };

  {
    var tabpanelClass = "".concat(namespace, "-tabpanel");
    var tabpanels = document.querySelectorAll(".".concat(tabpanelClass));
    tabpanels = Array.prototype.slice.call(tabpanels);
    tabpanels.forEach(function (tabpanel) {
      var tabs = tabpanel.querySelectorAll(".".concat(tabpanelClass, "__tab"));
      tabs = Array.prototype.slice.call(tabs);
      var panels = tabpanel.querySelectorAll(".".concat(tabpanelClass, "__panel"));
      panels = Array.prototype.slice.call(panels);
      tabs.forEach(function (tab) {
        tab.addEventListener('keydown', handleKeys);
        tab.addEventListener('click', function (event) {
          var currentTab = event.currentTarget;
          var otherTabs = tabs.filter(function (element) {
            return element !== currentTab;
          });
          currentTab.removeAttribute('tabindex');
          currentTab.setAttribute('aria-selected', true);
          otherTabs.forEach(function (otherTab) {
            otherTab.setAttribute('tabindex', '-1');
            otherTab.setAttribute('aria-selected', false);
          });
          var currentPanelId = currentTab.getAttribute('aria-controls');
          var currentPanel = document.querySelector("#".concat(currentPanelId));
          var otherPanels = panels.filter(function (element) {
            return element !== currentPanel;
          });
          currentPanel.removeAttribute('hidden');
          otherPanels.forEach(function (otherPanel) {
            otherPanel.setAttribute('hidden', 'hidden');
          });
        });
      });
    });

    function handleKeys(event) {
      var delay = false;
      var currentKey = event.key,
          currentTab = event.currentTarget;
      var _currentTab$parentNod = currentTab.parentNode,
          currentTabpanel = _currentTab$parentNod.parentNode,
          tabs = _currentTab$parentNod.children,
          previousElement = currentTab.previousElementSibling,
          nextElement = currentTab.nextElementSibling;
      var firstTab = tabs[0];
      var lastTab = tabs[tabs.length - 1];
      var hasDelay = currentTabpanel.dataset.delay;
      delay = hasDelay !== undefined ? true : false;

      switch (currentKey) {
        case keys.left:
          if (!isTab(previousElement)) {
            activateTab(lastTab, delay);
          } else {
            activateTab(previousElement, delay);
          }

          event.preventDefault();
          break;

        case keys.right:
          if (!isTab(nextElement)) {
            activateTab(firstTab, delay);
          } else {
            activateTab(nextElement, delay);
          }

          event.preventDefault();
          break;

        case keys.home:
          activateTab(firstTab, delay);
          event.preventDefault();
          break;

        case keys.end:
          activateTab(lastTab, delay);
          event.preventDefault();
          break;
      }
    }

    function isTab(element) {
      return element && element.classList.contains("".concat(tabpanelClass, "__tab"));
    }

    function activateTab(element, delay) {
      if (delay) {
        setTimeout(function () {
          element.focus();
          element.click();
        }, 300);
      } else {
        element.focus();
        element.click();
      }
    }
  }

  {
    var accordionClass = "".concat(namespace, "-accordion");
    var accordions = document.querySelectorAll(".".concat(accordionClass));
    accordions = Array.prototype.slice.call(accordions);
    accordions.forEach(function (accordion) {
      var triggers = accordion.querySelectorAll(".".concat(accordionClass, "__trigger"));
      triggers = Array.prototype.slice.call(triggers);
      var panels = accordion.querySelectorAll(".".concat(accordionClass, "__panel"));
      panels = Array.prototype.slice.call(panels);
      triggers.forEach(function (trigger) {
        trigger.addEventListener('keydown', handleKeys);
        trigger.addEventListener('click', function (event) {
          var currentTrigger = event.currentTarget;

          if (!allowMultipleOpen(currentTrigger)) {
            closeAccordionItems(currentTrigger, triggers, panels);
          }

          toggleAccordionItem(currentTrigger);
        });
      });
    });

    function handleKeys(event) {
      var currentKey = event.key,
          currentTrigger = event.currentTarget,
          currentAccordion = event.currentTarget.parentNode.parentNode;
      var triggers = currentAccordion.querySelectorAll(".".concat(accordionClass, "__trigger"));
      triggers = Array.prototype.slice.call(triggers);
      var currentTriggerIndex = triggers.indexOf(currentTrigger);

      switch (currentKey) {
        case keys.up:
          if (currentTriggerIndex === 0) {
            triggers[triggers.length - 1].focus();
          } else {
            triggers[currentTriggerIndex - 1].focus();
          }

          event.preventDefault();
          break;

        case keys.down:
          if (currentTriggerIndex === triggers.length - 1) {
            triggers[0].focus();
          } else {
            triggers[currentTriggerIndex + 1].focus();
          }

          event.preventDefault();
          break;

        case keys.home:
          triggers[0].focus();
          event.preventDefault();
          break;

        case keys.end:
          triggers[triggers.length - 1].focus();
          event.preventDefault();
          break;
      }
    }

    function toggleAccordionItem(element) {
      var currentTriggerExpanded = element.getAttribute('aria-expanded');
      currentTriggerExpanded = currentTriggerExpanded === 'true' ? true : false;
      element.setAttribute('aria-expanded', !currentTriggerExpanded);
      var currentPanelId = element.getAttribute('aria-controls');
      var currentPanel = document.querySelector("#".concat(currentPanelId));
      var currentPanelHidden = currentPanel.getAttribute('hidden');

      if (currentPanelHidden !== null) {
        currentPanel.removeAttribute('hidden');
      } else {
        currentPanel.setAttribute('hidden', 'hidden');
      }
    }

    function allowMultipleOpen(element) {
      var currentAccordion = element.parentNode.parentNode;
      var hasAllowMultiple = currentAccordion.dataset.allowMultiple;
      return hasAllowMultiple !== undefined ? true : false;
    }

    function closeAccordionItems(trigger, triggers, panels) {
      var otherTriggers = triggers.filter(function (element) {
        return element !== trigger;
      });
      otherTriggers.forEach(function (otherTrigger) {
        otherTrigger.setAttribute('aria-expanded', false);
      });
      var currentPanelId = trigger.getAttribute('aria-controls');
      var currentPanel = document.querySelector("#".concat(currentPanelId));
      var otherPanels = panels.filter(function (element) {
        return element !== currentPanel;
      });
      otherPanels.forEach(function (otherPanel) {
        otherPanel.setAttribute('hidden', 'hidden');
      });
    }
  }

}());
//# sourceMappingURL=osds.js.map
