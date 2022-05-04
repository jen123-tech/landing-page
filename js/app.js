/**
 * Define Global Variables
 * 
*/
let allSections = ["Section 1", "Section 2", "Section 3", "Section 4"];
const navSections = document.querySelectorAll('section[data-nav]');
const navMenu = document.querySelector('#navbar__list');
let allLinks;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Check if a section is in view port
let inViewport = (rect)=> {
    return (
        rect.top <= 150 &&
        rect.left >= 0 &&
        rect.bottom >= 150 &&
        rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let buildNav = ()=> {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < allSections.length; i++) {
        const liTag = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.setAttribute("href", `#${navSections[i].id}`);
        aTag.classList.add("menu__link");
        aTag.innerHTML = allSections[i];
        liTag.appendChild(aTag);
        fragment.appendChild(liTag);
    }

    navMenu.append(fragment);
    allLinks = document.querySelectorAll('a[href*="section"]');
}



// Add class 'active' to section, check if current section is visible in the viewport and add active class name
let showActiveClass = ()=> {
    for (let i = 0; i < allSections.length; i++) {        
        const currStatus = inViewport(navSections[i].getBoundingClientRect());
        if (currStatus) {
            allLinks[i].classList.add("your-active-class");
            navSections[i].classList.add("your-active-class");
        } else {
            allLinks[i].classList.remove("your-active-class");
            navSections[i].classList.remove("your-active-class");
        }
    }
}


// Scroll to anchor ID using scrollTO event
let scrollToSection = (evt)=> {
    evt.preventDefault();
    const theLink = evt.target.hash;

    let target = document.querySelector(theLink);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build navigation menu
buildNav();

// Activate section on link click 
navMenu.addEventListener('click', scrollToSection);

// Set sections as active (highlight section and nav if section is in viewport)
document.addEventListener("scroll", showActiveClass);


