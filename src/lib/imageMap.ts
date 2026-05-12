const CDN_BASE = "https://stagging.safekid.vn/uploads/taste-of-vietnam-explorer/";

export function resolveImage(key: string): string {
    return `${CDN_BASE}${key}.jpg`;
}
