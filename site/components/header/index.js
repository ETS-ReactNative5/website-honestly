import React from 'react';
import styles from './style.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo} />

      <nav className={styles.mediumScreenNavContainer}>
        <ul className={styles.mediumScreenNav}>
          <li><a href="/services/">Services</a></li>
          <li><a href="/about-us/">About us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/about-us/events/">Events</a></li>
        </ul>
      </nav>

      <div className={styles.triggerContainer}>
        <label htmlFor="burger" className={styles.triggerLabel}>MENU</label>
      </div>
      <input type="checkbox" className={styles.trigger} id="burger" />

      <div className={styles.overlay}>
        <label htmlFor="burger" className={styles.menuCloseButton}>Close</label>

        <nav className={styles.smallScreenNavContainer}>
          <ul className={styles.smallScreenNav}>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us/">About us</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/about-us/events/">Events</a></li>
            <li><a href="/about-us/join-us/">Jobs</a></li>
            <li><a href="/about-us/contact-us/">Contact us</a></li>
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
