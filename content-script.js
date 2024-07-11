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

  const pathname = window.location.href;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const segment = `/${pathSegments[3]}/${pathSegments[4]}`;

  const comentarioElement = document.createElement("comentario-comments");
  comentarioElement.setAttribute("page-id", segment);
  comentarioElement.setAttribute("max-level", 5);

  document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
      checkAndInject();
    }
  });

  const checkAndInject = () => {
    const targetElement = document.querySelector(".app-body-wrapper");
    console.log("fgagagagga");

    if (targetElement) {
      console.log("hmmmm gottt");
      targetElement.insertAdjacentElement("afterend", comentarioElement);
    } else {
      console.warn("hmmm");
      requestAnimationFrame(checkAndInject);
    }
  };

  // checkAndInject();
  // document.documentElement.appendChild(comentarioElement);
}
// Inject the script
injectScript();
