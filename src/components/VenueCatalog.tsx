import Card from "./Card";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> | VenueJson }) {
  const venueJsonReady = await venuesJson;

  return (
    <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
      {venueJsonReady.data.map((venueItem: VenueItem) => (
        <Card
          key={venueItem.id || venueItem._id}
          vid={venueItem.id || venueItem._id}
          venueName={venueItem.name}
          location={`${venueItem.address}, ${venueItem.district}, ${venueItem.province} ${venueItem.postalcode}`}
          image={venueItem.picture}
        />
      ))}
    </div>
  );
}
