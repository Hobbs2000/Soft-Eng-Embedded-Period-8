exports.createObservable = function(obj, objName) {
	var handler = {
		set(target, key, value) {
			console.info('Setting %s %s as %s', objName, key, value);
			target[key] = value;
		}
	}

	return new Proxy(obj, handler);
}

exports.createObservableCustom = function(obj, callback) {
	var handler = {
		set(target, key, value) {
			console.info('Setting %s as %s', key, value);
			callback(obj.name, value);
			target[key] = value;
		}
	}
	
	return new Proxy(obj, handler);
}