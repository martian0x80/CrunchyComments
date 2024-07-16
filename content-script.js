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
      // setupMutationObserver();
      checkAndUpdate();
    }
  });

  const checkAndInject = () => {
    const targetElement = document.querySelector(".app-body-wrapper");
    if (targetElement) {
      let oldElement = document.querySelector("comentario-comments");
      if (oldElement) {
        oldElement.remove();
      }
      comentarioElement = document.createElement("comentario-comments");
      comentarioElement.setAttribute("max-level", "3");
      targetElement.insertAdjacentElement("afterend", comentarioElement);
    } else {
      requestAnimationFrame(checkAndInject);
    }
  };

  (() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
      let ret = oldPushState.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
      let ret = oldReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });
  })();

  const checkAndUpdate = () => {
    // Only supports Chrome
    window.navigation.addEventListener("navigate", (event) => {
      document.getElementsByTagName("comentario-comments")[0].remove();
      setTimeout(() => {
        checkAndInject();
      }, 500);
    });

    window.addEventListener("locationchange", (event) => {
      document.getElementsByTagName("comentario-comments")[0].remove();
      setTimeout(() => {
        checkAndInject();
      }, 500);
    });
  };

  // const setupMutationObserver = () => {
  //   var previousUrl = "";
  //   var observer = new MutationObserver(function (mutations) {
  //     if (location.href !== previousUrl) {
  //       previousUrl = location.href;
  //       console.log(`URL changed to ${location.href}`);
  //     }
  //   });
  // };
}
// Inject the script
injectScript();
