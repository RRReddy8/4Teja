let screenWidth = screen.width;
let screenHeight = screen.height;

let positionIndex = 0;
let imageUrls = [
  "./teja-images/IMG-20230326-WA0006.jpg",
  "./teja-images/IMG-20231002-WA0008.jpg",
  "./teja-images/IMG-20240111-WA0011.jpg",
  "./teja-images/IMG_20230521_154115.jpg",
  "./teja-images/IMG_20231222_185919.jpg",
  "./teja-images/IMG_20240211_174719.jpg",
  "./teja-images/mar11-1.jpg",
  "./teja-images/IMG-20230513-WA0004.jpg",
  "./teja-images/IMG-20230513-WA0005.jpg",
  "./teja-images/IMG-20230513-WA0008.jpg",
  "./teja-images/IMG-20230513-WA0006.jpg",
  "./teja-images/IMG-20230617-WA0000.jpg",
  "./teja-images/IMG_20220811_164225_178.jpg",
  "./teja-images/IMG-20231124-WA0022.jpg",
  "./teja-images/IMG-20240111-WA0005.jpg",
  "./teja-images/IMG_20231210_174311.jpg",
  "./teja-images/IMG_20230119_223445_243.jpg",
  "./teja-images/IMG_20240203_205951.jpg",
  "./teja-images/IMG_20231001_175733.jpg",
  "./teja-images/feb14-1.jpg",
  "./teja-images/mar14.jpg",
  "./teja-images/IMG-20240111-WA0007.jpg",
  "./teja-images/IMG_20231001_185611.jpg",
  "./teja-images/IMG_20231210_181445.jpg",
  "./teja-images/IMG-20231124-WA0014.jpg"
];
// let urlsArrayLength = imageurls.length;

// const mainImageDiv = document.getElementById("mainImage");
const fontAnimationDiv = document.getElementById("typing-animation");

function preloadImage(url) {
  const img = new Image();
  img.src = url;
  return img;
}

// Image Preloading Logic

let currentIndex = 0;
let imagesToPreload = 10;
let preloadedImages = [];
// let imageUrls = []; // Your array of 130 image URLs

// Function to preload images
function preloadImages(startIndex) {
  preloadedImages = [];
  for (
    let i = startIndex;
    i < startIndex + imagesToPreload && i < imageUrls.length;
    i++
  ) {
    let img = new Image();
    img.src = imageUrls[i];
    preloadedImages.push(img);
  }
}

// Initial preload
preloadImages(currentIndex);

// // Function to update the image on swipe
// function updateImageOnSwipe(direction) {
//   if (direction === "left") {
//     currentIndex++;
//     if (currentIndex > preloadedImages.length - 4) {
//       preloadImages(currentIndex + 3);
//     }
//   } else if (direction === "right") {
//     currentIndex--;
//     if (currentIndex < 0) {
//       currentIndex = 0; // Prevent going into negative index
//     }
//   }

//   // Update the src of the slideImage
//   let slideImage = document.querySelector(".slideImage");
//   slideImage.src = preloadedImages[currentIndex].src;
// }

// Event listeners for swipe events
// You'll need to implement the logic to detect swipes and call updateImageOnSwipe with 'left' or 'right'

// Main Image Container
let mainImageContainer = document.querySelector(".mainImageContainer");
mainImageContainer.style.width = `${screenWidth}px`;
mainImageContainer.style.height = `${screenHeight}px`;
mainImageContainer.style.position = "absolute";
mainImageContainer.style.top = 0;
mainImageContainer.style.left = 0;

// // Main Image div
// let mainImage1 = document.querySelector(".mainImageDiv");
// mainImage1.style.top = `${screenHeight * 0.15}px`;
// mainImage1.style.height = `${screenWidth * 0.7}px`;
// mainImage1.style.width = `${screenWidth * 0.7}px`;
// mainImage1.style.borderRadius = "50%";
// mainImage1.style.position = "absolute";
// let mainImageWidth1 = mainImage1.offsetWidth;
// console.log(mainImage1.offsetWidth);
// console.log((screenWidth - mainImageWidth1) / 2);
// mainImage1.style.left = `${(screenWidth - mainImageWidth1) / 2}px`;

const mainImage = preloadImage("./teja-images/Main-image.jpg");
mainImage.setAttribute("id", "mainImage");
mainImage.style.top = `${screenHeight * 0.15}px`;
mainImage.style.height = `${screenWidth * 0.7}px`;
mainImage.style.width = `${screenWidth * 0.7}px`;
mainImage.style.borderRadius = "50%";
mainImage.style.position = "absolute";
mainImageContainer.appendChild(mainImage);
let mainImageWidth = mainImage.offsetWidth;
console.log(mainImage.offsetWidth);
console.log((screenWidth - mainImageWidth) / 2);
mainImage.style.left = `${(screenWidth - mainImageWidth) / 2}px`;

// Typing animation
fontAnimationDiv.style.position = "absolute";
fontAnimationDiv.style.top = `${screenHeight * 0.6}px`;
fontAnimationDiv.style.left = `${screenWidth * 0.05}px`;

//Slide Image
let slideImageFile = preloadImage("./teja-images/IMG-20230513-WA0005.jpg");
//img.setAttribute('class', className);
// Body
let bodyElement = document.querySelector("body");
// bodyElement.style.backgroundColor = "rgb(255, 182, 193)";

