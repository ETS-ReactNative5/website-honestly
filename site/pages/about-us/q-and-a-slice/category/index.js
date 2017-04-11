// @flow
import React from 'react';
import Topic from '../topic';

import type { TopicProps } from '../topic';
import styles from './style.css';

type CategoryProps = {
  name: string,
  topics: Array<TopicProps>
}

const Category = ({ category }: { category: CategoryProps }) => (
  <div className={styles.category}>
    <div className={styles.category__title}>
      {category.name}
    </div>
    <ul>
      {category.topics.map(topic => (
        <li className={styles.category__element}>
          <Topic
            question={topic.question}
            answer={topic.answer}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default Category;
