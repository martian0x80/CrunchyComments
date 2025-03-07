// Content Script
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

let oldHref = document.location.href

// Inject comentario.js
const script = document.createElement("script")
script.src = chrome.runtime.getURL("comentario.js")
script.defer = true

// Inject comentario-override.css
const link = document.createElement("link")
link.rel = "stylesheet"
link.type = "text/css"
link.href = chrome.runtime.getURL("comentario-override.css")

// Inject patch.js
const patchScript = document.createElement("script")
patchScript.src = chrome.runtime.getURL("patch.js")
patchScript.onload = () => patchScript.remove()
document.documentElement.appendChild(patchScript)

const appendScript = () => {
	if (document.head) {
		document.head.appendChild(script)
		document.head.appendChild(link)
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

const spoilerButtonIcon = `
    <svg class="comentario-icon" fill="currentColor" viewBox="0 0 16 16">
        <path d="M 8,4.5 C 4.1323173,4.5160651 1,8 1,8 1,8 3.9636332,11.508033 8,11.5 12.036367,11.492 14.975902,8 15,8 15.0241,8 11.867683,4.4839347 8,4.5 Z m 0.078125,1 A 2.468644,2.5309772 45.000129 0 1 10.498047,8.015625 2.468644,2.5309772 45.000129 0 1 7.921875,10.5 2.468644,2.5309772 45.000129 0 1 5.5019531,7.984375 2.468644,2.5309772 45.000129 0 1 8.078125,5.5 Z M 8,6.5996094 A 1.3999999,1.4 0 0 0 6.5996094,8 1.3999999,1.4 0 0 0 8,9.4003906 1.3999999,1.4 0 0 0 9.4003906,8 1.3999999,1.4 0 0 0 8,6.5996094 Z" /></path>
    </svg>` // Created by PondusDev

const spoilerDelimiterLength = 2 // If we can get this automatically, we can remove this constant
// Inject features into a comment editor
function onEditorOpen(comentarioEditor) {
	// Add Spoiler Button
	const spoilerButton = document.createElement("button")
	spoilerButton.classList.add("comentario-btn", "comentario-btn-tool")
	spoilerButton.type = "button"
	spoilerButton.title = "Spoiler"
	spoilerButton.tabIndex = -1
	spoilerButton.innerHTML = spoilerButtonIcon
	spoilerButton.onclick = () => {
		const textArea = comentarioEditor.querySelector("textarea")
		let selectionStart = textArea.selectionStart
		let selectionEnd = textArea.selectionEnd

		const preSelection = textArea.value.substring(0, textArea.selectionStart)
		let selection = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd)
		const postSelection = textArea.value.substring(textArea.selectionEnd)

		if (selection === "") {
			selection = "text"
			// Set the cursor to select the template text
			selectionStart = selectionStart + spoilerDelimiterLength
			selectionEnd = selectionEnd + spoilerDelimiterLength + selection.length
		} else {
			// Set the cursor after the spoiler
			selectionStart = selectionEnd + 2 * spoilerDelimiterLength
			selectionEnd = selectionEnd + 2 * spoilerDelimiterLength
		}

		textArea.value = `${preSelection}||${selection}||${postSelection}`
		textArea.focus()
		textArea.setSelectionRange(selectionStart, selectionEnd)
	}
	const toolbarSection = comentarioEditor.querySelector(".comentario-toolbar-section:first-child")
	toolbarSection.appendChild(spoilerButton)
}

let editorObserver = null
// Reattach the MutationObserver to detect comment editors
const reattachEditorObserver = async (comentarioComments) => {
	const onMutation = (mutationsList, observer) => {
		observer.disconnect()

		const addedNodes = mutationsList.flatMap((mutation) => Array.from(mutation.addedNodes))
		const newEditors = addedNodes.filter(
			(node) => node.classList && node.classList.contains("comentario-comment-editor")
		)
		for (const editor of newEditors) {
			onEditorOpen(editor)
		}

		if (editorObserver === observer) {
			observer.observe(comentarioComments, {
				subtree: true,
				childList: true,
			})
		}
	}

	if (editorObserver !== null) editorObserver.disconnect()
	editorObserver = new MutationObserver(onMutation)
	const editors = comentarioComments.querySelectorAll(".comentario-comment-editor")
	for (const editor of editors) {
		onEditorOpen(editor)
	}
	editorObserver.observe(comentarioComments, {
		subtree: true,
		childList: true,
	})
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

// Need this function to be named so that addEventListener can recognize it
function replaceTimestampsFunction(event) {
	const regex = /\b(?:(?<h>[0-9]+):)?(?<m>[0-5]?[0-9]):(?<s>[0-5][0-9])\b/
	const tsGroups = event.target.innerText.trim().match(regex)?.groups
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
}

// Need this function to be named so that addEventListener can recognize it
function replaceSpoilersFunction(event) {
	event.currentTarget.classList.toggle("revealed")
}

const addEventListenersForFeatures = function (commentHolder) {
	commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p").forEach((comment) => {
		// Add Event Listeners for Spoilers
		comment.querySelectorAll("span.crunchy-comments-spoiler-block").forEach((spoiler) => {
			// named function to prevent event listener duplication
			spoiler.addEventListener("click", replaceSpoilersFunction)
		})

		// Add Event Listeners for Timestamps
		comment.querySelectorAll("span.crunchy-comments-timestamp-block").forEach((timestamp) => {
			// named function to prevent event listener duplication
			timestamp.addEventListener("click", replaceTimestampsFunction)
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

// Show server status
const showServerStatus = async () => {
	const currentUrl = document.location.href

	fetch("https://appstatus.crunchycomments.com/")
		.then((response) => response.json())
		.then((data) => {
			const serverStatusElement = document.getElementById("app-status")
			if (serverStatusElement) {
				serverStatusElement.innerText = data.message || "Checking server status..."
			}
		})
		.catch(() => {
			const serverStatusElement = document.getElementById("app-status")
			if (serverStatusElement) {
				serverStatusElement.innerText = "Error checking server status"
			}
		})
}

// Restore comments based on the current URL
const restoreComments = async () => {
	const currentUrl = document.location.href

	if (currentUrl.includes("watch") || currentUrl.includes("series"))
		if (await checkReleaseDate()) {
			fetch("https://restore.crunchycomments.com/restore?url=" + currentUrl)
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
				scrapeStatusElement.innerText = "Support Us: https://ko-fi.com/crunchycomments"
			}
		}
}

// Inject comentario-comments and status elements
const checkAndInject = async () => {
	let pageWrapper = await getBodyElementEventually("[class*='page-wrapper--']")
	if (!pageWrapper) {
		console.log("No pageWrapper found. Skipping injection for now.")
		return
	}

	await sleep(500)

	const existingComentario = document.querySelector("comentario-comments")
	if (existingComentario) existingComentario.remove()
	const oldStatus = document.getElementById("app-status")
	if (oldStatus) oldStatus.remove()
	const oldScrape = document.getElementById("scrape-status")
	if (oldScrape) oldScrape.remove()

	console.log("Re-injecting <comentario-comments> on route change")
	await injectElements()
}

const injectElements = async () => {
	const pageWrapper = document.querySelector("[class*='page-wrapper--']")
	if (!pageWrapper) return
	const targetElement = pageWrapper.children[pageWrapper.children.length - 1] || pageWrapper
	let oldElement = document.querySelector("comentario-comments")
	let oldscrapeStatusElement = document.querySelector("#scrape-status")
	let oldStatusElement = document.querySelector("#app-status")
	if (oldElement) {
		oldElement.remove()
		oldscrapeStatusElement?.remove()
		oldStatusElement?.remove()
	}

	let statusElement = document.createElement("p")
	statusElement.id = "app-status"
	statusElement.className = "text--gq6o- text--is-l--iccTo expandable-section__text---00oG"
	statusElement.innerText = "Checking Status..."
	statusElement.style =
		"display: flex; justify-content: center; z-index: auto; max-width: fit-content; margin: auto; padding: 5px 0 15px;"

	let scrapeStatusElement = document.createElement("p")
	scrapeStatusElement.id = "scrape-status"
	scrapeStatusElement.className = "text--gq6o- text--is-l--iccTo expandable-section__text---00oG"
	scrapeStatusElement.innerText = "Restoring archived comments..."
	scrapeStatusElement.style =
		"display: flex; justify-content: center; z-index: 1; max-width: fit-content; margin: 0 auto;"

	let comentarioElement = document.createElement("comentario-comments")
	comentarioElement.setAttribute("max-level", "5")
	comentarioElement.setAttribute("lang", "en")
	// It seems "page-id" does not have any effect, so changes are moved to comentario.js
	targetElement.insertAdjacentElement("afterend", comentarioElement)
	targetElement.insertAdjacentElement("afterend", scrapeStatusElement)
	targetElement.insertAdjacentElement("afterend", statusElement)

	await reattachCommentObserver()
	await reattachEditorObserver(comentarioElement)

	// Fetch server status immediately after injection
	showServerStatus().catch((e) => console.error(e))
}

// Monitor URL changes and re-inject scripts as necessary
const checkAndUpdate = () => {
	window.addEventListener("popstate", async function (event) {
		restoreComments()
		await checkAndInject()
	})
}

window.addEventListener("locationchange", async () => {
	if (oldHref !== location.href) {
		oldHref = location.href
		requestAnimationFrame(async () => {
			await sleep(500)
			restoreComments()
			await checkAndInject()
		})
	}
})

// Entry Point
async function init() {
	if (document.readyState === "complete") {
		Promise.all([restoreComments(), showServerStatus()]).catch((e) => console.error(e))
		await checkAndInject()
		checkAndUpdate()

		setInterval(showServerStatus, 300000)
	}
}
document.addEventListener("readystatechange", init)
init()  // don't await this, it will block the extension from loading (I don't know why) [2025-03-07]
