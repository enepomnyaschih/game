var score = 0;
var interval = 400;
var maxTargets = 10;

$(function() {
	var timer = setInterval(function() {
		if ($('.target[status=alive]').length >= maxTargets) {
			$('.panel').remove();
			$('.score-box').text('Game over. SCORE: ' + score);
			$('.score-box').addClass('finished');
			clearInterval(timer);
			return;
		}
		
		var target = $('<div class="target" status="alive"><span class="target-1"></span><span class="target-2"></span><span class="target-3"></span><span class="target-4"></span></div>');
		$('.panel').append(target);
		
		var panelWidth = $('.panel').width();
		var panelHeight = $('.panel').height();
		var targetWidth = target.width();
		var targetHeight = target.height();
		target.css({
			left: (panelWidth - targetWidth) * Math.random() + 'px',
			top: (panelHeight - targetHeight) * Math.random() + 'px'
		});
	}, interval);
	
	$('.panel').on('mousedown', '.target', function(event) {
		var target = $(event.currentTarget);
		target.attr('status', 'broken1');
		setTimeout(function() {
			target.attr('status', 'broken2');
		}, 800);
		setTimeout(function() {
			target.remove();
		}, 400);
		
		++score;
		$('.score').text(score);
	});
});
