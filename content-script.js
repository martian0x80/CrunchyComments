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

  const pathname = window.location.pathname;

  const comentarioElement = document.createElement("comentario-comments");
  comentarioElement.setAttribute("page-id", pathname);
  comentarioElement.setAttribute("max-level", 5);

  document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
      checkAndInject();
      checkAndUpdate();
    }
  });

  const checkAndInject = () => {
    const targetElement = document.querySelector(".app-body-wrapper");

    if (targetElement) {
      console.log("injected comments");
      targetElement.insertAdjacentElement("afterend", comentarioElement);
    } else {
      requestAnimationFrame(checkAndInject);
    }
  };

  const checkAndUpdate = () => {
    window.navigation.addEventListener("navigate", (event) => {
      const pathname = new URL(event.destination.url).pathname;
      comentarioElement.setAttribute("page-id", pathname);
    });
    console.log("injected event listener");
  };
}
// Inject the script
injectScript();
