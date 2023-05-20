jQuery(document).ready(function($){
	function morphDropdown( element ) {
		this.element = element;
		this.mainNavigation = this.element.find('.main-nav');
		this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
		this.dropdownList = this.element.find('.dropdown-list');
		this.dropdownWrappers = this.dropdownList.find('.dropdown');
		this.dropdownItems = this.dropdownList.find('.content');
		this.dropdownBg = this.dropdownList.find('.bg-layer');
		this.mq = this.checkMq();
		this.bindEvents();
	}

	morphDropdown.prototype.checkMq = function() {
		//check screen size
		var self = this;
		return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
	};

	morphDropdown.prototype.bindEvents = function() {
		var self = this;
		//hover over an item in the main navigation
		this.mainNavigationItems.mouseenter(function(event){
			//hover over one of the nav items -> show dropdown
			self.showDropdown($(this));
		}).mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a nav item or a dropdown -> hide dropdown
				if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) self.hideDropdown();
			}, 50);
		});
		
		//hover over the dropdown
		this.dropdownList.mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a dropdown or a nav item -> hide dropdown
				(self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
			}, 50);
		});

		//click on an item in the main navigation -> open a dropdown on a touch device
		this.mainNavigationItems.on('touchstart', function(event){
			var selectedDropdown = self.dropdownList.find('#'+$(this).data('content'));
			if( !self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active') ) {
				event.preventDefault();
				self.showDropdown($(this));
			}
		});

		//on small screens, open navigation clicking on the menu icon
		this.element.on('click', '.nav-trigger', function(event){
			event.preventDefault();
			self.element.toggleClass('nav-open');
		});
	};

	morphDropdown.prototype.showDropdown = function(item) {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			var self = this;
			var selectedDropdown = this.dropdownList.find('#'+item.data('content')),
				selectedDropdownHeight = selectedDropdown.innerHeight(),
				selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
				selectedDropdownLeft = item.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;

			//update dropdown position and size
			this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
			//add active class to the proper dropdown item
			this.element.find('.active').removeClass('active');
			selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
			item.addClass('active');
			//show the dropdown wrapper if not visible yet
			if( !this.element.hasClass('is-dropdown-visible') ) {
				setTimeout(function(){
					self.element.addClass('is-dropdown-visible');
				}, 10);
			}
		}
	};

	morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) {
		this.dropdownList.css({
		    '-moz-transform': 'translateX(' + left + 'px)',
		    '-webkit-transform': 'translateX(' + left + 'px)',
			'-ms-transform': 'translateX(' + left + 'px)',
			'-o-transform': 'translateX(' + left + 'px)',
			'transform': 'translateX(' + left + 'px)',
			'width': width+'px',
			'height': height+'px'
		});

		this.dropdownBg.css({
			'-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
		    '-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
		});
	};

	morphDropdown.prototype.hideDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			this.element.removeClass('is-dropdown-visible').find('.active').removeClass('active').end().find('.move-left').removeClass('move-left').end().find('.move-right').removeClass('move-right');
		}
	};

	morphDropdown.prototype.resetDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'mobile') {
			this.dropdownList.removeAttr('style');
		}
	};

	var morphDropdowns = [];
	if( $('.cd-morph-dropdown').length > 0 ) {
		$('.cd-morph-dropdown').each(function(){
			//create a morphDropdown object for each .cd-morph-dropdown
			morphDropdowns.push(new morphDropdown($(this)));
		});

		var resizing = false;

		//on resize, reset dropdown style property
		updateDropdownPosition();
		$(window).on('resize', function(){
			if( !resizing ) {
				resizing =  true;
				(!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
			}
		});

		function updateDropdownPosition() {
			morphDropdowns.forEach(function(element){
				element.resetDropdown();
			});

			resizing = false;
		};
	}
});


//SLIDER SWIPER
const swiper = new Swiper('.slider-swiper', {
	loop:true,
	autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
});

//SECTION-INPUT SLIDER
var swiper3 = new Swiper(".mySwiper3", {
	grabCursor: true,
	loop: true,
	effect: "creative",
	creativeEffect: {
	  prev: {
		shadow: true,
		translate: ["-20%", 0, -1],
	  },
	  next: {
		translate: ["100%", 0, 0],
	  },
	},
	autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
});


$(document).ready(function() {

	// Gets the video src from the data-src on each button
	
	var $videoSrc;  
	$('.video-btn').click(function() {
		$videoSrc = $(this).data( "src" );
	});
	console.log($videoSrc);
	
	  
	  
	// when the modal is opened autoplay it  
	$('#myModal').on('shown.bs.modal', function (e) {
		
	// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
	$("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
	
	})
	  
	
	
	// stop playing the youtube video when I close the modal
	$('#myModal').on('hide.bs.modal', function (e) {
		// a poor man's stop video
		$("#video").attr('src',$videoSrc); 
	}) 
		
		
	
	
	  
	  
	// document ready  
	});
	
	
	(() => {
		'use strict'
	  
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.querySelectorAll('.needs-validation')
	  
		// Loop over them and prevent submission
		Array.from(forms).forEach(form => {
		  form.addEventListener('submit', event => {
			if (!form.checkValidity()) {
			  event.preventDefault()
			  event.stopPropagation()
			}
	  
			form.classList.add('was-validated')
		  }, false)
		})
	  })()
	  

	  
	  
	  //SCROLL TOP BUTTON
	  var scrollbtn = $('#button');

	  $(window).scroll(function () {
		  if ($(window).scrollTop() > 300) {
			  scrollbtn.addClass('show');
		  } else {
			  scrollbtn.removeClass('show');
		  }
	  });

	  scrollbtn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, '300');
	});


	//MEALS GALLERY 
	(function() { // wrap code in IIFE to keep it from global scope
		let links = document.querySelectorAll('a'); // grab all <a> tags that trigger the image gallery
		let imageContainer = document.querySelector('.image-container'); // grab the div that will contain the images
		let imagesCollection = document.querySelectorAll('.image-container img');
	  
	  function displayImage(imgs, album) { // function to check the data-album attr and check against the button that was clicked
		imgs.forEach((image) => {
		  if(image.dataset.album == album) {
			image.classList.remove('hide');
		  } else {
			image.classList.add('hide');
		  }
		});
	  }
	  
		
		links.forEach((link) => { // loop through <a> tags and create click event on each 
			link.addEventListener('click', (e) => {
				e.preventDefault();
	
				switch (link.textContent) { // check name of link clicked 
					case "Paketli Sıcak Yemek Servisi": // link 1 text
					
						displayImage(imagesCollection, 'album 1'); //display images from album 1
	
						break;
					case "Taşıma Yemek Hizmeti / Ofis Restoranı Sunumu": // link 2 text
					
						displayImage(imagesCollection, 'album 2'); //display images from album 2
	
						break;
						
					case "Tümü": // // link 4 text - display all images at once
					
							imagesCollection.forEach((image) => {
							  image.classList.remove('hide');
					   });
	
						break;
				}
	
			});
		});
		
		})();