document.addEventListener("DOMContentLoaded", function () {
  const commandDialogObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        const commandDialog = mutation.target;
        if (commandDialog.style.display === "none") {
          handleEscape();
        } else {
          runMyScript();
        }
      }
    });
  });

  const bodyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.classList.contains("quick-input-widget")
        ) {
          commandDialogObserver.observe(node, { attributes: true });
          runMyScript();
        }
      });
    });
  });

  bodyObserver.observe(document.body, { childList: true, subtree: true });

  // Ensure the escape key event listener is at the document level
  document.addEventListener("keydown", function (event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "p") {
      event.preventDefault();
      runMyScript();
    } else if (event.key === "Escape" || event.key === "Esc") {
      handleEscape();
    }
  });

  function runMyScript() {
    const targetDiv = document.querySelector(".monaco-workbench");

    // Remove existing element if it already exists
    const existingElement = document.getElementById("command-blur");
    if (existingElement) {
      existingElement.remove();
    }

    // Create and configure the new element
    const newElement = document.createElement("div");
    newElement.setAttribute("id", "command-blur");

    newElement.addEventListener("click", function () {
      newElement.remove();
    });

    // Append the new element as a child of the targetDiv
    targetDiv.appendChild(newElement);
  }

  // Remove the backdrop blur from the DOM when esc key is pressed.
  function handleEscape() {
    const element = document.getElementById("command-blur");
    if (element) {
      element.remove();
    }
  }
});
