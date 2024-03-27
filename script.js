let screenWidth = screen.width;
let screenHeight = screen.height;

// Body
let bodyElement = document.querySelector("body");
bodyElement.style.backgroundColor = "purple";
// Main Image Container
let mainImageContainer = document.querySelector(".mainImageContainer");
mainImageContainer.style.width = `${screenWidth}px`;
mainImageContainer.style.height = `${screenHeight}px`;
mainImageContainer.style.position = "absolute";
mainImageContainer.style.top = 0;
mainImageContainer.style.left = 0;

// Main Image
let mainImage = document.querySelector(".mainImage");
mainImage.style.top = `${screenHeight * 0.15}px`;
mainImage.style.height = `${screenWidth * 0.7}px`;
mainImage.style.width = `${screenWidth * 0.7}px`;
mainImage.style.borderRadius = "50%";
mainImage.style.position = "absolute";
let mainImageWidth = mainImage.offsetWidth;
console.log(mainImage.offsetWidth);
console.log((screenWidth - mainImageWidth) / 2);
mainImage.style.left = `${(screenWidth - mainImageWidth) / 2}px`;

// Galary
let galary = document.querySelector(".galary");
galary.style.position = "absolute";
galary.style.top = `${screenHeight - 100}px`;
galary.style.height = `${screenHeight}px`;
galary.style.width = `${screenWidth}px`;

// Slide Image
let slideImage = document.querySelector(".slideImage");
slideImage.style.height = `${screenHeight - 150}px`;
slideImage.style.width = `${screenWidth}px`;

// Slide Image Info
let slideImageInfo = document.querySelector(".slideImageInfo");
slideImageInfo.style.height = "150px";
slideImageInfo.style.width = `${screenWidth}`;

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
    console.log(window.scrollX, window.scrollY);
    // window.scrollTo({ top: screenHeight, behavior: "auto" });
    // window.scrollTo({ top: screenHeight, behavior: "smooth" });
    window.scroll(0, screenHeight);
    console.log(window.scrollX, window.scrollY);
  } else if (gestureState === "Swipe Down") {
    window.scroll(0, 0);
  }
});
console.log("Screen height", screenHeight);
console.log("Document height", document.documentElement.scrollHeight);
let ctx = canvas.getContext("2d");
