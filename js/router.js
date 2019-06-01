export function Router(routes, defaultRoute) {
    try {
        if (!routes) {
            throw Error('Routes param is mandatory');
        }
        if (routes.length) {
            this.constructor(routes);
            this.init(defaultRoute || routes[0].name);
            this.resolveViews(document.querySelectorAll('[data-view]'));
        }
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    constructor: function(routes) {
        this.routes = routes;
        this.rootElem = document.querySelector('main');
        this.navMenu();
    },
    init: function(defaultRoute) {
        this.defaultRoute = defaultRoute;
        const r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function(e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, routes) {
        const routeFound = window.location.hash.length > 0;
        if (routeFound) {
            routes.forEach(
                route =>
                route.isActiveRoute(window.location.hash.substr(1)) &&
                scope.goToRoute(route.htmlName, scope.rootElem)
            );
        } else {
            routes.forEach(
                route =>
                route.name === this.defaultRoute &&
                scope.goToRoute(route.htmlName, scope.rootElem)
            );
        }
    },
    goToRoute: function(htmlName, domTarget) {
        (async function(domNode) {
            fetch(`views/${htmlName}`)
                .then(response => response.text())
                .then(text => {
                    domNode.innerHTML = text;
                });
        })(domTarget);
    },
    navMenu: function() {
        const navElem = document.querySelector('nav');
        const navTempl = document.querySelector('nav>template').textContent;
        this.routes
            .filter(route => route.purpose === 'nav')
            .forEach(
                navRoute =>
                (navElem.innerHTML += `<a href="#${navRoute.name}">${
            navRoute.name
          }</a>`)
            );
    },
    resolveViews: function(domTargets) {
        (function(scope) {
            [...domTargets].forEach(domNode =>
                scope.goToRoute(
                    scope.routes.find(route => route.purpose === domNode.dataset.view)
                    .htmlName,
                    domNode
                )
            );
        })(this);
    }
};