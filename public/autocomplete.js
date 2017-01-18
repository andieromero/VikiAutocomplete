// vars for elements
var $input = $('#search');
var $list = $('#list');
var index = -1;
// clear list before displaying new list
function clearList($items){
	var i = 0;
	while(i < $items.length){
		$items[i].remove();
		i++;
	}
	index = -1;
}
var autocomplete = function(e){
	var $items = $('.item');
	// unhighlight current item
	var prevItem = $items[index];
	$(prevItem).removeClass('hover');

	var keyCode = e.keyCode || e.which;
	// down arrow
	if(keyCode === 40){
		console.log("down");
		index++;
	}
	// up arrow
	else if (keyCode === 38){
		console.log("up");
		index--;
	}
	// enter
	// else if (keyCode === 13){
	// 	e.preventDefault();
	// 	console.log("enter");
	// }
	// typing
	else {
		// reset list and index
		clearList($items);

		var searchStr = $input.val();
		var date = new Date();
		date = Math.floor(date.getTime()/1000);
		// api call
		$.get("https://api.viki.io/v4/search.json?c=" + searchStr + "&per_page=5&with_people=true&app=100266a&t=" + date,
			function(data){
				if($items.length != 0) {
					clearList($items);
				}
				$.each(data, function( i, obj) {
					$list.append("<a target='_blank' class='item' href='https://www.viki.com" + obj.u.w + "'><li><img alt='movie' src='" + obj.i + "'><p>" + obj.tt + "</p></li></a>");
					return ( i !== 4 );
				});
			});	
	}
	var currItem = $items[index];
	$(currItem).addClass('hover');
};

// populates list, highlights items
$input.keyup(autocomplete);
