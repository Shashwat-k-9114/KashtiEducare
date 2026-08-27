import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * This repo currently has no non-content routes (no /api, /admin, etc.) —
 * there is nothing to disallow beyond the default allow-all.
 *
 * AI answer-engine crawlers (Google-Extended, OAI-SearchBot, PerplexityBot,
 * ClaudeBot, Applebot-Extended) are explicitly allowed below. This is a
 * conscious tradeoff, not an oversight: several of these agents (notably
 * Google-Extended and ClaudeBot's training-crawl behavior) can be used for
 * model training as well as answer citation, and there is currently no way
 * to opt into "cite us" without also opting into "you may train on us" for
 * some of these agents. Given the stated goal is visibility in AI answers
 * (ChatGPT, Perplexity, Google AI Overviews, Claude), this defaults to
 * allow — revisit if that tradeoff ever needs to flip.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // AI answer-engine crawlers — see tradeoff note above.
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
