// Gallery Section Pop-Up Image 

var modal = document.getElementById("popupModal");
    var modalImg = document.getElementById("popupImg");
    var closeBtn = document.getElementsByClassName("close")[0];
    var prevBtn = document.getElementsByClassName("prev")[0];
    var nextBtn = document.getElementsByClassName("next")[0];
    var images = Array.from(document.querySelectorAll(".gallery-section img"));
    var currentIndex = 0;

    function showImage(index) {
        currentIndex = index;
        modalImg.src = images[currentIndex].src;

        // Disable or hide arrows when at the edges
        prevBtn.style.display = (currentIndex === 0) ? "none" : "block";
        nextBtn.style.display = (currentIndex === images.length - 1) ? "none" : "block";
    }

    images.forEach((img, index) => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            showImage(index);
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }


    prevBtn.onclick = function() {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    }

    nextBtn.onclick = function() {
        if (currentIndex < images.length - 1) {
            showImage(currentIndex + 1);
        }
    }

// About Me Section Pop-Up Image
var aboutImg = document.getElementById("aboutMeImage");

    if (aboutImg) {
    aboutImg.addEventListener("dblclick", function () {
        modal.style.display = "block";
        modalImg.src = aboutImg.src;

        // Hide prev/next buttons since only one image
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";

        // Hide the menu when viewing image
        aboutMenu.style.display = "none";

        // Show the about text back if needed
        const aboutText = document.querySelector(".aboutme-text");
        if (aboutText) aboutText.style.display = "inline-block";
    });
}

    // Show menu on about image click
var aboutMenu = document.getElementById("aboutMenu");

if (aboutImg) {
    aboutImg.addEventListener("click", function () {
        const aboutText = document.querySelector(".aboutme-text");

        // If menu is showing, hide it and show the text again
        if (aboutMenu.style.display === "block") {
            aboutMenu.style.display = "none";
            if (aboutText) aboutText.style.display = "inline-block";
        } else {
            // If menu is hidden, show it and hide the text
            aboutMenu.style.display = "block";
            if (aboutText) aboutText.style.display = "none";
        }
    });
}

// Hide the menu and show the about text when clicking outside the image and the menu
// Hide the menu only if clicking outside the image, menu, and modals
window.addEventListener("click", function (e) {
    const clickedInsideMenu = aboutMenu.contains(e.target);
    const clickedAboutImage = e.target === aboutImg;
    const clickedInsideModal =
        personalInfoModal.contains(e.target) ||
        singingCoversModal.contains(e.target) ||
        skillsModal.contains(e.target);

    if (!clickedAboutImage && !clickedInsideMenu && !clickedInsideModal) {
        aboutMenu.style.display = "none";

        const aboutText = document.querySelector(".aboutme-text");
        if (aboutText) aboutText.style.display = "inline-block";
    }
});


const personalInfoModal = document.getElementById("personalInfoModal");
const closePersonalInfo = document.getElementById("closePersonalInfo");

personalInfoBtn.addEventListener("click", function () {
    // Show modal
    personalInfoModal.style.display = "block";
});

// Close modal
closePersonalInfo.addEventListener("click", function () {
    personalInfoModal.style.display = "none";
    aboutMenu.style.display = "block";
});

// Skills popup functionality
const skillsBtn = document.getElementById("skillsBtn");
const skillsModal = document.getElementById("skillsModal");
const closeSkillsModal = document.getElementById("closeSkillsModal");

if (skillsBtn && skillsModal && closeSkillsModal) {
    skillsBtn.addEventListener("click", function () {
        skillsModal.style.display = "block";
    });

    closeSkillsModal.addEventListener("click", function () {
        skillsModal.style.display = "none";
        aboutMenu.style.display = "block";
    });
}

// Singing Covers popup functionality
const singingCoversBtn = document.querySelector(".about-menu li:nth-child(2)");
const singingCoversModal = document.getElementById("singingCoversModal");
const closeSingingCovers = document.getElementById("closeSingingCovers");

if (singingCoversBtn && singingCoversModal && closeSingingCovers) {
    singingCoversBtn.addEventListener("click", function () {
        singingCoversModal.style.display = "block";
    });

    closeSingingCovers.addEventListener("click", function () {
        singingCoversModal.style.display = "none";
        aboutMenu.style.display = "block";
    });
}

// Make Singing Covers close button move top/bottom on scroll
if (singingCoversModal && closeSingingCovers) {
    singingCoversModal.addEventListener('scroll', function () {
        const scrollTop = singingCoversModal.scrollTop;
        const scrollHeight = singingCoversModal.scrollHeight;
        const clientHeight = singingCoversModal.clientHeight;

        // If near bottom, move button down
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            closeSingingCovers.classList.add('bottom-position');
        } else {
            closeSingingCovers.classList.remove('bottom-position');
        }
    });
}


// Contact form with Web3Forms
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if (contactForm && successMessage) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: formData
        });

        if (response.ok) {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
            contactForm.reset();
        } else {
            alert("There was an error sending your message. Please try again.");
        }
    });
}

// Auto-reset contact form on page load
window.addEventListener("pageshow", function () {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.reset();
    }
});

// Album cover spinning logic
document.querySelectorAll('.audio-list').forEach(audioList => {
    const containers = audioList.querySelectorAll('.album-container');
    const audios = audioList.querySelectorAll('audio');

    audios.forEach((audio, index) => {
        const container = containers[index];

        audio.addEventListener('play', () => {
            // Stop all other containers from spinning
            containers.forEach(c => c.classList.remove('spin'));
            audios.forEach(a => { if (a !== audio) a.pause(); });

            // Start spinning current container
            container.classList.add('spin');
        });

        audio.addEventListener('pause', () => {
            container.classList.remove('spin');
        });

        audio.addEventListener('ended', () => {
            container.classList.remove('spin');
        });
    });
});
