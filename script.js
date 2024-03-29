let screenWidth = screen.width;
let screenHeight = screen.height;

let currentIndex = 0;
let imagesToPreload = 20;
let preloadedImages = [];
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

function mainImageInit(image) {
  image.setAttribute("id", "mainImage");
  image.style.top = `${screenHeight * 0.15}px`;
  image.style.height = `${screenWidth * 0.7}px`;
  image.style.width = `${screenWidth * 0.7}px`;
  image.style.borderRadius = "50%";
  image.style.position = "absolute";
  return image;
}

//Slide Image
function slideImageInit(element) {
  element.setAttribute("id", "slideImage");
  element.style.height = `${screenHeight}px`;
  element.style.width = `${screenWidth}px`;
  element.style.objectFit = "contain";
  return element;
}

async function preloadImage(url) {
  try {
    const response = await fetch(url);
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    let imageElement = document.createElement("img");
    imageElement.src = imageObjectURL;
    return imageElement;
  } catch (error) {
    console.log(error);
  }
}

function preloadImages(startIndex) {
  for (
    let i = startIndex;
    i < startIndex + imagesToPreload && i < imageUrls.length;
    i++
  ) {
    preloadImage(imageUrls[i]).then((image) => preloadedImages.push(image));
  }
}

// Typing animation text creation and position
const fontAnimationDiv = document.getElementById("typing-animation");
fontAnimationDiv.style.position = "absolute";
fontAnimationDiv.style.top = `${screenHeight * 0.6}px`;
fontAnimationDiv.style.left = `${screenWidth * 0.05}px`;

// Main Image Container
let mainImageContainer = document.querySelector(".mainImageContainer");
mainImageContainer.style.width = `${screenWidth}px`;
mainImageContainer.style.height = `${screenHeight}px`;
mainImageContainer.style.position = "absolute";
mainImageContainer.style.top = 0;
mainImageContainer.style.left = 0;

//for main image loading
preloadImage("./teja-images/Main-image.jpg").then((mainImage) => {
  mainImage = mainImageInit(mainImage);
  mainImageContainer.appendChild(mainImage);
  let mainImageWidth = mainImage.offsetWidth;
  console.log(mainImage.offsetWidth);
  console.log((screenWidth - mainImageWidth) / 2);
  mainImage.style.left = `${(screenWidth - mainImageWidth) / 2}px`;
});

// Initial preload
preloadImages(currentIndex);

// Galary
let galary = document.querySelector(".galary");
galary.style.position = "absolute";
galary.style.top = `${screenHeight - 100}px`;
galary.style.height = `${screenHeight}px`;
galary.style.width = `${screenWidth}px`;

preloadImage("./teja-images/mar14.jpg").then((image) => {
  image = slideImageInit(image);
  galary.appendChild(image);
});

//Slide Image
// let slideImageFile = preloadImage("./teja-images/IMG-20230513-WA0005.jpg");
//img.setAttribute('class', className);
// Body
// let bodyElement = document.querySelector("body");
// bodyElement.style.backgroundColor = "rgb(255, 182, 193)";

// fontAnimationDiv.style.left = `${(screenWidth - mainImageWidth-15) / 2}px`;

// Slide Image

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
  touchStartPosision = {
    X: e.targetTouches[0].clientX,
    Y: e.targetTouches[0].clientY
  };
});

window.addEventListener("touchmove", (e) => {
  //   e.preventDefault();
});

window.addEventListener("touchend", (e) => {
  touchEndPosision = {
    X: e.changedTouches[0].clientX,
    Y: e.changedTouches[0].clientY
  };
  let X_POS_DIFF = touchStartPosision.X - touchEndPosision.X;
  let Y_POS_DIFF = touchStartPosision.Y - touchEndPosision.Y;

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
    // Update the slideImage
    let slideImage = document.getElementById("slideImage");
    let parentElement = slideImage.parentElement;
    let newSlideImg = preloadedImages[currentIndex];
    newSlideImg = slideImageInit(newSlideImg);
    parentElement.replaceChild(newSlideImg, slideImage);
  } else if (gestureState === "Swipe Left") {
    currentIndex++;
    if (currentIndex > preloadedImages.length - 15) {
      preloadImages(currentIndex + 3);
    }
    // Update the slideImage
    let slideImage = document.getElementById("slideImage");
    let parentElement = slideImage.parentElement;
    let newSlideImg = preloadedImages[currentIndex];
    newSlideImg = slideImageInit(newSlideImg);
    parentElement.replaceChild(newSlideImg, slideImage);
  }

  console.log("Current index", currentIndex);
  console.log("preloadedImages len", preloadedImages.length);
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
