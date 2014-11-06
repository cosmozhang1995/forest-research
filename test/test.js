var forest = require('../index.js');

var data = forest.loadFile(__dirname + '/test-row-title.xlsx');

// console.log(data);
// console.log(data.getDetailTable());

var output_data = [
	{ name:'计算结果', data: data.getDetailTable() },
	{ name:'统计：物种', data: data.getSpeciesSummaryTable() },
	{ name:'统计：样地', data: data.getSampleSummaryTable() },
	{ name:'统计：样地-物种', data: data.getSampleSpeciesSummaryTable() }
];

forest.putFile('./test/output.xlsx', output_data);

module.exports = {
	data: data
};