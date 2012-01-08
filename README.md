# Instapaper Restyled

A revised, prettified version of Instapaper. Palatino, softer colors, more white space and keyboard shortcuts.

Version: 0.5 (beta)
Original Author: Nick Schaden
http://nickschaden.com

## Keyboard Shortcuts
<pre>
		a: Jump to archive selection
shift + a: Archive selected item
		d: Delete selected item
		e: Edit selected item
		j: Move list selection one item forward 
		k: Move list selection one item back
 o/return: Open text version of selected item
 		s: Jump to starred/liked selection
shift + s: Star (like)/unstar selected item
		t: Share selected item
		u: Jump to unread selection
		v: Open selected item in new window/tab
</pre>

## Installation

### Google Chrome

Because this is currently in beta form, there is no extension on the Google Web Store, the usual installation method.
Instead:

1. [Download](https://github.com/nschaden/Instapaper-Restyled/zipball/master) this package's contents.
2. Drag the chrome_extension/packaged/instapaper-restyled.crx file onto any open tab in Google Chrome.
3. Chrome will ask to verify that you want to install the instapaper restyled extension. Say yes.

The installation is then completed. Once you jump to any page in instapaper.com, the extension styling and extra javascript functionality should kick in.

Uninstall like any other extension: Under Chrome go to Window > Extensions and click on the 'Remove' button by Instapaper Restyled.

### Fluid

Note Instapaper Restyled requires a registred version of Fluid. Assuming that:

1. Via the fluid.app, generate a valid app for Instapaper. Open the app up.
2. Go to Window > Userscripts.
3. On the lower left of the popup, click the '+' to add a new row. Rename the rule from 'Untitled' to 'Instapaper Restyled'.
4. The top right has a pattern listing, which by default is '*example.com*'. Replace with '*instapaper.com*'.
5. Replace the contents of the bottom right window with all the content in fluid/main.js.
6. Now click on the 'Userstyles' option at the top (or go to Window > Userstyles).
6. Again, click on the bottom left '+' to add a row. Name the first rule 'main'. Set four rows of patterns: \*instapaper.com/extras\*, \*instapaper.com/liked\*, \*instapaper.com/u, \*instapaper.com/archive\*. Then replace the entire contents of the bottom right content area with all the content in fluid/main.css. (Note for reference at the top of the css file the patterns are listed again for convenience.)
7. Add another row with '+'. Name this rule 'reading'. Set two rows of patterns: \*instapaper.com/go\* and \*instapaper.com/text\*. Replace the lower right content area with all the content in fluid/reading.css.
8. Add another row with '+'. Name this rule 'browse'. Set one row of patterns: \*instapaper.com/browse*. Replace the lower right content area with all the content in fluid/browse.css.
9.  Add a final row with '+'. Name this rule 'account'. Set one row of patterns: \*instapaper.com/user*. Replace the lower right content area with all the content in fluid/account.css.

You're now finished. Close any open dialogs and restart the Fluid Instapaper app to have the Instapaper Restyled changes take effect.

## Additional credits

While the code base is my own, clearly a lot of inspiration for the keyboard functionality is heavily based on Brett Terpstra's work at [Instapaper Beyond](http://brettterpstra.com/instapaperbeyond/). 

Obviously none of this would be possible without [Marco Arment's](http://www.marco.org/) amazing work on [Instapaper](http://www.instapaper.com) itself.

&copy; 2011 Nick Schaden 