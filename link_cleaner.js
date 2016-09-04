$("html").on("mouseenter", "a", function(){
    var outbound = $(this).attr("data-outbound-url");
    // reddit fix
    if (outbound.indexOf("out.reddit.com") > -1) {
        var cleanLink = href;
        $(this).attr("data-outbound-url", cleanLink);
        return;
    }

    // facebook fix
    var href = $(this).attr("href");
    if (href.indexOf("facebook.com/l?") > -1) {
        var cleanLink = $(this).text();
        $(this).attr("href", cleanLink);
        return;
    }
    
})

var cleanGoogleLink = function(moneyThis) {
    // google fix on left click
    var href = moneyThis.attr("href");
    if (href.indexOf("/url?") > -1) {
        var cleanLink = moneyThis.attr("data-href");
        if (cleanLink) {
            moneyThis.attr("href", cleanLink);
            return;
        }
    }
}


$("html").on("click", "a", function(){
    cleanGoogleLink($(this));
});

$("html").on("contextmenu", "a", function(){
    cleanGoogleLink($(this));
});