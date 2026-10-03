import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CopyBlock from "./copy-button";
import Demo from "./demo";
import styles from "./sameside.module.css";

const REPO = "https://github.com/karticksaxena/SameSide";
const DMG = `${REPO}/releases/latest/download/SameSide.dmg`;
const NEW_TAB = { target: "_blank", rel: "noreferrer" } as const;

const BUILD = `git clone ${REPO}.git
cd SameSide
./build.sh
ditto build/SameSide.app /Applications/SameSide.app
open /Applications/SameSide.app`;

const AI_PROMPT = `Clone ${REPO}, read its README, build it with ./build.sh, copy build/SameSide.app to /Applications and open it. Do not change any code.`;

export const metadata: Metadata = {
  title: "SameSide for Mac",
  description: "Free macOS menu bar app. Click an app in the Dock and its window on the screen you clicked from comes forward, not the one you used last.",
  openGraph: {
    title: "SameSide for Mac",
    description: "Click an app in the Dock and its window on the screen you clicked from comes forward.",
    images: "/sameside/icon.png",
  },
  icons: { icon: "/sameside/favicon.png" },
};

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d={d} /></svg>
);

const ICONS = {
  download: "M12 3v12m0 0-5-5m5 5 5-5M5 21h14",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16",
  dock: "M3 17h18M5 21h14M6 13h3v4H6zm5-2h3v6h-3zm5 2h3v4h-3z",
  screen: "M3 5h18v11H3zM8 20h8m-4-4v4",
  swap: "M7 7h13m0 0-4-4m4 4-4 4M17 17H4m0 0 4 4m-4-4 4-4",
  wifiOff: "M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01M3 3l18 18",
  box: "M4 7h16M6 7l1 13h10l1-13M9 7V4h6v3",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
};

