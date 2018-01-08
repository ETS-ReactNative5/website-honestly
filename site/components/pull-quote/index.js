// @flow
import React from 'react';

import styles from './style.css';

type Author = {
  name: string,
  title: string,
};

type PullQuoteProps = {
  author: Author,
  text: string,
};

const PullQuote = ({ author, text }: PullQuoteProps) => {
  return (
    <div className={styles.quotation__wrapper}>
      <div className={styles.quotation__innerWrapper}>
        <div className={styles.quotation}>
          <blockquote className={styles.quotation__quote}>
            <p className={styles.quotation__text}>{text}</p>
          </blockquote>

          <div className={styles.quotation__author}>
            <div className={styles.quotation__author__name}>— {author.name}</div>
            <div className={styles.quotation__author__title}>{author.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullQuote;
