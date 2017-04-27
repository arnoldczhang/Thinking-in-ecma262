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
});



