const CDN_BASE = "https://cdn.jsdelivr.net/gh/duong991/images/";
// https://cdn.jsdelivr.net/gh/duong991/images/food-banhgoi.jpg
export function resolveImage(key: string): string {
    return `${CDN_BASE}${key}.jpg`;
}
