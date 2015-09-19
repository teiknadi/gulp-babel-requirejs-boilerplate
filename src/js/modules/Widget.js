define(['jquery', 'modules/Base'], function($, Base) {
    class Widget extends Base
    {
        constructor(selector) {
            super();
            this.selector = selector;
        }

        init() {
            $('body').append('<br><br>Widget loaded using: ' + this.selector);
            console.log('Widget');
        }
    }

    return Widget;
});