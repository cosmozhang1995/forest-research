var util = require('../util/forest-util');
var ForestRecord = require('./forest-record');

var ForestData = function(opts) {
	this.types = [];						// [row-title | col-title]
	if (opts && (opts.records instanceof Array)) this.records = opts.records;
	else this.records = [];

	this.getSpeciesSummary = function() {
		var records = this.get('records');
		var data = [];
		records.forEach(function(item){
			var exist_data = util.arrayHelper.findProperty(data, 'species', item.species);
			if (exist_data) {
				if (!util.arrayHelper.contain(exist_data.sampleAreas, item.sampleArea)) {
					exist_data.sampleAreas.push(item.sampleArea);
					exist_data.sampleAreaCount++;
				}
				exist_data.count += item.count;
				exist_data.diameterBreast += item.get('diameterBreast');
				exist_data.areaBreast += item.get('areaBreast');
				exist_data.lengthCrown += item.get('lengthCrown');
				exist_data.widthCrown += item.get('widthCrown');
				exist_data.areaCrown += item.get('areaCrown');
			} else {
				data.push({
					species: item.species,
					count: item.count,
					sampleAreas: [item.sampleArea],
					sampleAreaCount: 1,
					diameterBreast: item.get('diameterBreast'),
					areaBreast: item.get('areaBreast'),
					lengthCrown: item.get('lengthCrown'),
					widthCrown: item.get('widthCrown'),
					areaCrown: item.get('areaCrown')
				});
			}
		});
		data.forEach(function(item) {
			item.diameterBreast = item.diameterBreast / item.count;
			item.areaBreast = item.areaBreast / item.count;
			item.lengthCrown = item.lengthCrown / item.count;
			item.widthCrown = item.widthCrown / item.count;
			item.areaCrown = item.areaCrown / item.count;
		});
		return data;
	};

	this.getSampleSummary = function() {
		var records = this.get('records');
		var data = [];
		records.forEach(function(item){
			var exist_data = util.arrayHelper.findProperty(data, 'sampleArea', item.sampleArea);
			if (exist_data) {
				if (!util.arrayHelper.contain(exist_data.species, item.species)) {
					exist_data.species.push(item.species);
					exist_data.speciesCount++;
				}
				exist_data.count += item.count;
				exist_data.diameterBreast += item.get('diameterBreast');
				exist_data.areaBreast += item.get('areaBreast');
				exist_data.lengthCrown += item.get('lengthCrown');
				exist_data.widthCrown += item.get('widthCrown');
				exist_data.areaCrown += item.get('areaCrown');
			} else {
				data.push({
					species: [item.species],
					count: item.count,
					sampleArea: item.sampleArea,
					speciesCount: 1,
					diameterBreast: item.get('diameterBreast'),
					areaBreast: item.get('areaBreast'),
					lengthCrown: item.get('lengthCrown'),
					widthCrown: item.get('widthCrown'),
					areaCrown: item.get('areaCrown')
				});
			}
		});
		data.forEach(function(item) {
			item.diameterBreast = item.diameterBreast / item.count;
			item.areaBreast = item.areaBreast / item.count;
			item.lengthCrown = item.lengthCrown / item.count;
			item.widthCrown = item.widthCrown / item.count;
			item.areaCrown = item.areaCrown / item.count;
		});
		return data;
	};

	this.getSampleSpeciesSummary = function() {
		var records = this.get('records');
		var data = [];
		records.forEach(function(item){
			var exist_data = util.arrayHelper.findProperty(util.arrayHelper.filterProperty(data, 'sampleArea', item.sampleArea), 'species', item.species);
			if (exist_data) {
				exist_data.count += item.count;
				exist_data.diameterBreast += item.get('diameterBreast');
				exist_data.areaBreast += item.get('areaBreast');
				exist_data.lengthCrown += item.get('lengthCrown');
				exist_data.widthCrown += item.get('widthCrown');
				exist_data.areaCrown += item.get('areaCrown');
			} else {
				data.push({
					sampleArea: item.sampleArea,
					species: item.species,
					count: item.count,
					diameterBreast: item.get('diameterBreast'),
					areaBreast: item.get('areaBreast'),
					lengthCrown: item.get('lengthCrown'),
					widthCrown: item.get('widthCrown'),
					areaCrown: item.get('areaCrown')
				});
			}
		});
		data.forEach(function(item) {
			item.diameterBreast = item.diameterBreast / item.count;
			item.areaBreast = item.areaBreast / item.count;
			item.lengthCrown = item.lengthCrown / item.count;
			item.widthCrown = item.widthCrown / item.count;
			item.areaCrown = item.areaCrown / item.count;
		});
		return data;
	};

	this.getDetailTable = function(fields, titleMapper) {
		if (!fields) fields = ['sampleArea', 'species', 'count', 'diameterBreast', 'areaBreast', 'lengthCrown', 'widthCrown', 'areaCrown'];
		if (!titleMapper) titleMapper = util.detailTableTitleMapper;
		var records = this.get('records');
		return util.xlsxHelper.dataArray(fields, titleMapper, records);
	};
	this.getSpeciesSummaryTable = function(fields, titleMapper) {
		if (!fields) fields = ['species', 'count', 'sampleAreaCount', 'diameterBreast', 'areaBreast', 'lengthCrown', 'widthCrown', 'areaCrown'];
		if (!titleMapper) titleMapper = util.speciesSummaryTableTitleMapper;
		var records = this.getSpeciesSummary();
		return util.xlsxHelper.dataArray(fields, titleMapper, records);
	};
	this.getSampleSummaryTable = function(fields, titleMapper) {
		if (!fields) fields = ['sampleArea', 'speciesCount', 'count'];
		if (!titleMapper) titleMapper = util.sampleSummaryTableTitleMapper;
		var records = this.getSampleSummary();
		return util.xlsxHelper.dataArray(fields, titleMapper, records);
	};
	this.getSampleSpeciesSummaryTable = function(fields, titleMapper) {
		if (!fields) fields = ['sampleArea', 'species', 'count', 'diameterBreast', 'areaBreast', 'lengthCrown', 'widthCrown', 'areaCrown'];
		if (!titleMapper) titleMapper = util.sampleSpeciesSummaryTableTitleMapper;
		var records = this.getSampleSpeciesSummary();
		return util.xlsxHelper.dataArray(fields, titleMapper, records);
	};

	this.putFile = function(filename, types) {
		var data = [];
		var _this = this;
		types.forEach(function(item) {
			if (item == "detail") {
				data.push({
					name: '计算结果',
					data: _this.getDetailTable()
				})
			}
		});
	};
};

