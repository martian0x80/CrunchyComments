function patchHistoryMethods() {
	const _pushState = history.pushState
	history.pushState = function (...args) {
		const ret = _pushState.apply(this, args)
		window.dispatchEvent(new Event("locationchange"))
		return ret
	}

	const _replaceState = history.replaceState
	history.replaceState = function (...args) {
		const ret = _replaceState.apply(this, args)
		window.dispatchEvent(new Event("locationchange"))
		return ret
	}
}

patchHistoryMethods()
