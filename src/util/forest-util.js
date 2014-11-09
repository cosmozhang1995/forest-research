var ForestUtil = {
	file_system: require('fs'),
	xlsx: require('node-xlsx'),
	recordPropertyMapper: (function() {
		var data = require('../mapper/record-property-mapper');
		var mapper = {};
		for (var i in data) {
			mapper[i] = new RegExp(data[i]);
		}
		return mapper;
	})(),
	parseRecordProperty: function(text) {
		for (var i in ForestUtil.recordPropertyMapper) {
			var mapper = ForestUtil.recordPropertyMapper[i];
			if (mapper.test('' + text)) {
				return i;
			}
		}
	},

	detailTableTitleMapper: require('../mapper/detail-title-mapper'),
	sampleSummaryTableTitleMapper: require('../mapper/sample-summary-title-mapper'),
	speciesSummaryTableTitleMapper: require('../mapper/species-summary-title-mapper'),
	sampleSpeciesSummaryTableTitleMapper: require('../mapper/sample-species-summary-title-mapper'),
	summaryTableTitleMapper: require('../mapper/summary-title-mapper'),

	arrayHelper: {
		contain: function(_arr, _val) {
			for (var i = 0; i < _arr.length; i++) {
				if (_arr[i] === _val) return true;
			}
			return false;
		},
		findProperty: function(_arr, _property_name, _val) {
			for (var i = 0; i < _arr.length; i++) {
				var _item = _arr[i];
				var _property;
				if (typeof _item.get === "function") _property = _item.get(_property_name);
				else _property = _item[_property_name];
				if (_property === _val) return _item;
			}
		},
		filterProperty: function(_arr, _property_name, _val) {
			var _return_arr = [];
			for (var i = 0; i < _arr.length; i++) {
				var _item = _arr[i];
				var _property;
				if (typeof _item.get === "function") _property = _item.get(_property_name);
				else _property = _item[_property_name];
				if (_property === _val) _return_arr.push(_item);
			}
			return _return_arr;
		}
	},

	xlsxHelper: {
		validCountInRow: function(row_data) {
			var return_cnt = 0;
			row_data.forEach(function(item) {
				if (item !== undefined) return_cnt++;
			});
			return return_cnt;
		},
		dataArray: function(fields, titleMapper, recordSet) {
			if (!titleMapper) titleMapper = util.detailTableTitleMapper;
			var data = [];
			var header_row = [];
			for (var i = 0; i < fields.length; i++) {
				var key = fields[i];
				var title = titleMapper[key];
				header_row.push(title);
			}
			data.push(header_row);
			for (var i = 0; i < recordSet.length; i++) {
				var record = recordSet[i];
				var data_row = [];
				for (var j = 0; j < fields.length; j++) {
					var key = fields[j];
					var val;
					if (record.get) val = record.get(key);
					else val = record[key];
					data_row.push(val);
				}
				data.push(data_row);
			}
			return data;
		},
		outputData: function(filename, data, callback) {
			var file_bin = ForestUtil.xlsx.build(data);
			ForestUtil.file_system.writeFile(filename, file_bin, callback);
		},
		outputDataSync: function(filename, data) {
			var file_bin = ForestUtil.xlsx.build(data);
			ForestUtil.file_system.writeFileSync(filename, file_bin);
		}
	}
}

module.exports = ForestUtil;