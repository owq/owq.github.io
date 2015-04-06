// ==UserScript==
// @name        Select2
// @namespace   owq
// @description Replace unwieldy dropdowns
// @include        *sgx.com*
// ==require http://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js==
// @require  http://cdn.jsdelivr.net/chosen/1.1.0/chosen.jquery.min.js
// @downloadURL https://owq.github.io/userscripts/select2.user.js
// @version     1
// @grant       none
// ==/UserScript==


$(function() {
  
  $("head").append('<link rel="stylesheet" href="http://cdn.jsdelivr.net/chosen/1.1.0/chosen.css">');
  
  window.addEventListener('load', function() {
    // your code here
    $("select").each(function() {
      var curr = this;
      var chosen = $(curr).chosen();
    });
  }, false);
  
//   setTimeout(function() {
//     //console.log($("qsShow").value);
    
//   }, 500);
});