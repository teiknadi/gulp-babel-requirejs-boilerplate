require(['modules/Widget', 'jquery'], function(Widget, $) {
    $("body").append('<br><br>App launched :)');

    var widget = new Widget('.widget');
    widget.init();
});