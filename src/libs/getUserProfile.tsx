export default async function getUserProfile(token: string) {
  const fetchFn = (typeof fetch !== "undefined" && fetch) || globalThis.fetch;
  const response = await fetchFn("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user profile");
  }

  return await response.json();
}
