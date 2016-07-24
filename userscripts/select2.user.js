// ==UserScript==
// @name        Select2
// @namespace   owq
// @description Replace unwieldy dropdowns with datalist
// @include        *sgx.com*
// @downloadURL https://owq.github.io/userscripts/select2.user.js
// @version     1.3
// @grant       none
// ==/UserScript==

$(function () {
    var oldPopCombo = populateCombo;
    populateCombo = function(cid, jName, aName, item) {
        if(item.items.length < 30) {
            oldPopCombo(cid, jName, aName, item);
            return;
        }

        var el = $(document.getElementById(cid));
        var id = el[0].id;
        var name = el[0].name;
        var dlId = id + "dataList";
        el.before("<input list='"+dlId+"' id='"+id+"' name='"+name+"'>");
        el.replaceWith("<datalist id='"+dlId+"'></datalist>");
        oldPopCombo(dlId, jName, aName, item);
    };
});
