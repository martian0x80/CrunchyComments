import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})

const description = "A browser extension that restores comments on Crunchyroll."

export const metadata: Metadata = {
	metadataBase: new URL("https://www.crunchycomments.com"),
	title: { default: "CrunchyComments", template: "%s | CrunchyComments" },
	description,
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
	twitter: {
		card: "summary_large_image",
		site: "@crunchycomments",
		creator: "@crunchycomments",
		title: "CrunchyComments",
		description,
		images: ["/hime.png"],
	},
	openGraph: {
		type: "website",
		siteName: "CrunchyComments",
		locale: "en_US",
		title: "CrunchyComments",
		description,
		images: [{ url: "/hime.png", alt: "Hime" }],
	},
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={geistSans.variable}>
				<a className="skip-link" href="#main">Skip to content</a>
				<div className="site-shell">
					<header className="site-header">
						<a className="wordmark" href="/">
							<span className="wordmark-cue" aria-hidden="true" />
							CrunchyComments
						</a>
					</header>

					<main id="main" tabIndex={-1}>{children}</main>

					<footer className="site-footer">
						<a className="footer-name" href="/">CrunchyComments</a>
						<nav className="footer-nav" aria-label="Footer navigation">
							<a href="https://github.com/martian0x80/CrunchyComments">GitHub</a>
							<a href="https://discord.gg/MW3rgwTcF9">Discord</a>
							<a href="/privacy">Privacy</a>
							<a href="/terms">Terms</a>
						</nav>
					</footer>
				</div>
			</body>
		</html>
	)
}
