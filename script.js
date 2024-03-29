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
galary.style.top = `${screenHeight}px`;
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
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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
// let ctx = canvas.getContext("2d");

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

///////////////////////////
// Step 2: Encode the SVG data as a Data URL
// const svgBlob = new Blob([redBalloonSVG], {
//   type: "image/svg+xml;charset=utf-8"
// });
// const url = URL.createObjectURL(svgBlob);
// const img = new Image();
// img.src = url;

//============================//

let redBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#FF0000" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let coralBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#F88379" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let lightPinkBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#FFB6C1" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let goldBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#FFD700" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let springGreenBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#0FFF50" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let aquaBalloonSVG = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 221 512"><path fill="#00FFFF" d="M111 0c61 0 110 59 110 132 0 67-45 147-103 152l17 26c7 11 3 14-8 14H89c-8 0-7-8-4-14l17-25C44 282 0 199 0 132 0 59 49 0 110 0h1z"/><path fill="#fff" fill-rule="nonzero" d="M131 44a6 6 0 0 1 6-11 131 131 0 0 1 53 55 6 6 0 0 1-3 8 6 6 0 0 1-9-3 115 115 0 0 0-48-50z"/><path fill-rule="nonzero" d="m85 294 8-3c-5-3-11-5-17-6l-6-1-4 1-2 2a10 10 0 0 0 0 2l1 3c0 2 1 2 2 3l6 1 12-2zm41 9-10-4c13 35 8 63 2 95-5 30-12 65-1 111a5 5 0 0 1-10 3c-12-49-5-84 0-116 6-32 12-61-4-96l-14 7c-4 1-10 3-16 3-4 0-8-1-11-3a15 15 0 0 1-9-14l1-4c1-4 3-6 6-8s6-3 10-3l9 2c8 1 14 4 21 7l6 3a6 6 0 0 1 1 0h2l6-3c7-3 13-6 21-7l9-2c4 0 7 1 10 3s5 4 6 8a18 18 0 0 1 0 10c-2 4-4 7-8 8-3 2-7 3-12 3l-15-3zm-4-12 7 3 12 2 7-1c1-1 2-1 2-3l1-3a10 10 0 0 0-1-2l-1-2-4-1-6 1c-6 1-12 3-17 6z"/></svg>`;
let svgBalloons = [
  redBalloonSVG,
  coralBalloonSVG,
  lightPinkBalloonSVG,
  goldBalloonSVG,
  springGreenBalloonSVG,
  aquaBalloonSVG
];

// Function to create a balloon object
function createBalloon() {
  const size = window.innerWidth * 0.15; // 15% of screen width
  return {
    svg: svgBalloons[Math.floor(Math.random() * svgBalloons.length)], // Randomly select a balloon SVG
    x: Math.random() * window.innerWidth, // Random starting x position
    y: window.innerHeight + size, // Start off-screen at the bottom
    speed: Math.random() * 0.2 + 0.1, // Random speed for some variation
    size: size
  };
}

// Initialize an array of balloons
let balloons = Array.from({ length: 20 }, createBalloon);
// console.log(balloons);
let loadedBalloons = [];

function loadBalloon(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = url;
  });
}

Promise.all(
  balloons.map((balloon) => {
    let svgBlob = new Blob([balloon.svg], {
      type: "image/svg+xml;charset=utf-8"
    });
    let url = URL.createObjectURL(svgBlob);
    // balloon["img"] = loadBalloon(url);
    return loadBalloon(url);
  })
).then((images) => {
  let index = 0;
  images.forEach((img) => {
    // console.log(balloons[index]);
    // console.log(index, Math.random(), Math.random() * 0.1);
    balloons[index]["img"] = img;
    // console.log(balloons[index]);
    index++;
  });
  // console.log(images);
  // loadedBalloons = images;
  requestAnimationFrame(animate);
});

// Get the canvas and context
// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastTime = 0;
let subBalloons = [];

function pickingBalloons() {
  subBalloons = Array.from(
    { length: 5 },
    () => balloons[Math.floor(Math.random() * 20)]
  );
}

