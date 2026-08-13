/**
 * Dev-only: auto-sign in when visiting the EmDash admin without a session.
 * Production is unchanged — normal passkey/login auth still applies.
 */
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	if (!import.meta.env.DEV) {
		return next();
	}

	const { pathname, search } = context.url;

	if (
		!pathname.startsWith("/_emdash/admin") ||
		pathname.startsWith("/_emdash/admin/login") ||
		pathname.startsWith("/_emdash/admin/setup") ||
		pathname.startsWith("/_emdash/admin/invite")
	) {
		return next();
	}

	const user = await context.session?.get("user");
	if (!user) {
		const redirect = encodeURIComponent(pathname + search);
		return context.redirect(`/_emdash/api/setup/dev-bypass?redirect=${redirect}`);
	}

	return next();
});
