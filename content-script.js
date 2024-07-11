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

  const comentarioElement = document.createElement("comentario-comments");

  const checkAndInject = () => {
    // const targetElement = document.querySelector(
    //   "#content > div > div > div.app-body-wrapper > div > div",
    // ); // Adjust the selector as needed
    const targetElement = document
      .querySelector(".expandable-section--is-expanded--8vmUz")
      .insertAdjacentHTML(
        "afterend",
        '<div id="comment-system-container"></div>',
      );

    if (targetElement) {
      targetElement.appendChild(comentarioElement);
    } else {
      requestAnimationFrame(checkAndInject);
    }
  };

  // checkAndInject();
  document.documentElement.appendChild(comentarioElement);
}
// Inject the script
injectScript();
