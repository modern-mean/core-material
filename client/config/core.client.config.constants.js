(function () { 
 return angular.module("core.config")
.constant("ANALYTICS", {"name":"tracker","tracker":"UA-77127830-1","trackEvent":true})
.constant("LOGGING", {"levels":{"debug":"true","info":"true","warn":"true","error":"true"}});

})();