// fontAnimationDiv.style.left = `${(screenWidth - mainImageWidth-15) / 2}px`;

// Galary
let galary = document.querySelector(".galary");
galary.style.position = "absolute";
galary.style.top = `${screenHeight - 100}px`;
galary.style.height = `${screenHeight}px`;
galary.style.width = `${screenWidth}px`;

// Slide Image
function slideImageInit(element) {
  element.style.height = `${screenHeight}px`;
  element.style.width = `${screenWidth}px`;
  element.style.objectFit = "contain";
  return element;
}
let slideImage = slideImageInit(slideImageFile);
slideImage.setAttribute("id", "slideImage");
galary.appendChild(slideImage);
// let slideImage = document.querySelector(".slideImage");
// let slideImage = document.querySelector(".slideImage");
// slideImage.style.height = `${screenHeight - 150}px`;
// slideImage.style.height = `${screenHeight}px`;
// slideImage.style.width = `${screenWidth}px`;

// // Slide Image Info
// let slideImageInfo = document.querySelector(".slideImageInfo");
// slideImageInfo.style.height = "150px";
// slideImageInfo.style.width = `${screenWidth}`;

// Canvas
let canvas = document.querySelector("canvas");
canvas.style.background = "transparent";
canvas.width = screenWidth;
canvas.height = screenHeight;
let touchStartPosision = {
  X: null,
  Y: null
};
let touchEndPosision = {
  X: null,
  Y: null
};
let gestureState = null;

window.addEventListener("touchstart", (e) => {
  //   console.log("touch start");
  //   console.log(e);
  touchStartPosision = {
    X: e.targetTouches[0].clientX,
    Y: e.targetTouches[0].clientY
  };
});

window.addEventListener("touchmove", (e) => {
  //   e.preventDefault();
});

window.addEventListener("touchend", (e) => {
  //   console.log("touch end");
  //   console.log(e);
  touchEndPosision = {
    X: e.changedTouches[0].clientX,
    Y: e.changedTouches[0].clientY
  };
  let X_POS_DIFF = touchStartPosision.X - touchEndPosision.X;
  let Y_POS_DIFF = touchStartPosision.Y - touchEndPosision.Y;
  //   console.log("X Pos Diff ", touchStartPosision.X - touchEndPosision.X);
  //   console.log("Y Pos Diff ", touchStartPosision.Y - touchEndPosision.Y);

  // Touch gesture detection code
  if (Math.abs(X_POS_DIFF) <= 5 && Math.abs(Y_POS_DIFF) <= 5) {
    // console.log("Toch");
    gestureState = "Toch";
  } else if (Math.abs(X_POS_DIFF) > Math.abs(Y_POS_DIFF)) {
    if (X_POS_DIFF > 0) {
      //   console.log("Swipe Left");
      gestureState = "Swipe Left";
    } else {
      //   console.log("Swipe Right");
      gestureState = "Swipe Right";
    }
  } else {
    if (Y_POS_DIFF > 0) {
      //   console.log("Swipe Up");
      gestureState = "Swipe Up";
    } else {
      //   console.log("Swipe Down");
      gestureState = "Swipe Down";
    }
  }

  //
  console.log(gestureState);
  if (gestureState === "Swipe Up") {
    if (window.screenY <= screenHeight - 150) {
      console.log(window.scrollX, window.scrollY);
      window.scroll(0, screenHeight);
      console.log(window.scrollX, window.scrollY);
    }
  } else if (gestureState === "Swipe Down") {
    window.scroll(0, 0);
  } else if (gestureState === "Swipe Right") {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = 0; // Prevent going into negative index
    }

    // Update the src of the slideImage
    slideImage = document.getElementById("slideImage");
    slideImage.src = preloadedImages[currentIndex].src;
    // let newSlideImg = preloadedImages[currentIndex];
    // galary.replaceChild(slideImage, newSlideImg);
  } else if (gestureState === "Swipe Left") {
    currentIndex++;
    if (currentIndex > preloadedImages.length - 4) {
      preloadImages(currentIndex + 3);
    }

    // Update the src of the slideImage
    slideImage = document.getElementById("slideImage");
    slideImage.src = preloadedImages[currentIndex].src;
    // let newSlideImg = preloadedImages[currentIndex];
    // galary.replaceChild(slideImage, newSlideImg);
  }
  // Update the src of the slideImage
  let slideImage = document.getElementById("slideImage");
  slideImage.src = preloadedImages[currentIndex].src;
  console.log(preloadImages.length);
});
console.log("Screen height", screenHeight);
console.log("Document height", document.documentElement.scrollHeight);
let ctx = canvas.getContext("2d");

// Typing animation
function startTypingAnimation() {
  const element = document.getElementById("typing-animation");
  const text = "Happy Birthday ";
  const redText = "Teja";
  let index = 0;

  function type() {
    if (index < text.length) {
      // Typing the non-red part
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 70); // Adjust typing speed
    } else if (index >= text.length && index < text.length + redText.length) {
      // Typing the red part
      element.innerHTML = `${text}<span class="red">${redText.substring(
        0,
        index - text.length + 1
      )}</span>`;
      index++;
      setTimeout(type, 200); // Adjust typing speed
    } else {
      // Reset for looping
      index = 0;
      element.innerHTML = ""; // Clear the container
      setTimeout(type, 500); // Wait before starting the typing animation again
    }
  }

  type(); // Start typing animation
}

// Start the animation
startTypingAnimation();
