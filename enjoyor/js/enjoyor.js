$.fn.Enjoyor = function(){
	var fnEnjoyor = {
		init: function(){
			this.nav();
			this.banner();
			this.newsSlider();
		},
		nav: function(){
			$('.J_Navigation li').on('mouseenter', function(ev){
				$(this).addClass('current').siblings().removeClass('current');
			});			
		},
		banner: function(){
			var aPanel = $('.J_Slider li'),
				len = aPanel.length;
			if(len <= 1) return;
			var i = 0;
			var timer = null;
			timer = setInterval(fnBanner, 6000);
			function fnBanner(){
				i++;
				aPanel.fadeOut();
				$(aPanel[i]).fadeIn('normal');
				if(i == len - 1){
					i = -1;
				}				
			}
			$('.J_Slider').hover(function(){
				clearInterval(timer);
			}, function(){
				timer = setInterval(fnBanner, 3000);
			});
		},
		newsSlider: function(){
			//J_NewsSlider
		}
	}
	return fnEnjoyor.init();
}
$.fn.newsSlider = function(){
	var self = this,
		len = self.children().length;
	self.timer = null,
	self.now = 0;
	if(len <= 1) return;
	var Slider = {
		init: function(){
			this._render();
			this._autoRun(self.now);
			this._triggerEvt();
		},
		_render: function(){
			// render slider panel
			$(self.children()[0]).siblings().hide();
			self.data('showNow', 0);
			// render nav
			var sNav = '<ol class="slider-nav clearfix">';
			for(var i=0; i<len; i++){
				sNav += '<li data-now="' + (i) + (i== 0 ? '" class="current">' : '">') + (i+1) + '</li>';
			}
			sNav += '</ol>';
			self.parent().append($(sNav));
		},
		_showTo: function(index){
			// slider panel show
			self.data('showNow', index)
			$(self.children()).eq(index).fadeIn('normal').siblings().hide();
		},
		_autoTrigger: function(index){
			$('.slider-nav').children().eq(index).addClass('current').siblings().removeClass('current');
		},
		_autoRun: function(now){
			var	_this = this;
			self.timer = setInterval(function(){
				now++;
				if(now == len-1){
					now = -1;
				}
				_this._showTo(now);
				_this._autoTrigger(now);
			}, 4000);
		},
		_triggerEvt: function(){
			var _this = this;
			self.add('.slider-nav').hover(function(){
				clearInterval(self.timer);
			}, function(){
				var data = self.data('showNow');
				_this._autoRun(data);
			});
			$('.slider-nav').delegate('li', 'click', function(ev){
				var data = $(this).attr('data-now');
				_this._showTo(data);
				_this._autoTrigger(data);
				self.data('showNow', data);
			});
		}
	}
	return Slider.init();
}
$.fn.winSlider = function(){
	var self = this;
		self.timer = null,
		self.speed = 2;
	var Slider = {
		init: function(){
			this._render();
		},
		_render: function(){
			var len = $('#J_WindowSlide').children('li').length;
			if(len <= 8) return;
			$('#J_WindowSlide').append($('#J_WindowSlide').html());
			$('#J_WindowSlide').width(105 * len * 2);
			this._run();
			this._over();
			this._evt();
		},
		_run: function(speed){
			var oSlider = $('#J_WindowSlide');
			var left = parseInt(oSlider.css('left'));
			self.timer = setInterval(function(){
				var speed = self.speed;
				if(left <= -$('#J_WindowSlide').width() / 2){
					left = 0;
				};
				if(left >= 0){
					left = -$('#J_WindowSlide').width() / 2
				}
				left += speed;
				$('#J_WindowSlide').css({'left': left})
			}, 30);
		},
		_over: function(){
			var _this = this;
			$('#J_WindowSlide').hover(function(){
				clearInterval(self.timer);
			}, function(){
				_this._run(self.speed);
			});
		},
		_evt: function(){
			// todo
		}
	}
	return Slider.init();
}