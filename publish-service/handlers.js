'use strict';

// const compileSite = require('../site/compiler');
// const getSiteState = require('../state');
// const makeUploader = require('./s3').makeUploader;

// TODO : Make this value vary with the environment
// const bucketName = 'website-honestly-dev'
// const uploadPage = makeUploader({ bucketName });

module.exports.publish = function publish(event, context, cb) {

  // const uploads = getSiteState()
  //   .then(compileSite)
  //   .then(pages => pages.map(uploadPage));

  // Promise.all(uploads)
  //   .then(data => cb(null, data))
  //   .catch(error => eb(error));

  cb(null, { msg: 'Hello! Implementation yet to come.' });
};
