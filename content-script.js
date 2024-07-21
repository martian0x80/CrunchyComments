//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//

let oldHref = document.location.href;

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

const checkAndUpdate = () => {
  window.addEventListener("popstate", function (event) {
    restoreComments();
    checkAndInject();
  });

  const bodyList = document.querySelector("body");

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        restoreComments();
        checkAndInject();
      }
    });
  });
  const config = {
    childList: true,
    subtree: true,
  };
  observer.observe(bodyList, config);
};

const checkAndInject = () => {
  const targetElement = document.querySelector(".app-body-wrapper");
  if (targetElement) {
    let oldElement = document.querySelector("comentario-comments");
    if (oldElement) {
      oldElement.remove();
    }
    comentarioElement = document.createElement("comentario-comments");
    comentarioElement.setAttribute("max-level", "5");
    targetElement.insertAdjacentElement("afterend", comentarioElement);
  } else {
    requestAnimationFrame(checkAndInject);
  }
};

const restoreComments = () => {
  const currentUrl = document.location.href;

  if (currentUrl.includes("watch") || currentUrl.includes("series"))
    fetch("https://crunchy.404420.xyz/restore?url=" + currentUrl);
};

// EntryPoint
document.addEventListener("readystatechange", (event) => {
  if (document.readyState === "complete") {
    restoreComments();
    checkAndInject();
    checkAndUpdate();
  }
});
