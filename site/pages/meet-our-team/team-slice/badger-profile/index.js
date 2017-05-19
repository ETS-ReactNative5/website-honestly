// @flow
import React from 'react';
import InlineSVG from 'svg-inline-react';
import Link from '../../../../components/link';
import styles from './style.css';
import arrowSVG from './arrow.svg';

export type Badger = {
  firstName: string,
  lastName: string,
  slug: string,
  primaryImageUrl: string,
  secondaryImageUrl: string,
  placeholderImage: string,
  description: string,
  jobAdvert: boolean,
  jobDescription: string,
  jobTitle: string,
  loaded: boolean,
};

const BadgerProfile = ({ badger }: { badger: Badger }) => {
  const fullName = [badger.firstName, badger.lastName].join(' ');
  return (
    <Link to="badger" navigationData={{ slug: badger.slug }}>
      <div className={styles.backerProfile}>
        <div className={styles.badgerWrapper} >
          {badger.loaded ?
            <img
              src={badger.primaryImageUrl}
              alt={fullName}
              className={styles.badgerImage}
              aria-hidden
            /> : <div className={styles.placeholder} />
          }
        </div>
        <div className={styles.description}>
          <div className={styles.nameWrapper}>
            <span className={styles.name}>
              {fullName}
              <InlineSVG src={arrowSVG} className={styles.arrow} aria-hidden />
            </span>
          </div>
          <div className={styles.jobDescription}>{badger.jobTitle}</div>
        </div>
      </div>
    </Link>
  );
};

export default BadgerProfile;
