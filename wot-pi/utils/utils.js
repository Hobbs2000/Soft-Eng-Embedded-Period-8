
exports.createObservable = function(obj, callback) {
	var handler = {
		set(target, key, value) {
			target[key] = value;
			callback(target, key, value);
		}
	}
	
	return new Proxy(obj, handler);
}