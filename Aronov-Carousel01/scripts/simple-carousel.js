// what to do: an invisible slider based on the position of the mouse on the screen. 
//maybe if I scroll horizontally the position changes horizontally, vertically if I scroll up and down.
// so I need to take the code that refers to the slider dots and apply it to the mouse prosition with if statement

//use map and shape

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    //document.getElementById("demo").innerHTML = coords;
    //console.log(coords);
    console.log("X coords: " + x + ", Y coords: " + y);


}
//////////////////////////////////////////////////////////////////////////

function simpleCarousel(id,carouselElement, options){
	this.id = id;
	if ( (function(){
		//validate options
		return true;
	})(options) ){
		this.options = options;
	}else{
		this.options = {// set defaults
			transitionTime : 100,
			touchTransitionTime : 300
		};
	}
	this.carousel = carouselElement;
	this.slides = [];
	this.sliderFrame = this.carousel.querySelector('.slider-frame');
	this.sliderContentHolder = this.sliderFrame.querySelector('.slider-content');
	this.sliderFrameWidth = this.sliderFrame.clientWidth;
	this.currentSlideIndex = 0;

	this.isLongTouch = 0;
	this.touchStartPosition = {};
	this.touchLatestPosition = {};
	this.dragDistance = {};

}

simpleCarousel.prototype.initialize= function(){ // shows the dots

	if( this.evaluateSlides() > 0 ){
		this.registerClickHandlers(); // shows dots
		this.registerTouchHandlers();
	}

	this.setOptions(); // Sets options for a logger, what is a logger
};
simpleCarousel.prototype.setOptions = function(){

};
simpleCarousel.prototype.evaluateSlides = function(){
	var self = this;

	var slideElements = this.sliderFrame.querySelectorAll(' .slider-content > img');
	var sliderControlsListElement = this.carousel.querySelector('.slider-controls > ul');
	sliderControlsListElement.innerHTML = "";

	if( !slideElements ){
		console.warn('Slides couldn\'t be found! in Carousel #'+this.id);
		return -1;
	}
	if( slideElements.length > 1){ // quante immagini: slider elements sono tutte le immagini
		for(var i = 0; i < slideElements.length; i++) {
			var liControl = document.createElement('li'); // crea un bottone per ogni img

			var reference = `${i}`; // ?
			liControl.dataset.slideId = reference; // ?
			slideElements[i].dataset.controlId = reference; // ?

			if( i === 0 )
				liControl.classList.add('current');

			sliderControlsListElement.appendChild(liControl);  // aggiungi immagini/puntini all array
			self.slides.push({el:slideElements[i],c:liControl,ref:reference});
		}
		this.sliderContentHolder.style.transition = `transform ${this.options.transitionTime}ms`;

		return 1;
	}
	console.warn('No more than 1 slide found! in Carousel #'+this.id);
	return 0;
};

simpleCarousel.prototype.registerClickHandlers= function(){ // following activtes images move and shows appearing green dots
	var self = this;
	for(var i = 0 ; i< this.slides.length ; i++) {
		this.slides[i].c.addEventListener('mouseover',function(evnt){
			evnt.stopPropagation();
			self.moveToIndex(parseInt(evnt.target.dataset.slideId));
		},false);
	}
};
/*
simpleCarousel.prototype.registerTouchHandlers = function(){ // what does this do
	var self = this;
	this.sliderFrame.addEventListener('touchstart',function(evnt){
		evnt.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
		evnt.preventDefault();
		self.startTouch(evnt); // ?
	},false);
	this.sliderFrame.addEventListener('touchmove',function(evnt){
		evnt.stopPropagation();
		evnt.preventDefault();
		self.moveTouch(evnt);
	},false);
	this.sliderFrame.addEventListener('touchend',function(evnt){
		evnt.stopPropagation();
		evnt.preventDefault();
		self.endTouch(evnt);
	},false);
};

simpleCarousel.prototype.startTouch = function(evnt){ // green dots and move: guess it doesn't work with mouse over but mouse click
	var self = this;

	this.isLongTouch = false;
	window.setTimeout(function(){
		self.isLongTouch = true;
	}, 250);

	this.touchStartPosition.x = evnt.touches[0].pageX;
	this.touchStartPosition.y = evnt.touches[0].pageY;
};
simpleCarousel.prototype.moveTouch = function(evnt){

	this.touchLatestPosition.x =  evnt.touches[0].pageX;
	this.touchLatestPosition.y =  evnt.touches[0].pageY;

	this.dragDistance.x = this.touchLatestPosition.x - this.touchStartPosition.x;

	var newLeftMargin = this.currentSlideIndex * this.sliderFrameWidth - this.dragDistance.x;

	this.sliderContentHolder.style.transition = 'none';
	this.sliderContentHolder.style.transform = `translateX(-${newLeftMargin}px)`;
};
simpleCarousel.prototype.endTouch = function(){
	var self = this;
	var nextIndex = this.currentSlideIndex;
	if(Math.abs(this.dragDistance.x) > this.sliderFrameWidth/2 || this.isLongTouch === false) {
		if(this.dragDistance.x > 0 &&  this.currentSlideIndex > 0) {
			nextIndex = this.currentSlideIndex - 1;
		}else if(this.dragDistance.x < 0 && this.currentSlideIndex < this.slides.length - 1) {
			nextIndex = this.currentSlideIndex + 1;
		}
	}
	this.sliderContentHolder.style.transition = `transform ${this.options.touchTransitionTime}ms`;

	window.setTimeout(function(){
		self.slides[self.currentSlideIndex].c.classList.remove('current');
		self.slides[nextIndex].c.classList.add('current');
		self.currentSlideIndex= nextIndex;
		self.sliderContentHolder.style.transition = `transform ${self.options.transitionTime}ms`;
	},this.options.touchTransitionTime);
	this.sliderContentHolder.style.transform = `translateX(-${nextIndex*this.sliderFrameWidth}px)`;
};*/
simpleCarousel.prototype.moveToIndex = function(nextIndex){
	var self = this;
	var sliderWidth = this.sliderFrameWidth;

	window.setTimeout(function(){
		self.slides[self.currentSlideIndex].c.classList.remove('current'); // removes green dot when arrow moves on other dot
		self.slides[nextIndex].c.classList.add('current'); // this makes the green dots (without it the images still move)
		self.currentSlideIndex= nextIndex;
	},this.options.transitionTime);
	this.sliderContentHolder.style.transform = `translateX(-${nextIndex*sliderWidth}px)`; // this moves the images. without the dots become green but nothing moves
};
//slider.style.Width = mouseY; 

