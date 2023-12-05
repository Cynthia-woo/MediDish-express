//get all elements with ".expandable"
const expandableItems = document.querySelectorAll('.expandable');

//add event listener for all expandable items
expandableItems.forEach(item => {
    item.addEventListener('click', () => {
        // if contains expand, close others
        if (!item.classList.contains('expand')) {
            expandableItems.forEach(el => {
                el.classList.remove('expand');
            });
            item.classList.add('expand');
        } else {
            // otherwise, fold current
        }
    });
});

const botImage = document.getElementById("botImage");
const imageSources = ["ui_img/bot.png", "ui_img/bot_eyes_closed.png"];

setInterval(function () {
    let currentIndex = 0;
    currentIndex = (currentIndex + 1) % imageSources.length;
    botImage.src = imageSources[currentIndex];

    let nextIndex = (currentIndex + 1) % imageSources.length;
    setTimeout(function () {
        botImage.src = imageSources[nextIndex];
    }, 100);

    setTimeout(function () {
        botImage.src = imageSources[currentIndex];
    }, 2000);
}, 2200);

//click return button to close the right side recommendation box
document.addEventListener("DOMContentLoaded", function () {
    const returnIcon = document.getElementById("returnIcon");
    const listContainer = document.getElementById("listContainer");

    let isSidebarVisible = true;

    returnIcon.addEventListener("click", function () {
        isSidebarVisible = !isSidebarVisible;

        if (isSidebarVisible) {
            listContainer.style.display = "block";
            returnIcon.innerHTML = '<img src="ui_img/back.png" alt="Return Icon" width="30" height="25">';
        } else {
            listContainer.style.display = "none";
            returnIcon.innerHTML = '<img src="ui_img/list.png" alt="Recommend Icon" width="30" height="25">';
        }
    });
});
