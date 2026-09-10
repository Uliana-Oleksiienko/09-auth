"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Navbar.module.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleMenu = () => {
    if (!isMobile) return; 
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (!isMobile) return; 
    setIsOpen(false);
  };

  useEffect(() => {
    const el = menuRef.current;
    if (!el || !isMobile) {
      if (el) el.style.height = "auto";
      return;
    }

    if (isOpen) {
      el.style.height = "0px";
      const full = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.height = full + "px";
      });

      const onEnd = () => {
        el.style.height = "auto"; 
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      const full = el.scrollHeight;
      el.style.height = full + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [isOpen, isMobile]);

  return (
    <nav
      className={`${css.headerNavbar} navbar navbar-expand-lg navbar-dark w-100`}
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand" onClick={closeMenu}>
          NoteHub
        </Link>
        <button
          className={`navbar-toggler ${css.smallToggler}`}
          type="button"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className={css.burger}></span>
        </button>
        <div
          ref={menuRef}
          className="navbar-collapse"
          style={
            isMobile
              ? {
                  height: 0,
                  overflow: "hidden",
                  transition: "height 0.35s ease",
                }
              : {}
          }
        >
          <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${css.navigation}`}>
            <li className={css.navigationItem}>
              <Link href="/" className={css.navigationLink} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                href="/notes/filter/all"
                className={css.navigationLink}
                onClick={closeMenu}
              >
                Notes
              </Link>
            </li>
            <AuthNavigation onCloseNavbar={closeMenu} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;