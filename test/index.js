'use strict';

const transformToTest = require('../index.js');
const gitDescribeSync = require('git-describe').gitDescribeSync;
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
    const gitInfo = gitDescribeSync();
    const content = `require('git-describeify')`;
    transformtools.runTransform(transformToTest, dummyJsFile, {content: content},
        (err, transformed) => {
          expect(() => {
            transformed = JSON.parse(transformed);
          }, 'Failed to parse the transformed content to JSON').to.not.throw();
          expect(transformed.raw).to.equal(gitInfo.raw);
          done(err);
        });
  });

  it('should target the directory of the calling script', (done) => {
    const gitInfo = gitDescribeSync(__dirname);
    const content = `require('git-describeify', '${__dirname}')`;
    transformtools.runTransform(transformToTest, dummyJsFile, {content: content},
          (err, transformed) => {
            expect(() => {
              transformed = JSON.parse(transformed);
            }, 'Failed to parse the transformed content to JSON').to.not.throw();
            expect(transformed.raw).to.equal(gitInfo.raw);
            done(err);
          });
  });

  it('Should accept options', (done) => {
    const ops = {customArguments: ['--abbrev=16']};
    const gitInfo = gitDescribeSync(ops);
    const content = `require('git-describeify', ${JSON.stringify(ops)})`;
    transformtools.runTransform(transformToTest, dummyJsFile, {content: content},
          (err, transformed) => {
            expect(() => {
              transformed = JSON.parse(transformed);
            }, 'Failed to parse the transformed content to JSON').to.not.throw();
            expect(transformed.raw).to.equal(gitInfo.raw);
            done(err);
          });
  });
});
