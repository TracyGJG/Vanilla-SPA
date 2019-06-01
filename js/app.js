import { Router } from './router.js';
import { Route } from './route.js';

{
    ('use strict');
    new Router(
        [
            new Route('About', 'about.html'),
            new Route('Home', 'home.html'),
            new Route('Aside', 'aside.html', 'aside')
        ],
        'Home'
    );
}