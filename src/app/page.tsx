import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <Banner />
      <PromoteCard />
    </main>
  );
}
