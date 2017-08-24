// ==UserScript==
// @name         Horriblesubs XDCC link adder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://horriblesubs.info/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery;
    $(function() {
        $(document).click(".rls-label", function(e) {
            var els = $(e.target).contents();
            els.splice(0,1);
            var name = els.text();
            
            var url = "http://xdcc.horriblesubs.info/?search=" + name + " [720p]";
            window.open(url, "_blank");
            
        });
    });

    // Your code here...
})();
