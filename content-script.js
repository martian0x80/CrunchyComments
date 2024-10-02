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
		let oldscrapeStatusElement = document.querySelector("#scrape-status");
		if (oldElement) {
			oldElement.remove();
			oldscrapeStatusElement.remove();
		}
		let scrapeStatusElement = document.createElement("p");
		scrapeStatusElement.id = "scrape-status";
		scrapeStatusElement.className =
			"text--gq6o- text--is-l--iccTo expandable-section__text---00oG";
		scrapeStatusElement.innerText = "Restoring old comments...";
		scrapeStatusElement.style =
			"display: flex; justify-content: center; z-index: 999; max-width: fit-content; margin: 0 auto;";
		let comentarioElement = document.createElement("comentario-comments");
		comentarioElement.setAttribute("max-level", "5");
		// It seems "page-id" does not have any effect, so changes are moved to comentario.js
		targetElement.insertAdjacentElement("afterend", comentarioElement);
		targetElement.insertAdjacentElement("afterend", scrapeStatusElement);

		reattachCommentObserver()
	} else {
		requestAnimationFrame(checkAndInject);
	}
};

const restoreComments = () => {
	const currentUrl = document.location.href;

	if (currentUrl.includes("watch") || currentUrl.includes("series"))
		fetch("https://crunchy.404420.xyz/restore?url=" + currentUrl).then(
			(response) => {
				response.json().then((data) => {
					scrapeStatusElement = document.getElementById("scrape-status");
					try {
						scrapeStatusElement.innerText = data.message;
					} catch (error) {
						scrapeStatusElement.innerText = "Error restoring comments";
					}
				});
			},
		);
};

/* Waits for the first element that matches the selector to appear in the DOM */
/** @returns Promise<Node> */
async function getBodyElementEventually(selector) {
	return new Promise((resolve) => {
		const onMutation = (mutations, observer) => {
			const elem = document.querySelector(selector);
			if (elem !== null) {
				observer.disconnect()
				resolve(elem)
			}
		}
		const observer = new MutationObserver(onMutation)
		observer.observe(document.body, {
			subtree: true,
			childList: true,
			attributes: true,
		})
		onMutation(null, observer)
	})
}

/* Takes the comment holder and replaces all spoilers with a span element that can be clicked to reveal the spoiler */
function replaceSpoilersWithHtml(regex, commentHolder) {
	for (const comment of commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p:not(:has(span.crunchy-comments-spoiler-block))")) {
		comment.innerHTML = comment.innerHTML.replaceAll(regex, (match) => `<span class="crunchy-comments-spoiler-block">${match.slice(2,match.length-2).trim()}</span>`)
		comment.querySelectorAll("span.crunchy-comments-spoiler-block").forEach((spoiler) => {
			spoiler.addEventListener("click", () => {
				spoiler.classList.toggle("revealed")
			})
		})
	}
}

const spoilerRegex = /\|\|.+?\|\|/gs
/* Renders features on the given comment holder */
const renderFeatures = async (commentHolder) => {
	replaceSpoilersWithHtml(spoilerRegex, commentHolder)
}

let commentObserver = null;
/* Reattaches the comment observer to the new comment holder */
const reattachCommentObserver = async () => {
	if (commentObserver !== null) commentObserver.disconnect()

	/* Render features on existing comments + rerender on changes */
	const commentHolder = await getBodyElementEventually("comentario-comments .comentario-comments")
	const onMutation = (mutationsList, observer) => {
		commentObserver.disconnect();

		renderFeatures(commentHolder)

		observer.observe(commentHolder, {
			subtree: true,
			childList: true,
			characterData: true
		})
	}
	commentObserver = new MutationObserver(onMutation)
	onMutation(null, commentObserver)
}

// EntryPoint
document.addEventListener("readystatechange", (event) => {
	if (document.readyState === "complete") {
		restoreComments();
		checkAndInject();
		checkAndUpdate();
	}
});
