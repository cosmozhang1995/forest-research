var util = require('../util/forest-util');
var ForestRecord = require('./forest-record');

var ForestData = function(opts) {
	this.types = {
		title: "row-title",				// row-title | col-title
		category: "tree"					// tree | shrub | herb
	};						
	this.name = "";
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

	this.getSummary = function() {
		var records = this.get('records');
		var data = [];
		var _this = this;
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
		var countTotal = 0,
				sampleAreaCountTotal = 0,
				areaBreastTotal = 0,
				areaCrownTotal = 0,
				swFigureTotal = 0,
				sFigure = 0,
				diversity = 0,
				lns = 0,
				jsw = 0;
		data.forEach(function(item) {
			countTotal += item.count;
			sampleAreaCountTotal += item.sampleAreaCount;
			areaBreastTotal += item.areaBreast;
			areaCrownTotal += item.areaCrown;
		});
		data.forEach(function(item) {
			item.density = item.count / countTotal;
			item.frequence = item.sampleAreaCount / sampleAreaCountTotal;
			item.advantage = (_this.types.category == "tree") ?
				item.areaBreast / areaBreastTotal :
				item.areaCrown / areaCrownTotal;
			item.importance = (item.density + item.frequence + item.advantage) / 3;
			item.pi = item.density;
			item.lnpi = Math.log(item.pi);
			item.pimlnpi = item.pi * item.lnpi;
			item.swFigure = -1 * item.pimlnpi;
			item.pi2 = item.pi * item.pi;
		});
		data.forEach(function(item) {
			swFigureTotal += item.swFigure;
			sFigure += item.pi2;
			diversity += 1;
		});
		sFigure = 1 - sFigure;
		lns = Math.log(diversity);
		jsw = swFigureTotal / lns;
		return {
			countTotal: countTotal,
			sampleAreaCountTotal: sampleAreaCountTotal,
			areaBreastTotal: areaBreastTotal,
			areaCrownTotal: areaCrownTotal,
			swFigureTotal: swFigureTotal,
			sFigure: sFigure,
			diversity: diversity,
			lns: lns,
			jsw: jsw,
			data: data
		};
	};

	this.getSummaryForTable = function() {
		var summaryData = this.getSummary();
		var data = summaryData.data;
		var data0 = data[0];
		if (data0) {
			data0.countTotal = summaryData.countTotal;
			data0.sampleAreaCountTotal = summaryData.sampleAreaCountTotal;
			data0.areaBreastTotal = summaryData.areaBreastTotal;
			data0.areaCrownTotal = summaryData.areaCrownTotal;
			data0.swFigureTotal = summaryData.swFigureTotal;
			data0.sFigure = summaryData.sFigure;
			data0.diversity = summaryData.diversity;
			data0.lns = summaryData.lns;
			data0.jsw = summaryData.jsw;
		}
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
	this.getSummaryTable = function(fields, titleMapper) {
		var areaField = (this.types.category == "tree") ? 'areaBreast' : 'areaCrown';
		if (!fields) fields = ['species', 'sampleAreaCount', 'sampleAreaCountTotal', 'count', 'countTotal', areaField, areaField+'Total', 'density', 'frequence', 'advantage', 'importance', 'pi', 'lnpi', 'pimlnpi', 'swFigure', 'swFigureTotal', 'pi2', 'sFigure', 'diversity', 'lns', 'jsw'];
		if (!titleMapper) titleMapper = util.summaryTableTitleMapper;
		var records = this.getSummaryForTable();
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
	var parsedData = util.xlsx.parse(filename);
	var forestDatas = [];
	parsedData.forEach(function(item) {
		var forestData = undefined;
		try {
			forestData = ForestData.fromDataset(item);
		} catch (e) {
			forestData = undefined;
		}
		if (forestData) forestDatas.push(forestData);
	});
	return forestDatas;
};

ForestData.fromDataset = function(dataset) {
	var raw_data = dataset.data;
	var data = new ForestData();
	data.name = dataset.name;
	data.types = ForestData.getTypes(raw_data);

	var standardCols = ForestData.standardCols(raw_data);
	var headerRow = ForestData.getHeaderRow(raw_data);
	if (data.types.title == 'row-title') {
		var current_sample_area = "";
		for (var i = 0; i < raw_data.length; i++) {
			var data_row = raw_data[i];
			var validCountInRow = util.xlsxHelper.validCountInRow(data_row);
			var sampleAreaFromThisRow = ForestData.getSampleAreaFromRow(data_row);
			if (sampleAreaFromThisRow) {
				current_sample_area = sampleAreaFromThisRow;
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
			} catch (e) {}
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

	types.category = "tree";

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

ForestData.getSampleAreaFromRow = function(data_row) {
	var ret = undefined;
	for (var i = data_row.length - 1; i >= 0; i--) {
		var _item = data_row[i];
		if (typeof _item !== "string") continue;
		if (/.*[^0-9a-zA-Z].*/.test(_item)) return undefined;
		if (ret) return undefined;
		else ret = _item;
	};
	return ret;
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