import getVenue from "@/libs/getVenue";
import Image from "next/image";
import styles from "./page.module.css";

type VenuePageProps = {
  params: Promise<{ vid: string }> | { vid: string };
};

export default async function VenueDetailPage({ params }: VenuePageProps) {
  const resolvedParams = await params;
  const venueDetail = await getVenue(resolvedParams.vid);
  const venue = venueDetail.data;

  if (!venue) {
    return (
      <main className={styles.page}>
        <h1>Venue not found</h1>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.detail}>
        {/* รูปกว้างเต็มการ์ด สูง 420px */}
        <div style={{ position: "relative", width: "100%", height: "420px" }}>
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            sizes="1000px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.text} style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <h1 style={{ fontWeight: "bold", marginBottom: "16px" }}>{venue.name}</h1>
          <div>Name: {venue.name}</div>
          <div>Address: {venue.address}</div>
          <div>District: {venue.district}</div>
          <div>Province: {venue.province}</div>
          <div>Postal Code: {venue.postalcode}</div>
          <div>Tel: {venue.tel}</div>
          <div>Daily Rate: {venue.dailyrate}</div>
        </div>
      </div>
    </main>
  );
}
