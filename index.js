'use strict';

const _ = require('lodash');
const Transformtools = require('browserify-transform-tools');
const GitDescribe = require('git-describe');

const BrowserifyGitDescribe = Transformtools.makeRequireTransform('requireTransform',
    {evaluateArguments: true},
    (args, opts, cb) => {
      if (_.first(args) === 'browserify-git-describe') {
        let gitInfo = {};
        try {
          gitInfo = GitDescribe.gitDescribeSync.apply(this, _.slice(args, 1));
        } catch (err) {
          console.log('Failed to retrieve git info:', err);
        }
        return cb(null, JSON.stringify(gitInfo));
      } else {
        return cb();
      }
    });

module.exports = BrowserifyGitDescribe;
