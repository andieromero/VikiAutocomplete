// vars for elements
var $input = $('#search');
var $list = $('#list');

function clearList(items){
	// clear list before displaying new list
	var i = 0;
	while(i < items.length){
		items[i].remove();
		i++;
	}
}
$input.keyup(function(e){
	clearList($('.item'));
	var searchStr = $input.val();
	var date = new Date();
	date = Math.floor(date.getTime()/1000);
	// api call
	$.get("https://api.viki.io/v4/search.json?c=" + searchStr + "&per_page=5&with_people=true&app=100266a&t=" + date,
		function(data){
			// console.log(data);
			if($('.item').length != 0) {
				clearList($('.item'));
			}
			$.each(data, function( i, obj) {
				$list.append("<a target='_blank' href='https://www.viki.com" + obj.u.w + "'><li class='item'><img alt='movie' src='" + obj.i + "'><p>" + obj.tt + "</p></li></a>");
				return ( i !== 4 );
			});
		});
});