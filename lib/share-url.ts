export function resolveShareUrl(
  canonicalHref: string | null,
  locationHref: string,
): string {
  const target = new URL(canonicalHref || locationHref, locationHref);
  target.search = "";
  target.hash = "";
  return target.toString();
}
