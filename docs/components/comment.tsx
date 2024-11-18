import Script from "next/script"
import { useEffect, useState } from "react"

export function Comments() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		console.log("mounted")
	}, [])

	return (
		<>
			{isMounted && (
				<Script defer={true} src="https://chat.crunchycomments.com/comentario.js" strategy="lazyOnload" />
			)}
		</>
	)
}
