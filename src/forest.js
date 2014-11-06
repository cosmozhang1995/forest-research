var ForestRecord = require('./model/forest-record');
var ForestData = require('./model/forest-data');
var ForestUtil = require('./util/forest-util');

var forest = {
	loadFile: function(filename) {
		return ForestData.fromFile(filename);
	},
	putFile: function(filename, data) {
		ForestUtil.xlsxHelper.outputData(filename, data);
	}
}

module.exports = forest;