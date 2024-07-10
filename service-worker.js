chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  // chrome.storage.sync.set({ color: "#3aa757" }, () => {
  console.log("The color is green.");
});

// document.querySelector("#content > div > div > div.app-body-wrapper > div > div > div.content-wrapper--MF5LS > div")
