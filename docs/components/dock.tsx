import React from "react"
import { FloatingDock } from "@/components/ui/floating-dock"
import {
	IconBrandGithub,
	IconBrandDiscord,
	IconCurrencyLira,
	IconSparkles,
	IconArrowUpDashed,
	IconDropletDown,
} from "@tabler/icons-react"
import Image from "next/image"

export function FloatingDockB() {
	const links = [
		{
			title: "Top",
			icon: <IconArrowUpDashed className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "#top",
		},
		{
			title: "Features",
			icon: <IconSparkles className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "#features",
		},
		{
			title: "Install",
			icon: <IconDropletDown className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "#install",
		},
		{
			title: "Try Now",
			icon: <IconCurrencyLira className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "#demo",
		},
		{
			title: "Discord",
			icon: <IconBrandDiscord className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "https://discord.com/invite/MW3rgwTcF9",
		},
		{
			title: "GitHub",
			icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "https://github.com/martian0x80/CrunchyComments",
		},
	]
	return (
		<div className="flex items-center justify-center w-full fixed bottom-4 z-50">
			<FloatingDock
				mobileClassName="translate-y-20"
				items={links}
				desktopClassName="dark backdrop-blur-3xl bg-inherit border border-neutral-200 dark:border-neutral-700"
			/>
		</div>
	)
}
