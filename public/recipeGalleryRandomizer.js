function loadRandomImages() {
    const imagePaths = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5', 'rec6', 'rec7', 'rec8', 'rec9'];
    const chosenImages = [];
  
    while (chosenImages.length < 3) {
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const imagePath = imagePaths[randomIndex];
      if (!chosenImages.includes(imagePath)) {
        chosenImages.push(imagePath);
      }
    }
  
    const expandableItems = document.querySelectorAll('.expandable .item-content img');
    expandableItems.forEach((img, index) => {
      img.src = `rec_menu_img/${chosenImages[index]}.png`; // Update this path if necessary
      img.alt = `Recommendation ${index + 1}`;
    });
  }
  
  // Event listener for the refresh button
  document.getElementById('refreshRecMenu').addEventListener('click', loadRandomImages);
  
  // Initial load of images
  document.addEventListener('DOMContentLoaded', loadRandomImages);
  