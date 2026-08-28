/**
 * Pure, dependency-free validation/filtering logic for the /connect link
 * system — kept separate from connectApi.ts (which does network I/O) so
 * it's trivially unit-testable.
 */

export type ConnectLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  category: string;
  position: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

const ALLOWED_URL_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Only http(s)/mailto/tel are ever accepted for a link destination. This
 * is also the open-redirect defense: there's no generic "?url=" redirect
 * endpoint in this system, but link destinations are still admin input,
 * so they're constrained to schemes a browser can safely navigate to
 * directly.
 */
export function isValidLinkUrl(url: string): boolean {
  if (!url || url.length > 2048) return false;
  try {
    const parsed = new URL(url);
    return ALLOWED_URL_SCHEMES.has(parsed.protocol);
  } catch {
    return false;
  }
}

/** Only enabled links, sorted by position, are ever shown publicly. */
export function getVisibleLinks(links: ConnectLink[]): ConnectLink[] {
  return links
    .filter((link) => link.enabled)
    .sort((a, b) => a.position - b.position);
}

const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 200;

export type LinkInput = {
  name: string;
  url: string;
  icon: string;
  description?: string;
  category?: string;
};

export type LinkInputErrors = Partial<Record<keyof LinkInput, string>>;

export function validateLinkInput(input: LinkInput): LinkInputErrors {
  const errors: LinkInputErrors = {};
  if (!input.name || input.name.trim().length === 0) {
    errors.name = "Name is required.";
  } else if (input.name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }
  if (!isValidLinkUrl(input.url)) {
    errors.url = "Enter a valid http(s), mailto:, or tel: URL.";
  }
  if (!input.icon || input.icon.trim().length === 0) {
    errors.icon = "Select an icon.";
  }
  if (input.description && input.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }
  return errors;
}
