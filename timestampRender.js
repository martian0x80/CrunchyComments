function gotoTimestamp(sec) {
  const video = document.querySelector("video") || document.getElementById("player0");
  if (video) video.currentTime = sec;
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
