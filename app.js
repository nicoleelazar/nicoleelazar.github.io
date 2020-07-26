const copyMe = document.querySelector(".copy");
const emailButton = document.querySelector(".email-btn");
const emailArea = document.getElementById("hidden-content");
const year = document.getElementById("year");
const modals = document.querySelectorAll(".modal");
const navBar = document.querySelector(".nav-bar");
const target = document.querySelector(".scroll");
const burger = document.getElementById("burger-check");
const mobileMenu = document.querySelectorAll(".nav-mobile-item");

const allProjectTiles = document.querySelector('.project-tiles');
const allClientTiles = document.querySelector('.client-tiles');
const modalBacking = document.getElementById('modal-backing');


// start at home page on re-load
$(document).ready(function () {
    $(this).scrollTop(0);
    $("#burger-check").prop("checked", false);

    updateYear();
});

// CONSTRUCT PROJECT GALLERY from Json
function getProjectData() {
    fetch('projects.json')
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                //contain each tile
                let tileContainer = document.createElement('div');
                tileContainer.classList.add('tile-container');
                if (item.clientProject) {
                    allClientTiles.appendChild(tileContainer)
                } else {
                    allProjectTiles.appendChild(tileContainer);
                }

                //grey tile overlay
                let tileOverlay = document.createElement('div');
                tileContainer.appendChild(tileOverlay);
                tileOverlay.classList.add('tile-overlay');

                //project title
                let tileTitle = document.createElement('p');
                tileOverlay.appendChild(tileTitle);
                tileTitle.classList.add('tile-heading');
                tileTitle.textContent = item.title;


                //project button
                let tileButton = document.createElement('button');
                tileOverlay.appendChild(tileButton);
                tileButton.classList.add('tile-btn');
                tileButton.textContent = item.btnDetails;

                //tile image
                let tileImage = document.createElement('div');
                tileContainer.appendChild(tileImage);
                tileImage.classList.add('tile-image');
                tileImage.style.backgroundImage = `url(${item.image})`;

                //project info
                let projectInfoContainer = document.createElement('div');
                projectInfoContainer.classList.add('project-tile-info');
                if (item.clientProject) {
                    allClientTiles.appendChild(projectInfoContainer);
                } else {
                    allProjectTiles.appendChild(projectInfoContainer);
                }

                let projectCaption = document.createElement('p');
                projectInfoContainer.appendChild(projectCaption);
                projectCaption.classList.add('project-caption');
                projectCaption.textContent = item.caption;

                let projectLanguage = document.createElement('p');
                projectInfoContainer.appendChild(projectLanguage);
                projectLanguage.classList.add('project-language');
                projectLanguage.textContent = item.languages;

                //create modal

                let modal = document.createElement('div');
                modalBacking.appendChild(modal);
                modal.classList.add('modal');

                let modalContent = document.createElement('div');
                modal.appendChild(modalContent);
                modalContent.classList.add('modal-content');

                let closeCross = document.createElement('span');
                modalContent.appendChild(closeCross);
                closeCross.classList.add('close');

                let modalInfo = document.createElement('div')
                modalContent.appendChild(modalInfo)
                modalInfo.classList.add('modal-info')

                let modalHeading = document.createElement('h1')
                modalInfo.appendChild(modalHeading)
                modalHeading.classList.add('modal-heading')
                modalHeading.textContent = item.title

                let subText = document.createElement('p')
                modalInfo.appendChild(subText)
                subText.classList.add('small-text')
                subText.textContent = item.projectYear

                let subHeading = document.createElement('p')
                modalInfo.appendChild(subHeading)
                subHeading.classList.add('sub-heading')
                subHeading.style.fontWeight = 'bold'
                subHeading.textContent = item.languages

                let modalImage = document.createElement('img')
                modalInfo.appendChild(modalImage)
                modalImage.classList.add('modal-image')
                modalImage.src = item.image

                let brief = document.createElement('p')
                modalInfo.appendChild(brief)
                brief.classList.add('brief')
                if (item.clientProject) {
                    brief.innerHTML = `<strong>Client: </strong>${item.client}`
                } else {
                    brief.innerHTML = `<strong>Brief: </strong>${item.brief}`
                }

                let highlights = document.createElement('p')
                modalInfo.appendChild(highlights)
                highlights.classList.add('highlights')
                if (item.clientProject) {
                    highlights.innerHTML = `<strong>My Role: </strong>${item.role}`
                } else {
                    highlights.innerHTML = `<strong>Highlights: </strong>${item.highlight}`
                }



                // code view link
                if (!item.clientProject) {
                    let viewCodeBtn = document.createElement('a');
                    modalInfo.appendChild(viewCodeBtn);
                    viewCodeBtn.classList.add('button', 'btn-modal');
                    viewCodeBtn.textContent = 'view code';
                    viewCodeBtn.href = item.codeLink;
                }

                // live view link
                let viewSiteBtn = document.createElement('a');
                modalInfo.appendChild(viewSiteBtn);
                viewSiteBtn.classList.add('button', 'btn-modal');
                viewSiteBtn.href = item.siteLink;
                if (item.clientProject) {
                    viewSiteBtn.textContent = 'view live site';
                } else {
                    viewSiteBtn.textContent = 'live view';
                }



                //open modal
                tileButton.addEventListener('click', () => {
                    modal.style.display = 'block';
                    //hide the body's scroll bar
                    document.body.style.overflow = 'hidden';
                    modalBacking.style.display = 'block';
                })

                projectCaption.addEventListener('click', () => {
                    modal.style.display = 'block';
                    //hide the body's scroll bar
                    document.body.style.overflow = 'hidden';
                    modalBacking.style.display = 'block';
                })

                //close modal
                closeCross.addEventListener('click', () => {
                    modal.style.display = 'none';
                    //show the body's scroll bar
                    document.body.style.overflow = 'auto';
                    modalBacking.style.display = 'none';
                })
                //close modal
                modalBacking.addEventListener('click', () => {
                    modal.style.display = 'none';
                    //show the body's scroll bar
                    document.body.style.overflow = 'auto';
                    modalBacking.style.display = 'none';
                })


            });
        })

        .catch((err) => {
            console.log(`An error occurred: ${err}`);
        });
}

