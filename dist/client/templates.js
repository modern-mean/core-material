angular.module("core").run(["$templateCache", function($templateCache) {$templateCache.put("modern-mean-core-material/views/core.client.views.400.html","<md-toolbar class=\"md-hue-2\">\n  <div class=\"md-toolbar-tools\">\n    <h1 class=\"md-display-1\" style=\"font-weight: 700; font-size: 1.5em\">Bad Request</h1>\n  </div>\n</md-toolbar>\n<md-content layout-padding>\n  <h3 class=\"md-title\">ERROR: 400</h3>\n  <p>You made a bad request</p>\n  <section layout=\"row\" layout-align=\"center center\">\n    <md-button ui-sref=\"root.home\" class=\"md-raised md-default\" aria-label=\"Back to home\">back to homepage</md-button>\n  </section>\n</md-content>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.403.html","<md-toolbar class=\"md-hue-2\">\n  <div class=\"md-toolbar-tools\">\n    <h1 class=\"md-display-1\" style=\"font-weight: 700; font-size: 1.5em\">Forbidden</h1>\n  </div>\n</md-toolbar>\n<md-content layout-padding>\n  <h3 class=\"md-title\">ERROR: 403</h3>\n  <p>You are not authorized to access that resource, at least that\'s what we think ;-)</p>\n  <section layout=\"row\" layout-align=\"center center\">\n    <md-button ui-sref=\"root.home\" class=\"md-raised md-default\" aria-label=\"Back to home\">back to homepage</md-button>\n    or\n    <md-button ui-sref=\"root.user.authentication.signin\" class=\"md-raised md-primary\" aria-label=\"Sign in\">Sign In</md-button>\n  </section>\n</md-content>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.404.html","<md-toolbar class=\"md-hue-2\">\n  <div class=\"md-toolbar-tools\">\n    <h1 class=\"md-display-1\" style=\"font-weight: 700; font-size: 1.5em\">Page Not Found</h1>\n  </div>\n</md-toolbar>\n<md-content layout-padding>\n  <h3 class=\"md-title\">ERROR: 404</h3>\n  <p>Page not found</p>\n  <section layout=\"row\" layout-align=\"center center\">\n    Perhaps try <md-button ui-sref=\"root.home\" class=\"md-raised md-default\" aria-label=\"Back to home\">homepage</md-button>\n  </section>\n</md-content>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.footer.html","\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.header.html","<md-toolbar layout=\"row\" class=\"md-toolbar-tools md-whiteframe-z2\">\n  <md-button ng-show=\"!vm.navigation.left.isLockedOpen()\" class=\"md-fab md-mini md-accent md-raised\" aria-label=\"Leftnav Menu\" ng-click=\"vm.navigation.left.open()\">\n    <ng-md-icon icon=\"menu\"></ng-md-icon>\n  </md-button>\n  <span flex=\"none\" style=\"font-weight: 900; font-size: 1.8em;letter-spacing: -.05em\" hide-xs hide-sm>MODERN-MEAN</span>\n  <span flex></span>\n  <md-button class=\"md-icon-button\" aria-label=\"Rightnav Menu\" ng-click=\"vm.navigation.right.toggle()\">\n    <ng-md-icon icon=\"more_vert\"></ng-md-icon>\n  </md-button>\n</md-toolbar>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.home.html","<md-content layout-padding flex>\n  <section layout=\"row\" layout-align=\"center center\">\n    <img alt=\"Modern-MEAN\" src=\"/dist/img/core/client/img/brand/logo.png\" />\n  </section>\n  <section layout=\"row\" layout-align=\"center center\">\n    Open-Source Full-Stack Solution For MEAN Applications\n  </section>\n  <section layout=\"row\" layout-align=\"center center\">\n    <md-button class=\"md-raised md-accent\" href=\"https://github.com/modern-mean/modern-mean-core\" target=\"_blank\" aria-label=\"Learn More\">\n      Learn more\n      <ng-md-icon icon=\"arrow_forward\"></ng-md-icon>\n    </md-button>\n  </section>\n  <section layout=\"row\" layout-align=\"center center\" flex>\n    <h1 class=\"md-display-1\">Congrats! You\'ve configured and run the default Modern-MEAN application.</h1>\n  </section>\n  <section layout=\"row\" layout-align=\"center center\" flex>\n    <md-content>\n      <p>Modern-MEAN is a web application boilerplate, which means you should start changing everything :-)</p>\n      <p>This sample application tracks users and articles.</p>\n      <ul>\n        <li>Click <em>Sign Up</em> to get started.</li>\n        <li>Configure your app to work with your social accounts, by editing the <em>/config/env/*.js</em> files.</li>\n        <li>Edit your users module.</li>\n        <li>Add new CRUD modules.</li>\n        <li>Have fun...</li>\n      </ul>\n    </md-content>\n  </section>\n\n  <section layout=\"row\">\n    <md-card flex=\"25\">\n      <md-card-content>\n        <h2><strong>M</strong>ongoDB</h2>\n        <p><a target=\"_blank\" href=\"http://mongodb.org/\">MongoDB</a> is a NoSQL database. MongoDB\'s great manual is the place to get started with NoSQL and MongoDB.</p>\n      </md-card-content>\n      <md-card-footer>\n        <a target=\"_blank\" href=\"http://docs.mongodb.org/manual/\">Manual</a>\n      </md-card-footer>\n    </md-card>\n    <md-card flex=\"25\">\n      <md-card-content>\n        <h2><strong>E</strong>xpress</h2>\n        <p><a target=\"_blank\" href=\"http://expressjs.com/\"> Express</a> is a NodeJS server-side application web framework.</p>\n      </md-card-content>\n      <md-card-footer>\n        <a target=\"_blank\" href=\"http://expressjs.com/4x/api.html\">The ExpressJS API reference</a>\n        <a target=\"_blank\" href=\"http://stackoverflow.com/questions/8144214/learning-express-for-node-js\">StackOverflow</a>\n      </md-card-footer>\n    </md-card>\n    <md-card flex=\"25\">\n      <md-card-content>\n        <h2><strong>A</strong>ngularJS</h2>\n        <p><a target=\"_blank\" href=\"http://angularjs.org/\">AngularJS</a> is the client-side web application framework.</p>\n      </md-card-content>\n      <md-card-footer>\n        <a target=\"_blank\" href=\"http://www.thinkster.io/\">Thinkster Popular Guide</a>\n        <a target=\"_blank\" href=\"https://egghead.io/\">Egghead Videos</a>\n      </md-card-footer>\n    </md-card>\n    <md-card flex=\"25\">\n      <md-card-content>\n        <h2><strong>N</strong>ode.js</h2>\n        <p><a target=\"_blank\" href=\"http://nodejs.org/\">Node.js</a> is a JavaScript run-time, popular for being a web server platform.</p>\n      </md-card-content>\n      <md-card-footer>\n        <a target=\"_blank\" href=\"http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js\">stackOverflow thread</a>\n      </md-card-footer>\n    </md-card>\n  </section>\n  \n  <div layout=\"row\">\n    <md-content>\n      <h2 class=\"md-display\">Modern-MEAN Documentation</h2>\n      <p>Once you\'re familiar with the foundation technology, check out the Modern-MEAN Documentation:</p>\n      <p>Links to follow up soon</p>\n      <p>Enjoy &amp; Keep Us Updated,</p>\n      <p>The Modern-MEAN Team.</p>\n    </md-content>\n  </div>\n</md-content>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.sidenav.left.html","<md-sidenav md-component-id=\"coreLeftNav\" class=\"md-sidenav-left md-whiteframe-z2\" md-disable-backdrop=\"{{vm.config.backdrop}}\" md-is-locked-open=\"vm.isLockedOpen()\" md-whiteframe=\"4\">\n  <md-toolbar class=\"md-theme-blue-grey md-hue-3 md-whiteframe-z2\">\n    <h1 class=\"md-toolbar-tools\">\n      <span style=\"font-weight: 700; font-size: 1.2em\">{{vm.config.heading}}</span>\n      <span flex></span>\n      <md-button ng-show=\"!vm.navigation.isLockedOpen()\" class=\"md-icon-button md-mini\" ng-click=\"vm.navigation.close()\" aria-label=\"Close Menu\">\n        <ng-md-icon icon=\"close\"></ng-md-icon>\n      </md-button>\n    </h1>\n  </md-toolbar>\n  <md-content>\n    <md-list>\n      <md-list-item ui-sref=\"root.home\" >\n        <ng-md-icon icon=\"home\"></ng-md-icon>\n        <span flex></span>\n        <span>Home</span>\n      </md-list-item>\n    </md-list>\n  </md-content>\n</md-sidenav>\n");
$templateCache.put("modern-mean-core-material/views/core.client.views.sidenav.right.html","<md-sidenav md-component-id=\"coreRightNav\" class=\"md-sidenav-right md-whiteframe-z2\">\n  <md-toolbar class=\"md-theme-blue-grey md-hue-3\">\n    <h1 class=\"md-toolbar-tools\">\n      <md-button class=\"md-icon-button md-mini\" ng-click=\"vm.navigation.close()\" aria-label=\"Close menu\">\n        <ng-md-icon icon=\"close\"></ng-md-icon>\n      </md-button>\n      <span flex></span>\n      <span style=\"font-weight: 700; font-size: 1.2em\">Right Nav Menu</span>\n    </h1>\n  </md-toolbar>\n</md-sidenav>\n");}]);