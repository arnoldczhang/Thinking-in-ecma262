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

    it('Array.prototype.join', function (done) {
        var a = ['Wind', 'Rain', 'Fire'];
        expect(a.$join()).to.be.equal('Wind,Rain,Fire');
        expect(a.$join(', ')).to.be.equal('Wind, Rain, Fire');
        expect(a.$join(' + ')).to.be.equal('Wind + Rain + Fire');
        expect(a.$join('')).to.be.equal('WindRainFire');
        done();
    });

    it('Array.prototype.lastIndexOf', function (done) {
        var numbers = [2, 5, 9, 2];
        expect(numbers.$lastIndexOf(2)).to.be.equal(3);
        expect(numbers.$lastIndexOf(7)).to.be.equal(-1);
        expect(numbers.$lastIndexOf(2, 3)).to.be.equal(3);
        expect(numbers.$lastIndexOf(2, 2)).to.be.equal(0);
        expect(numbers.$lastIndexOf(2, -2)).to.be.equal(0);
        expect(numbers.$lastIndexOf(2, -1)).to.be.equal(3);
        done();
    });

    it('Array.prototype.map', function (done) {
        var numbers = [1, 5, 10, 15];
        var roots = numbers.$map(function(x) {
           return x * 2;
        });
        expect(roots).to.deep.equal([2, 10, 20, 30]);

        var numbers = [1, 4, 9];
        var roots = numbers.$map(Math.sqrt);
        expect(roots).to.deep.equal([1, 2, 3]);

        var kvArray = [{key: 1, value: 10}, 
               {key: 2, value: 20}, 
               {key: 3, value: 30}];

        var reformattedArray = kvArray.$map(function(obj) { 
           var rObj = {};
           rObj[obj.key] = obj.value;
           return rObj;
        });
        expect(reformattedArray).to.deep.equal([{1: 10}, {2: 20}, {3: 30}]);

        var map = Array.prototype.$map;
        var a = map.call('Hello World', function(x) { 
          return x.charCodeAt(0); 
        });
        expect(a).to.deep.equal([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);

        var str = '12345';
        var str2 = Array.prototype.map.call(str, function(x) {
          return x;
        }).reverse().join(''); 
        expect(str2).to.be.equal('54321');

        var str3 = ['1', '2', '3'].$map(parseInt);
        expect(str3).to.deep.equal([1, NaN, NaN]);

        done();
    });    

    it('Array.prototype.pop', function (done) {
        var a = [1, 2, 3];
        expect(a.$pop()).to.be.equal(3);
        expect(a.length).to.be.equal(2);

        var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
        var popped = myFish.$pop();
        expect(popped).to.be.equal('sturgeon');
        expect(myFish).to.deep.equal(['angel', 'clown', 'mandarin']);
        done();
    });

    it('Array.prototype.push', function (done) {
        var numbers = [1, 2, 3];
        var result = numbers.$push(4);
        expect(numbers).to.deep.equal([1,2,3,4]);
        expect(result).to.be.equal(4);

        var sports = ['soccer', 'baseball'];
        var total = sports.$push('football', 'swimming');
        expect(sports).to.deep.equal(['soccer', 'baseball', 'football', 'swimming']);
        expect(total).to.be.equal(4);

        var vegetables = ['parsnip', 'potato'];
        var moreVegs = ['celery', 'beetroot'];
        Array.prototype.$push.apply(vegetables, moreVegs);
        expect(vegetables).to.deep.equal(['parsnip', 'potato', 'celery', 'beetroot']);

        var obj = {
            length: 0
        };
        Array.prototype.$push.apply(obj, ['a', 'b']);
        expect(obj).to.deep.equal({
            length: 2,
            0: 'a',
            1: 'b'
        });

        done();
    });


    it('Array.prototype.reduce', function (done) {
        var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
        var maxCallback2 = ( max, cur ) => Math.max( max, cur );
        expect([ { x: 22 }, { x: 42 } ].$reduce( maxCallback )).to.be.equal(42);
        expect([ { x: 22 },               ].$reduce( maxCallback )).to.deep.equal({x: 22});
        
        var sum = [0, 1, 2, 3].$reduce(function (a, b) {
          return a + b;
        }, 0);
        expect(sum).to.be.equal(6);

        var total = [ 0, 1, 2, 3 ].$reduce(
          ( acc, cur ) => acc + cur,
          100
        );
        expect(total).to.be.equal(106);

        var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
          function(a, b) {
            return a.concat(b);
          },
          []
        );
        expect(flattened).to.deep.equal([0, 1, 2, 3, 4, 5]);

        done();
    });    

    it('Array.prototype.reduceRight', function (done) {
        var flattened = [[0, 1], [2, 3], [4, 5]].$reduceRight(function(a, b) {
            return a.concat(b);
        }, []);
        expect(flattened).to.deep.equal([4, 5, 2, 3, 0, 1]);

        var sum = [0, 1, 2, 3].$reduceRight(function(a, b) {
          return a + b;
        });
        expect(sum).to.be.equal(6);

        var a = ['1', '2', '3', '4', '5']; 
        var right = a.$reduceRight(function(prev, cur) { return prev + cur; });
        expect(right).to.be.equal('54321');
        done();
    });

    it('Array.prototype.reverse', function (done) {
        var a = ['one', 'two', 'three'];
        var reversed = a.$reverse();
        expect(reversed).to.deep.equal(['three', 'two', 'one']);
        expect(a).to.deep.equal(['three', 'two', 'one']);

        var arr = [1,2,3,,5];
        var aa = arr.$reverse();
        expect(arr).to.deep.equal([5,,3,2,1]);
        expect(aa).to.deep.equal([5,,3,2,1]);
        done();
    });

    it('Array.prototype.shift', function (done) {
        var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
        var shifted = myFish.$shift();
        expect(myFish).to.deep.equal(['clown', 'mandarin', 'surgeon']);
        expect(shifted).to.be.equal('angel');

        var arr = [1,2,3,,5];
        var shift2 = arr.$shift();
        expect(shift2).to.be.equal(1);
        expect(arr).to.deep.equal([2,3,,5]);
        done();
    });

    it('Array.prototype.slice', function (done) {
        var a = ['zero', 'one', 'two', 'three'];
        var sliced = a.$slice(1, 3);
        expect(sliced).to.deep.equal(['one', 'two']);

        function list() {
          return Array.prototype.$slice.call(arguments);
        }

        var list1 = list(1, 2, 3);
        expect(list1).to.deep.equal([1,2,3]);

        var arr = [1,2,3,,5];
        expect(arr.$slice(0,4)).to.deep.equal([1,2,3,]);
        done();
    });

    it('Array.prototype.some', function (done) {
        function isBiggerThan10(element, index, array) {
          return element > 10;
        }

        expect([2, 5, 8, 1, 4].$some(isBiggerThan10)).to.be.equal(false);
        expect([12, 5, 8, 1, 4].$some(isBiggerThan10)).to.be.equal(true);

        var fruits = ['apple', 'banana', 'mango', 'guava'];
        function checkAvailability(arr, val) {
          return arr.$some(function(arrVal) {
            return val === arrVal;
          });
        }

        expect(checkAvailability(fruits, 'kela')).to.be.equal(false);
        expect(checkAvailability(fruits, 'banana')).to.be.equal(true);

        var TRUTHY_VALUES = [true, 'true', 1];

        function getBoolean(a) {
          'use strict';
          
          var value = a;
           
          if (typeof value === 'string') { 
            value = value.toLowerCase().trim();
          }

          return TRUTHY_VALUES.$some(function(t) {
            return t === value;
          });
        }

        expect(getBoolean(false)).to.be.equal(false);
        expect(getBoolean('false')).to.be.equal(false);
        expect(getBoolean(1)).to.be.equal(true);
        expect(getBoolean('true')).to.be.equal(true);
        done();
    });

    

});








