// vars for elements
var $input = $('#search');
var $list = $('#list');


$input.keyup(function(e){
	// clear list before displaying new list
	// while ($list.hasChildNodes()) {
 //    	$list.removeChild($list.lastChild);
	// }

	var searchStr = $input.val();
	var date = new Date();
	date = Math.floor(date.getTime()/1000);
	// api call
	$.get("https://api.viki.io/v4/search.json?c=" + searchStr + "&per_page=5&with_people=true&app=100266a&t=" + date,
		function(data){
			// console.log(data);
			$.each(data, function( i, obj) {
				console.log(obj);
				$list.append("<div>" + obj.tt + "</div>");
				return ( i !== 4 );
			});
		});
});