//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//
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

  document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
      checkAndInject();
      checkAndUpdate();
    }
  });

  const checkAndInject = () => {
    const targetElement = document.querySelector(".app-body-wrapper");
    if (targetElement) {
      comentarioElement = document.createElement("comentario-comments");
      comentarioElement.setAttribute("max-level", "3");
      targetElement.insertAdjacentElement("afterend", comentarioElement);
    } else {
      requestAnimationFrame(checkAndInject);
    }
  };

  const checkAndUpdate = () => {
    window.navigation.addEventListener("navigate", (event) => {
      document.getElementsByTagName("comentario-comments")[0].remove();
      setTimeout(() => {
        checkAndInject();
      }, 500);
    });
  };
}
// Inject the script
injectScript();
