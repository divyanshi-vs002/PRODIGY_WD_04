 window.addEventListener("load", () =>
        setTimeout(
          () => document.getElementById("loader").classList.add("gone"),
          2100,
        ),
      );

      // CURSOR
      const cur = document.getElementById("cur"),
        ring = document.getElementById("cur-ring");
      let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
      document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + "px";
        cur.style.top = my + "px";
        document.getElementById("mouse-glow").style.left = mx + "px";
        document.getElementById("mouse-glow").style.top = my + "px";
      });
      (function ar() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(ar);
      })();
      document
        .querySelectorAll(
          "a,button,.sk-card,.pc,.svc-card,.tc,.ach-card,.tech-item",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cur.style.width = "20px";
            cur.style.height = "20px";
            ring.style.transform = "translate(-50%,-50%) scale(1.6)";
            ring.style.borderColor = "rgba(0,212,255,.8)";
          });
          el.addEventListener("mouseleave", () => {
            cur.style.width = "10px";
            cur.style.height = "10px";
            ring.style.transform = "translate(-50%,-50%) scale(1)";
            ring.style.borderColor = "rgba(0,212,255,.6)";
          });
        });

      // SCROLL PROGRESS
      const sp = document.getElementById("sp");
      window.addEventListener(
        "scroll",
        () => {
          sp.style.width =
            (window.scrollY /
              (document.body.scrollHeight - window.innerHeight)) *
              100 +
            "%";
        },
        { passive: true },
      );

      // NAVBAR
      const nav = document.getElementById("navbar");
      window.addEventListener(
        "scroll",
        () => nav.classList.toggle("scrolled", window.scrollY > 60),
        { passive: true },
      );
      // Active links
      const secs = [...document.querySelectorAll("section[id]")];
      const nls = [...document.querySelectorAll(".nl")];
      const lio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              nls.forEach((l) => l.classList.remove("active"));
              const a = document.querySelector(`.nl[href="#${e.target.id}"]`);
              if (a) a.classList.add("active");
            }
          });
        },
        { threshold: 0.35 },
      );
      secs.forEach((s) => lio.observe(s));

      // HAMBURGER
      const ham = document.getElementById("ham"),
        mob = document.getElementById("mobMenu");
      let mOpen = false;
      ham.addEventListener("click", () => {
        mOpen = !mOpen;
        mob.classList.toggle("open", mOpen);
        const s = ham.querySelectorAll("span");
        if (mOpen) {
          s[0].style.transform = "rotate(45deg) translate(4.5px,4.5px)";
          s[1].style.opacity = "0";
          s[2].style.transform = "rotate(-45deg) translate(4.5px,-4.5px)";
        } else {
          s[0].style.transform = "";
          s[1].style.opacity = "";
          s[2].style.transform = "";
        }
      });
      document.querySelectorAll(".mob-lnk").forEach((l) =>
        l.addEventListener("click", () => {
          mOpen = false;
          mob.classList.remove("open");
          const s = ham.querySelectorAll("span");
          s[0].style.transform = "";
          s[1].style.opacity = "";
          s[2].style.transform = "";
        }),
      );

      // TYPING
      const roles = [
        "beautiful UIs",
        "cinematic experiences",
        "full-stack apps",
        "design systems",
        "3D interactions",
      ];
      let ri = 0,
        ci = 0,
        deleting = false;
      const tel = document.getElementById("typed");
      function type() {
        const r = roles[ri];
        if (!deleting) {
          tel.textContent = r.slice(0, ci + 1);
          ci++;
          if (ci === r.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
          }
        } else {
          tel.textContent = r.slice(0, ci - 1);
          ci--;
          if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
          }
        }
        setTimeout(type, deleting ? 50 : 95);
      }
      setTimeout(type, 2600);

      // REVEAL OBSERVER
      function mkObs(cls) {
        return new IntersectionObserver(
          (entries) =>
            entries.forEach((e, i) => {
              if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add("v"), i * 60);
                mkObs(cls).unobserve(e.target);
              }
            }),
          { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
        );
      }
      document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach((el) => {
        new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("v");
              }
            }),
          { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
        ).observe(el);
      });
      document.querySelectorAll(".stagger").forEach((sg) => {
        new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("v");
              }
            }),
          { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
        ).observe(sg);
      });

      // SKILL BARS
      new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting)
              e.target.querySelectorAll(".sk-bar").forEach((b) => {
                b.style.width = b.dataset.w + "%";
              });
          }),
        { threshold: 0.15 },
      ).observe(document.querySelector(".skills-grid"));

      // COUNTERS
      function animC(el, t) {
        let s = 0;
        const d = 1600,
          fn = (ts) => {
            if (!fn.s) fn.s = ts;
            const p = Math.min((ts - fn.s) / d, 1),
              e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(e * t) + (p < 1 ? "" : "+");
            if (p < 1) requestAnimationFrame(fn);
          };
        requestAnimationFrame(fn);
      }
      new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target
                .querySelectorAll("[data-c]")
                .forEach((el) => animC(el, +el.dataset.c));
            }
          }),
        { threshold: 0.3 },
      ).observe(document.querySelector(".stats-bar"));

      // PROJ TILT
      document.querySelectorAll(".pc").forEach((c) => {
        c.addEventListener("mousemove", (e) => {
          const r = c.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - 0.5,
            y = (e.clientY - r.top) / r.height - 0.5;
          c.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        });
        c.addEventListener("mouseleave", () => (c.style.transform = ""));
      });

      // SMOOTH SCROLL
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          const t = document.querySelector(a.getAttribute("href"));
          if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: "smooth" });
          }
        }),
      );

      // SEND BTN
      document.getElementById("sendBtn").addEventListener("click", function () {
        const o = this.innerHTML;
        this.innerHTML = `<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="20 6 9 17 4 12"/></svg> Sent!`;
        this.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
        setTimeout(() => {
          this.innerHTML = o;
          this.style.background = "";
        }, 3200);
      });

      // MUSIC
      const mb = document.getElementById("musicBtn");
      let on = false;
      mb.addEventListener("click", () => {
        on = !on;
        mb.classList.toggle("on", on);
        mb.title = on ? "Pause" : "Play ambient";
      });