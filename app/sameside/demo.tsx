"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./sameside.module.css";

type Mode = "with" | "without";

const CAPTIONS = {
  start: "Safari is open full screen on both screens. Right now the laptop shows Music and the monitor shows Terminal.",
  without: "Without SameSide, clicking Safari on the laptop slides the monitor over to Safari. The laptop doesn't change, so you have to look across.",
  with: "With SameSide, the laptop itself slides over to Safari, right where you clicked.",
  again: "Click again and the monitor slides to its Safari window too.",
};

/**
 * Two Mac screens running apps in full screen, as macOS does it: each app has its own space,
 * switching slides the screen sideways, and the Dock appears when the pointer reaches the bottom.
 * The animation toggles classes on stage elements, which React never re-renders after mount.
 */
export default function Demo() {
  const [mode, setMode] = useState<Mode>("with");
  const [caption, setCaption] = useState(CAPTIONS.start);
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const monitor = useRef<HTMLDivElement>(null);
  const laptop = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const dockSafari = useRef<HTMLElement>(null);
  const play = useRef<(mode: Mode) => void>(() => {});

  useEffect(() => {
    const s = stage.current!, c = cursor.current!, m = monitor.current!, l = laptop.current!;
    const d = dock.current!, icon = dockSafari.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let target: [HTMLElement, number, number] | null = null;
    const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, reduced ? 0 : ms));

    const pointAt = (el: HTMLElement, fx = 0.45, fy = 0.45) => {
      target = [el, fx, fy];
      const sr = s.getBoundingClientRect(), r = el.getBoundingClientRect();
      c.style.setProperty("--x", `${r.left - sr.left + r.width * fx}px`);
      c.style.setProperty("--y", `${r.top - sr.top + r.height * fy}px`);
    };
    const restart = (el: HTMLElement, cls: string) => {
      el.classList.remove(cls);
      void el.offsetWidth; // let the animation run again
      el.classList.add(cls);
    };
    const showSafari = (screen: HTMLElement) => {
      screen.classList.add(styles.onSafari);
      restart(screen, styles.flash);
    };
    const clickSafari = () => {
      c.classList.add(styles.press);
      restart(icon, styles.clicked);
      later(150, () => c.classList.remove(styles.press));
    };
    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      for (const el of [m, l]) el.classList.remove(styles.onSafari, styles.flash);
      s.classList.remove(styles.showJump);
      d.classList.remove(styles.dockShown);
      pointAt(l, 0.55, 0.45);
      setCaption(CAPTIONS.start);
    };

    play.current = (mode) => {
      reset();
      later(700, () => pointAt(l, 0.5, 0.97)); // pointer to the bottom edge
      later(1500, () => d.classList.add(styles.dockShown)); // the Dock slides up
      later(1900, () => pointAt(icon));
      later(2900, clickSafari);
      if (mode === "without") {
        later(3200, () => {
          showSafari(m);
          s.classList.add(styles.showJump);
          setCaption(CAPTIONS.without);
        });
        return;
      }
      later(3200, () => {
        showSafari(l);
        setCaption(CAPTIONS.with);
      });
      if (reduced) return; // keep the main point on screen instead of flashing past it
      later(5900, clickSafari);
      later(6200, () => {
        showSafari(m);
        setCaption(CAPTIONS.again);
      });
    };

    reset();
    const onResize = () => target && pointAt(...target);
    addEventListener("resize", onResize);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        const first: Mode = location.hash === "#without" ? "without" : "with"; // #without links straight to it
        setMode(first);
        play.current(first);
      }
    }, { threshold: 0.5 });
    observer.observe(s);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
      removeEventListener("resize", onResize);
    };
  }, []);

  const choose = (next: Mode) => {
    setMode(next);
    play.current(next);
  };

  return (
    <>
      <div className={styles.segmented} role="group" aria-label="Demo">
        <button type="button" data-mode="without" aria-pressed={mode === "without"} onClick={() => choose("without")}>Without SameSide</button>
        <button type="button" data-mode="with" aria-pressed={mode === "with"} onClick={() => choose("with")}>With SameSide</button>
      </div>

      <div className={styles.stage} ref={stage} aria-hidden="true">
        <div className={`${styles.screen} ${styles.monitor}`} ref={monitor}>
          <div className={styles.track}>
            <div className={styles.space}><TerminalApp /></div>
            <div className={styles.space}><SafariApp url="github.com" /></div>
          </div>
          <span className={styles.tag}>Monitor</span>
        </div>

        <div>
          <div className={`${styles.screen} ${styles.laptop}`} ref={laptop}>
            <div className={styles.track}>
              <div className={styles.space}><MusicApp /></div>
              <div className={styles.space}><SafariApp url="kartiksaxena.com" /></div>
            </div>
            <div className={styles.dock} ref={dock}>
              <i className={`${styles.d} ${styles.finder}`} />
              <i className={`${styles.d} ${styles.safari}`} ref={dockSafari} />
              <i className={`${styles.d} ${styles.music}`} />
              <i className={`${styles.d} ${styles.term}`} />
            </div>
            <span className={styles.tag}>Laptop</span>
          </div>
          <div className={styles.base} />
        </div>

        <svg className={styles.jump} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M75 84 C 68 38, 48 20, 34 34" /></svg>
        <div className={styles.cursor} ref={cursor}><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-3 6z" /></svg></div>
      </div>

      <p className={styles.caption} aria-live="polite">{caption}</p>
      <button type="button" className={styles.replay} onClick={() => play.current(mode)}>
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>
        Replay
      </button>
    </>
  );
}

const CODE_COLORS = ["#7aa2f7", "#9ece6a", "#e0af68", "#bb9af7", "#565f89", "#7dcfff"];

function TerminalApp() {
  const widths = [38, 62, 54, 28, 70, 46, 58, 34, 66, 42];
  return (
    <div className={styles.terminal}>
      <div className={styles.tabs}><i /><i /></div>
      <div className={styles.lines}>
        {widths.map((w, i) => <i key={i} style={{ width: `${w}%`, background: CODE_COLORS[i % CODE_COLORS.length] }} />)}
      </div>
    </div>
  );
}

const ALBUMS = ["#ff6b81, #a1287a", "#4f8cff, #7c3aed", "#f59e0b, #ef4444", "#10b981, #0ea5e9", "#f472b6, #8b5cf6", "#facc15, #fb7185"];

function MusicApp() {
  return (
    <div className={styles.musicApp}>
      <aside><i /><i /><i /><i /><i /></aside>
      <div className={styles.musicMain}>
        <div className={styles.title} />
        <div className={styles.albums}>
          {ALBUMS.map((g) => <i key={g} style={{ background: `linear-gradient(135deg, ${g})` }} />)}
        </div>
        <div className={styles.player} />
      </div>
    </div>
  );
}

function SafariApp({ url }: { url: string }) {
  return (
    <div className={styles.safariApp}>
      <div className={styles.toolbar}><span className={styles.url}>{url}</span></div>
      <div className={styles.web}>
        <div className={styles.banner} />
        <i style={{ width: "70%" }} />
        <i style={{ width: "52%" }} />
        <div className={styles.webCards}><b /><b /><b /></div>
      </div>
    </div>
  );
}
