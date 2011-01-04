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

/**
 *
 *   Author: Daniel Bremer-Tonn
**/
(function($)
{
	var methods = {
        init : function( options ) {
            var settings = {
                ajaxBinding:    true,
                lableText:      'Please wait...',
                sublableText:   'loading'
            };

            // If options exist, lets merge them
            // with our default settings
            if ( options ) {
                $.extend( settings, options );
            }

            // Creating the actual dialog only, if its not done already
            if ($('#waiting_popup').length < 1)
            {
                // Generating the html for the dialog
                $('body').append(
                     "<div id='waiting_popup' style='display:none;' class='waitingpopup-content'>" +
                     "<div class='waitingpopup-content-lable'>" + settings.lableText + "</div>" +
                     "<div class='waitingpopup-content-sublable'>" + settings.sublableText + "</div></div>");

                // height of the dialog is browser specific. We have to choose more pixels on the IE
                var dialog_height = $.browser.msie ? 180 : 100;

                $('#waiting_popup').dialog({
                    dialogClass: 'waitingpopup',
                    autoOpen: false,
                    width: 250,
                    height: dialog_height,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    closeOnEscape: false
                    //open: function(event, ui) { $("#waiting_popup .ui-dialog-titlebar").hide(); }
                });
                $(".waitingpopup .ui-dialog-titlebar").hide();
            }

            // Setting the ajaxbindings
            if (settings.ajaxBinding) {
                $().waitingpopup('unbindToAjax');
                $().waitingpopup('bindToAjax');
            }
        },

        bindToAjax : function () {
            $('#waiting_popup').bind('ajaxStart', function() {
                $().waitingpopup('open');
            });
            $('#waiting_popup').bind('ajaxStop', function() {
               $().waitingpopup('close');
            });
        },

        unbindToAjax : function () {
            $('#waiting_popup').unbind('ajaxStart');
            $('#waiting_popup').unbind('ajaxStop');
        },

        open : function ()
        {
            $("#waiting_popup").dialog("open");
        },

        close : function ()
        {
            $("#waiting_popup").dialog("close");
        }

    };

    $.fn.waitingpopup = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.waitingpopup' );
        }
    };

})(jQuery);