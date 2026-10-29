const getFetch = () => {
  if (typeof fetch !== "undefined") return fetch;
  if (typeof globalThis !== "undefined" && (globalThis as any).fetch) return (globalThis as any).fetch;
  if (typeof global !== "undefined" && (global as any).fetch) return (global as any).fetch;
  return null;
};

export default async function getVenues(): Promise<VenueJson> {
  const fetchFn = getFetch();
  if (fetchFn) {
    const response = await fetchFn("https://a08-venue-explorer-backend.vercel.app/api/v1/venues");
    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }
    return await response.json();
  }

  const https = require("https");
  return new Promise((resolve, reject) => {
    const fetchUrl = (url: string) => {
      https.get(url, (res: any) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchUrl(res.headers.location);
        }
        let data = "";
        res.on("data", (chunk: any) => { data += chunk; });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }).on("error", (err: any) => { reject(err); });
    };
    fetchUrl("https://a08-venue-explorer-backend.vercel.app/api/v1/venues");
  });
}
