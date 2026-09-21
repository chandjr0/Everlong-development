import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { primaryNav, contactNav } from "@/data/navigation";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length < 2) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const menu = (
    <div
      ref={panelRef}
      id={menuId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      {...(!open ? { inert: true } : {})}
      data-open={open ? "true" : "false"}
      className="mobile-nav fixed inset-x-0 bottom-0 z-[60] bg-background lg:hidden"
    >
      <nav className="shell flex h-full flex-col justify-between py-10" aria-label="Mobile">
        <ul className="space-y-1">
          {[...primaryNav, contactNav].map((item, index) => (
            <li key={item.to} className="border-b border-border py-4">
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                to={item.to}
                className="mobile-nav-link display-md block transition-colors duration-200 hover:text-primary"
                aria-current={isActive(item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn-brut btn-solid justify-center">
          <span>Discuss Opportunity</span>
        </Link>
      </nav>
    </div>
  );

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-border bg-background/92 ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          to="/"
          className="group flex min-h-11 items-center gap-3"
          aria-label="Everlong Development — home"
        >
          <img
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-[1.04]"
            decoding="async"
          />
          <span className="flex items-baseline gap-2">
            <span className="text-[0.9rem] font-bold uppercase tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary md:text-base">
              Everlong
            </span>
            <span className="label-mono text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
              Development
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              data-active={isActive(item.to) ? "true" : "false"}
              aria-current={isActive(item.to) ? "page" : undefined}
              data-cursor="explore"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to={contactNav.to}
            className="nav-link hidden lg:inline-flex"
            data-active={isActive(contactNav.to) ? "true" : "false"}
            aria-current={isActive(contactNav.to) ? "page" : undefined}
            data-cursor="explore"
          >
            {contactNav.label}
          </Link>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="label-mono min-h-11 min-w-11 border border-border px-3 py-2 transition-colors duration-200 hover:border-foreground hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mounted ? createPortal(menu, document.body) : null}
    </header>
  );
}
