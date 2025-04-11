"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Lock, Users, Sparkles, ThumbsUp, RadioTower, EyeOff } from "lucide-react"
import {
	IconBrandGithub,
	IconBrandChrome,
	IconBrandFirefox,
	IconBrandSafari,
	IconBrandEdge,
	IconBrowserPlus,
} from "@tabler/icons-react"
import { Comments } from "@/components/comment"
import { ComentarioComments } from "./comentario"
import { FloatingDockB } from "./dock"
import Link from "next/link"
import Image from "next/image"
import hime from "@/public/hime.png"

interface GlowingOrbProps {
	x: number
	y: number
	color: string
	scale?: number
}

const GlowingOrb = ({ x, y, color, scale = 1 }: GlowingOrbProps) => (
	<motion.div
		className="absolute rounded-full blur-3xl"
		style={{
			x,
			y,
			background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
			width: 200 * scale,
			height: 200 * scale,
		}}
		initial={{ opacity: 0 }}
		animate={{ opacity: 0.3 }}
		transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
	/>
)

const RotatingText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const rotate = useMotionValue(0)
	const scale = useTransform(rotate, [0, 180], [1, 1.1])
	const y = useMotionValue(0)

	return (
		<motion.div
			style={{ rotate, scale, y }}
			drag
			dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
			dragElastic={0.5}
			whileHover={{
				scale: 1.05,
				transition: { duration: 0.2 },
			}}
			animate={{
				rotate: [0, -2, 2, 0],
				y: [0, -5, 5, 0],
			}}
			transition={{
				duration: 6,
				repeat: Infinity,
				ease: "easeInOut",
			}}
			className="cursor-grab active:cursor-grabbing select-none"
		>
			{children}
		</motion.div>
	)
}

