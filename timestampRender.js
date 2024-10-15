function gotoTimestamp(sec) {
  document.getElementById("player0").currentTime = sec;
}

window.onload = () => {
  if (window.location.hostname === "static.crunchyroll.com") {
    window.addEventListener("message", (e) => {
      if (e.data.action && e.data.message) {
        switch (e.data.action) {
          case "renderTimestamp":
            gotoTimestamp(e.data.message);
            break;
        }
      }
    });
  }
};
