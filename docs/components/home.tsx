const chromeStore =
	"https://chromewebstore.google.com/detail/crunchyroll-comments/feapmagcaclnifojeninfmpdedbiafdd?authuser=0&hl=en"
const firefoxAddons = "https://addons.mozilla.org/en-US/firefox/addon/crunchy-comments-uwu/"
const github = "https://github.com/martian0x80/CrunchyComments"
const discord = "https://discord.gg/MW3rgwTcF9"

export function Home() {
	return (
		<div className="home-page">
			<section className="home-grid" aria-labelledby="home-title">
				<div className="home-copy">
					<h1 id="home-title">Comments are back on Crunchyroll.</h1>
					<p className="home-intro">
						Remember the dark day: <time dateTime="2024-07-08">July 8, 2024</time>.
						<br />
						CrunchyComments is a browser extension that restores the comment section on Crunchyroll.
					</p>

					<div className="audience-paths">
						<section className="audience-path" id="install" aria-labelledby="viewer-title">
							<h2 id="viewer-title">For viewers</h2>
							<p>Install the extension for your browser.</p>
							<ul className="link-list">
								<li><a href={chromeStore}>Chrome Web Store</a></li>
								<li><a href={firefoxAddons}>Firefox Add-ons</a></li>
								<li><a href={chromeStore}>Edge</a></li>
							</ul>
						</section>

						<section className="audience-path" id="contribute" aria-labelledby="contributor-title">
							<h2 id="contributor-title">For contributors</h2>
							<p>Explore the project and join its community.</p>
							<ul className="link-list">
								<li><a href={github}>View source on GitHub</a></li>
								<li><a href={discord}>Join Discord</a></li>
							</ul>
						</section>
					</div>
				</div>

				<figure className="home-preview">
					<div className="preview-frame">
						<img
							src="/comments-preview.png"
							alt="Example of the comment section restored on Crunchyroll"
							width={1374}
							height={784}
							loading="eager"
							fetchPriority="high"
							decoding="async"
							className="preview-image"
						/>
					</div>
					<figcaption>Comment section shown with CrunchyComments.</figcaption>
				</figure>
			</section>
		</div>
	)
}
