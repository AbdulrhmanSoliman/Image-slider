const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");
const imageContainer = document.querySelector(".slider-container");
const allImages = document.querySelectorAll(".image-gallery img");
const bullets = document.querySelector(".bullets");
let currentImageIndex = 0;

//=======================change image by clicking on right or left buttons=======================//
rightBtn.onclick = function () {
  removeActiveOrVisible(allImages); // first remove any appearing image
  if (currentImageIndex >= 0 && currentImageIndex < allImages.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }
  changeImage(currentImageIndex);
};
leftBtn.onclick = function () {
  removeActiveOrVisible(allImages);
  if (currentImageIndex > 0 && currentImageIndex < allImages.length) {
    currentImageIndex--;
  } else {
    currentImageIndex = allImages.length - 1;
  }
  changeImage(currentImageIndex);
};

function changeImage(index) {
  // setting the visible class to current image that will be showed
  allImages[index].classList.add("visible");
}
//=======================images pagenation clicking on it and highlighting active one=======================//
allImages.forEach((img, index) => {
  let content = `<span data-pic="${index}" onclick=addActive(this)></span>`;
  bullets.innerHTML += content; // combine all bullets together dynamically
});
const bulletElements = document.querySelectorAll(".bullets span"); // select all bullets after creating them
bulletElements[0].classList.add("active"); // add active class to the first bullet by default

// below is a function foreach span or bullet when clicking on it 1. removes any active one from bullet or image 2. update the value of currentImageIndex to the clicked bullet 3. show the image 4. add the active class to the clicked bullet
function addActive(el) {
  removeActiveOrVisible(allImages);
  removeActiveOrVisible(bulletElements);
  currentImageIndex = el.dataset.pic;
  changeImage(el.dataset.pic);
  el.classList.add("active");
}

function removeActiveOrVisible(elms) {
  //this is a function to remove any classes which contains active or visible class in the elements inside thier parents
  elms.forEach((el) => {
    el.classList.remove("active", "visible");
  });
}

function addActiveBullet(elms) {
  // add active bullet when currentImageIndex equal to the data-set attribute in each bullet
  removeActiveOrVisible(elms);
  elms.forEach((el) => {
    if (currentImageIndex == el.dataset.pic) {
      el.classList.add("active");
    }
  });
}

rightBtn.addEventListener("click", () => {
  //another event on both right and left btns but this time when clicking on anyone the active bullet related to its image will be have the class active
  addActiveBullet(bulletElements);
});
leftBtn.addEventListener("click", () => {
  addActiveBullet(bulletElements);
});
//=======================automatic change image by using setinterval builtin function=======================//

// below I used again currentImageIndex to continue if the user clicked the btns or lets the slider run by itself
let interval; // initialize the variable to the global scope because we want to access it again when the interval cleared
function startInterval() {
  interval = setInterval(() => {
    removeActiveOrVisible(allImages); // make sure all images not having visible class
    if (currentImageIndex < allImages.length - 1) {
      // runs if i value less than the length of images otherwise it returns to 0
      currentImageIndex++; // first start by increasing the value by one because the first image is already visible to the screen and to increase value before update it to the second image
      changeImage(currentImageIndex);
    } else {
      currentImageIndex = 0;
      changeImage(currentImageIndex);
    }
    addActiveBullet(bulletElements);
  }, 1000);
}

startInterval(); // start the interval initially
imageContainer.addEventListener("mouseenter", () => {
  //clear the autoplay when the mouse enter the slider
  clearInterval(interval);
});
imageContainer.addEventListener("mouseleave", () => {
  // return and trigger the interval again
  startInterval();
});

// features I will add later
/*
1. TODO: make a swiper to make the user able to swipe using mouse or touch screen
2. TODO: adding 3D effects during transitions
*/
