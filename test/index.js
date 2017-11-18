'use strict';

const browserifyGitDescribe = require('../index.js');
const gitDescribe = require('git-describe');
const path = require('path');
const transformtools = require('browserify-transform-tools');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;

const dummyJsFile = path.resolve(__dirname, './dummy.js');

describe('Readme examples', function () {
  it('should target working directory', (done) => {
    const gitInfo = gitDescribe.gitDescribeSync();
    const content = `require('browserify-git-describe')`;
    transformtools.runTransform(browserifyGitDescribe, dummyJsFile, {content: content},
        (err, transformed) => {
          transformed = JSON.parse(transformed);
          expect(transformed.raw).to.equal(gitInfo.raw);
          done(err);
        });
  });

  it('should target the directory of the calling script', (done) => {
    const gitInfo = gitDescribe.gitDescribeSync(__dirname);
    const content = `require('browserify-git-describe', '${__dirname}')`;
    transformtools.runTransform(browserifyGitDescribe, dummyJsFile, {content: content},
          (err, transformed) => {
            transformed = JSON.parse(transformed);
            expect(transformed.raw).to.equal(gitInfo.raw);
            done(err);
          });
  });

  it('Should accept options', (done) => {
    const ops = {customArguments: ['--abbrev=16']};
    const gitInfo = gitDescribe.gitDescribeSync(ops);
    const content = `require('browserify-git-describe', ${JSON.stringify(ops)})`;
    transformtools.runTransform(browserifyGitDescribe, dummyJsFile, {content: content},
          (err, transformed) => {
            transformed = JSON.parse(transformed);
            expect(transformed.raw).to.equal(gitInfo.raw);
            done(err);
          });
  });
});
