// ==UserScript==
// @name        Select2
// @namespace   owq
// @description Replace unwieldy dropdowns
// @include        *sgx.com*
// ==require http://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js==
// @require  https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.jquery.min.js
// @downloadURL https://owq.github.io/userscripts/select2.user.js
// @version     1.2
// @grant       none
// ==/UserScript==

function chosen(t) {
  t.chosen({
    search_contains: true
  })
}
$(function () {
  $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.css">');
  $('head').append('<link rel="stylesheet" href="https://owq.github.io/userscripts/chosen-firefox-mod.css">');
  
  window.addEventListener('load', function () {
    // your code here
    var selects = $('select');
    
    selects.each(function () {
      var $this = $(this);
      $this.on('chosen:hiding_dropdown', function() {
         $(this).chosen('destroy');
      });
      $this.on('mousedown',  function(e) {
        e.preventDefault();
        this.blur();
        window.focus();
        var xthis = $(this);
        chosen(xthis);
        xthis.trigger("chosen:open");
      })
    });
    
  }, false);
});
