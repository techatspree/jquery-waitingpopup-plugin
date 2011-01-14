describe('the Waitingpopup jQuery Plugin',function(){

	// Remove any exisiting toastmessage container
	beforeEach(function() {
        $('#waiting_popup').dialog('destroy');
        $('#waiting_popup').remove();

        this.addMatchers({
            waitingPopupCreated : function() { return $('.waitingpopup').length > 0; },
            waitingPopupVisible : function() { return $('.waitingpopup').is(':visible'); }
        });
    });

	//Clean it up after each spec
	afterEach(function() {
        $('#waiting_popup').dialog('destroy');
        $('#waiting_popup').remove();
	});

    describe('Showing and Hiding of the waitingpopup', function() {
        it('opens the waitingpopup window', function() {
            $().waitingpopup({sublableText: 'waiting'});
            $().waitingpopup('open');

            expect().waitingPopupCreated();
            expect().waitingPopupVisible();
        });
        it('closes the waitingpopup window', function() {

            $().waitingpopup({sublableText: 'waiting'});
            $().waitingpopup('open');

            expect().waitingPopupCreated();
            expect().waitingPopupVisible();

            $().waitingpopup('close');
            expect().waitingPopupCreated();
            expect().not.waitingPopupVisible();
        });
    });

    describe('Ajax binding of the waitingpopup', function() {
        it('binds to jQuery Ajax calls automatically', function() {
            $().waitingpopup({ajaxBinding : true});

            // Ajax Binding should be done right now
            expect().waitingPopupCreated();
            expect().not.waitingPopupVisible();

            // Doing some ajax stuff
            $.ajax({
                url: 'src/jquery.waitingpopup.js',
                beforeSend: function(XMLHttpRequest) {
                    expect().waitingPopupVisible();
                }
            });
            waits(1000); // Waiting a second

            // Waiting Popup should now be gone
            runs(function() {
                expect().not.waitingPopupVisible();
            });
        });
        it('binds not to jQuery Ajax calls automatically', function() {
            $().waitingpopup({ajaxBinding : false});

            // Ajax Binding should be done right now
            expect().waitingPopupCreated();
            expect().not.waitingPopupVisible();

            // Doing some ajax stuff
            $.ajax({
                url: 'src/jquery.waitingpopup.js',
                beforeSend: function(XMLHttpRequest) {
                    expect().not.waitingPopupVisible();
                }
            });
            waits(1000); // Waiting a second

            // Waiting Popup should now be gone
            runs(function() {
                expect().not.waitingPopupVisible();
            });
        });
        it('binds to jQuery Ajax calls programmatically', function() {
            $().waitingpopup({ajaxBinding : false});

            // Ajax Binding should be done right now
            expect().waitingPopupCreated();
            expect().not.waitingPopupVisible();

            // Doing some ajax stuff
            $.ajax({
                url: 'src/jquery.waitingpopup.js',
                beforeSend: function(XMLHttpRequest) {
                    expect().not.waitingPopupVisible();
                }
            });
            waits(1000); // Waiting a second

            runs(function() {
                expect().not.waitingPopupVisible();
            });

            // now enabling ajaxbinding via api call
            runs(function () {
                $().waitingpopup('bindToAjax');

                // Doing some ajax stuff
                $.ajax({
                    url: 'src/jquery.waitingpopup.js',
                    beforeSend: function(XMLHttpRequest) {
                        expect().waitingPopupVisible();
                    }
                });
            });
            waits(1000); // Waiting a second

            runs(function() {
                expect().not.waitingPopupVisible();
            });
        });
    });
});