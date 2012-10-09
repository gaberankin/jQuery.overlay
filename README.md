jQuery.overlay
==============
usage
-----
> $('selector').overlay();

this will create the overlay, but will not display it.  when the overlay is created, a click event to toggle the display is bound to the element(s) found by jQuery in the $('selector').  From there on, all methods that have to do with the overlay can be called by doing:

> $('original selector').overlay('method', arg);

options
-------
Options should be passed as an object when the overlay is created. the following are supported (defaults are below)

> 'overlayID' : 'auto'

if you want to set the ID of the element, use overlayID.  otherwise, it will be auto-generated.

> 'width' : 'auto'
> 'height' : 'auto'

if you want to set the dimensions of the overlay.  by default, the dimensions are set in the overlay.css file.

> 'speed' : null

speed of the animation when the overlay is displayed or hidden.  by default, there is no animation.

> 'onFinish' : $.noop
> 'onCancel' : $.noop

these two options are functions that will be called when the .overlay('finish') and .overlay('cancel') methods are called (respectively).

methods
-------

> .overlay('html', your_html);

this function will set the contents of the overlay's content container to whatever html you specify.

> .overlay('toggle');

this function will display the overlay if it is hidden, and hide it if it is displayed.  it has no relation to .overlay('finish') or .overlay('cancel'), so don't expect your onFinish or onCancel functions to run when you use this.

> .overlay('show', [speed])

.show()s the overlay using specified speed

> .overlay('hide', [speed])

.hide()s the overlay using specified speed

> .overlay('finish')

calls your onFinish callback and then .overlay('hide');

> .overlay('cancel')

calls your onCancel callback and then .overlay('hide');

> .overlay('destroy')

removes the overlay

notes
-----

This plugin is extremely simple.  I wanted programmers and designers to have full control over the elements using javascript and CSS without having to dig too much into the plugin code itself.  to that end, there is no button to close the overlay.  you will have to add it manually to the html of the overlay, or call on of the close functions in your own code.  I hope that the documentation provided here is sufficient to do that yourself.

Additionally, I haven't done extensive testing in other browsers outside of chrome, firefox, and IE7+.  I am certain there are issues with it that haven't been caught.  that's what bug reports are for!



