// Content Script
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

let oldHref = document.location.href

// Inject comentario.js
const script = document.createElement("script")
script.src = chrome.runtime.getURL("comentario.js")
script.defer = true

const appendScript = () => {
	if (document.head) {
		document.head.appendChild(script)
	} else {
		requestAnimationFrame(appendScript)
	}
}

appendScript()

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Wait for an element matching the selector to appear
const getBodyElementEventually = async function (selector) {
	return new Promise((resolve) => {
		function resolveIfPresent() {
			const elem = document.querySelector(selector)
			if (elem !== null) {
				resolve(elem)
			} else {
				requestAnimationFrame(resolveIfPresent)
			}
		}
		resolveIfPresent()
	})
}

const checkReleaseDate = async function () {
	const d_day = new Date("July 8, 2024")
	const releaseDateElement = await getBodyElementEventually(".release-date")
	const releaseDateText = releaseDateElement?.innerText || ""

	// Regular expression to extract the date (e.g., "Oct 12, 2024")
	const dateRegex = /Released on (\w+ \d{1,2}, \d{4})/

	const match = releaseDateText.match(dateRegex)
	if (match) {
		const releaseDateStr = match[1] // Extracted date string (e.g., "Oct 12, 2024")

		// Convert the extracted date string into a Date object
		const releaseDateObj = new Date(releaseDateStr)

		console.log("Release Date Object:", releaseDateObj)

		if (releaseDateObj > d_day) {
			console.log("New episode, won't restore comments :(")
			return false
		} else {
			return true
		}
	} else {
		console.log("Date not found")
		return true
	}
}

const replaceTimestamps = function (commentHolder) {
	const timestampRegex = /\b(?:([0-9]+):)?([0-5]?[0-9]):([0-5][0-9])\b/g

	commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p").forEach((comment) => {
		if (comment.querySelector("span.crunchy-comments-timestamp-block") !== null) {
			return
		}

		// Replace Timestamps
		comment.innerHTML = comment.innerHTML.replaceAll(
			timestampRegex,
			(match) => `<span class="crunchy-comments-timestamp-block">${match.trim()}</span>`
		)
	})
}

const replaceSpoilers = function (commentHolder) {
	const spoilerRegex = /\|\|.*?\|\|/g

	commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p").forEach((comment) => {
		if (comment.querySelector("span.crunchy-comments-spoiler-block") !== null) {
			return
		}

		// Replace Spoilers
		comment.innerHTML = comment.innerHTML.replaceAll(
			spoilerRegex,
			(match) => `<span class="crunchy-comments-spoiler-block">${match.slice(2, -2).trim()}</span>`
		)
	})
}

const addEventListenersForFeatures = function (commentHolder) {
	commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p").forEach((comment) => {
		// Add Event Listeners for Spoilers
		comment.querySelectorAll("span.crunchy-comments-spoiler-block").forEach((spoiler) => {
			spoiler.addEventListener("click", () => {
				spoiler.classList.toggle("revealed")
			})
		})

		// Add Event Listeners for Timestamps
		comment.querySelectorAll("span.crunchy-comments-timestamp-block").forEach((timestamp) => {
			timestamp.addEventListener("click", (e) => {
				const regex = /\b(?:(?<h>[0-9]+):)?(?<m>[0-5]?[0-9]):(?<s>[0-5][0-9])\b/
				const tsGroups = e.target.innerText.trim().match(regex)?.groups
				if (!tsGroups) return

				let [hours, minutes, seconds] = [tsGroups.h || 0, tsGroups.m, tsGroups.s].map((x) => parseInt(x))

				seconds = (hours * 60 + minutes) * 60 + seconds

				const el = document.querySelector("iframe.video-player") || document.getElementById("player0") || {}
				if (el.scrollIntoView) {
					el.scrollIntoView({
						behavior: "smooth",
						block: "end",
						inline: "nearest",
					})
				}

				const cssElement = document.getElementsByClassName("css-9pa8cd")[1]
				if (cssElement && cssElement.click) {
					cssElement.click()
				}

				const videoIframe = document.querySelector("iframe.video-player")
				if (videoIframe && videoIframe.contentWindow) {
					videoIframe.contentWindow.postMessage(
						{
							action: "renderTimestamp",
							message: seconds,
						},
						"*"
					)
				}
			})
		})
	})
}

