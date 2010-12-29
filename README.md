Waiting Popup Dialog
====================
jquery-waitingpopup-plugin is a JQuery plugin which provides an easy way to show up a modal waiting dialog when
your application is doing some heavy work in the background and your UI should not be accessible in the meantime.

You are able to show and hide the waiting popup manually, or you can register the handling automatically during JQuery
AJAX requests.


Getting the plugin
==================
The plugin is packaged inside a Jar file (Java Archive). So just download the jar file and unzip it:

    jquery.waitingpopup.js        <-- the plugin
	css/jquery.waitingpopup.css   <-- the css file
	META-INF/MANIFEST.MF
	META-INF/LICENSE
	META-INF/NOTICE

To get the plugin to work, you need the plugin javascript file, the css file and the following jquery libraries:

* jquery
* jquery-ui

Showing and Hiding of the waitingpopup dialog.
==============================================

First you have to initialize the plugin:

    $().waitingpopup();

Here you can also doing some configuration of the plugin.

To open the waitingpopup you have to call:

    $().waitingpopup("open");

To close a waitingpopup you have to call:

    $().waitingpopup("close");


These waiting popup is based on a modal jquery-ui dialog. Therefore no interaction with the underlying UI is possible, when
the popup is shown. The waitingpopup dialog is a kind of singleton, so there is only one dialog present at any time, hence
only one dialog is shown at any time.

Configuration
=============
These are the settings you can change to your special use case:

    $().waitingpopup({
        ajaxBinding:    true,               // default ajaxBinding, true or false
        lableText:      'Please wait...',   // text for the main lable inside the dialog window
        sublableText:   'loading'           // text for the sublable inside the dialog window
    });


Ajax binding
----------------------

By default, the ajax binding is done right out of the box. That means that everytime a JQuery based Ajax request is started,
the waitingpopup dialog is shown and will be hidden, when the ajax request is completed.
The binding is done to the JQuery events *ajaxStart* and *ajaxStop*.

Besides the automatically binding you can register the Ajax binding manually with the following methods:

    $().waitingpopup("bindToAjax");
    $().waitingpopup("unbindToAjax");

To see some more examples please have a look into the Tests in src/test/javascript/WaitingPopupTest.js

Styling and look and feel
-------------------------

Furthermore the complete look and feel of the waitingpopup dialog is based on css styles.
Please have a look into the corresponding css file: src/main/resources/css/jquery-waitingpopup.css


License
=======
jquery-waitingpopup-plugin is licensed under the Apache License 2.0. The project is founded by [akquinet A.G.](http://www.akquinet.de/en)