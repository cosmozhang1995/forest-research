var ForestRecord = require('./model/forest-record');
var ForestData = require('./model/forest-data');
var ForestUtil = require('./util/forest-util');

var forest = {
	loadFile: function(filename, opts) {
		return ForestData.fromFile(filename, opts);
	},
	putFile: function(filename, data, callback) {
		ForestUtil.xlsxHelper.outputData(filename, data, callback);
	},
	putFileSync: function(filename, data) {
		ForestUtil.xlsxHelper.outputDataSync(filename, data);
	}
}

module.exports = forest;