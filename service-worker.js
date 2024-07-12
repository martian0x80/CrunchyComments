// This is just a placeholder for the actual service worker code.
// Well, we didn't need a service worker for this extension, so this file is fine as it is.

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  // chrome.storage.sync.set({ color: "#3aa757" }, () => {
  console.log("The color is green.");
});

// document.querySelector("#content > div > div > div.app-body-wrapper > div > div > div.content-wrapper--MF5LS > div")