getProjectData();


//------------------------------------------



// SMOOTH SCROLL - cross browser
$(".nav-bar a").on("click", function (e) {
    if (this.hash !== "") {
        e.preventDefault();

        const hash = this.hash;
        $("html, body").animate(
            {
                scrollTop: $(hash).offset().top,
            },
            600
        );
    }
});

// NAV BAR - fade in color on scroll
function scrollAll() {
    if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
    ) {
        navBar.style.background = "rgba(255, 255, 255, 0.8)";
    } else {
        navBar.style.background = "rgba(255, 255, 255, 0)";
    }
}
window.addEventListener("scroll", scrollAll);

//parallax
function parallax() {
    let scrolled = window.pageYOffset;
    let rate = scrolled * -0.8;

    target.style.transform = "translate3d(0px, " + rate + "px, 0px)";
}
window.addEventListener("scroll", parallax);

// Update footer year
function updateYear() {
    year.innerHTML = ` ${new Date().getFullYear()} `;
}


// HOVER EFFECTS FOR 'EMAIL ME' DIV
function hovering() {
    //show message on hover
    copyMe.innerHTML = "Copy to Clipboard";
    copyMe.style.color = "var(--color-grey-light)";
}
emailButton.addEventListener("mouseover", hovering);

function notHovering() {
    copyMe.classList.remove("fade-copy");
    copyMe.innerHTML = "";
}
emailButton.addEventListener("mouseout", notHovering);

// SHOW EMAIL ADDRESS ON CLICK
function revealEmail() {
    emailArea.innerHTML = construction(false);

    copyMe.innerHTML = "Copied!";
    copyMe.classList.add("fade-copy");

    //run copy to clipboard
    copyToClipboard();
}
emailButton.addEventListener("click", revealEmail);

// CONSTRUCT EMAIL ADDRESS
function construction(argument = true) {
    let user;
    let domain;

    if (argument) {
        domain = "oops" + "." + "oops";
        user = "oops";
    } else {
        domain = "gmail" + "." + "com";
        user = "nicole" + "." + "elazar";
    }
    return user + "@" + domain;
}

function copyToClipboard() {
    //temporarily create an input field to copy from
    let tempField = document.createElement("input");
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
    item.addEventListener("click", closeMobileNav);
}
