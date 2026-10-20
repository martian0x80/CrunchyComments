"use client"

import { useEffect, useRef } from "react"

export function ComentarioComments() {
	const comments = useRef<HTMLElement>(null)

	useEffect(() => {
		const section = comments.current?.closest(".comments-section")
		if (!section) return

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				section.classList.add("is-visible")
				observer.disconnect()
			}
		})

		observer.observe(section)
		return () => observer.disconnect()
	}, [])

	return <comentario-comments ref={comments} />
}