pickingBalloons();
// Animation loop
function animate(time) {
  // console.log(loadedBalloons.length);
  const deltaTime = time - lastTime;
  lastTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // balloons.forEach((balloon) => {
  subBalloons.forEach((balloon) => {
    // console.log(balloon);
    balloon.y -= balloon.speed * deltaTime; // Move the balloon based on its speed and deltaTime
    if (balloon.y < -balloon.size) {
      // Reset the balloon if it goes off the top
      balloon.y = canvas.height + balloon.size;
      balloon.x = Math.random() * canvas.width;
    }

    ctx.drawImage(
      balloon.img,
      balloon.x,
      balloon.y,
      balloon.size,
      balloon.size * 2
    );
  });

  requestAnimationFrame(animate);
}
setInterval(pickingBalloons, 30000);

//============================//
// // const canvas = document.getElementById('balloonCanvas');
// const context = canvas.getContext("2d");
// const COLUMN_WIDTH = 100; // Width of each vertical segment
// const NUM_COLUMNS = Math.ceil(canvas.width / COLUMN_WIDTH);
// console.log("NUM_COLUMNS", NUM_COLUMNS);
// const columns = Array.from({ length: NUM_COLUMNS }, () => []);
// let mainBalloonColor = "";

// context.drawImage(img, 0, 0, 500, 500);
// console.log(img);
// class Balloon {
//   constructor(context, path, x, y) {
//     this.context = context;
//     this.path = new Path2D(path);
//     /// our
//     this.mainBalloonSVGPath = new Path2D(main_balloon_svg_path);
//     this.balloonAddonSVGPath = new Path2D(balloon_addons_svg_path);
//     this.balloonStringSVGPath = new Path2D(balloon_string_svg_path);
//     this.mainBalloonColor = "#E30713";
//     this.balloonAddonColor = "#fff";
//     this.balloonStringColor = "#333";
//     /// our end
//     this.x = x;
//     this.y = y;
//     this.columnIndex = Math.floor(this.x / COLUMN_WIDTH);
//   }

//   draw() {
//     this.context.fillStyle = this.mainBalloonColor;
//     this.context.fill(this.mainBalloonSVGPath);
//     this.context.fillStyle = this.balloonAddonColor;
//     this.context.fill(this.balloonAddonSVGPath);
//     this.context.fillStyle = this.balloonStringColor;
//     this.context.fill(this.balloonStringSVGPath);
//   }

//   update() {
//     this.y -= 2; // Adjust speed as needed
//     // Check if the balloon has moved to a new column
//     const newColumnIndex = Math.floor(this.x / COLUMN_WIDTH);
//     if (newColumnIndex !== this.columnIndex) {
//       // Remove from old column and add to new column
//       const index = columns[this.columnIndex].indexOf(this);
//       columns[this.columnIndex].splice(index, 1);
//       columns[newColumnIndex].push(this);
//       this.columnIndex = newColumnIndex;
//     }
//   }
// }

// // Populate columns with balloons
// for (let i = 0; i < 80; i++) {
//   const x = Math.random() * canvas.width;
//   const y = canvas.height;
//   const balloon = new Balloon(context, mainBalloonColor, x, y);
//   columns[balloon.columnIndex].push(balloon);
// }

// // Animation loop
// function animate() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   columns.forEach((column) => {
//     column.forEach((balloon) => {
//       balloon.draw();
//       balloon.update();
//     });
//   });
//   requestAnimationFrame(animate);
// }

// // Start the animation
// animate();

// // Touch event listener
// canvas.addEventListener("touchstart", function (event) {
//   const rect = canvas.getBoundingClientRect();
//   const touchX = event.touches[0].clientX - rect.left;
//   const columnIndex = Math.floor(touchX / COLUMN_WIDTH);
//   // Only check balloons in the touched column
//   columns[columnIndex] = columns[columnIndex].filter((balloon) => {
//     return !context.isPointInPath(
//       balloon.path,
//       touchX,
//       event.touches[0].clientY - rect.top
//     );
//   });
// });
