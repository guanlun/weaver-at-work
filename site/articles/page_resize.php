<?php
    include('header.php');
?>
            <div id='content_container'>
                <div id='article_content_container'>
                    <div id='article_title'>
                        Practical Skills for Dealing with Webpage Resize
                    </div>
                    <div id='article_body'>
                        In webpage design, positioning a background image and adjusting its size and position is often a quite
                        annoying problem. There are numbers of aspects to take into consideration, including the ratio of width 
                        and height, scrolling and resizing. Here we are going to summarize some points regarding these issues 
                        and hopefully this can be some kind of pattern that we can use in the future.<br /><br />

                        Usually when it comes to background image, we will simply use CSS to specify the style of the body: 
                        <div class='code'>body { background-image: url('images/bg.jpg'); }</div>
                        However, this straightforward approach is not flexible enough, when we need, for example, to change the 
                        opacity of this image or modify other properties, there is no very convenient functions.<br /><br />

                        Another way for dealing with this problem is to use a background div for the image and use another 
                        div as the container of the website contents: <br />
                        <div class='code'>
                            &lt;div id='bg_img'&gt;&lt;img src='bg.jpg' /&gt;&lt;/div&gt;<br />
                            &lt;div id='container'&gt;...&lt;/div&gt;<br />
                        </div>
                        And we need to add some CSS:<br />
                        <div class='code'>
                            #bg_img {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;position:fixed;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;left:0px;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;top:0px;<br />
                            }<br ><br />

                            #container {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;position:absolute;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;top:0px;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;width:1024px;<br />
                            }<br />
                        </div>
                        This approach will enable us to do some modifications of the background image, e.g. opacity.<br /><br />

                        We also need to consider the behavious of our page when the browser is resized, otherwise it will perform
                        oddly if we shrink the window. Note that we made the positioning of #bg_img fixed, thus when the window 
                        is small, scrolling will keep the image at fixed position relative to the top-left corner of the 
                        browser rather than the page, thus the background will move out and leave part of the window blank.
                        <br /><br />

                        By making #container absolute, we actually enables scroll bars when the window is small. You may try 
                        changing it to fixed and you'll find that when the window is smaller than the container scroll bars do 
                        not appear no matter when property you define for overflow.<br /><br />

                        Then we come to the real stuff about resizing. When the page is resized, there are a lot of issues that 
                        matter:<br />
                        <ul>
                            <li>The ratio of the image's width and height</li>
                            <li>The ratio of the page's width and height</li>
                            <li>The central container's size and display</li>
                        </ul>
                        For example, if we have a portrait or landscape background image that exceeds the height or width of the 
                        page, displaying the whole image with scroll bars would not be elegant. What we need to do is to set 
                        margin-top or margin-left to be negative. There are many demos showing that we can do it this way 
                        (take portrait image as an example):<br />

                        <div class='code'>
                            #bg_img {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;position:absolute;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;top:50%;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;margin-top:(- half the image's height);<br />
                            }<br />
                        </div>
                        This seems to work but when it comes to scaling the window, some parts of the central container cannot 
                        be seen because margin-top will be larger that 50% of the page. Thus this part will be hidden behind the 
                        window.<br /><br />
                        
                        It seems hard to find a genetic way to settle this problem, so we'll start with javascript.<br /><br />

                        As soon as the background is loaded, use this to get the its size:<br />

                        <div class='code'>
                            $('#bg_img img').load(function() {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;img_orig_width = $('#bg_img img').width();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;img_orig_height = $('#bg_img img').height();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;page_height = $(window).height();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;page_width = $(window).width();<br />
                            });<br />
                        </div>

                        Then we need to define two functions for resizing:<br />

                        <div class='code'>
                            function resize_bg_img() {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;var bg_img = $('#bg_img img');<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;page_height = $(window).height();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;page_width = $(window).width();<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;var img_w_h_ratio = img_orig_width / img_orig_height;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;var page_w_h_ratio = page_width / page_height;<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;if (img_w_h_ratio &gt; page_w_h_ratio) { // image is wider compared to the page<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_new_height = page_height;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_new_width = Math.ceil(img_orig_width / img_orig_height * img_new_height);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_margin_left = - (page_width - img_new_width) / 2;<br />
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (img_margin_left &gt; 0) { // the margin is always negative to guaranteed the image is complete<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img_margin_left = - img_margin_left;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('height', img_new_height);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('width', img_new_width);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('margin-left', img_margin_left);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('margin-top', '0'); // important step<br />
                                    <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;} else { // image is taller campared to the page<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_new_width = page_width;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_new_height = Math.ceil(img_orig_height / img_orig_width * img_new_width);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var img_margin_top = - (page_height - img_new_height) / 2;<br />
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (img_margin_top &gt; 0) { // the margin is always negative to guaranteed the image is complete<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img_margin_top = - img_margin_top;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('height', img_new_height);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('width', img_new_width);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('margin-top', img_margin_top);<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg_img.css('margin-left', '0'); // important step<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
                            }<br />
                        </div>

                        and<br />

                        <div class='code'>
                            function resize_container() {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;var margin_top = (page_height - $('#container').height()) / 2 - 25;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;if (margin_top &lt; 0) {<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin_top = 0;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
                                <br >
                                &nbsp;&nbsp;&nbsp;&nbsp;var margin_left = (page_width - $('#container').width()) / 2;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;if (margin_left &lt; 0) {<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin_left = 0;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;$('#container').css('margin-top', margin_top);<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;$('#container').css('margin-left', margin_left);<br />
                            }<br />
                        </div>

                        The code is quite straightforward, basically the layout is hardcoded in order to be suit for different 
                        conditions. When we first initialize the page and every time when we resize, we need to call the 
                        functions:<br /><br />

                        <div class='code'>
                            $(window).resize(function() {<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;resize_bg_img();<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;resize_container();<br />
                            });<br />
                        </div>

                        Then the problem is solved.<br /><br />
                    </div>
                </div>
            </div>
<?php
    include('../footer.php');
?>
