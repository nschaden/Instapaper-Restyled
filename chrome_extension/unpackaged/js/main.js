/* Instapaper Restyled - main
 *
 * Simple keyboard navigation on Instapaper list and individual text pages.
 *
 * Applicable patterns:
 * all of instapaper.com
 */

jQuery.noConflict();

Instapaper = 
{
	list: null,
	active: null,
	activeIndex: 0,
	// scroll the viewport one screen forward or back
	scrollOneScreen: function(forward,jumpscroll)
	{
		var scrolltop = jQuery('body').scrollTop();
		var wheight = jQuery(window).height();
		var speed = 400;
		if (jumpscroll)
			speed = 0;
		if (forward)
			jQuery('body').animate({'scrollTop':'+=' + wheight + 'px'},speed);
		else
			jQuery('body').animate({'scrollTop':'-=' + wheight + 'px'},speed);
		if (jumpscroll)
			Instapaper.checkActiveForScroll(true);
	},
	// check if the currently selected item is 
	checkActiveForScroll: function(jumpscroll)
	{
		if (!Instapaper.active.length) return;
		var scrollbottom = jQuery('body').scrollTop() + jQuery(window).height();
		if ((Instapaper.active.offset().top+Instapaper.active.height()/2) > scrollbottom)
		{
			Instapaper.scrollOneScreen(true,jumpscroll);
		}
		if ((Instapaper.active.offset().top+Instapaper.active.height()/2) < jQuery('body').scrollTop())
		{
			Instapaper.scrollOneScreen(false,jumpscroll);
		}
	},
	saveTextList: function()
	{
		if (typeof(localStorage) != 'object' || !Instapaper.list) return;
		// clear existing list
		localStorage.removeItem('instapaper_linklist');
		var items = Instapaper.list.find('.tableViewCell');
		var links = [];
		for (var i = 0; i < items.length; i++)
		{
			if (items.eq(i).find('.textButton').attr('href') !== "")
				links.push(items.eq(i).find('.textButton').attr('href'));
		}
		localStorage.setItem('instapaper_linklist',links.join('||'));
	},
	// move forward or back one item in the list 
	moveActiveItem: function(forward)
	{
		if (Instapaper.list !== null && Instapaper.active !== null)
		{
			if ((forward && Instapaper.active.next().length) ||
				(!forward && Instapaper.active.prev().length))
			{
				if (forward)
				{
					nextactive = Instapaper.active.next();
					Instapaper.activeIndex++;
				}
				else
				{
					nextactive = Instapaper.active.prev();
					Instapaper.activeIndex--;
				}
				Instapaper.active.removeClass('active');
				nextactive.addClass('active');
				Instapaper.active = nextactive;
				if (typeof(localStorage) == 'object')
					localStorage.setItem('instapaper_activeindex',Instapaper.activeIndex);
				Instapaper.checkActiveForScroll();
			}
		}
		else if (document.location.href.indexOf('/go') > -1 || document.location.href.indexOf('/text') > -1)
		{
			if (typeof(localStorage) != 'object' || typeof localStorage.getItem('instapaper_linklist') == 'undefined') return;
			var list = localStorage.getItem('instapaper_linklist').split('||');
			var curritem;
			var curritemindex;
			for (var i = 0; i < list.length; i++)
			{
				if (document.location.href.indexOf(list[i]) > -1)
				{
					curritem = list[i];
					curritemindex = i;
					break;
				}
			}
			if (typeof curritemindex != 'number') return;
			var nextitem;
			if (forward)
			{
				nextitem = list[curritemindex+1];
				if (typeof nextitem != 'string') return;
				localStorage.setItem('instapaper_activeindex',parseInt(localStorage.getItem('instapaper_activeindex'),10)+1);
				document.location.href = 'http://www.instapaper.com' + nextitem;
			}
			else
			{
				nextitem = list[curritemindex-1];
				if (typeof nextitem != 'string') return;
				localStorage.setItem('instapaper_activeindex',parseInt(localStorage.getItem('instapaper_activeindex'),10)-1);
				document.location.href = 'http://www.instapaper.com' + nextitem;
			}
		}
	},
	// go to text link for selected item
	readItem: function(item)
	{
		if (!item) return;
		document.location.href = item.find('.textButton').attr('href');
	},
	openOriginalItem: function(item)
	{
		if (!item) return;
		window.open(item.find('.tableViewCellTitleLink').attr('href'));	
	},
	// love/star item
	starItem: function(item)
	{
		if (!item) return;
		item.find('.likeBox a:visible').trigger('click');
	},
	// delete item
	deleteItem: function(item)
	{
		if (!item) return;
		item.find('.deleteLink').trigger('click');
	},
	archiveItem: function(item)
	{
		if (!item) return;
		item.find('.archiveButton').trigger('click');
	},
	editItem: function(item)
	{
		if (!item) return;
		document.location.href = item.find('.actionLink').filter('[title=Edit]').attr('href');
	},
	shareItem: function(item)
	{
		if (!item) return;
		item.find('.actionLink').filter('[title*=Share]').trigger('click');
	},
	// capture core keyboard input
	keyCheck: function(e)
	{
		var nextactive;
		// for a, jump to archive section
		if (!e.shiftKey && e.keyCode == 97)
		{
			document.location.href = 'http://www.instapaper.com/archive';
		}
		// for b, jump to browse section
		if (!e.shiftKey && e.keyCode == 98)
		{
			document.location.href = 'http://www.instapaper.com/browse';
		}
		// for shift + a, archive item in the list
		if (e.shiftKey && e.keyCode == 65)
		{
			Instapaper.archiveItem(Instapaper.active);
		}
		// for d, delete item from list
		if (e.keyCode == 100)
		{
			Instapaper.deleteItem(Instapaper.active);
		}
		// for e, edit item in the list
		if (e.keyCode == 101)
		{
			Instapaper.editItem(Instapaper.active);
		}
		// for j, jump forward one selected item in the list
		if (e.keyCode == 106)
		{
			Instapaper.moveActiveItem(true);
		}
		// for k, jump back one selected item in the list
		if (e.keyCode == 107)
		{
			Instapaper.moveActiveItem(false);
		}
		// for o or return/enter, jump to read version of the selected item
		if (e.keyCode == 111 || e.keyCode == 13)
		{
			Instapaper.readItem(Instapaper.active);
		}
		// for s, jump to liked section
		if (!e.shiftKey && e.keyCode == 115)
		{
			document.location.href = 'http://www.instapaper.com/liked';
		}
		// for shift + s, star/unstar selected item
		if (e.shiftKey && e.keyCode == 83)
		{
			Instapaper.starItem(Instapaper.active);
		}
		// for t, share item 
		if (e.keyCode == 116)
		{
			Instapaper.shareItem(Instapaper.active);
		}
		// for u, jump to unread section
		if (e.keyCode == 117)
		{
			if (typeof localStorage == 'object' && document.location.href.indexOf('/go') > -1 || document.location.href.indexOf('/text') > -1)
				localStorage.setItem('instapaper_fromreadarticle','1');
				
			document.location.href = 'http://www.instapaper.com/u';
		}
		// for v, open original item in new window
		if (e.keyCode == 118)
		{
			Instapaper.openOriginalItem(Instapaper.active);
		}
	}
};

