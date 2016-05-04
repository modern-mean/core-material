(function () { 
 return angular.module("core.config")
.value("PAGE", {"title":"MODERN-MEAN"})
.value("NAVIGATION", {"left":{"heading":"Left Navigation","backdrop":true,"locked":{"always":false,"media":"gt-sm"}},"right":{"locked":{"always":false}}});

})();
