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
}
var autocomplete = function(e){
	var $items = $('.item');
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
	if($items.length != 0){
		var prevItem = $items[index];
		$(prevItem).removeClass('hover');
		// down arrow
		if(e.keyCode == 40){
			console.log("down");
			index++;
		}
		// up arrow
		else if (e.keyCode == 38){
			console.log("up");
			index--;
		}
		// enter
		else if (e.keyCode == 13){
			console.log("enter");
		}
		else {}
		var currItem = $items[index];
		$(currItem).addClass('hover');
	}	
}
// populate list while typing
$input.keyup(autocomplete);