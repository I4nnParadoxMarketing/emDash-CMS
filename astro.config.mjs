import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import icon from "astro-iconset";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { local, s3 } from "emdash/astro";
import { libsql, sqlite } from "emdash/db";

const isVercel = Boolean(process.env.VERCEL);

function getDatabase() {
	if (process.env.LIBSQL_DATABASE_URL) {
		return libsql({
			url: process.env.LIBSQL_DATABASE_URL,
			authToken: process.env.LIBSQL_AUTH_TOKEN,
		});
	}

	return sqlite({ url: "file:./data.db" });
}

function getStorage() {
	if (process.env.S3_BUCKET || process.env.S3_ENDPOINT) {
		return s3(
			process.env.S3_PUBLIC_URL
				? { publicUrl: process.env.S3_PUBLIC_URL }
				: undefined,
		);
	}

	return local({
		directory: "./uploads",
		baseUrl: "/_emdash/api/media/file",
	});
}

export default defineConfig({
	output: "server",
	adapter: isVercel
		? vercel({
				imageService: true,
				webAnalytics: { enabled: true },
			})
		: node({ mode: "standalone" }),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	session: isVercel
		? {
				driver: {
					entrypoint: new URL("./src/session-driver.ts", import.meta.url),
				},
			}
		: undefined,
	integrations: [
		react(),
		icon({
			include: {
				ph: [
					"chart-bar",
					"check-circle",
					"clock",
					"cloud",
					"code",
					"currency-dollar",
					"envelope",
					"globe",
					"heart",
					"lifebuoy",
					"lightning",
					"lock",
					"shield-check",
					"sparkle",
					"star",
					"users-three",
				],
			},
		}),
		emdash({
			database: getDatabase(),
			storage: getStorage(),
			plugins: [
				{
					id: "marketing-blocks",
					version: "0.2.0",
					entrypoint: new URL("./src/plugins/marketing-blocks/index.ts", import.meta.url).href,
				},
			],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700, 800],
			fallbacks: ["sans-serif"],
		},
	],
	devToolbar: { enabled: false },
});
