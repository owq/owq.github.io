// ==UserScript==
// @name        thefinance skipper
// @namespace   owq
// @include     *thefinance.sg*
// @version     1.2
// @downloadURL https://owq.github.io/userscripts/thefinance.user.js
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==

$(function() {
  var articles = $("article");
  //var moreLinks = $(".more-link");
  //console.log(moreLinks);
  
  $.each(articles, function(k, article) {
    var art = $(article);
    var link = art.find(".more-link")[0];
    var titleLink = art.find(".entry-title a")[0];
    var oldTitle = titleLink.innerHTML;
    titleLink.innerHTML += "~";
    
    //console.log(link);
    link.innerHTML += "~";
    var temp = $("<div></div>");
    temp.load(link.href + " .entry-content", function(){
      var finalLink = temp.children().first().children("a").last();
      //console.log(finalLink);
      
      link.href = finalLink.attr("href");
      link.innerHTML = "Go to article";
      
      titleLink.href = link.href;
      titleLink.innerHTML = oldTitle;
      
      
    });
  });
  
});