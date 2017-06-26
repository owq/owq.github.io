// ==UserScript==
// @name        thefinance skipper
// @namespace   owq
// @include     *thefinance.sg*
// @version     1.4
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
        var link = art.find("a.post-thumbnail, a.featured-image");
        var titleLink = art.find(".entry-title a")[0];

        function myOnClick() {
            var oldTitle = titleLink.innerHTML;
            titleLink.innerHTML += "~";
            //link.prop("innerHTML", "~");
            
            var temp = $("<div></div>");
            temp.load(titleLink.href + " .post-wrap", function(){
                var finalLink = temp.find("a").last();
                var finalLinkHref = finalLink.attr("href");
                //console.log(finalLink);
                if(!finalLinkHref) return;

                link.prop('href', finalLinkHref);
                //link.prop('innerHTML', "Go to article");

                titleLink.href = finalLinkHref;

                location.href = finalLinkHref;
                
                titleLink.innerHTML = oldTitle;
            });
        }
        
        function goLink(e) {
            e.preventDefault();
            myOnClick();
        }
        
        link.click(goLink);
        $(titleLink).click(goLink);
    });

});
