(function () {
  const IMAGE_WIDTH = 600;
  let currentImageIndex = 0;

  const leftArrow = document.getElementsByClassName("left")[0];
  const rightArrow = document.getElementsByClassName("right")[0];
  const radio = document.getElementsByClassName("radio");
  const radioContainer = document.getElementsByClassName("radio-container")[0];
  const imageContainer = document.getElementsByClassName("image-container")[0];

  function changeImage() {
    radio[currentImageIndex].checked = true;
    imageContainer.style.left = `-${currentImageIndex * IMAGE_WIDTH}px`;
  }

  leftArrow.addEventListener("click", () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      changeImage();
    }
  });
  rightArrow.addEventListener("click", () => {
    if (currentImageIndex < 2) {
      currentImageIndex++;
      changeImage();
    }
  });

  radioContainer.addEventListener("click", (e) => {
    const key = e.target.getAttribute("key");
    if (key && key !== currentImageIndex) {
      currentImageIndex = key;
      changeImage();
    }
  });
})();
