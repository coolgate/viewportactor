var ViewportActor = (function() {
    'use strict';

    var getElementsPosition = function(elements) {
        var result = [];
        for (var i = 0; i < elements.length; i++) {
            var elm = $(elements[i]);
            result.push({
                top: elm.position().top,
                element: elm
            });
        }
        return result;
    };

    var buildElementsPositionTree = function(elements) {
        var t = new tree(3);
        for (var i = 0; i < elements.length; i++) {
            var elm = $(elements[i]);
            var key = parseInt(elm.position().top);
            t.insert(key, elm);
        }
        return t;
    };

    var getElementsInView = function(elmTree) {
        var result = [];
        var top = parseInt($(document).scrollTop()),
            bottom = parseInt(top + window.innerHeight);
        elmTree.seek(top, true);
        var first = elmTree.keynum();
        elmTree.seek(bottom, true);
        var last = elmTree.keynum();

        for (var i = first; i <= last; i++) {
            elmTree.goto(i);
            var elm = elmTree.recnum;
            result.push(elm);
        }
        return result;
    };

    var processElementsInView = function(that, elements, func) {
        // var d1 = new Date().getTime();
        if (that.positionBTree == null) {
            that.positionBTree = buildElementsPositionTree(elements)
        }
        var elms = getElementsInView(that.positionBTree)
        for (var i = 0; i < elms.length; i++) {
            func(elms[i]);
        }
        // var d2 = new Date().getTime();
        // console.log('elapsed ' + (d2-d1) + ' ms')
    }

    var createInstance = function(selector, func) {
        var instance = {};
        instance.positionBTree = null;
        instance.elements = null;
        instance.bindScroll = function () {
        	processElementsInView(instance, instance.elements, instance.func);
        };
        instance.bind = function(selector, func) {
        	instance.func = func;
        	instance.elements = $(selector);
            // $(window).bind('scroll', instance.bindScroll);
            $(window).bind('scroll', instance.bindScroll);
            $(window).scroll();
        };
        instance.unbind = function () {
        	$(window).unbind('scroll', instance.bindScroll);
        }

        if (selector != undefined && func != undefined) {
            instance.bind(selector, func);
        }
        return instance;
    };

    return {
        createInstance: createInstance,
    };
})();
