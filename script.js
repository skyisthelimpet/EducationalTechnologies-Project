const menuButton = document.getElementById("nav_bar_icon");

window.onload = function () {
    menuButton.checked = false;
};

menuButton.addEventListener('change', () => {
    document.getElementById("side-menu").classList.toggle('w-0');
    document.getElementById("side-menu").classList.toggle('w-44');
});