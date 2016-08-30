# Viewport Actor
==========

## 概述

Viewport Actor方便前端开发对浏览器当前视口（viewport）中的元素进行处理。开发者可以为当前可见的特定HTML元素(通过jquery selector进行过滤)绑定(bind)javascript函数，当窗口滚动到这些元素可见的位置时，自动触发执行该函数。
* Viewport Actor适合于动态地对视口中元素进行修改，比如根据文本中已知的语义内容（人名、地名、商品名等）加入URL链接，使用户获得更好的用户体验。
* Viewport Actor避免了使用DOM数组来界定当前可见的HTML元素，内部通过B+树来处理DOM的位置（感谢Graham O'Neill，http://goneill.co.nz/btree.php ），因此可以以较好的性能处理特别大的HTML文档。除了在绑定函数时会因为构造B+树阶段会稍微耗时外，滚动窗口执行页面逻辑时所耗的时间可以忽略不计。

## 用法

Viewport Actor需要JQuery和btree.js支持，用法很简单。首先需要引用viewportactor.js。

	<script type="text/javascript" src="jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="btree.js"></script>
	<script type="text/javascript" src="viewportactor.js"></script>

引入后，只需要为需要绑定的元素进行绑定就行了，下面是示例代码。

    <script type="text/javascript">
    function render(element) {
        if (element.data('processed') === true)
            return;
        element.css('color', 'red');
        element.data('processed', true);
    }
    
    $(document).ready(function(){
        o1 = ViewportActor.createInstance('p',render);
        // o1.unbind();        
    })
    </script>

其中，ViewportActor.createInstance(selector, func)函数用于创建一个ViewportActor对象，selector参数时用于传递给JQuery用于选择HTML元素的选择器，所以应该按JQuery选择器的写法来传递参数。func(element)函数是用于当HTML元素可见时，用于处理每个符合条件的HTML元素的函数，该函数拥有一个参数element，是当前视口中符合JQuery选择结果的元素，系统为每一各元素调用一遍func(element)，开发者可以在此函数中对其进行操作，示例sample.html中只是简单的改变了文字的显示颜色，开发者也可以进行更复杂的操作，如通过Ajax来动态地更新元素内容等。

createInstance()返回的对象实例主要提供了bind(selector, func)和unbind()函数。bind函数用于在createInstance()调用时没有传入参数时延后进行绑定。unbind函数用于取消绑定的操作。取消绑定后，相应的操作将不会在元素进入视口时触发。

请在document加载完成后再进行操作绑定，因为Viewport Actor依赖完整的DOM位置信息来界定HTML元素是否在视口内。

作为一个小技巧，可以使用元素的.data()机制来控制已经触发过操作的元素不再多次触发操作，就像示例中所展示的那样。

## 许可

Viewport Actor使用BSD许可协议。