(function($) 
{

	if ($('#bookmark_list').length)
	{
		Instapaper.list = $('#bookmark_list');
		if (typeof(localStorage) == 'object')
		{
			var index = localStorage.getItem('instapaper_activeindex');
			if (index !== null)
			{

				if (!parseInt(index,10) && parseInt(index,10) !== 0)
					index = 0;
				// pull index from local storage, auto scroll to position if necessary
				Instapaper.activeIndex = parseInt(index,10);
				Instapaper.active = Instapaper.list.find('.tableViewCell').eq(Instapaper.activeIndex);
				if (!Instapaper.active.length)
				{
					Instapaper.active = Instapaper.list.find('.tableViewCell:first');
					Instapaper.activeIndex = 0;
				}
				// if index is not zero, don't always want to select and auto scroll down.
				// we do if:
				// user hit back on browser from text article
				// user selected 'u' to jump to unread when in text article
				// but, in other cases, reset
				if ($('body').scrollTop() === 0 && typeof localStorage.getItem('instapaper_fromreadarticle') != 'string' &&
					document.referrer.indexOf('/text') == -1)
				{
					Instapaper.active = Instapaper.list.find('.tableViewCell:first');
					Instapaper.activeIndex = 0;
				}
				else if ($('body').scrollTop() === 0 && typeof localStorage.getItem('instapaper_fromreadarticle') == 'string')
					// autoscroll to proper position
					Instapaper.checkActiveForScroll(true);
			}
			else
			{
				Instapaper.active = Instapaper.list.find('.tableViewCell:first');
				Instapaper.activeIndex = 0;
			}
		}
		else
		{
			Instapaper.active = Instapaper.list.find('.tableViewCell:first');
			Instapaper.activeIndex = 0;
		}
		if (typeof(localStorage) == 'object')
		{
			localStorage.setItem('instapaper_activeindex',Instapaper.activeIndex);
		}
		if (!Instapaper.active.length) return;
		Instapaper.active.addClass('active');
		Instapaper.saveTextList();
		localStorage.removeItem('instapaper_fromreadarticle');
		Instapaper.list.find('.archiveButton').click(function()
		{
			var nextactive;
			if (Instapaper.active.prev().length)
			{
				nextactive = Instapaper.active.prev();
				Instapaper.activeIndex--;
			}
			else
			{
				nextactive = Instapaper.active.next();
				Instapaper.activeIndex++;
			}
			Instapaper.active.removeClass('active');
			nextactive.addClass('active');
			Instapaper.active = nextactive;
			if (typeof(localStorage) == 'object')
				localStorage.setItem('instapaper_activeindex',Instapaper.activeIndex);
			Instapaper.checkActiveForScroll();
		});
	}
	$(window).keypress(function(e) 
	{
		Instapaper.keyCheck(e);
	});
})(jQuery);