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
	window.addEventListener("popstate", async function (event) {
		restoreComments();
		await checkAndInject();
	});

	const bodyList = document.querySelector("body");

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(async function (mutation) {
			if (oldHref != document.location.href) {
				oldHref = document.location.href;
				restoreComments();
				await checkAndInject();
			}
		});
	});
	const config = {
		childList: true,
		subtree: true,
	};
	observer.observe(bodyList, config);
};

const checkAndInject = async () => {
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

		await reattachCommentObserver();
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
const getBodyElementEventually = async function(selector) {
	return new Promise((resolve) => {
		function resolveIfPresent() {
			const elem = document.querySelector(selector);
			if (elem !== null) {
				resolve(elem);
			} else {
				requestAnimationFrame(resolveIfPresent);
			}
		}
		resolveIfPresent();
	})
};

/* Takes the comment holder and replaces all spoilers with a span element that can be clicked to reveal the spoiler */
const replaceSpoilersWithHtml = function(regex, commentHolder) {
	for (const comment of commentHolder.querySelectorAll(".comentario-card .comentario-card-body > p:not(:has(span.crunchy-comments-spoiler-block))")) {
		comment.innerHTML = comment.innerHTML.replaceAll(regex, (match) => `<span class="crunchy-comments-spoiler-block">${match.slice(2,match.length-2).trim()}</span>`);
		comment.querySelectorAll("span.crunchy-comments-spoiler-block").forEach((spoiler) => {
			spoiler.addEventListener("click", () => {
				spoiler.classList.toggle("revealed");
			});
		});
	}
};

const spoilerRegex = /\|\|.+?\|\|/gs;
/* Renders features on the given comment holder */
const renderFeatures = (commentHolder) => {
	replaceSpoilersWithHtml(spoilerRegex, commentHolder);
};

let commentObserver = null;
/* Reattaches the comment observer to the new comment holder */
const reattachCommentObserver = async () => {
	/* Render features on existing comments + rerender on changes */
	const commentHolder = await getBodyElementEventually("comentario-comments .comentario-comments");
	const onMutation = (mutationsList, observer) => {
		observer.disconnect();

		renderFeatures(commentHolder);

		/* Only reobserve the comment holder if the observer has not already been replaced */
		if (commentObserver === observer) {
			observer.observe(commentHolder, {
				subtree: true,
				childList: true,
				characterData: true
			});
		}
	}

	if (commentObserver !== null) commentObserver.disconnect();
	commentObserver = new MutationObserver(onMutation);
	onMutation(null, commentObserver);
};

// EntryPoint
document.addEventListener("readystatechange", async (event) => {
	if (document.readyState === "complete") {
		restoreComments();
		await checkAndInject();
		checkAndUpdate();
	}
});
