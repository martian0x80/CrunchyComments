import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function BottomNav() {
	const [activeTab, setActiveTab] = useState("features")

	return (
		<motion.nav
			className="fixed bottom-4 w-full flex justify-center left-[20px] z-50"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className="relative flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
				{/* Animated pill background */}
				<motion.div
					className="absolute h-8 rounded-full bg-white/20"
					layoutId="pill"
					transition={{ type: "spring", duration: 0.5 }}
					style={{
						width: activeTab === "features" ? "85px" : activeTab === "demo" ? "65px" : "0px",
						left: activeTab === "features" ? "20px" : activeTab === "demo" ? "125px" : "0px",
					}}
				/>

				<a
					href="#features"
					className={`relative text-sm transition-colors px-3 py-1 ${
						activeTab === "features" ? "text-white" : "text-white/70 hover:text-white"
					}`}
					onClick={() => setActiveTab("features")}
				>
					Features
				</a>

				<a
					href="#demo"
					className={`relative text-sm transition-colors px-3 py-1 ${
						activeTab === "demo" ? "text-white" : "text-white/70 hover:text-white"
					}`}
					onClick={() => setActiveTab("demo")}
				>
					Demo
				</a>

				<Button
					className={`relative bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity ${
						activeTab === "install" ? "text-white" : "text-white/70 hover:text-white"
					}`}
					onClick={() => setActiveTab("install")}
				>
					Install Now
				</Button>
			</div>
		</motion.nav>
	)
}
