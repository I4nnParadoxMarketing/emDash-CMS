import type { SessionDriver } from "astro";
import upstashDriver from "unstorage/drivers/upstash";

export default function (): SessionDriver {
	const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
	const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

	if (!url || !token) {
		throw new Error(
			"Missing KV_REST_API_URL and KV_REST_API_TOKEN (or Upstash equivalents) for Vercel session storage.",
		);
	}

	return upstashDriver({ url, token });
}
