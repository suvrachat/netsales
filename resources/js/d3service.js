(function(){
var app = angular.module('d3', []);
app.factory('d3Service', ['$document', '$q', '$rootScope', function(doc, q, rs){
	var d = q.defer();
	function onScriptLoad(){
		d.resolve(window.d3);
	};
	var scriptTag = doc[0].createElement('script');
	scriptTag.type = "text/javascript";
	scriptTag.src = "vendors/d3.min.js";
	scriptTag.async = true;
	scriptTag.onreadystatechange = function(){
		if(this.readyState == 'complete') onScriptLoad();
	};
	scriptTag.onload = onScriptLoad;
	var s = document.getElementsByTagName('body')[0];
	s.appendChild(scriptTag);
	
return {
	d3 : function(){
		return d.promise;
		}
	};
}]);

})();
