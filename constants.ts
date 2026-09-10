
export const API_BASE_URL = "https://notehub-api.goit.study";

export const PAGINATION_CONFIG = {
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 1,
  nextLabel: "→",
  previousLabel: "←",
};

export const NOTES_PER_PAGE = 12;

export const NOTE_TAGS = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
] as const;

export const SITE_NAME = "NoteHub";
export const HOME_PAGE_URL = "09-auth-silk-gamma.vercel.app";

export const OG_IMAGE = {
  url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
  width: 1200,
  height: 630,
  alt: "NoteHub application preview",
};