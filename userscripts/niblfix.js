// ==UserScript==
// @name        niblfix
// @namespace   owq
// @include     *nibl.co.uk/bots.php*
// @version     1
// @grant       GM_setClipboard
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

$( document ).ready(function(){
    $( document ).on("click", ".batch, .botname, .packnumber, .filesize, .filename, .packtime", function(e){
        if( e.currentTarget.className == "batch" ) {
            if( e.target.className == "batch" ){ // Help the TD
                var checkbox = $(e.target).find(":checkbox");
                checkbox.prop("checked", !checkbox.prop("checked"));
            }
        } else {
            var packs = $("input[type=checkbox][name=batch]:checked").map(function(){
                return {"botname" : $(this).closest(".botlistitem").attr("botname"), "botpack" : $(this).closest(".botlistitem").attr("botpack")};
            }).get();
            var msg = '';
            if( packs.length == 0 ){
                msg = '/msg ' + $(this).closest(".botlistitem").attr("botname") + ' xdcc send #' +  $(this).closest(".botlistitem").attr("botpack");
            } else {
                var botlist = {};
                for(i=0;i<packs.length;i++){
                    if( typeof(botlist[packs[i].botname]) == 'undefined' ){
                        botlist[packs[i].botname] = [];
                    }
                    botlist[packs[i].botname].push(packs[i].botpack);
                }
                for( var bot in botlist ){
                    msg += '/msg ' + bot + ' xdcc batch ' + botlist[bot].join(",") + '\n'; 
                }
            }
            
            if( msg.length > 0 ){
                //$('#popuptext').html(msg);
                //$('#popup').dialog();
                //prompt('Paste this into your IRC client:', msg);
            }
            
            var item = $(this).closest(".botlistitem");
            
            GM_setClipboard(msg);
            console.log(msg);
            
            item.fadeTo(0, 0.1).fadeTo(1000, 1);
            
        }
    });
    
    $('#popup').attr("id", "zpopup");
});