ForestData.fromFile = function(filename) {
	var raw_data = util.xlsx.parse(filename)[0].data;
	var data = new ForestData();
	data.types = ForestData.getTypes(raw_data);

	var standardCols = ForestData.standardCols(raw_data);
	var headerRow = ForestData.getHeaderRow(raw_data);
	if (data.types.title == 'row-title') {
		var current_sample_area = "";
		for (var i = 0; i < raw_data.length; i++) {
			var data_row = raw_data[i];
			var validCountInRow = util.xlsxHelper.validCountInRow(data_row);
			if (validCountInRow == 1) {
				data_row.forEach(function(item) {
					if (item !== undefined) {
						current_sample_area = item;
						return false;
					}
				});
			} else {
				try {
					var record = ForestRecord.fromRow(headerRow, data_row);
					record.set('sampleArea', current_sample_area);
					if (record instanceof ForestRecord) {
						data.records.push(record);
					}
				} catch (e) {}
			}
		}
	} else {
		for (var i = 0; i < raw_data.length; i++) {
			var data_row = raw_data[i];
			var validCountInRow = util.xlsxHelper.validCountInRow(data_row);
			try {
				var record = ForestRecord.fromRow(headerRow, data_row);
				if (record instanceof ForestRecord) {
					data.records.push(record);
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
	return data;
}

ForestData.getTypes = function(data) {
	var types = {};

	var isRowTitle = false;
	for (var i = 0; i < data.length; i++) {
		if (util.xlsxHelper.validCountInRow(data[i]) === 1) {
			isRowTitle = true;
			break;
		}
	}
	types.title = isRowTitle ? 'row-title' : 'col-title';

	return types;
}

ForestData.isHeaderRow = function(data_row) {
	var hasSpeciesHeader = false;
	var hasCountHeader = false;
	data_row.forEach(function(item) {
		if (util.recordPropertyMapper['species'].test(''+item)) hasSpeciesHeader = true;
		if (util.recordPropertyMapper['count'].test(''+item)) hasCountHeader = true;
	});
	if (hasSpeciesHeader && hasCountHeader) return true;
	else return false;
}

ForestData.getHeaderRow = function(data) {
	for (var i = 0; i < data.length; i++) {
		if (ForestData.isHeaderRow(data[i])) {
			return data[i];
		}
	}
}

ForestData.mostCols = function(data) {
	var counts = {};
	data.forEach(function(item) {
		var colCnt = util.xlsxHelper.validCountInRow(item);
		if (counts[colCnt] === undefined) {
			counts[colCnt] = 1;
		} else {
			counts[colCnt]++;
		}
	});
	var max = 0;
	var colOfMost = 0;
	for (var col in counts) {
		if (max < (counts[col] || 0)) {
			max = counts[col];
			colOfMost = parseInt(col);
		}
	}
	return colOfMost;
}
ForestData.maxCols = function(data) {
	var max = 0;
	data.forEach(function(item) {
		var colCnt = util.xlsxHelper.validCountInRow(item);
		max = Math.max(max, colCnt);
	});
	return max;
}

ForestData.standardCols = function(data) {
	return ForestData.mostCols(data);
}

ForestData.prototype = require('./object');
module.exports = ForestData;