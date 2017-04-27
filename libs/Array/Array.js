'use strict'
;(function () {

	var 
		OBJ = {}
		, ARR = []
		, STR = ''

		, $toString = OBJ.toString
		, $each = ARR.forEach

		, MAX_ARRAY_LEN = Math.pow(2, 53) -1
		;

	var _ = {};

	$each.call('Object String Symbol Null Undefined Array'.split(/\s/), function (el) {
		_['is' + el] = function (obj) {
			return $toString.call(obj) === '[object ' + el + ']';
		};
	});

	function isCallable (func) {
		return func.call;
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

	function get (p, v) {

		if (_.isObject(p)) {

			if (isPropertyKey(v)) {
				return ;
			}
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

	/**
	 * Array.from
	 */
	Array.from = function arrayFrom (items, mapFn, thisArg) {
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
			$each.call(items, hasMapFn ? function (item, index, _a) {
				arr[index] = mapFn.call(T, item, index, _a);
			} : function (item, index) {
				arr[index] = item;
			});
		}

		else {
			length = toObject(items).length;
			arr = Array(length);
			index = 0;

			while (index++ < length) {
				arr[index] = hasMapFn 
					? mapFn.call(T, items[index], index, items)			
					: items[index];				
			}
		}

		return arr;
	};
} ());
