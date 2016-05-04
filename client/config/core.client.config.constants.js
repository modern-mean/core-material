(function () { 
 return angular.module("core.config")
.constant("ANALYTICS", {"name":"tracker","tracker":"UA-77127830-1","trackEvent":true})
.constant("LOGGING", {"levels":{"debug":"false","info":"true","warn":"true","error":"true"}});

})();
