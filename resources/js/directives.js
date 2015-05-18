(function(){
var app = angular.module('directives' , []);
app.directive('header', function(){
	return {
	restrict : 'E',
	templateUrl : 'resources/template/layout.html'
	};
});
app.directive('netSales', ['d3Service', function(d3Service){
	return {
	restrict : 'E',
	link : function(scope, element, attrs){
	d3Service.d3().then(function(d3){
		var svg = d3.select(element[0]).append('svg');
		svg.attr("height","200");
		convertData = function(data){
		var output = [];
		if(data !== undefined && data.length !== undefined){
		data.forEach(function(element, index, array){
				var newElement = {};
				newElement['quarter'] = element['quarter'];
				newElement['sales'] = parseInt(element['sales'].split('M')[0]);
				output.push(newElement);
			});
		return output;
		}
		};
		scope.$watch(function(){return scope.selected;}, function(){
		scope.render();
		});
		scope.$watch(function(){return scope.countries;}, function(){
		scope.render();
		}, true);
		scope.render = function(){
		var margin = 20, barWidth = 25, barPad = 20;
		var data = convertData(scope.countries[scope.selected].country_data.yearly_distribution);
		if(data !== undefined)
		{
		var width = (data.length + 1) * (barWidth + barPad + 9);
		var height = svg.node().offsetHeight - 2 * margin;
		svg.selectAll('*').remove();
		svg.attr('width', width);
		var yScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d){return d.sales})])
				.range([0, height-2 * margin]);
		quarters = [];
		data.forEach(function(element, index, arrary){
			quarters.push(element.quarter);
		});
		var xScale = d3.scale.ordinal().
			     domain(quarters)
    			.rangeRoundBands([0, width], .5);
		var xAxis = d3.svg.axis()
			    .scale(xScale)
			    .orient('bottom').tickSize(0);
		var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left').ticks(0);
		 var g = svg.selectAll("g")
			.data(data).enter()
			.append("g");
		g.append('rect').attr('x', function(d, i){
				return (i+1) * (barWidth + barPad + 13);
			}).attr('y',height)
			.attr('width',barWidth).attr('height', 0).attr('fill', 'steelblue')
			.transition().duration(1000).attr('height', function(d){
				return yScale(d.sales) - margin / 2;
				}
			).attr('y', function(d){return height - yScale(d.sales) + margin / 2});
		g.append('text').attr('x', function(d, i){
				return (i + 1)* (barWidth + barPad + 13);
			}).attr('y',  function(d){return height - yScale(d.sales)}).text(function(d){return d.sales + 'M'});
		var x = svg.append('g')
			.attr('class', 'axes')
			.attr('transform', 'translate('+(margin)+' , '+ height +')')
			.call(xAxis);
		var y = svg.append('g')
			.attr('class', 'axes')
			.attr('transform', 'translate('+ (margin+9) +' , '+2*margin+')')
			.call(yAxis);
		}
		};
		scope.render();
	});
	}
	};
}]);

app.directive('bestSellers', function(){
return {
	restrict : 'E',
	templateUrl : 'resources/template/best-sellers.html'
};
});

})();
