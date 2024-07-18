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
    checkAndInject();
  });

  const bodyList = document.querySelector("body");

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        checkAndInject();
        console.log(
          "Content script detected URL change to: " + document.location.href,
        );
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
    comentarioElement.setAttribute("max-level", "3");
    targetElement.insertAdjacentElement("afterend", comentarioElement);
  } else {
    requestAnimationFrame(checkAndInject);
  }
};

// EntryPoint
document.addEventListener("readystatechange", (event) => {
  if (document.readyState === "complete") {
    checkAndInject();
    checkAndUpdate();
  }
});
