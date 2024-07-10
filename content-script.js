//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//
// Function to inject the script
function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("comentario.js");
  script.defer = true;

  const appendScript = () => {
    if (document.head) {
      document.head.appendChild(script);
    } else {
      requestAnimationFrame(appendScript);
    }
  };

  appendScript();

  // Create the custom element after the script is loaded
  script.onload = () => {
    const comentarioElement = document.createElement("comentario-comments");

    const checkAndInject = () => {
      const targetElement = document.querySelector(
        "#content > div > div > div.app-body-wrapper > div > div > div.content-wrapper--MF5LS > div",
      ); // Adjust the selector as needed
      if (targetElement) {
        targetElement.appendChild(comentarioElement);
      } else {
        requestAnimationFrame(checkAndInject);
      }
    };

    checkAndInject();
  };
}
// Inject the script
injectScript();
