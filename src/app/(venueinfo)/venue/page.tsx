import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default async function VenuePage() {
  const venues = getVenues();

  return (
    <main style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Select your venue</h1>
      <VenueCatalog venuesJson={venues} />
    </main>
  );
}
