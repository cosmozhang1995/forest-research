var util = require('../util/forest-util');

var ForestRecord = function(opts) {
	this.sampleArea = "";
	this.species = "";
	this.count = 1.0;
	this.diameterBreast = 0.0;
	this.lengthCrown = 0.0;
	this.widthCrown = 0.0;
	this.areaBreast = function() {
		return Math.PI * this.diameterBreast * this.diameterBreast / 4;
	};
	this.areaCrown = function() {
		return this.lengthCrown * this.widthCrown;
	};
	this.areaCover = function() {
		return this.lengthCrown * this.widthCrown;
	};

	this.appendOpts(opts);
}

ForestRecord.fromRow = function(header, data_row) {
	if (!((header instanceof Array) && (data_row instanceof Array))) throw "Invalid argument";
	// if (header.length !== data_row.length) throw "Imcompatible length for header and data";
	var opts = {};
	for (var i = 0; i < header.length; i++) {
		var title = util.parseRecordProperty(header[i]);
		var parser = ForestRecord.propertyParsers[title];
		if (typeof parser !== "function") continue;
		var val;
		try {
			val = parser(data_row[i]);
			opts[title] = val;
		} catch (e) {
			if ('' + e != "Cannot set this property") throw e;
		}
	}
	return new ForestRecord(opts);
}

ForestRecord.propertyParsers = {
	sampleArea: function(data) {
		return "" + data;
	},
	species: function(data) {
		return "" + data;
	},
	count: function(data) {
		var parsed = parseFloat(data);
		if (typeof parsed !== "number" || isNaN(parsed)) parsed = 1;
		return parsed;
	},
	diameterBreast: function(data) {
		var parsed = parseFloat(data);
		if (typeof parsed !== "number" || isNaN(parsed)) throw "Invalid property value for diameterBreast";
		return parsed;
	},
	lengthCrown: function(data) {
		var parsed = parseFloat(data);
		if (typeof parsed !== "number" || isNaN(parsed)) throw "Invalid property value for lengthCrown";
		return parsed;
	},
	widthCrown: function(data) {
		var parsed = parseFloat(data);
		if (typeof parsed !== "number" || isNaN(parsed)) throw "Invalid property value for widthCrown";
		return parsed;
	},
	areaBreast: function(data) {
		throw "Cannot set this property";
	},
	areaCrown: function(data) {
		throw "Cannot set this property";
	},
	areaCover: function(data) {
		throw "Cannot set this property";
	}
}

ForestRecord.prototype = require('./object');
module.exports = ForestRecord;