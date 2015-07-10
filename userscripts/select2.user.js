// ==UserScript==
// @name        Select2
// @namespace   owq
// @description Replace unwieldy dropdowns
// @include        *sgx.com*
// ==require http://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js==
// @require  https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.jquery.min.js
// @downloadURL https://owq.github.io/userscripts/select2.user.js
// @version     1.1
// @grant       none
// ==/UserScript==
function mutateAdd(target) {
  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      chosen($(mutation.target));
    });
  });
  // configuration of the observer:
  var config = {
    childList: true,
    characterData: true,
    subtree: true
  };
  // pass in the target node, as well as the observer options
  observer.observe(target, config);
}

function chosen(t) {
  t.chosen({
    search_contains: true
  })
}
$(function () {
  $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.css">');
  
  window.addEventListener('load', function () {
    // your code here
    var selects = $('select');
    
    selects.each(function () {
      //       $(this).chosen();
      mutateAdd(this);
    });
    
//     selects.each(function () {
//       var curr = this;
//       chosen($(curr));
//     });
    
  }, false);
});
