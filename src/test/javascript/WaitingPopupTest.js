/*
 * Copyright 2010 akquinet
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

load(basePath + "jquery.waitingpopup.js");


function testOpenWaitingPopup() {
    $().waitingpopup({sublableText: 'waiting'});
    $().waitingpopup('open');

    assertTrue("Waiting Dialog not created!", $('.waitingpopup').length > 0);
    assertTrue("Waiting Dialog is not shown!", $('.waitingpopup').is(':visible'));
}

function testCloseWaitingPopup() {
    $().waitingpopup({sublableText: 'waiting'});
    $().waitingpopup('open');

    assertTrue("Waiting Dialog not created!", $('.waitingpopup').length > 0);
    assertTrue("Waiting Dialog is not shown!", $('.waitingpopup').is(':visible'));

    $().waitingpopup('close');
    assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));
}

function testAjaxBinding() {
    console.log('Testcase: testAjaxBinding');
    $().waitingpopup({ajaxBinding : true});
    // Ajax Binding should be done right now
    assertTrue("Waiting Dialog not created!", $('.waitingpopup').length > 0);
    assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));

    // Doing some ajax stuff
    // Testenvironment is threadless, so the test of visibility of waitingialog is done in a hook in
    // of the JQuery Ajax
    $.ajax({
        url: 'dummyURL',
        beforeSend: function(XMLHttpRequest) {
            assertTrue("Waiting Dialog is not shown!", $('.waitingpopup').is(':visible'));
        }
    });
    // Waiting Popup should now be gone
    assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));
}

function testAjaxBindingDeactivated() {
    console.log('Testcase: testAjaxBindingDeactivated');
    $().waitingpopup({ajaxBinding : false});
    // Ajax Binding must not be done
    assertTrue("Waiting Dialog not created!", $('.waitingpopup').length > 0);
    assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));

    // Doing some ajax stuff
    // Testenvironment is threadless, so the test of visibility of waitingialog is done in a hook in
    // of the JQuery Ajax
    $.ajax({
        url: 'dummyURL',
        beforeSend: function(XMLHttpRequest) {
            assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));
        }
    });
    // Waiting Popup should now be gone
    assertFalse("Waiting Dialog is shown but should not!", $('.waitingpopup').is(':visible'));
}