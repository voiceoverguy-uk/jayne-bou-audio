export interface EbayListing {
  id: string;
  title: string;
  price: string;
  currency: string;
  condition: string;
  imageUrl: string | null;
  ebayUrl: string;
  category: string;
}

interface CacheEntry {
  data: EbayListing[];
  fetchedAt: number;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
let cache: CacheEntry | null = null;
let staleCache: EbayListing[] | null = null;

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`eBay auth failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function fetchEbayListings(): Promise<EbayListing[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  const sellerId = process.env.EBAY_SELLER_ID ?? "jaynebouaudio";

  if (!clientId || !clientSecret) {
    throw new Error("EBAY_CREDENTIALS_MISSING");
  }

  let token: string;
  try {
    token = await getAccessToken(clientId, clientSecret);
  } catch (err) {
    if (staleCache) return staleCache;
    throw err;
  }

  const url = new URL("https://api.ebay.com/buy/browse/v1/item_summary/search");
  // eBay Browse API requires at least one of: q, category_ids, charity_ids, epid, gtin.
  // category_ids=293 (Consumer Electronics) is broad enough to cover all hi-fi gear.
  // Seller filter scopes results to Dave's listings only.
  url.searchParams.set("category_ids", "293");
  url.searchParams.set("filter", `sellers:{${sellerId}}`);
  url.searchParams.set("limit", "50");
  url.searchParams.set("sort", "newlyListed");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY-GB",
      "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DGB",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    if (staleCache) {
      console.warn(`eBay Browse API failed (${res.status}), serving stale cache`);
      return staleCache;
    }
    throw new Error(`eBay Browse API failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    itemSummaries?: Array<{
      itemId: string;
      title: string;
      price?: { value: string; currency: string };
      condition?: string;
      image?: { imageUrl: string };
      itemWebUrl: string;
      categories?: Array<{ categoryName: string }>;
    }>;
  };

  const items = data.itemSummaries ?? [];

  const listings: EbayListing[] = items.map((item) => ({
    id: item.itemId,
    title: item.title,
    price: item.price?.value ?? "0.00",
    currency: item.price?.currency ?? "GBP",
    condition: item.condition ?? "Used",
    imageUrl: item.image?.imageUrl ?? null,
    ebayUrl: item.itemWebUrl,
    category: item.categories?.[0]?.categoryName ?? "Hi-Fi Equipment",
  }));

  cache = { data: listings, fetchedAt: Date.now() };
  staleCache = listings;
  return listings;
}

export function clearListingsCache(): void {
  cache = null;
}
