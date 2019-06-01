'use stict';

function Route(name, htmlName, purpose) {
    try {
        if (!name || !htmlName) {
            throw Error('Name and htmlName params are mandatories');
        }
        this.constructor(name, htmlName, purpose);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    constructor: function(name, htmlName, purpose) {
        this.name = name;
        this.htmlName = htmlName;
        this.purpose = purpose || 'nav';
    },
    isActiveRoute: function(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
};