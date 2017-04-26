import React from 'react';
import image from './2011.jpg';
import Content from '../content';

const One = () => {
  const year = '2011';
  const title = 'Our first office, our first employees and our first big client';
  const text = 'We moved into our first office in Clerkenwell and hired Sari Griffiths and Joe Stanton, our first permanent employees; both of whom continue to work and thrive at Red Badger. We also won our first big client project: developing the online presence for the BMW Museum in Munich.';
  const fact = 'This was the year that Sally, our Red Badger logo was born as a result of our first rebranding.';

  return (
    <Content
      year={year}
      title={title}
      text={text}
      fact={fact}
      image={image}
      mobileImage={image}
      flip
    />
  );
};

export default One;
