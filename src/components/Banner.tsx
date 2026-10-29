"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./Banner.module.css";

const coverImages = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];

export default function Banner() {
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  function showNextImage() {
    setImageIndex((currentIndex) => (currentIndex + 1) % coverImages.length);
  }

  return (
    <header className={styles.banner}>
      <img
        className={styles.cover}
        src={coverImages[imageIndex]}
        alt="Venue cover"
        onClick={showNextImage}
      />
      {session ? (
        <div className="top-5 right-10 font-semibold text-cyan-800 text-xl z-20 absolute">
          Welcome {session.user?.name}
        </div>
      ) : null}
      <div className={styles.text}>
        <p className={styles.smallTitle}>VENUE EXPLORER</p>
        <h1>Find a place for your special day</h1>
        <p className={styles.description}>Choose a venue and give it a rating that you like.</p>
      </div>
      <button className={styles.selectButton} onClick={() => router.push("/venue")}>
        Select Venue
      </button>
    </header>
  );
}
