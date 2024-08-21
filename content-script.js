//
// https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
//

let oldHref = document.location.href

const script = document.createElement("script")
script.src = chrome.runtime.getURL("comentario.js")
script.defer = true

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const appendScript = () => {
    if (document.head) {
        document.head.appendChild(script)
    } else {
        requestAnimationFrame(appendScript)
    }
}

appendScript()

const checkAndUpdate = () => {
    window.addEventListener("popstate", function (event) {
        restoreComments()
        checkAndInject()
    })

    const bodyList = document.querySelector("body")

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href
                restoreComments()
                checkAndInject()
            }
        })
    })
    const config = {
        childList: true,
        subtree: true,
    }
    observer.observe(bodyList, config)
}

const checkAndInject = () => {
    const targetElement = document.querySelector(".app-body-wrapper")
    if (targetElement) {
        let oldElement = document.querySelector("comentario-comments")
        let oldscrapeStatusElement = document.querySelector("#scrape-status")
        if (oldElement) {
            oldElement.remove()
            oldscrapeStatusElement.remove()
        }
        let scrapeStatusElement = document.createElement("p")
        scrapeStatusElement.id = "scrape-status"
        scrapeStatusElement.className = "text--gq6o- text--is-l--iccTo expandable-section__text---00oG"
        scrapeStatusElement.innerText = "Restoring old comments..."
        scrapeStatusElement.style =
            "display: flex; justify-content: center; z-index: 999; max-width: fit-content; margin: 0 auto;"
        let comentarioElement = document.createElement("comentario-comments")
        comentarioElement.setAttribute("max-level", "5")
        // It seems "page-id" does not have any effect, so changes are moved to comentario.js
        targetElement.insertAdjacentElement("afterend", comentarioElement)
        targetElement.insertAdjacentElement("afterend", scrapeStatusElement)
    } else {
        requestAnimationFrame(checkAndInject)
    }
}

const restoreComments = () => {
    const currentUrl = document.location.href

    if (currentUrl.includes("watch") || currentUrl.includes("series"))
        fetch("https://crunchy.404420.xyz/restore?url=" + currentUrl).then((response) => {
            response.json().then((data) => {
                scrapeStatusElement = document.getElementById("scrape-status")
                try {
                    scrapeStatusElement.innerText = data.message
                } catch (error) {
                    scrapeStatusElement.innerText = "Error restoring comments"
                }
            })
        })
}

const renderTimestamp = async () => {
    function replaceTextWithHtml(parent, observer) {
        if (observer) observer.disconnect()

        const regex = /\b([0-5]?[0-9])\s?:\s?([0-5]?[0-9])\b/g
        parent.querySelectorAll(".comentario-card .comentario-card-body > p").forEach((textNode) => {
            if (textNode.querySelector("span.crunchy-comments-timestamp-block") !== null) return
            textNode.innerHTML = textNode.innerHTML.replaceAll(
                regex,
                (match) => `<span class="crunchy-comments-timestamp-block">${match.trim()}</span>`
            )
        })
        if (observer)
            observer.observe(targetElement, {
                subtree: true,
                characterData: true,
                childList: true,
            })
    }
    let targetElement = null

    const timestampFinder = new MutationObserver((mutationsList, observer) => {
        replaceTextWithHtml(targetElement, observer)
    })

    const targetElemFinder = new MutationObserver((_mutationList, observer) => {
        targetElement = document.querySelector("comentario-comments .comentario-comments")
        if (targetElement) {
            observer.disconnect()

            targetElement.addEventListener("click", (e) => {
                if (!e.target.classList.contains("crunchy-comments-timestamp-block")) return
                let [minutes, seconds] = e.target.innerText.trim().split(":").map(Number)

                seconds = minutes * 60 + seconds

                const el = document.getElementsByTagName("iframe")[0] || document.querySelector("#player0") || {}
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                })
                if (document.getElementsByClassName("css-9pa8cd")[1])
                    document.getElementsByClassName("css-9pa8cd")[1].click()

                document.querySelector("iframe.video-player").contentWindow.postMessage(
                    {
                        action: "renderTimestamp",
                        message: seconds,
                    },
                    "*"
                )
            })

            replaceTextWithHtml(targetElement, null)
            timestampFinder.observe(targetElement, {
                subtree: true,
                characterData: true,
                childList: true,
            })
        }
    })
    targetElemFinder.observe(document.querySelector("comentario-comments"), {
        childList: true,
        subtree: true,
    })
}

// EntryPoint
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        restoreComments()
        checkAndInject()
        checkAndUpdate()
        renderTimestamp()
    }
})
