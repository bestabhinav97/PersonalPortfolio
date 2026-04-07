import { useEffect, useRef, useState } from "react";
import heroImg from "./assets/hero-bg.jpeg";
import heroImg2 from "./assets/hero-bg2.jpg";
import overwatch from "./assets/overwatchSymbol.png";
import "./App.css";

const skills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "MySQL", icon: "🗄️" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express", icon: "🚂" },
  { name: "GitHub", icon: "🐙" },
  { name: "Python", icon: "🐍" },
];

const photos = [heroImg, heroImg2];

const projects = [
  {
    title: "Rently",
    desc: "A full stack rent tracking project where the user can add various properties, rooms and tenants and can track each tenants rents..",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com",
    live: "https://example.com",
    color: "#1a1a1a",
  },
  {
    title: "Bookings Project",
    desc: "A comlpete backend projoect for a hotel reservation system, with checkout and admin pannel. The front end will be added soon but will be done using AI",
    tech: ["React", "MySQL", "Express"],
    github: "https://github.com",
    live: "https://example.com",
    color: "#111",
  },
  {
    title: "Archana Property Consultant",
    desc: " Just a website I made for a friend :) totally by me.",
    tech: ["React"],
    github: "https://github.com",
    live: null,
    color: "#0d0d0d",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % photos.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* HEADER */}
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header__logo" onClick={() => scrollTo("hero")}>
          &lt;dev/&gt;
        </div>
        <nav className="header__nav">
          {["skills", "projects", "extra"].map((s) => (
            <button key={s} onClick={() => scrollTo(s)} className="nav-link">
              {s}
            </button>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="hero">
        <img
          src={photos[0]}
          className={`hero__bg ${currentImage === 0 ? "active" : ""}`}
        />

        <img
          src={photos[1]}
          className={`hero__bg ${currentImage === 1 ? "active" : ""}`}
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__sub reveal">Hello, I'm</p>
          <h1 className="hero__title reveal">
            your friendly
            <br />
            <span className="hero__accent">neighbourhood</span>
            <br />
            developer
          </h1>
          <button
            className="hero__cta reveal"
            onClick={() => scrollTo("about")}
          >
            scroll down ↓
          </button>
        </div>
        <div className="hero__scroll-line" />
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about__inner">
          <div className="about__label reveal">01 — about</div>
          <h2 className="about__heading reveal">
            I build things
            <br />
            for the SERVER.
          </h2>
          <div className="about__text reveal">
            <p>
              Hey — I'm a back-end developer but eh I can do front-end too. Got
              the problem solving brain and a passion for technology and supply
              chain.
            </p>
            <p>
              When I'm not shipping code I'm listening to music, exploring new
              frameworks, or taking mirror selfies with my Marshall headphones
              and playing overwatch.
            </p>
          </div>
        </div>
        <div className="about__deco reveal">{"{ code; }"}</div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills">
        <div className="skills__label reveal">02 — skills</div>
        <h2 className="skills__heading reveal">What I work with</h2>
        <div className="skills__grid">
          {skills.map((sk, i) => (
            <div
              key={sk.name}
              className="skill-card reveal"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="skill-card__icon">{sk.icon}</span>
              <span className="skill-card__name">{sk.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects">
        <div className="projects__label reveal">03 — projects</div>
        <h2 className="projects__heading reveal">Selected work</h2>
        <div className="projects__list">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="project-card reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setModal(p)}
            >
              <div className="project-card__num">0{i + 1}</div>
              <div className="project-card__body">
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc.slice(0, 80)}…</p>
                <div className="project-card__tags">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="project-card__arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA */}
      <section id="extra" className="extra">
        <div className="extra__label reveal">04 — extra</div>
        <h2 className="extra__heading reveal">Beyond the code</h2>
        <div className="extra__grid">
          {[
            {
              emoji: "🎧",
              title: "Music",
              body: "Marshall headphones never come off. From lo-fi beats to techno, music is my cocaine.",
            },
            {
              emoji: "📚",
              title: "Learning",
              body: "Always picking up a new framework, language, or concept. Curiosity is the engine.",
            },
            {
              emoji: { isImage: true, src: overwatch },
              title: "Open Source",
              body: "Play overwatch in my freetime. Beat me at Ana and thy shall have my respekt",
            },
            {
              emoji: "💪",
              title: "Gym",
              body: "See my back in the begining of my website. That doesnt come without gym.",
            },
          ].map((item) => (
            <div key={item.title} className="extra-card reveal">
              <div className="extra-card__emoji">
                {item.emoji.isImage ? (
                  <img src={item.emoji.src} alt={item.title} />
                ) : (
                  item.emoji
                )}
              </div>
              <h3 className="extra-card__title">{item.title}</h3>
              <p className="extra-card__body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__left">
          <p className="footer__tagline">Let's build something great.</p>
          <a href="mailto:hello@youremail.com" className="footer__email">
            bestabhinav97@gmail.com
          </a>
        </div>
        <div className="footer__links">
          {[
            { label: "Instagram", href: "https://github.com" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/abhinav-srinivasan-081b80218/",
            },
            { label: "Github", href: "https://github.com/bestabhinav97" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer__copy">
          © 2026 — your friendly neighbourhood developer
        </div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setModal(null)}>
              ✕
            </button>
            <h2 className="modal__title">{modal.title}</h2>
            <p className="modal__desc">{modal.desc}</p>
            <div className="modal__section">
              <div className="modal__label">Tech Stack</div>
              <div className="modal__tags">
                {modal.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal__links">
              <a
                href={modal.github}
                target="_blank"
                rel="noreferrer"
                className="modal__btn modal__btn--outline"
              >
                GitHub ↗
              </a>
              {modal.live && (
                <a
                  href={modal.live}
                  target="_blank"
                  rel="noreferrer"
                  className="modal__btn modal__btn--solid"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
