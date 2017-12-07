exports.createObservable = function(obj, objName) {
	var handler = {
		set(target, key, value) {
			console.info('Setting %s %s as %s', objName, key, value);
			target[key] = value;
		}
	}

	return new Proxy(obj, handler);
}