fancypants
==========

The Fanciest of Pants for your jQuery

For now, test.html represents the state of the art in Fancypants; use it to
develop and test modules.

NOTE: You have to click the "Enable Fancypants" button in the bottom-left corner
to get things rolling.

Instead of re-inventing the wheel, we depend upon require.js, jQuery,
underscore.js, and backbone.js.  It is a lot of dependencies but I do not care.

Also I cannot figure out how to do contractions in MarkDown without vim thinking
that I am starting a quotation or something.  Like seriously in this sentence,
the word can't begins a bunch of bright red text that doesn't end until the
"does not" contraction just then.

A FancyPants module is requested from within the HTML with the data-fp
attribute.

Example:
``<div data-fp="MyModule">``

This will eventually *require* MyModule/module.

Of course you should lay things out in nice separate files that are compiled
together later, but all that really matters is that require.js can get to
MyModule/module.

In the Object Oriented paradigm, a module is analogous to a class.  There is
only ever one in scope, and each call to require('MyModule/module') will return
the same thing.

Your module.js needs to implement a function, instantiate(domobj).  'domobj' is
a DOM object.  That function needs to return a new instance of a fancypants
object.  You should extend FancyPants/Object, but either way, that instance must
contain the following function:

receiveMessage(message, sender)

This function will receive messages sent out over the FancyPants message bus.
The definition of 'message' is left open-ended so as to not constrain the
programmer, so it can be an object or what have you.  At present, the two
messages that are built into FancyPants are:

'fp.viewMode' - switch to view-only mode, disable any editing features.
'fp.editMode' - switch to edit mode, enable all editing features.

Your module does not have to implement support for these or any other messages,
although at that point you are less of a FancyPants Module and more of an
adjunct library.

Note that the 'fp.viewMode' message is ALWAYS sent out immediately after the DOM
is loaded and FancyPants is initialized.  Many FancyPants modules will do
nothing special here since their static content is already included in the HTML
page.  For instance, if your module allows for the creation and editing of
tables of static data (you know, like the HTML `<table>` tag), that content
should have already been placed within the DOM by your module when the user
edited it, and there is nothing special to do in view mode.

However, if your module is a fancy flipping or sliding photo gallery thing, even
though your content should be in the DOM already (like a bunch of `<li>`s that
hold your `<img>` tags), you do have to implement support for the user action of
flipping through photos in the JavaScript.  The setup code for that should fire
off when the 'fp.viewMode' message comes across the bus.  Likewise, you should
set your own semaphores so that a subsequent 'fp.viewMode' call will not mess
things up like doubling up event handlers.

Additionally, many FancyPants Modules will require extra dependencies for edit
mode.  In the "static table" example above, you will probably want something
like jQuery to handle the user double-clicking on a table cell to edit it.
You can choose NOT to require jQuery until the 'fp-editMode' message has come
across the bus.  Now in the real world, jQuery is always there since FancyPants
depends on it, but consider this an example for your other esoteric libraries
and such.  Also in the real world, the whole mishmash of FancyPants, its
dependencies, and your modules, should all be compiled into one pretty pretty
minified javascript file.  It is still a good idea to only require what you need
when you need it, especially since we are one day going to discuss requiring
FancyPants Modules that do not exist on the same server as the HTML page.

The other parameter to receiveMessage is the sender of the message.  This
parameter is optional, so please test that it is not undefined before doing
anything with it.  However, it can be used to send a reply to the message
sender.  Do not expect that a sender will be provided for the 'fp.viewMode' and
'fp.editMode' messages. However, consider that one module may wish to ask
another module, for example, for images.  In this case, it may send out a
certain message saying something like "reply to me if you have images!" And then
you would issue another message to the sender if you had images, perhaps sending
`this` as the message or something.

The full functionality of the message bus is extremely fluid right now.  I plan
to have some more rigidly defined types of messages for common types of
information so that we can have a cohesive system here.  FancyPants is really
all about the language that things speak with each other, and not so much about
the actual code.  This will be a common theme throughout this project - I do not
care how you code it or in what language or whatever, but there are a few small
rules to follow (such as being AMD compliant), and a lot of "speaking the same
language" over the message bus.

That is all for now.
