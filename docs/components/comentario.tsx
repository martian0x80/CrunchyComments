// components/ComentarioComments.tsx
import { useEffect, useRef } from "react"

export function ComentarioComments() {
	const elementRef = useRef<HTMLElement>(null)

	return <comentario-comments ref={elementRef} />
}
