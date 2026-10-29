"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import styles from "./Card.module.css";

type CardProps = { vid: string; venueName: string; location: string; image: string; onRatingChange?: (venueName: string, rating: number) => void };

export default function Card({ vid, venueName, location, image, onRatingChange }: CardProps) {
  const [rating, setRating] = useState(0);

  function changeRating(newRating: number | null) {
    const selectedRating = newRating ?? 0;
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(venueName, selectedRating);
    }
  }

  return (
    <article className={styles.card}>
      <Link href={`/venue/${vid}`} className={styles.venueLink}>
        <div style={{ position: "relative", width: "100%", height: "150px" }}>
          <Image
            src={image}
            alt={venueName}
            fill
            className={styles.image}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.content}>
          <h2>{venueName}</h2><p>{location}</p>
        </div>
      </Link>
      {onRatingChange ? (
        <div className={styles.content}>
          <Rating id={`${venueName} Rating`} name={`${venueName} Rating`} data-testid={`${venueName} Rating`} value={rating} onChange={(_, newRating) => changeRating(newRating)} />
        </div>
      ) : null}
    </article>
  );
}
