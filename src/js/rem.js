(function (doc, win) {
    var rem, scale = 1;
    var docEl = document.documentElement;
    var metaEl = document.querySelector('meta[name="viewport"]');
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no,shrink-to-fit=no');
    var recalc = function () {
        clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';

    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);