function render(element) {
    if (element.data('processed') === true)
        return;
    element.css('color', 'red');
    element.data('processed', true);
}

$(document).ready(function() {
    o1 = ViewportActor.createInstance('p', render);
    // o1.unbind();        
})