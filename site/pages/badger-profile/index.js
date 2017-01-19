// @flow
import InlineSVG from 'svg-inline-react';
import React from 'react';

import styles from './style.css';

import twitterSVG from './SVG/twitter.svg';
import githubSVG from './SVG/github.svg';
import linkedinSVG from './SVG/linked-in.svg';

const getSocialItems = badger => {
  const socialItems = [];
  const socialPages = [
    { social: 'Twitter', img: twitterSVG },
    { social: 'Github', img: githubSVG },
    { social: 'LinkedIn', img: linkedinSVG },
  ];

  for (const s of socialPages) {
    if (badger[s.social.toLowerCase()]) {
      socialItems.push(<li>
        <a
          href={badger[s.social.toLowerCase()]}
          title={s.social}
          className={styles.badgerSocialIcon}
        >
          <InlineSVG
            src={s.img}
            title={s.social}
          />
        </a>
      </li>);
    }
  }
  return socialItems;
};

const getBlogsLink = badger => {
  if (badger.squarespaceId) {
    return (<div className={styles.authorLink + ' ' + styles.subheader}>
      <a href={'https://red-badger.com/blog/?author=' + badger.squarespaceId}>
        Read {badger.firstName}&rsquo;s blog posts
      </a>
    </div>);
  }
};

const BadgerProfile = ({ badger }) => {
  const fullName = [badger.firstName, badger.lastName].join(' ');
  const categories = badger.categories.map(c => c.name).join(', ');
  return (
    <div className={styles.badgerProfile}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePictureContainer}>
          <img
            src={badger.imageUrl}
            alt={fullName}
            className={styles.badgerImage}
          />
        </div>
        <div className={styles.profileDescriptionContainer}>
          <h1 className={styles.header}>{fullName}</h1>
          <h2 className={styles.subheader}>{badger.jobTitle}</h2>
          <h3 className={styles.categories}>{categories}</h3>
          <ul className={styles.socialLinks}>
            {getSocialItems(badger)}
          </ul>
          <div className={styles.about}>
            {badger.about}
          </div>
          <div className={styles.descriptionSections}>
            {badger.skills.length && [
              <h2 className={styles.subheader}>Signature Skills</h2>,
              <p>{badger.skills.join(', ')}.</p>]}

            {badger.achievements && [
              <h2 className={styles.subheader}>Achievements at Red Badger</h2>,
              <p>{badger.achievements}</p>]}

            {badger.influence && [
              <h2 className={styles.subheader}>The thing that changed me</h2>,
              <p>badger.influence</p>]}
          </div>
          <div className={styles.authorLinks}>
            {getBlogsLink(badger)}
          </div>
          <hr />
          <a className={styles.greenBox} href="/about-us/people">See Everyone</a>
          {badger.categories.map(c =>
            <a className={styles.greenBox} href={'/about-us/people/category/' + c.slug}>See {c.name} team</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgerProfile;