// Unified replacement function for spoilers and timestamps
const replaceFeaturesWithHtml = function (commentHolder) {
	replaceTimestamps(commentHolder)
	replaceSpoilers(commentHolder)
	addEventListenersForFeatures(commentHolder)
}

let commentObserver = null

// Reattach the MutationObserver to monitor comment changes
const reattachCommentObserver = async () => {
	const commentHolder = await getBodyElementEventually("comentario-comments .comentario-comments")
	const onMutation = (mutationsList, observer) => {
		observer.disconnect()

		replaceFeaturesWithHtml(commentHolder)

		if (commentObserver === observer) {
			observer.observe(commentHolder, {
				subtree: true,
				childList: true,
				characterData: true,
			})
		}
	}

	if (commentObserver !== null) commentObserver.disconnect()
	commentObserver = new MutationObserver(onMutation)
	replaceFeaturesWithHtml(commentHolder) // Initial replacement
	commentObserver.observe(commentHolder, {
		subtree: true,
		childList: true,
		characterData: true,
	})
}

// Restore comments based on the current URL
const restoreComments = async () => {
	const currentUrl = document.location.href

	if (currentUrl.includes("watch") || currentUrl.includes("series"))
		if (await checkReleaseDate()) {
			fetch("https://crunchy.404420.xyz/restore?url=" + currentUrl)
				.then((response) => response.json())
				.then((data) => {
					const scrapeStatusElement = document.getElementById("scrape-status")
					if (scrapeStatusElement) {
						scrapeStatusElement.innerText = data.message || "Restoring old comments..."
					}
				})
				.catch(() => {
					const scrapeStatusElement = document.getElementById("scrape-status")
					if (scrapeStatusElement) {
						scrapeStatusElement.innerText = "Error restoring comments"
					}
				})
		} else {
			const scrapeStatusElement = document.getElementById("scrape-status")
			if (scrapeStatusElement) {
				scrapeStatusElement.innerText = "Sponsor Us: https://ko-fi.com/crunchyrollcomments"
			}
		}
}

// Inject comentario-comments and status elements
const checkAndInject = async () => {
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
		scrapeStatusElement.innerText = "Restoring archived comments..."
		scrapeStatusElement.style =
			"display: flex; justify-content: center; z-index: 999; max-width: fit-content; margin: 0 auto;"

		let comentarioElement = document.createElement("comentario-comments")
		comentarioElement.setAttribute("max-level", "5")
		// It seems "page-id" does not have any effect, so changes are moved to comentario.js
		targetElement.insertAdjacentElement("afterend", comentarioElement)
		targetElement.insertAdjacentElement("afterend", scrapeStatusElement)

		await reattachCommentObserver()
	} else {
		requestAnimationFrame(checkAndInject)
	}
}

// Monitor URL changes and re-inject scripts as necessary
const checkAndUpdate = () => {
	window.addEventListener("popstate", async function (event) {
		restoreComments()
		await checkAndInject()
	})

	const bodyList = document.querySelector("body")

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(async function (mutation) {
			if (oldHref !== document.location.href) {
				oldHref = document.location.href
				restoreComments()
				await checkAndInject()
			}
		})
	})
	const config = {
		childList: true,
		subtree: true,
	}
	observer.observe(bodyList, config)
}

// Entry Point
document.addEventListener("readystatechange", async (event) => {
	if (document.readyState === "complete") {
		await restoreComments()
		await checkAndInject()
		checkAndUpdate()
	}
})
