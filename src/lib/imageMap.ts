const CDN_BASE = "https://cdn.jsdelivr.net/gh/duong991/images@main/";

export function resolveImage(key: string): string {
    return `${CDN_BASE}${key}.jpg`;
}
