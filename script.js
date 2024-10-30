
const menuButton = document.getElementById("nav_bar_icon");


window.onload = function () {
    menuButton.checked = false; //TO BE SURE THAT ICON IS RESET AFTER REFRESH
};

menuButton.addEventListener('change', () => {
    document.getElementById("side-menu").classList.toggle('w-0');
    document.getElementById("side-menu").classList.toggle('w-44'); // we are just toggling width classes of our side menu 
});

document.getElementById("blog-btn").addEventListener('click', () => {
    alert('Coming soon')
})


