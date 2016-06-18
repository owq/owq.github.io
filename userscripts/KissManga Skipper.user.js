// ==UserScript==
// @name         KissManga Skipper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://kissmanga.com/Manga/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.0.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("#divImage .select img { border: 2px solid blue;}");
    //GM_addStyle("#divImage { display:flex; }");

    $(function() {
        var currEl;
        
        function scrollToEl(el) {
            $(document).scrollTop(el.offset().top);
        }

        function setCurrEl(el) {
            if(currEl) {
                currEl.removeClass("select");
            }
            currEl = el;
            el.addClass("select");
            scrollToEl(el);
        }
        
        function goToNext() {
            if(currEl) {
                setCurrEl(currEl.next());
            }
        }
        
        function goToPrev() {
            if(currEl) {
                setCurrEl(currEl.prev());
            }
        }
        
        var divImage = $("#divImage");
        var ps = divImage.find("p");
        ps.on("click", function() {
            setCurrEl($(this));
        });

        setCurrEl($(ps.get(0)));
        
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37:
                    goToPrev();
                    break;
                case 39:
                    goToNext();
                    break;
            }
        });
    });
})();