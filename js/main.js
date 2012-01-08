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
	// scroll the viewport one screen forward or back
	scrollOneScreen: function(forward)
	{
		var scrolltop = jQuery('body').scrollTop();
		var wheight = jQuery(window).height();
		if (forward)
			jQuery('body').animate({'scrollTop':'+=' + wheight + 'px'},400);
		else
			jQuery('body').animate({'scrollTop':'-=' + wheight + 'px'},400);
	},
	// check if the currently selected item is 
	checkActiveForScroll: function()
	{
		if (!Instapaper.active.length) return;
		var scrollbottom = jQuery('body').scrollTop() + jQuery(window).height();
		if ((Instapaper.active.offset().top+Instapaper.active.height()/2) > scrollbottom)
		{
			Instapaper.scrollOneScreen(true);
		}
		if ((Instapaper.active.offset().top+Instapaper.active.height()/2) < jQuery('body').scrollTop())
		{
			Instapaper.scrollOneScreen(false);
		}
	},
	// move forward or back one item in the list 
	moveActiveItem: function(forward)
	{
		if (!Instapaper.list || !Instapaper.active) return;
		var nextactive;
		if ((forward && Instapaper.active.next().length) ||
			(!forward && Instapaper.active.prev().length))
		{
			if (forward)
				nextactive = Instapaper.active.next();
			else
				nextactive = Instapaper.active.prev();
			Instapaper.active.removeClass('active');
			nextactive.addClass('active');
			Instapaper.active = nextactive;
			Instapaper.checkActiveForScroll();
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
		var nextactive;
		if (Instapaper.active.prev().length)
			nextactive = Instapaper.active.prev();
		else
			nextactive = Instapaper.active.next();
		Instapaper.active.removeClass('active');
		nextactive.addClass('active');
		Instapaper.active = nextactive;
		Instapaper.checkActiveForScroll();
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
		if (e.shiftKey == true && e.keyCode == 65)
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
		if (e.shiftKey == true && e.keyCode == 83)
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
		Instapaper.active = Instapaper.list.find('.tableViewCell:first');
		if (!Instapaper.active.length) return;
		Instapaper.active.addClass('active');
	}
	$(window).keypress(function(e) 
	{
		Instapaper.keyCheck(e);
	});
})(jQuery);