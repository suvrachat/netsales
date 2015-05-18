(function(){
var app = angular.module("netSales", ['d3', 'directives']);
app.controller('NetSalesController', ['$scope', '$http', '$window', function($scope, $http, $window){

$scope.selected = 0;
$scope.countries=[];
$http.get('net-sales.json').success(function(data, status, headers, config){
$scope.countries = data;
}).error(function(data, status, headers, config){
	$window.alert(status+" Error: failed to load data");
});
$scope.select = function(index){
$scope.selected = index;
};
}]);

app.directive('country', function(){
return {
	restrict : 'E',
	transclude: true,
        scope: {
	country : '=data',
        index : '=',
        selected : '='
	},
	templateUrl : 'resources/template/circle.html'
}
});

})();




