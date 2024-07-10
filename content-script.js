//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//
function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("comentario.js");
  script.defer = true;
  document.documentElement.appendChild(script); // <--- no err now
  // chrome.scripting
  //   .executeScript({
  //     target: { tabId: getTabId(), allFrames: true },
  //     files: ["comentario.js"],
  //   })
  //   .then(() => console.log("script injected in all frames"));

  // (async () => {
  //   // see the note below on how to choose currentWindow or lastFocusedWindow
  //   const [tab] = await chrome.tabs.query({
  //     active: true,
  //     lastFocusedWindow: true,
  //   });
  //   console.log(tab.url);
  //   // ..........
  // })();
  //
  // <script defer src="http://13.201.77.10:8080/comentario.js"></script> thanks
  // <comentario-comments></comentario-comments>
  //target element not found a rha

  console.log(window.location.href);
  const comentarioElement = document.createElement("comentario-comments");
  const targetElement = document.querySelector(".overflow-x-clip");
  if (targetElement) {
    targetElement.appendChild(comentarioElement);
  } else {
    console.warn("Target element not found");
  }
}

// Inject the script
injectScript();
