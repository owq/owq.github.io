// ==UserScript==
// @name         Horriblesubs XDCC link adder
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        http://horriblesubs.info/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery;
    $(function() {
        $(document).on("click", ".rls-label", function(e) {
            var els = $(e.target).contents();
            var name;
            if(els.length > 1) {
                els.splice(0,1);
                name = els.text();
            } else {
                var arr = els.text().split(" ");
                arr.splice(0,1);
                name = arr.join(" ");
            }

            var url = "http://xdcc.horriblesubs.info/?search=" + name + " [720p]";
            window.open(url, "_blank");

        });
    });
})();
