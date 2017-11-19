'use strict';

const _ = require('lodash');
const transformtools = require('browserify-transform-tools');
const gitDescribeSync = require('git-describe').gitDescribeSync;
const packageJson = require('./package.json');

module.exports = transformtools.makeRequireTransform('requireTransform',
    {evaluateArguments: true},
    (args, opts, cb) => {
      if (_.first(args) === packageJson.name) {
        let gitInfo = {};
        try {
          gitInfo = gitDescribeSync.apply(this, _.slice(args, 1));
        } catch (err) {
          console.log('Failed to retrieve git info:', err);
        }
        return cb(null, JSON.stringify(gitInfo));
      } else {
        return cb();
      }
    });
