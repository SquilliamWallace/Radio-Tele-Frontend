function checkBrowser(scope) { 
 if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
{
    scope.$store.commit("browserInfo", "Opera")
}
else if(navigator.userAgent.indexOf("Chrome") != -1 )
{
    scope.$store.commit("browserInfo", "Chrome")
}
else if(navigator.userAgent.indexOf("Safari") != -1)
{
    scope.$store.commit("browserInfo", "Safari")
}
else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
{
    scope.$store.commit("browserInfo", "Firefox")
}
else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
{
    scope.$store.commit("browserInfo", "IE")
}  
else 
{
    scope.$store.commit("browserInfo", "Unknown")
}
}
export {checkBrowser};
