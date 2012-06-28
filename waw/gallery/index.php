<? include_once('../templates/header.php'); ?>
<? include_once('../libs/fancybox/include.php'); ?>
        <link href="/css/gallery.css" rel="stylesheet" />     
        <script type='text/javascript'>
        	$(document).ready(function() {
	        	$('#gallery_MBP-SSD').find('a').fancybox({
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					'titlePosition' 	: 'over',
					'titleFormat'		: 
					function(title, currentArray, currentIndex, currentOpts) {
						return '<span id="fancybox-title-over">Image ' 
								+ (currentIndex + 1) + ' / ' + currentArray.length 
								+ (title.length ? ' &nbsp; ' + title : '') + '</span>';
					}
				});
	        });
        </script>
        
        <div id='container'>
        	<? include_once('../templates/nav_bar.php'); ?>
        	<div id='inner_container'>
        	
        		<div id='gallery_title_text'>Gallery</div>
        		
        		<div id='gallery_item_container'>
	        		<div id='gallery_MBP-SSD' class='gallery_item'>
	        			<div class='gallery_item_cover_container'>
			        		<a rel="example_group" class='gallery_img cover' href="MBP-SSD/IMAG0433.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
			        		<a rel="example_group" class='gallery_img' href="MBP-SSD/IMAG0434.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
			        		<a rel="example_group" class='gallery_img' href="MBP-SSD/IMAG0435.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
			        		<a rel="example_group" class='gallery_img' href="MBP-SSD/IMAG0436.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
			        		<a rel="example_group" class='gallery_img' href="MBP-SSD/IMAG0437.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
			        		<a rel="example_group" class='gallery_img' href="MBP-SSD/IMAG0438.jpg">
			        			<img src="MBP-SSD/IMAG0433.jpg" />
			        		</a>
	        			</div>
	        			<div class='gallery_item_info_container'>
	        				<div class='gallery_item_title_text'>Macbook Pro DIY - Installing SSD</div>
	        				<div class='gallery_item_date_text'>Jun, 28, 2012</div>
	        				<div class='gallery_item_description_text'>
	        					Bought a new 13' Macbook Pro and an 128G SSD. Installed the SSD in the place of the original HDD and replaced the optical drive with HDD.
	        				</div>
	        			</div>
	        		</div>
        		</div>
        		
        	</div>
        </div>
<? include_once('../templates/footer.php'); ?>
