import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "icon-library.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "earnsphere.fly.storage.tigris.dev",
				port: "",
			},
		],
	},
};

export default nextConfig;
