$("html").on("mouseenter", "a", function(){
    var href = $(this).attr("href");

    console.log("Cleaning " + href);
    
    // reddit fix
    var outbound = $(this).attr("data-outbound-url");
    if (outbound && outbound.indexOf("out.reddit.com") > -1) {
        var cleanLink = href;
        $(this).attr("data-outbound-url", cleanLink);
        return;
    }

    // facebook fix
    if (href && (
        href.indexOf("l.facebook.com") > -1 ||
        href.indexOf("facebook.com/l?") > -1
    )) {
        var cleanLink = $(this).text();
        $(this).attr("href", cleanLink);
        return;
    }

    // slack fix
    var onclick = $(this).attr("onclick");
    if (onclick && onclick.indexOf("this.href=") > -1) {
        var cleanLink = $(this).attr("data-referer-original-href");
        $(this).attr("href", cleanLink);
        $(this).attr("onclick", "this.href='"+cleanLink+"'");
        $(this).attr("onmouseover", "this.href='"+cleanLink+"'");
        return;
    }
    
})

var cleanGoogleLink = function(moneyThis) {
    // google fix on left click
    var href = moneyThis.attr("href");
    if (moneyThis.attr("data-href") && href.indexOf("/url?") > -1) {
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