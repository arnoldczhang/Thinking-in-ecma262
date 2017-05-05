'use strict'
;(function () {

	var 
		OBJ = {}
		, ARR = []
		, STR = ''

		, $toString = OBJ.toString

		, MAX_ARRAY_LEN = Math.pow(2, 53) -1
		;

	var _ = {};

	$each('Object String Symbol Null Undefined Array Function Boolean Number'.split(/\s/), function (el) {
		_['is' + el] = function (obj) {
			return $toString.call(obj) === '[object ' + el + ']';
		};
	});

	var logger = {
		keySet: {},
		count: function count (key) {

			var count = this.keySet[key];

			if (_.isUndefined(count)) {
				this.keySet[key] = count = 1;
			}

			else {
				this.keySet[key] = count += 1;
			}

			console.log((key + ' call for ' + count + ' times').magenta);
		}
	};

	function isCallable (func) {
		return func.call;
	};

	function isMeanless (obj) {
		return _.isNull(obj) || _.isUndefined(obj);
	};

	function isExist (obj) {
		return obj != null;
	};

	function isPropertyKey (arg) {

		if (_.isString(arg)) {
			return true;
		}

		if (_.isSymbol(arg)) {
			return true;
		}

		return false;
	};

	function isConstructor (func) {

		if (!_.isObject(func)) {
			return false;
		}

		if (func.constructor) {
			return true;
		}

		return false;
	};

	function toObject (o) {

		if (_.isNull(o) || _.isUndefined(o)) {
			throw new TypeError('');
		}

		return Object(o);
	};

	function isNumeric (num) {
		return num == Number(num);
	}

	function toInteger (num) {

		if (_.isNull(num)) {
			num = +0;
		}

		if (_.isUndefined(num)) {
			num = NaN;
		}

		if (_.isBoolean(num)) {
			num = num ? 1 : 0;
		}

		if (_.isString(num)) {

			if (isNumeric(num)) {
				num = Number(num);
			}

			else {
				num = NaN;
			}
		}

		if (isNaN(num)) {
			return 0;
		}

		if (num === 0 || num === Infinity || num === -Infinity) {
			return num;
		}

		return Math.floor(num);
	};

	function type (value) {
		return typeof value;
	};

	function isSameValueZero (x, y) {

		if (type(x) != type(y)) {
			return false;
		}

		if (_.isNumber(x)) {

			if (isNaN(x) && isNaN(y)) {
				return true;
			}

			if (x === +0 && y === -0
				|| x === -0 && y === +0) {
				return true;
			}

			if (_.isNumber(y) && x === y) {
				return true;
			}

			return false;
		}

		if (_.isUndefined(x) || _.isNull(x)) {
			return true;
		}

		if (_.isString(x)) {

			//TODO the same sequence of code units
			return x === y;
		}

		if (_.isBoolean(x)) {
			return x === true && y === true
				|| x === false && y === false;
		}

		if (_.isObject(x) && _.isObject(y)) {
			return x === y;
		}

	};

	function getV (v, p) {

		if (isPropertyKey(p)) {
			var o = toObject(v);
			return o[p];
		}
	};

	function getMethod (v, p) {

		if (isPropertyKey(p)) {
			var func = getV(v, p);
		}
	};

	function $each (arr, cb, thisArg) {
		var 
			i = 0
			, len
			;

		if (isCallable(cb)) {
			if (len = arr.length) {
				for ( ; i < len; ++i) {
					cb.call(thisArg, arr[i], i, arr);
				}
			}			
		}
	};

	function $def (obj, prop, value) {
		Object.defineProperty(obj, prop, {
			enumerable: false,
			configurable: false,
			value: value
		});
	};

	/**
	 * Array.from
	 */
	$def(Array, '$from', function from (items, mapFn, thisArg) {
		logger.count('`Array.from`');
		var 
			_this = this
			, hasMapFn = mapFn && isCallable(mapFn)
			, T = thisArg || undefined
			, index
			, length
			, arr
			;

		if (_.isArray(items)) {

			if (items.length >= MAX_ARRAY_LEN) {
				throw new TypeError('');
			}

			arr = Array(0);
			$each(items, hasMapFn ? function (item, index, _a) {
				arr[index] = mapFn.call(T, item, index, _a);
			} : function (item, index) {
				arr[index] = item;
			});
		}

		else {
			length = toObject(items).length;
			arr = Array(length);
			index = -1;

			while (++index < length) {
				arr[index] = hasMapFn 
					? mapFn.call(T, items[index], index, items)			
					: items[index];
			}
		}

		return arr;
	});

	/**
	 * Array.of
	 */
	$def(Array, '$of', function of () {
		logger.count('`Array.of`');
		var
			args = arguments
			, length = args.length
			, _this = this
			, index = -1
			, arr
			;

		arr = Array(length);

		while (++index < length) {
			arr[index] = args[index];
		}

		return arr;
	});

	/**
	 * Array.prototype.concat
	 */
	$def(Array.prototype, '$concat', function concat () {
		logger.count('`Array.prototype.concat`');
		var 
			args = arguments
			, _this = this
			, length = args.length
			, list = Array(length + 1)
			, arr = []
			, n = 0
			, index = 0
			;
		
		list[0] = _this;
		$each(args, function (arg, i) {
			list[i + 1] = arg;
		});

		$each(list, function (item) {

			if (_.isArray(item)) {

				if (n + item.length > MAX_ARRAY_LEN) {
					throw new TypeError('');
				}

				$each(item, function (it) {
					arr[arr.length] = it;
					n++;
				});
			}

			else {

				if (n + 1 > MAX_ARRAY_LEN) {
					throw new TypeError('');
				}

				arr[arr.length] = item;
				n++;
			}
		});
		return arr;
	});

	/**
	 * Array.prototype.copyWithin
	 */
	$def(Array.prototype, '$copyWithin', function copyWithin (target, start, end) {
		logger.count('`Array.prototype.copyWithin`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, list = []
			, index = 0
			, to
			, from
			, count
			, final
			, direction
			, relativeTarget = target >> 0
			, relativeStart = start >> 0
			, relativeEnd
			;

		if (relativeTarget < 0) {
			to = Math.max(length + relativeTarget, 0);
		}

		else {
			to = Math.min(relativeTarget, length);
		}

		if (relativeStart < 0) {
			from = Math.max(length + relativeStart, 0);
		}

		else {
			from = Math.min(relativeStart, length);
		}

		if (_.isUndefined(end)) {
			relativeEnd = length;
		}

		else {
			relativeEnd = end >> 0;
		}

		if (relativeEnd < 0) {
			final = Math.max(length + relativeEnd, 0);
		}

		else {
			final = Math.min(relativeEnd, length);
		}

		count = Math.min(final - from, length - to);

		if (from < to && to < (from + count)) {
			direction = -1;
			from += count - 1;
			to += count - 1;
		}

		else {
			direction = 1;
		}

		while (count > 0) {

			if (from in _this) {
				_this[to] = _this[from];
			}

			else {
				delete O[to];
			}

			from += direction;
			to += direction;
			count--;
		}

		return _this;
	});

	/**
	 * Array.prototype.every
	 */
	$def(Array.prototype, '$every', function every (cb, thisArg) {
		logger.count('`Array.prototype.every`');
		thisArg = thisArg || void 0;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, list = []
			, index = length
			, returnValue = true
			;

		if (!isCallable(cb)) {
			throw new TypeError('undefined is not a function');
		}

		while (--index >= 0) {
			
			if (!cb.call(thisArg, _this[index], index, _this)) {
				returnValue = false;
				break;
			}
		}
		return returnValue;
	});

	/**
	 * Array.prototype.fill
	 */
	$def(Array.prototype, '$fill', function fill (value, start, end) {
		logger.count('`Array.prototype.fill`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			;

		if (!isExist(value)) {
			return new TypeError('');
		}

		start = toInteger(start);
		start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);

		if (_.isUndefined(end)) {
			end = length;
		}

		else {
			end = toInteger(end);
			end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
		}

		while (start < end) {
			_this[start] = value;
			start++;
		}

		return _this;
	});

	/**
	 * Array.prototype.filter
	 */
	$def(Array.prototype, '$filter', function filter (cb, thisArg) {
		logger.count('`Array.prototype.filter`');
		thisArg = thisArg || undefined;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, to = 0
			, index = 0
			, pValue
			, pKey
			, list = Array(0)
			;

		if (!isCallable(cb)) {
			return new TypeError('');
		}

		while (index < length) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {

				pValue = _this[index];

				if (cb.call(thisArg, pValue, index, _this)) {
					list[list.length] = pValue;
					to++;
				}
			}

			index++;
		}

		return list;
	});

	/**
	 * Array.prototype.find
	 */
	$def(Array.prototype, '$find', function find (cb, thisArg) {
		logger.count('`Array.prototype.find`');
		thisArg = thisArg || undefined;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index = 0
			, pKey
			, pValue
			, returnValue
			;

		if (!isCallable(cb)) {
			return new TypeError('');
		}

		while (index < length) {
			pKey = String(index);
			pValue = _this[pKey];

			if (cb.call(thisArg, pValue, index, _this)) {
				returnValue = pValue;
				break;
			}

			index++;
		}

		return returnValue;
	});

	/**
	 * Array.prototype.findIndex
	 */
	$def(Array.prototype, '$findIndex', function findIndex (cb, thisArg) {
		logger.count('`Array.prototype.findIndex`');
		thisArg = thisArg || undefined;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index = 0
			, pKey
			, pValue
			, returnValue = -1
			;

		if (!isCallable(cb)) {
			return new TypeError('');
		}

		while (index < length) {
			pKey = String(index);
			pValue = _this[pKey];

			if (cb.call(thisArg, pValue, index, _this)) {
				returnValue = index;
				break;
			}

			index++;
		}

		return returnValue;
	});

	/**
	 * Array.prototype.forEach
	 */
	$def(Array.prototype, '$forEach', function forEach (cb, thisArg) {
		logger.count('`Array.prototype.forEach`');
		thisArg = thisArg || undefined;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index = 0
			, pKey
			, pValue
			, returnValue = undefined
			;

		if (!isCallable(cb)) {
			return new TypeError('');
		}

		while (index < length) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				pValue = _this[pKey];
				cb.call(thisArg, pValue, index, _this);			
			}

			index++;
		}

		return returnValue;
	});

	/**
	 * Array.prototype.includes
	 */
	$def(Array.prototype, '$includes', function includes (searchElement, fromIndex) {
		logger.count('`Array.prototype.includes`');
		fromIndex = toInteger(fromIndex);
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index
			, pKey
			, pValue
			;

		if (!length) {
			return false;
		}

		if (fromIndex < 0) {
			fromIndex += length;

			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}

		index = fromIndex;

		while (index < length) {
			pKey = String(index);
			pValue = _this[pKey];

			if (isSameValueZero(pValue, searchElement)) {
				return true;
			}

			index++;
		}

		return false;
	});

	/**
	 * Array.prototype.indexOf
	 */
	$def(Array.prototype, '$indexOf', function indexOf (searchElement, fromIndex) {
		logger.count('`Array.prototype.indexOf`');
		fromIndex = toInteger(fromIndex);
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index
			, pKey
			, pValue
			;

		if (!length) {
			return -1;
		}

		if (fromIndex >= length) {
			return -1;
		}

		if (fromIndex >= 0) {

			if (fromIndex === -0) {
				fromIndex = +0;
			}
		}

		else {
			fromIndex += length;

			if (fromIndex < 0) {
				fromIndex = 0;
			}			
		}

		index = fromIndex;

		while (index < length) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				pValue = _this[pKey];

				if (pValue === searchElement) {
					return index;
				}
			}

			index++;
		}

		return -1;
	});

	/**
	 * Array.prototype.join
	 */
	$def(Array.prototype, '$join', function join (seperator) {
		logger.count('`Array.prototype.join`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index = 1
			, firstEl
			, partial
			, pKey
			, pValue
			;

		if (_.isUndefined(seperator)) {
			seperator = ',';
		}

		if (!length) {
			return '';
		}

		firstEl = _this[0];
		partial = isMeanless(firstEl) ? '' : firstEl;

		while (index < length) {
			partial += seperator;
			pKey = String(index);
			pValue = _this[pKey];
			partial += isMeanless(pValue) ? '' : pValue;
			index++;
		}

		return partial;
	});


	/**
	 * Array.prototype.lastIndexOf
	 */
	$def(Array.prototype, '$lastIndexOf', function lastIndexOf (searchElement, fromIndex) {
		logger.count('`Array.prototype.lastIndexOf`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index
			, pKey
			, pValue
			;

		if (!length) {
			return -1;
		}

		if (_.isUndefined(fromIndex)) {
			index = length - 1;
		}

		else {

			if (fromIndex >= 0) {

				if (fromIndex === -0) {
					index = +0;
				}

				else {
					index = Math.min(fromIndex, length - 1);
				}
			}

			else {
				index = length + fromIndex;		
			}			
		}

		while (index >= 0) {
			pKey = String(index);
			pValue = _this[pKey];

			if (_this.hasOwnProperty(pKey)) {

				if (pValue === searchElement) {
					return index;
				}
			}
			index--;
		}

		return -1;
	});

	/**
	 * Array.prototype.map
	 */
	$def(Array.prototype, '$map', function map (cb, thisArg) {
		logger.count('`Array.prototype.map`');
		thisArg = thisArg || undefined;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index = 0
			, pKey
			, pValue
			, list = Array(0)
			;

		if (!isCallable(cb)) {
			return new TypeError('');
		}

		while (index < length) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				pValue = _this[pKey];
				list[list.length] = cb.call(thisArg, pValue, index, _this);			
			}

			index++;
		}

		return list;
	});

	/**
	 * Array.prototype.pop
	 */
	$def(Array.prototype, '$pop', function pop () {
		logger.count('`Array.prototype.pop`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, pValue
			;

		if (!length) {
			return undefined;
		}

		if (length > 0) {
			pValue = _this[length - 1];
			_this.length = length - 1;
		}

		return pValue;
	});

	/**
	 * Array.prototype.push
	 */
	$def(Array.prototype, '$push', function push () {
		logger.count('`Array.prototype.push`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, argsLength = args.length
			, pValue
			, index = 0
			;

		if (length + argsLength > MAX_ARRAY_LEN) {
			throw new TypeError('');
		}

		if (argsLength) {

			while (index < argsLength) {
				_this[_this.length] = args[index];
				_this.length = ++length;
				index++;
			}
		}

		return length;
	});

	/**
	 * Array.prototype.reduce
	 */
	$def(Array.prototype, '$reduce', function reduce (cb, initialValue) {
		logger.count('`Array.prototype.reduce`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, pKey
			, pValue
			, index = 0
			, accumulator
			;

		if (!isCallable(cb)) {
			throw new TypeError('');
		}

		if (!length && _.isUndefined(initialValue)) {
			throw new TypeError('');
		}

		if (!_.isUndefined(initialValue)) {
			accumulator = initialValue;
		}

		else {

			while (index < length) {
				pKey = String(index);
				index++;

				if (_this.hasOwnProperty(pKey)) {
					accumulator = _this[pKey];
					break;
				}

			}
		}

		while (index < length) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				pValue = _this[pKey];
				accumulator = cb.call(undefined, accumulator, pValue, index, _this);
			}

			index++;
		}

		return accumulator;
	});

	/**
	 * Array.prototype.reduceRight
	 */
	$def(Array.prototype, '$reduceRight', function reduceRight (cb, initialValue) {
		logger.count('`Array.prototype.reduceRight`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, pKey
			, pValue
			, index = length - 1
			, accumulator
			;

		if (!isCallable(cb)) {
			throw new TypeError('');
		}

		if (!length && _.isUndefined(initialValue)) {
			throw new TypeError('');
		}

		if (!_.isUndefined(initialValue)) {
			accumulator = initialValue;
		}

		else {

			while (index >= 0) {
				pKey = String(index);
				index--;

				if (_this.hasOwnProperty(pKey)) {
					accumulator = _this[pKey];
					break;
				}

			}
		}

		while (index >= 0) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				pValue = _this[pKey];
				accumulator = cb.call(undefined, accumulator, pValue, index, _this);
			}

			index--;
		}

		return accumulator;
	});

	/**
	 * Array.prototype.reverse
	 */
	$def(Array.prototype, '$reverse', function reverse () {
		logger.count('`Array.prototype.reverse`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, middle = Math.floor(length / 2)
			, upper
			, lower = 0
			, upperKey
			, lowerKey
			, upperExist
			, lowerExist
			, upperValue
			, lowerValue
			;

		while (lower != middle) {
			upper = length - lower - 1;

			upperKey = String(upper);
			lowerKey = String(lower);
			
			upperExist = _this.hasOwnProperty(upperKey);
			lowerExist = _this.hasOwnProperty(lowerKey);

			if (upperExist) {
				upperValue = _this[upperKey];
			}

			if (lowerExist) {
				lowerValue = _this[lowerKey];
			}

			if (upperExist && lowerExist) {
				_this[lower] = upperValue;
				_this[upper] = lowerValue;
			}

			else if (!lowerExist && upperExist) {
				_this[lowerKey] = upperValue;
				delete _this[upperKey];
			}

			else if (lowerExist && !upperExist) {
				_this[upperKey] = lowerValue;
				delete _this[lowerKey];
			}
			lower++;
		}

		return _this;
	});

	/**
	 * Array.prototype.shift
	 */
	$def(Array.prototype, '$shift', function shift () {
		logger.count('`Array.prototype.shift`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, index
			, preKey
			, pKey
			, pValue
			, first
			;

		if (!length) {
			return first;
		}

		first = _this[0];
		index = 1;

		while (index < length) {
			pKey = String(index);
			preKey = String(index - 1);

			if (_this.hasOwnProperty(pKey)) {
				_this[preKey] = _this[pKey];
			}

			else {
				delete _this[preKey];
			}

			index++;
		}

		delete _this[length - 1];
		_this.length = length - 1;
		return first;
	});

	/**
	 * Array.prototype.slice
	 */
	$def(Array.prototype, '$slice', function slice (start, end) {
		logger.count('`Array.prototype.slice`');
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, newLength = 0
			, index
			, pKey
			, pValue
			, list
			;

		if (_.isUndefined(start)) {
			start = 0;
		}

		else {
			start = toInteger(start);

			if (start >= 0) {
				start = Math.min(start, length);
			}

			else {
				start = Math.max(length + start, 0);
			}
		}

		if (_.isUndefined(end)) {
			end = length;
		}

		else {
			end = toInteger(end);

			if (end >= 0) {
				end = Math.min(end, length);
			}

			else {
				end = Math.max(length + end, 0)
			}
		}

		list = Array(end - start);
		index = start;

		while (index < end) {
			pKey = String(index);

			if (_this.hasOwnProperty(pKey)) {
				list[newLength] = _this[pKey];
			}
			index++;
			newLength++;
		}

		list.length = newLength;
		return list;
	});

	/**
	 * Array.prototype.some
	 */
	$def(Array.prototype, '$some', function some (cb, thisArg) {
		logger.count('`Array.prototype.some`');
		thisArg = thisArg || void 0;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			, list = []
			, index = length
			, returnValue = false
			;

		if (!isCallable(cb)) {
			throw new TypeError('undefined is not a function');
		}

		while (--index >= 0) {
			
			if (cb.call(thisArg, _this[index], index, _this)) {
				returnValue = true;
				break;
			}
		}
		return returnValue;
	});

	/**
	 * Array.prototype.sort
	 */
	$def(Array.prototype, '$sort', function sort (compareFn) {
		logger.count('`Array.prototype.sort`');
		thisArg = thisArg || void 0;
		var 
			args = arguments
			, _this = toObject(this)
			, length = _this.length
			;

		function isSparse () {
			var index = 0;

			while (index < length) {

				if (!_this.hasOwnProperty(index)) {
					return true;
				}
				index++;
			}

			return false;
		};

		function insertSort (arr) {
	            var 
	                length = arr.length
	                , index = 1
	                , innerIndex
	                , temp
	                ;

	            while (index < length) {
	                pValue = arr[index];
	                innerIndex = index;

	                while (innerIndex > 0 && arr[innerIndex - 1] > pValue) {
	                    arr[innerIndex] = arr[innerIndex - 1];
	                    arr[innerIndex - 1] = pValue;
	                    innerIndex--;
	                }
	                index++;
	            }
	        };

		function sortCompare (x, y) {
			var 
				value
				, xString
				, yString
				;

			if (_.isUndefined(x) && _.isUndefined(y)) {
				return +0;
			}

			if (_.isUndefined(x)) {
				return 1;
			}

			if (_.isUndefined(y)) {
				return -1;
			}

			if (isCallable(compareFn)) {
				value = toInteger(compareFn(x, y));

				if (isNaN(value)) {
					return +0;
				}

				return value;
			}

			xString = String(x);
			yString = String(y);

			if (xString < yString) {
				return -1;
			}

			if (yString < xString) {
				return 1;
			}

			return +0;
		}
		
		
	});	

} ());