export default function SameSidePage() {
  return (
    <div className={styles.page}>
      <a className="skip" href="#main">Skip to content</a>

      <header className={styles.nav}>
        <a className={styles.brand} href="#top">
          <Image src="/sameside/icon.png" alt="" width={26} height={26} />SameSide
        </a>
        <nav className={styles.links} aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#privacy">Privacy</a>
          <a href="#install">Install</a>
          <a href={REPO} {...NEW_TAB}>GitHub</a>
        </nav>
        <a className={`${styles.btn} ${styles.primary} ${styles.small}`} href={DMG}>Download</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <span className={styles.badge}>
            <Image src="/sameside/icon.png" alt="" width={24} height={24} priority />
            Free menu bar app for macOS
          </span>
          <h1>Your Dock, on the screen<br />you&apos;re actually using.</h1>
          <p className={styles.lead}>
            With two displays, clicking an app in the Dock often sends you to its window on the <em>other</em> screen.
            SameSide brings it up on the screen you clicked from. Click again to jump across.
          </p>
          <div className={styles.cta}>
            <a className={`${styles.btn} ${styles.primary}`} href={DMG}>
              <Icon d={ICONS.download} />
              Download for Mac
            </a>
            <a className={styles.btn} href={REPO} {...NEW_TAB}>
              <Icon d={ICONS.code} />
              View on GitHub
            </a>
          </div>
          <p className={styles.meta}>Free and open source · macOS 14 or later · Apple silicon and Intel</p>
        </section>

        <section className={styles.demo} aria-label="See the difference">
          <div className={styles.frame}>
            <i className={`${styles.plus} ${styles.tl}`} /><i className={`${styles.plus} ${styles.tr}`} />
            <i className={`${styles.plus} ${styles.bl}`} /><i className={`${styles.plus} ${styles.br}`} />
            <div className={styles.sky}>
              <Demo />
            </div>
          </div>
        </section>

        <section id="how" aria-labelledby="how-title">
          <div className={styles.heading}>
            <span className={styles.eyebrow}>How it works</span>
            <h2 id="how-title">One click. The right screen.</h2>
          </div>
          <ul className={styles.features}>
            <li>
              <Icon d={ICONS.dock} />
              <h3>Click in the Dock</h3>
              <p>Click any app in the Dock, on whichever screen you&apos;re working on. Nothing new to learn.</p>
            </li>
            <li>
              <Icon d={ICONS.screen} />
              <h3>The window comes to you</h3>
              <p>SameSide brings up that app&apos;s window on the screen you clicked from, switching to its desktop or full-screen space.</p>
            </li>
            <li>
              <Icon d={ICONS.swap} />
              <h3>Click again to jump across</h3>
              <p>Click the same icon again to go to the app&apos;s window on your other display.</p>
            </li>
          </ul>
          <p className={styles.note}>No window of that app on this screen? Then macOS behaves exactly as it always does.</p>
        </section>

        <section id="privacy" aria-labelledby="privacy-title">
          <div className={styles.heading}>
            <span className={styles.eyebrow}>Private by design</span>
            <h2 id="privacy-title">It does one thing, and nothing else.</h2>
            <p>The Accessibility permission is used only to notice Dock clicks and bring windows forward. Clicks are always passed on unchanged.</p>
          </div>
          <ul className={styles.bento}>
            <li>
              <Icon d={ICONS.wifiOff} />
              <div><span className={styles.big}>0 network calls</span><p>No networking code at all. It never connects anywhere, so there is nothing to send.</p></div>
            </li>
            <li>
              <Icon d={ICONS.box} />
              <div><span className={styles.big}>0 files</span><p>No settings, no tracking, no account.</p></div>
            </li>
            <li>
              <Icon d={ICONS.bolt} />
              <div><span className={styles.big}>10 MB</span><p>Memory, and no CPU while it waits.</p></div>
            </li>
            <li>
              <Icon d={ICONS.code} />
              <div><span className={styles.big}>MIT</span><p>Open source. Read every line on GitHub.</p></div>
            </li>
            <li>
              <Icon d={ICONS.screen} />
              <div><span className={styles.big}>Any app</span><p>Matched by its app ID, with full-screen apps and desktops.</p></div>
            </li>
            <li>
              <Icon d={ICONS.dock} />
              <div><span className={styles.big}>No new habits</span><p>You keep using the Dock exactly as you do now.</p></div>
            </li>
          </ul>
        </section>

        <section id="install" aria-labelledby="install-title">
          <div className={styles.heading}>
            <span className={styles.eyebrow}>Install</span>
            <h2 id="install-title">Two ways to get it.</h2>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}>
              <h3>Download</h3>
              <ol>
                <li><a href={DMG}>Download SameSide.dmg</a>, open it and drag SameSide onto Applications.</li>
                <li>Open SameSide. macOS says <b>&quot;SameSide&quot; Not Opened</b>. Click <b>Done</b>.</li>
                <li>Open <b>System Settings › Privacy &amp; Security</b>, scroll down and click <b>Open Anyway</b>. macOS asks this only once.</li>
                <li>Allow SameSide under <b>Accessibility</b> when asked.</li>
                <li>Optional: add it to <b>General › Login Items</b> so it starts with your Mac.</li>
              </ol>
              <p className={styles.fine}>Why the warning? SameSide is free and not registered with Apple&apos;s paid developer program. Every line of its code is on GitHub.</p>
            </article>

            <article className={styles.card}>
              <h3>Build it yourself</h3>
              <p>No warning at all. Needs Apple&apos;s Command Line Tools (<code>xcode-select --install</code>).</p>
              <CopyBlock text={BUILD} />
              <p>Or ask your AI coding assistant:</p>
              <CopyBlock text={AI_PROMPT} wrap />
            </article>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.heading}>
            <span className={styles.eyebrow}>FAQ</span>
            <h2 id="faq-title">Questions</h2>
          </div>
          <details>
            <summary>Does it work with full-screen apps and multiple desktops?</summary>
            <p>Yes. If the app&apos;s window on your screen is full screen or on another desktop, SameSide switches that screen to it.</p>
          </details>
          <details>
            <summary>Does it change how clicks work?</summary>
            <p>No. Every click still reaches the Dock exactly as before. SameSide only decides which window comes forward. Right-click and Command-click are left alone.</p>
          </details>
          <details>
            <summary>How do I uninstall it?</summary>
            <p>Quit it from its menu bar icon, delete SameSide from Applications, and remove it from Login Items and the Accessibility list. It stores nothing else.</p>
          </details>
          <details>
            <summary>What if it stops working after a macOS update?</summary>
            <p>SameSide uses some private macOS functions, like other window tools do. If an update removes one, SameSide simply stops switching and the Dock behaves as usual. <a href={`${REPO}/issues`} {...NEW_TAB}>Open an issue</a> and it will be fixed.</p>
          </details>
        </section>

        <section className={styles.final} aria-labelledby="final-title">
          <h2 id="final-title">Try it on your Mac.</h2>
          <p>Free, open source, and under 1 MB to download.</p>
          <div className={styles.cta}>
            <a className={`${styles.btn} ${styles.primary}`} href={DMG}>
              <Icon d={ICONS.download} />
              Download for Mac
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <span>Made by <Link href="/" {...NEW_TAB}>Kartik Saxena</Link></span>
          <nav aria-label="Footer">
            <a href={REPO} {...NEW_TAB}>GitHub</a>
            <a href={`${REPO}/releases`} {...NEW_TAB}>Releases</a>
            <a href={`${REPO}/blob/main/LICENSE`} {...NEW_TAB}>MIT license</a>
          </nav>
        </div>
        <span className={styles.wordmark} aria-hidden="true">SameSide</span>
      </footer>
    </div>
  );
}
