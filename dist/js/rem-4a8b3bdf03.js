!function(e,t){var n=document.documentElement,i=document.querySelector('meta[name="viewport"]'),d="orientationchange"in window?"orientationchange":"resize";i.setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no,shrink-to-fit=no");var o=function(){clientWidth=n.clientWidth,clientWidth&&(n.style.fontSize=clientWidth/750*100+"px")};o(),e.addEventListener&&(t.addEventListener(d,o,!1),e.addEventListener("DOMContentLoaded",o,!1))}(document,window);