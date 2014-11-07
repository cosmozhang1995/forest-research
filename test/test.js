var forest = require('../index.js');

// var data = forest.loadFile(__dirname + '/test-row-title.xlsx')[0];
var data = forest.loadFile('/Users/zhangcosmo/Downloads/青冈次生林/乔木原始数据.xlsx');

// console.log(data);
// console.log(data.getDetailTable());

// var output_data = [
// 	{ name:'计算结果', data: data.getDetailTable() },
// 	{ name:'统计：物种', data: data.getSpeciesSummaryTable() },
// 	{ name:'统计：样地', data: data.getSampleSummaryTable() },
// 	{ name:'统计：样地-物种', data: data.getSampleSpeciesSummaryTable() },
// 	{ name:'统计结果', data: data.getSummaryTable() }
// ];

var output_data = [];
for (var i = 0; i < data.length; i++) {
	output_data.push({ name:data[i].name, data:data[i].getSummaryTable() });
}

forest.putFile('./test/output.xlsx', output_data);

module.exports = {
	data: data
};