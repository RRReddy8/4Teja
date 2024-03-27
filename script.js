let screenWidth = screen.width;
let screenHeight = screen.height;

const mainImageDiv = document.getElementById("mainImage");
const fontAnimationDiv = document.getElementById("typing-animation");

function preloadImage(url) {
  const img = new Image();
  img.src = url;
  return img;
}
const mainImageFile = preloadImage("./teja-images/Main-image.jpg");
mainImageFile.setAttribute("class", "mainImage");
//img.setAttribute('class', className);
mainImageDiv.appendChild(mainImageFile);
// Body
let bodyElement = document.querySelector("body");
// bodyElement.style.backgroundColor = "rgb(255, 182, 193)";
// Main Image Container
let mainImageContainer = document.querySelector(".mainImageContainer");
mainImageContainer.style.width = `${screenWidth}px`;
mainImageContainer.style.height = `${screenHeight}px`;
mainImageContainer.style.position = "absolute";
mainImageContainer.style.top = 0;
mainImageContainer.style.left = 0;

// Main Image
let mainImage = document.querySelector(".mainImageDiv");
mainImage.style.top = `${screenHeight * 0.15}px`;
mainImage.style.height = `${screenWidth * 0.7}px`;
mainImage.style.width = `${screenWidth * 0.7}px`;
mainImage.style.borderRadius = "50%";
mainImage.style.position = "absolute";
let mainImageWidth = mainImage.offsetWidth;
console.log(mainImage.offsetWidth);
console.log((screenWidth - mainImageWidth) / 2);
mainImage.style.left = `${(screenWidth - mainImageWidth) / 2}px`;

// Typing animation
fontAnimationDiv.style.position = "absolute";
fontAnimationDiv.style.top = `${screenHeight * 0.6}px`;
fontAnimationDiv.style.left = `${screenWidth * 0.05}px`;
// fontAnimationDiv.style.left = `${(screenWidth - mainImageWidth-15) / 2}px`;

// Galary
let galary = document.querySelector(".galary");
galary.style.position = "absolute";
galary.style.top = `${screenHeight - 100}px`;
galary.style.height = `${screenHeight}px`;
galary.style.width = `${screenWidth}px`;

// Slide Image
let slideImage = document.querySelector(".slideImage");
// slideImage.style.height = `${screenHeight - 150}px`;
slideImage.style.height = `${screenHeight}px`;
slideImage.style.width = `${screenWidth}px`;

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
      setTimeout(type, 150); // Adjust typing speed
    } else if (index >= text.length && index < text.length + redText.length) {
      // Typing the red part
      element.innerHTML = `${text}<span class="red">${redText.substring(
        0,
        index - text.length + 1
      )}</span>`;
      index++;
      setTimeout(type, 150); // Adjust typing speed
    } else {
      // Reset for looping
      index = 0;
      element.innerHTML = ""; // Clear the container
      setTimeout(type, 2000); // Wait before starting the typing animation again
    }
  }

  type(); // Start typing animation
}

// Start the animation
startTypingAnimation();