const throttle = (func: Function, limit: number) => {
	let inThrottle: boolean
	return function (this: any, ...args: any[]) {
		if (!inThrottle) {
			func.apply(this, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}

export function Home() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const backgroundControls = useAnimation()
	const scrollRef = useRef<HTMLDivElement>(null)
	const [scrollY, setScrollY] = useState(0)
	const [activeTab, setActiveTab] = useState("features")

	const [windowWidth, setWindowWidth] = useState<number>(0)
	const [windowHeight, setWindowHeight] = useState<number>(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth)
			setWindowHeight(window.innerHeight)

			const handleResize = () => {
				setWindowWidth(window.innerWidth)
				setWindowHeight(window.innerHeight)
			}
			window.addEventListener("resize", handleResize)
			return () => window.removeEventListener("resize", handleResize)
		}
	}, [])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	useEffect(() => {
		backgroundControls.start({
			background: [
				"linear-gradient(45deg, #ff4500, #ff8700, #ff4500)",
				"linear-gradient(45deg, #ff8700, #ff4500, #ff8700)",
				"linear-gradient(45deg, #ff4500, #ff8700, #ff4500)",
			],
			transition: { duration: 10, repeat: Infinity, repeatType: "reverse" },
		})
	}, [backgroundControls])

	const handleScroll = useCallback(
		throttle(() => {
			if (scrollRef.current) {
				setScrollY(scrollRef.current.scrollTop)
			}
		}, 100),
		[]
	)

	useEffect(() => {
		const currentScrollRef = scrollRef.current
		if (currentScrollRef) {
			currentScrollRef.addEventListener("scroll", handleScroll)
		}

		return () => {
			if (currentScrollRef) {
				currentScrollRef.removeEventListener("scroll", handleScroll)
			}
		}
	}, [handleScroll])

	const yRange = useMotionValue(0)
	const y = useTransform(yRange, [0, 300], [0, -100])
	const y2 = useTransform(yRange, [0, 300], [0, -200])

	useEffect(() => {
		yRange.set(scrollY)
	}, [scrollY, yRange])

	return (
		<div className="relative min-h-screen w-full bg-black text-white overflow-auto">
			<motion.div className="fixed inset-0 opacity-20" animate={backgroundControls} />
			<div className="fixed inset-0" style={{ mixBlendMode: "color-dodge" }}>
				<GlowingOrb x={100} y={100} color="#ff4500" scale={1.5} />
				{windowWidth > 0 && windowHeight > 0 && (
					<>
						<GlowingOrb x={windowWidth - 300} y={200} color="#ff8700" />
						<GlowingOrb x={windowWidth / 2} y={windowHeight - 200} color="#ff4500" />
					</>
				)}
			</div>

			<motion.div
				className="fixed top-4 left-0 right-0 z-50 px-4"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex items-center gap-2">
						<MessageSquare className="h-8 w-8 text-orange-500" />
						<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
							Crunchy Comments
						</span>
					</div>
					<div className="flex items-center gap-4">
						<Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
							Privacy Policy
						</Link>
						<span className="text-gray-600">•</span>
						<Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</motion.div>

			<div ref={scrollRef} className="relative">
				<section className="min-h-screen flex items-center justify-center py-20">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-4xl mx-auto"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<RotatingText>
								<h1 className="text-7xl md:text-9xl font-bold mb-6 leading-none text-center perspective-1000">
									<motion.span
										className="inline-block transform -rotate-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500"
										whileHover={{
											scale: 1.1,
											rotate: -8,
											transition: { duration: 0.2 },
										}}
									>
										Crunchy
									</motion.span>
									<br />
									<motion.span
										className="inline-block transform rotate-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
										whileHover={{
											scale: 1.1,
											rotate: 5,
											transition: { duration: 0.2 },
										}}
									>
										Comments
									</motion.span>
								</h1>
							</RotatingText>
							<motion.p
								className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center"
								style={{ y }}
							>
								Missing the comment section on Crunchyroll? Join the conversation with CrunchyComments!
							</motion.p>
							<motion.div className="flex flex-wrap justify-center gap-4" style={{ y: y2 }}>
								<Button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-105">
									<a href="#install">Join the Conversation</a>
								</Button>
								<Button
									variant="outline"
									className="rounded-full px-8 py-4 text-lg font-semibold border-white/20 bg-transparent transition-transform hover:scale-105"
								>
									<IconBrandGithub className="mr-2 h-5 w-5" />
									<a
										href="https://github.com/martian0x80/CrunchyComments"
										target="_blank"
										rel="noreferrer"
									>
										Star on GitHub
									</a>
								</Button>
							</motion.div>
						</motion.div>
					</div>
				</section>

				<section className="min-h-screen flex items-center justify-center py-20">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-4xl mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<h2
								id="features"
								className="text-5xl md:text-7xl font-bold mb-12 text-center scroll-mt-[100px]"
							>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
									Features
								</span>
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
								{[
									{
										icon: Lock,
										title: "Privacy First",
										description: "Your data stays yours. No tracking, no ads.",
									},
									{
										icon: Users,
										title: "Community Driven",
										description: "Built by anime fans, for anime fans.",
									},
									{
										icon: Sparkles,
										title: "Rich Discussions",
										description: "Markdown support for rich text formatting.",
									},
									{
										icon: ThumbsUp,
										title: "Moderation Tools",
										description:
											"Community-driven moderation. Upvote good comments, downvote bad ones.",
									},
									{
										icon: RadioTower,
										title: "Real-Time Updates",
										description: "See new comments as they come in.",
									},
									{
										icon: EyeOff,
										title: "Spoilers and TimeStamps",
										description:
											"Hide spoilers with a click of a button. Jump to specific timestamps.",
									},
								].map((feature, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.2 }}
									>
										<Card className="bg-white/5 border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-transform hover:scale-105 h-full">
											<CardContent className="p-6">
												<feature.icon className="h-12 w-12 mb-4 text-orange-500" />
												<h3 className="text-xl font-semibold mb-2 text-white">
													{feature.title}
												</h3>
												<p className="text-gray-400">{feature.description}</p>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				<section className="min-h-screen flex items-center justify-center py-20">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-4xl mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<h2
								id="install"
								className="text-5xl md:text-7xl font-bold mb-12 text-center scroll-mt-[140px]"
							>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
									Available On
								</span>
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
								{[
									{
										icon: IconBrandChrome,
										name: "Chrome",
										description: "Available on Chrome Web Store",
										link: "https://chromewebstore.google.com/detail/crunchyroll-comments/feapmagcaclnifojeninfmpdedbiafdd?authuser=0&hl=en",
									},
									{
										icon: IconBrandFirefox,
										name: "Firefox",
										description: "Get it on Firefox Add-ons",
										link: "https://addons.mozilla.org/en-US/firefox/addon/crunchy-comments-uwu/",
									},
									// {
									// 	icon: IconBrandSafari,
									// 	name: "Safari",
									// 	description: "Download for Safari",
									// 	link: "#",
									// },
									{
										icon: IconBrandEdge,
										name: "Edge",
										description: "Get it on Edge Add-ons",
										link: "https://chromewebstore.google.com/detail/crunchyroll-comments/feapmagcaclnifojeninfmpdedbiafdd?authuser=0&hl=en",
									},
									{
										icon: IconBrowserPlus,
										name: "Other Browsers",
										description:
											"Compatible with most Chromium and Gecko browsers like Zen, Brave and Opera GX.",
										link: "https://chromewebstore.google.com/detail/crunchyroll-comments/feapmagcaclnifojeninfmpdedbiafdd?authuser=0&hl=en",
									},
								].map((platform, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
									>
										<a href={platform.link} className="block" target="_blank" rel="noreferrer">
											<Card className="bg-white/5 border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 h-full w-full group">
												<CardContent className="p-6 flex flex-col items-center text-center">
													<platform.icon
														className="h-20 w-20 mb-4 text-orange-500 group-hover:text-pink-500 transition-colors duration-300"
														stroke={1.5}
													/>
													<h3 className="text-xl font-semibold mb-2 text-white">
														{platform.name}
													</h3>
													<p className="text-sm text-gray-400">{platform.description}</p>
													<Badge className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500">
														Install Now
													</Badge>
												</CardContent>
											</Card>
										</a>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				<section className="flex items-center justify-center pt-20 pb-5">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-4xl mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<h2 id="demo" className="text-5xl md:text-7xl font-bold mb-12 text-center scroll-mt-[50px]">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
									Join the Conversation
								</span>
							</h2>
						</motion.div>
					</div>
				</section>
				<Comments />
				<div className="mb-10">
					<ComentarioComments />
				</div>

			</div>

			<FloatingDockB />

			<div className="fixed bottom-0 right-0 z-40 pointer-events-none">
				<Image
					src={hime}
					alt="Hime"
					width={300}
					height={300}
					className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[400px] object-contain hover:opacity-100 transition-opacity duration-300"
				/>
			</div>
		</div>
	)
}
