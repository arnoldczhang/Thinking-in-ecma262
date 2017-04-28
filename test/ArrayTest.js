var chai = require('chai');
var colors = require('colors');
require('./libs.js');
var expect = chai.expect;

describe('Array', function () {

    before(function() {
        // 在本区块的所有测试用例之前执行
    });

    after(function() {
        // 在本区块的所有测试用例之后执行
    });

    beforeEach(function() {
        // 在本区块的每个测试用例之前执行
    });

    afterEach(function() {
        // 在本区块的每个测试用例之后执行
    });

    it('Array.from', function (done) {

        expect(Array.$from([1, 2, 3])[0]).to.be.equal(1);
        expect(Array.$from([1, 2, 3])[1]).to.be.equal(2);
        expect(Array.$from([1, 2, 3])[2]).to.be.equal(3);
        expect(Array.$from([1, 2, 3], function (el) {
            return el + 100;
        })[0]).to.be.equal(101);
        expect(Array.$from([1, 2, 3], function (el) {
            return el + this.aa;
        }, {
            aa: 100
        })[0]).to.be.equal(101);
        expect(Array.isArray(Array.$from(arguments))).to.be.true;
        done();
    });

    it('Array.of', function (done) {

        expect(Array.$of([1], 2, 3).length).to.be.equal(3);
        expect(Array.$of([1], 2, 3)[0].length).to.be.equal(1);
        expect(Array.$of([1], 2, 3)[1]).to.be.equal(2);
        done();
    });

    it('Array.prototype.concat', function (done) {

        expect([1, 2, 3].$concat(1, [2, 3]).length).to.be.equal(6);
        expect([1, 2, 3].$concat(1, 2, 3).length).to.be.equal(6);
        expect(({}.toString).call([].$concat.call(arguments, 1, 2, 3)[0])).to.be.equal('[object Arguments]');
        done();
    });

    it('Array.prototype.copyWithin', function (done) {

        expect([1, 2, 3, 4, 5].$copyWithin(-2)[3]).to.be.equal(1);
        expect([1, 2, 3, 4, 5].$copyWithin(-2)[4]).to.be.equal(2);
        expect([1, 2, 3, 4, 5].$copyWithin(0, 3)[0]).to.be.equal(4);
        expect([1, 2, 3, 4, 5].$copyWithin(0, 3)[1]).to.be.equal(5);
        expect([1, 2, 3, 4, 5].$copyWithin(0, 3, 4)[0]).to.be.equal(4);
        expect([1, 2, 3, 4, 5].$copyWithin(0, 3, 4)[1]).to.be.equal(2);
        expect([1, 2, 3, 4, 5].$copyWithin(-2, -3, -1)[3]).to.be.equal(3);
        expect([1, 2, 3, 4, 5].$copyWithin(-2, -3, -1)[4]).to.be.equal(4);
        done();
    });    

    it('Array.prototype.every', function (done) {

        function isBigEnough(element, index, array) {
          return element >= 10;
        };

        expect([12, 5, 8, 130, 44].$every(isBigEnough)).to.be.false;
        expect([12, 54, 18, 130, 44].$every(isBigEnough)).to.be.true;
        done();
    });       
});



