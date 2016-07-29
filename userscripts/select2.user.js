// ==UserScript==
// @name        Select2
// @namespace   owq
// @description Replace unwieldy dropdowns with datalist
// @include        *sgx.com*
// @downloadURL https://owq.github.io/userscripts/select2.user.js
// @version     1.41
// @grant       none
// @run-at document-start
// ==/UserScript==

var oldPopCombo;
myPopulateCombo = function(cid, jName, aName, item) {
    if(item.items.length < 30) {
        oldPopCombo(cid, jName, aName, item);
        return;
    }

    var el = $(document.getElementById(cid));
    var id = el[0].id;
    var name = el[0].name;
    var dlId = id + "dataList";
    var input = $("<input list='"+dlId+"' id='"+id+"' name='"+name+"'>");
    input.width(el.width());
    el.before(input);
    el.replaceWith("<datalist id='"+dlId+"'></datalist>");
    oldPopCombo(dlId, jName, aName, item);
    
    input.keyup(function (e) {
        if (e.which == 13) { // Enter key pressed
            fetchResult();
        }
    });
    input.focus();
};
Object.defineProperty(window, 'populateCombo', {
    get: function() { return myPopulateCombo; },
    set: function(fn) { oldPopCombo = fn; }
});
