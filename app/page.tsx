import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

// Placeholder home until the portfolio is designed.
export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.inner}>
        <h1>Kartik Saxena</h1>
        <p>Portfolio coming soon. Meanwhile, here is something I made.</p>
        <Link className={styles.project} href="/sameside" target="_blank">
          <Image src="/sameside/icon.png" alt="" width={56} height={56} />
          <div>
            <b>SameSide</b>
            <span>Dock clicks that open windows on the screen you&apos;re using.</span>
          </div>
        </Link>
        <Link className={styles.project} href="/dreams">
          <div>
            <b>My Dream Games</b>
            <span>Kartik&apos;s dreams, turned into playable games.</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
