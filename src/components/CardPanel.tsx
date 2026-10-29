"use client";

import { useReducer } from "react";
import Card from "./Card";
import styles from "./CardPanel.module.css";

const venues = [
  { vid: "001", name: "The Bloom Pavilion", location: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" },
  { vid: "002", name: "Spark Space", location: "Nonthaburi, Thailand", image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80" },
  { vid: "003", name: "The Grand Table", location: "Pathum Thani, Thailand", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80" },
];

type RatingAction = { type: "rate"; venueName: string; rating: number } | { type: "remove"; venueName: string };

function ratingReducer(ratings: Map<string, number>, action: RatingAction) {
  const newRatings = new Map(ratings);
  if (action.type === "rate") newRatings.set(action.venueName, action.rating);
  if (action.type === "remove") newRatings.delete(action.venueName);
  return newRatings;
}

function createInitialRatings() { return new Map(venues.map((venue) => [venue.name, 0])); }

export default function CardPanel() {
  const [ratings, dispatch] = useReducer(ratingReducer, undefined, createInitialRatings);
  function saveRating(venueName: string, rating: number) { dispatch({ type: "rate", venueName, rating }); }

  return (
    <section className={styles.panel}>
      <div className={styles.cards}>{venues.map((venue) => <Card key={venue.vid} vid={venue.vid} venueName={venue.name} location={venue.location} image={venue.image} onRatingChange={saveRating} />)}</div>
      <section className={styles.ratingList}>
        <h2>Venue ratings</h2><p>Click a rating below to remove it from this list.</p>
        {Array.from(ratings).map(([venueName, rating]) => (
          <button className={styles.ratingItem} data-testid={venueName} key={venueName} onClick={() => dispatch({ type: "remove", venueName })}>
            {venueName} Rating : {rating}
          </button>
        ))}
      </section>
    </section>
  );
}
