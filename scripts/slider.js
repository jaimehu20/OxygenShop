 class slider {
    constructor(sliderId){
        this.sliderId = sliderId;
        this.sliderContainer = document.getElementById('slider');
        this.prevButton = document.querySelector('.slider__arrowContainer__prevImage');
        this.nextButton = document.querySelector('.slider__arrowContainer__nextImage');
        this.dotContainer = document.querySelector('.slider__dot');
        this.sliderDot = document.querySelectorAll('.slider__dot__button')
        this.sliderImages = document.querySelectorAll('.slider__image');
        this.currentIndex = 0;
        this.imageDisplay();
        this.nextImage();
        this.prevImage();
        this.autoSlide();
        this.totalSlides = this.sliderImages.length;
    }
    
    imageDisplay(){
        this.sliderContainer.classList.add('slider--enabled');
        this.sliderImages[this.currentIndex].classList.toggle('slider__image--enabled');
        this.dotContainer.classList.add('slider__dot--enabled');
        this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
        
    }
    nextImage(){
        this.nextButton.addEventListener("click", () => {
            if(this.currentIndex >= this.totalSlides -1){
                this.currentIndex = 0;
                this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                this.sliderImages[this.totalSlides-1].classList.remove('slider__image--enabled');
                this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
                this.sliderDot[this.totalSlides-1].classList.remove('slider__dot__button--enabled');     
            } else {
                this.currentIndex++;
                this.sliderImages[this.currentIndex-1].classList.remove('slider__image--enabled');
                this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                this.sliderDot[this.currentIndex-1].classList.remove('slider__dot__button--enabled');
                this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
            }     
        })
    }
    prevImage(){
        this.prevButton.addEventListener("click", () => {
            if(this.currentIndex > 0){
                    this.currentIndex--;
                    this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                    this.sliderImages[this.currentIndex+1].classList.remove('slider__image--enabled');
                    this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
                    this.sliderDot[this.currentIndex+1].classList.remove('slider__dot__button--enabled');
            } else {
                this.currentIndex = this.totalSlides-1;
                this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                this.sliderImages[0].classList.remove('slider__image--enabled');
                this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
                this.sliderDot[0].classList.remove('slider__dot__button--enabled');

            }   
        })
    }
    autoSlide() {
        setInterval(() => {
                if(this.currentIndex >= this.totalSlides -1){
                    this.currentIndex = 0;
                    this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                    this.sliderImages[this.totalSlides-1].classList.remove('slider__image--enabled');
                    this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
                    this.sliderDot[this.totalSlides-1].classList.remove('slider__dot__button--enabled');    
                } else {
                    this.currentIndex++;
                    this.sliderImages[this.currentIndex-1].classList.remove('slider__image--enabled');
                    this.sliderImages[this.currentIndex].classList.add('slider__image--enabled');
                    this.sliderDot[this.currentIndex-1].classList.remove('slider__dot__button--enabled');
                    this.sliderDot[this.currentIndex].classList.add('slider__dot__button--enabled');
                }  
        }, 5000)
    }

}

new slider("slider");

