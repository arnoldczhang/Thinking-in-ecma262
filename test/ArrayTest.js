require('./libs.js');
var chai = require('chai');
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

        expect(Array.from([1, 2, 3])[0]).to.be.equal(1);
        expect(Array.from([1, 2, 3])[1]).to.be.equal(2);
        expect(Array.from([1, 2, 3])[2]).to.be.equal(3);
        expect(Array.from([1, 2, 3], function (el) {
            return el + 100;
        })[0]).to.be.equal(101);
        expect(Array.from([1, 2, 3], function (el) {
            return el + this.aa;
        }, {
            aa: 100
        })[0]).to.be.equal(101);
        expect(Array.isArray(Array.from(arguments))).to.be.true;
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
});



