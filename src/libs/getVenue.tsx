const getFetch = () => {
  if (typeof fetch !== "undefined") return fetch;
  if (typeof globalThis !== "undefined" && (globalThis as any).fetch) return (globalThis as any).fetch;
  if (typeof global !== "undefined" && (global as any).fetch) return (global as any).fetch;
  return null;
};

export default async function getVenue(id: string): Promise<{ success: boolean; data: VenueItem }> {
  const url = `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`;
  const fetchFn = getFetch();
  if (fetchFn) {
    const response = await fetchFn(url);
    if (!response.ok) {
      throw new Error("Failed to fetch venue");
    }
    return await response.json();
  }

  const https = require("https");
  return new Promise((resolve, reject) => {
    const fetchUrl = (targetUrl: string) => {
      https.get(targetUrl, (res: any) => {
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
    fetchUrl(url);
  });
}
