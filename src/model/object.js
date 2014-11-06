var Object = {
	get: function(key) {
		var val = this[key];
		if (typeof val === "function") {
			return val.call(this);
		} else {
			return val;
		}
	},

	set: function(key, val) {
		if ((typeof this[key] === "function") && (typeof val !== "function")) throw "Cannot set a non-function value for a function property";
		this[key] = val;
	},

	appendOpts: function (opts) {
		for (var i in opts) 
			if (typeof opts !== "undefined") 
				this.set(i, opts[i]);
	}
}

module.exports = Object;