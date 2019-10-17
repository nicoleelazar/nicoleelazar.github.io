const copyMe = document.querySelector('.copy');
const emailButton = document.querySelector('.email-btn');
const emailArea = document.getElementById('hidden-content');
const year = document.getElementById('year');
const parallax = document.querySelector('.parallax');
const modals = document.querySelectorAll('.modal');
const modalBacking = document.getElementById('modal-backing');
const navBar = document.querySelector('.nav-bar');

const burger = document.getElementById('burger-check');
const mobileMenu = document.querySelectorAll('.nav-mobile-item');


// Update footer year
function updateYear() {
    year.innerHTML = `${new Date().getFullYear()} `;
}


// start at home page on re-load
$(document).ready(function () {
    $(this).scrollTop(0);
    $('#burger-check').prop('checked', false);

    updateYear();
});


//DISABLE VIDEO/ STOP DOWNLOAD FOR MOBILE
$(function () {
    let screenWidth = $(window).width();
    if (screenWidth > 850) {
        $('#hero-video').attr('autoplay', 'autoplay');
    }
});


// SMOOTH SCROLL - cross browser
$('.nav-bar a').on('click', function (e) {
    if (this.hash !== '') {
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 600);
    }
})

// NAV BAR - fade in color on scroll
function scrollAll() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        navBar.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        navBar.style.background = 'rgba(255, 255, 255, 0)';
    }
}
window.addEventListener('scroll', scrollAll);


// OPEN MODALS
function openModal(idName) {
    const modal = document.getElementById(idName);
    modal.style.display = 'block';

    //hide the body's scroll bar
    document.body.style.overflow = 'hidden';

    modalBacking.style.display = 'block';
}


// CLOSE MODALS
function closeModal(idName) {
    const modal = document.getElementById(idName);
    modal.style.display = 'none';

    //show the body's scroll bar
    document.body.style.overflow = 'auto';

    modalBacking.style.display = 'none';

}



// HOVER EFFECTS FOR 'EMAIL ME' DIV
function hovering() {
    //show message on hover
    copyMe.innerHTML = 'Copy to Clipboard';
    copyMe.style.color = 'var(--color-grey-light)';
}
emailButton.addEventListener('mouseover', hovering);

function notHovering() {
    copyMe.classList.remove('fade-copy');
    copyMe.innerHTML = '';
}
emailButton.addEventListener('mouseout', notHovering);


// SHOW EMAIL ADDRESS ON CLICK
function revealEmail() {
    emailArea.innerHTML = construction(false);

    copyMe.innerHTML = 'Copied!';
    copyMe.classList.add('fade-copy');

    //run copy to clipboard
    copyToClipboard();
}
emailButton.addEventListener('click', revealEmail);


// CONSTRUCT EMAIL ADDRESS 
function construction(argument = true) {
    let user;
    let domain;

    if (argument) {
        domain = 'oops' + '.' + 'oops';
        user = 'oops';
    } else {
        domain = 'gmail' + '.' + 'com';
        user = 'nicole' + '.' + 'elazar';
    }
    return (user + "@" + domain);
}


function copyToClipboard() {
    //temporarily create an input field to copy from
    let tempField = document.createElement('input');
    document.body.appendChild(tempField);
    tempField.value = construction(false);
    tempField.select();
    document.execCommand("copy");
    tempField.remove();
}


// MOBILE NAV - CLOSE ON CLICK
function closeMobileNav() {
    burger.checked = false;
}

for (let item of mobileMenu) {
    item.addEventListener('click', closeMobileNav);
}