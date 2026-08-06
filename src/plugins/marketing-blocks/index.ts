/**
 * Imagine Egg Donation marketing blocks plugin.
 */

import { definePlugin } from "emdash";
import type { PluginDefinition } from "emdash";

const ICON_OPTIONS = [
	{ label: "Lightning", value: "zap" },
	{ label: "Shield", value: "shield" },
	{ label: "Users", value: "users" },
	{ label: "Chart", value: "chart" },
	{ label: "Code", value: "code" },
	{ label: "Globe", value: "globe" },
	{ label: "Heart", value: "heart" },
	{ label: "Star", value: "star" },
	{ label: "Check", value: "check" },
	{ label: "Lock", value: "lock" },
	{ label: "Clock", value: "clock" },
	{ label: "Cloud", value: "cloud" },
];

const definition: PluginDefinition = {
	id: "marketing-blocks",
	version: "0.2.0",

	admin: {
		portableTextBlocks: [
			{
				type: "marketing.hero",
				label: "Hero Banner",
				category: "Sections",
				description: "Full-width hero with background image and CTAs",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{ type: "text_input", action_id: "primaryCtaLabel", label: "Primary CTA label" },
					{ type: "text_input", action_id: "primaryCtaUrl", label: "Primary CTA URL" },
					{
						type: "text_input",
						action_id: "secondaryCtaLabel",
						label: "Secondary CTA label",
					},
					{ type: "text_input", action_id: "secondaryCtaUrl", label: "Secondary CTA URL" },
					{
						type: "text_input",
						action_id: "backgroundImage",
						label: "Background image URL",
						placeholder: "/images/home-banner-v2.webp",
					},
				],
			},

			{
				type: "marketing.intro",
				label: "Intro Section",
				category: "Sections",
				description: "Centered headline and body text",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "body",
						label: "Body text",
						multiline: true,
					},
				],
			},

			{
				type: "marketing.features",
				label: "Features",
				category: "Sections",
				description: "Grid of feature cards with icons",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{
						type: "select",
						action_id: "variant",
						label: "Layout variant",
						options: [
							{ label: "Default (3 columns)", value: "default" },
							{ label: "Highlight (centered, with CTA)", value: "highlight" },
						],
					},
					{ type: "text_input", action_id: "ctaLabel", label: "CTA label (highlight variant)" },
					{ type: "text_input", action_id: "ctaUrl", label: "CTA URL (highlight variant)" },
					{
						type: "repeater",
						action_id: "features",
						label: "Features",
						item_label: "Feature",
						min_items: 1,
						max_items: 12,
						fields: [
							{
								type: "select",
								action_id: "icon",
								label: "Icon (if no image URL)",
								options: ICON_OPTIONS,
							},
							{
								type: "text_input",
								action_id: "iconUrl",
								label: "Icon image URL",
								placeholder: "/images/generous-icon.png",
							},
							{ type: "text_input", action_id: "title", label: "Title" },
							{
								type: "text_input",
								action_id: "description",
								label: "Description",
								multiline: true,
							},
						],
					},
				],
			},

			{
				type: "marketing.industries",
				label: "Industries",
				category: "Sections",
				description: "Industry cards pulled from the Industries collection in the admin",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
				],
			},

			{
				type: "marketing.stats",
				label: "Statistics",
				category: "Sections",
				description: "Key numbers and metrics grid",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "stats",
						label: "Statistics",
						item_label: "Stat",
						min_items: 1,
						max_items: 8,
						fields: [
							{ type: "text_input", action_id: "value", label: "Value", placeholder: "40+" },
							{ type: "text_input", action_id: "label", label: "Label" },
							{
								type: "text_input",
								action_id: "iconUrl",
								label: "Icon image URL",
								placeholder: "/images/year-icon.png",
							},
						],
					},
				],
			},

			{
				type: "marketing.faq",
				label: "FAQ Section",
				category: "Sections",
				description: "FAQ accordion pulled from the FAQs collection in the admin",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
				],
			},

			{
				type: "marketing.cta",
				label: "CTA Banner",
				category: "Sections",
				description: "Full-width call-to-action banner",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{ type: "text_input", action_id: "primaryCtaLabel", label: "Primary CTA label" },
					{ type: "text_input", action_id: "primaryCtaUrl", label: "Primary CTA URL" },
					{
						type: "text_input",
						action_id: "secondaryCtaLabel",
						label: "Secondary CTA label",
					},
					{ type: "text_input", action_id: "secondaryCtaUrl", label: "Secondary CTA URL" },
					{
						type: "text_input",
						action_id: "backgroundImage",
						label: "Background image URL",
						placeholder: "/images/cta-banner.webp",
					},
				],
			},
		],
	},
};

export function createPlugin() {
	return definePlugin(definition);
}

export default createPlugin;
