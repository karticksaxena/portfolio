import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./dreams.module.css";

export const metadata: Metadata = {
  title: "My Dream Games",
  description: "Kartik's dreams, turned into playable games.",
  openGraph: {
    title: "My Dream Games",
    description: "Kartik's dreams, turned into playable games.",
    images: "/dreams/follow-the-river.jpg",
  },
};

const GAMES = [
  {
    id: "follow-the-river",
    title: "Follow the River",
    blurb: "A first-person horror game. Follow the river through three days and nights to find Mom, with Dras the orca fighting beside you.",
    image: "/dreams/follow-the-river.jpg",
  },
];

export default function DreamsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1>My Dream Games</h1>
        <p className={styles.sub}>Kartik&apos;s dreams, turned into playable games.</p>
        {GAMES.map((g) => (
          <article className={styles.card} key={g.id}>
            <Image src={g.image} alt={`${g.title} screenshot`} width={1600} height={900} sizes="(max-width: 640px) 100vw, 640px" />
            <div className={styles.body}>
              <h2>{g.title}</h2>
              <p>{g.blurb}</p>
              <p className={styles.note}>Made for laptops and desktops with a keyboard and mouse. Not playable on phones.</p>
              {/* Plain anchor: /dreams/play is another zone, so no next/link. */}
              <a className={styles.play} href={`/dreams/play?dream=${g.id}`}>Play {g.title}</a>
            </div>
          </article>
        ))}
        <Link className={styles.back} href="/">Back to home</Link>
      </div>
    </main>
  );
}
