/** Shared links and asset paths for the marketing site. */

/**
 * Where this site is published. Set `NEXT_PUBLIC_BASE_PATH` when it is served
 * from a sub-path (a GitHub Pages project site lives at `/<repo>`).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a file in `public/` with the deployment path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** This marketing site, as deployed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ahmedkamalrezk.github.io/Lektra-web";

/** The planner app itself. */
export const APP_URL = "https://ahmedkamalrezk.github.io/Lektra/";

/** Where the feedback form sends its message. */
export const FEEDBACK_EMAIL = "ahmedkamalrezk@gmail.com";

/** The in-site feedback page. */
export const FEEDBACK_HREF = "/feedback";
