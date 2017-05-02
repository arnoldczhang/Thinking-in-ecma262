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

    it('Array.prototype.fill', function (done) {
        var arr = [1, 2, 3];
        expect(arr.$fill(4)).to.deep.equal([4, 4, 4]);
        arr = [1, 2, 3];
        expect(arr.$fill(4, 1)).to.deep.equal([1, 4, 4]);
        arr = [1, 2, 3];
        expect(arr.$fill(4, 1, 2)).to.deep.equal([1, 4, 3]);
        arr = [1, 2, 3];
        expect(arr.$fill(4, -3, -2)).to.deep.equal([4, 2, 3]);
        arr = [1, 2, 3];
        expect(arr.$fill(4, NaN, NaN)).to.deep.equal([1, 2, 3]);
        arr = [1, 2, 3];
        expect(Array(3).$fill(4)).to.deep.equal([4, 4, 4]);
        expect(arr.$fill.call({
            length: 3
        }, 4)).to.deep.equal({
            0: 4,
            1: 4,
            2: 4,
            length: 3
        });
        done();
    });

    it('Array.prototype.filter', function (done) {
        var arr = [12, 5, 8, 130, 44];

        function isBigEnough(value) {
          return value >= 10;
        };

        expect(arr.$filter(isBigEnough)).to.deep.equal([12, 130, 44]);

        var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

        function filterItems(query) {
          return fruits.filter(function(el) {
              return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
          })
        };
        expect(filterItems('ap')).to.deep.equal(['apple', 'grapes']);
        expect(filterItems('an')).to.deep.equal(['banana', 'mango', 'orange']);
        done();
    });

    it('Array.prototype.find', function (done) {
        var inventory = [
            {name: 'apples', quantity: 2},
            {name: 'bananas', quantity: 0},
            {name: 'cherries', quantity: 5}
        ];

        function findCherries(fruit) { 
            return fruit.name === 'cherries';
        };

        expect(inventory.$find(findCherries)).to.deep.equal({ name: 'cherries', quantity: 5 });

        function isPrime(element, index, array) {
          var start = 2;
          while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) {
              return false;
            }
          }
          return element > 1;
        };

        expect([4, 6, 8, 12].$find(isPrime)).to.be.equal(undefined);
        expect([4, 5, 8, 12].$find(isPrime)).to.be.equal(5);

        var arr = [,,,];
        var count = 0;
        arr.$find(function () {
            count++;
            return false;
        });
        expect(count).to.be.equal(3);
        done();
    });

    it('Array.prototype.findIndex', function (done) {
        function isPrime(element, index, array) {
          var start = 2;
          while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) {
              return false;
            }
          }
          return element > 1;
        };        

        expect([4, 6, 8, 12].$findIndex(isPrime)).to.be.equal(-1);
        expect([4, 5, 8, 12].$findIndex(isPrime)).to.be.equal(1);        
        done();
    });


    it('Array.prototype.forEach', function (done) {
        var words = ['one', 'two', 'three', 'four'];
        words.$forEach(function(word) {
          if (word === 'two') {
            words.shift();
          }
        });
        expect(words).to.deep.equal(['two', 'three', 'four']);
        var arr = [2, 5, , 9];
        var count = 0;
        arr.$forEach(function () {
            count++;
            return false;
        });
        expect(count).to.be.equal(3);
        done();
    });

    it('Array.prototype.includes', function (done) {
        expect([1, 2, 3].$includes(2)).to.be.true;
        expect([1, 2, 3].$includes(4)).to.be.false;
        expect([1, 2, 3].$includes(3, 3)).to.be.false;
        expect([1, 2, 3].$includes(3, -1)).to.be.true;
        expect([1, 2, NaN].$includes(NaN)).to.be.true;

        var arr = ['a', 'b', 'c'];
        expect(arr.$includes('c', 3)).to.be.false;
        expect(arr.$includes('c', 100)).to.be.false;
        expect(arr.$includes('a', -100)).to.be.true;
        expect(arr.$includes('b', -100)).to.be.true;

        (function() {
          expect([].$includes.call(arguments, 'a')).to.be.true;
          expect([].$includes.call(arguments, 'd')).to.be.false;
        })('a','b','c');
        done();
    });

    it('Array.prototype.indexOf', function (done) {
        var a = [2, 9, 9]; 
        expect(a.$indexOf(2)).to.be.equal(0);
        expect(a.$indexOf(7)).to.be.equal(-1);
        var array = [2, 5, 9];
        expect(array.$indexOf(2)).to.be.equal(0);     
        expect(array.$indexOf(7)).to.be.equal(-1);    
        expect(array.$indexOf(9, 2)).to.be.equal(2);  
        expect(array.$indexOf(2, -1)).to.be.equal(-1);
        expect(array.$indexOf(2, -3)).to.be.equal(0);

        var indices = [];
        var array = ['a', 'b', 'a', 'c', 'a', 'd'];
        var element = 'a';
        var idx = array.$indexOf(element);
        while (idx != -1) {
          indices.push(idx);
          idx = array.$indexOf(element, idx + 1);
        }
        expect(indices).to.deep.equal([0, 2, 4]);
        done();
    });

});








