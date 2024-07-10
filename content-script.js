//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//
function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("comentario.js");
  script.defer = true;
  document.head.appendChild(script);

  // Create the custom element after the script is loaded
  //
  // Check the chrome extension reference api
  script.onload = () => {
    const comentarioElement = document.createElement("comentario-comments");

    // Find the specific place in the HTML to insert the comment section
    const targetElement = document.querySelector(
      "#content > div > div > div.app-body-wrapper > div > div",
    );

    if (targetElement) {
      targetElement.appendChild(comentarioElement);
    } else {
      console.warn("Target element not found");
    }
  };
}

// Inject the script
// injectScript();
// see discord
var h1 = document.createElement("h1");
h1.innerText = "Hello, this is a new H1 tag!";

// Append the h1 element to the body
document.body.appendChild(h1);
