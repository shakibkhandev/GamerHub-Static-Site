// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'transparent';
    }
});

// Search functionality
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function() {
    const inputs = searchBar.querySelectorAll('input');
    const searchQuery = inputs[0].value;
    const searchCategory = inputs[1].value;
    
    // You can implement actual search functionality here
    console.log('Search Query:', searchQuery);
    console.log('Category:', searchCategory);
    
    // Clear inputs after search
    inputs.forEach(input => input.value = '');
});

// Animate category cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Header scroll behavior
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100; // Minimum scroll before header starts hiding
let isScrollingUp = false;

// Function to handle navbar background
const handleNavbarBackground = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Don't change background if mobile menu is open
    if (navLinks.classList.contains('show')) {
        return;
    }
    
    // Add or remove scrolled class based on scroll position
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    handleNavbarBackground();
    
    // Don't hide header if we're near the top of the page
    if (currentScroll <= scrollThreshold) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        return;
    }

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        if (!isScrollingUp && !navLinks.classList.contains('show')) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
        }
        isScrollingUp = false;
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        isScrollingUp = true;
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Update mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
    body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : 'auto';
    
    // Keep navbar transparent when menu is open
    if (navLinks.classList.contains('show')) {
        navbar.classList.remove('scrolled');
    } else {
        handleNavbarBackground(); // Recheck scroll position when closing menu
    }
});

// Update close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        body.style.overflow = 'auto';
        handleNavbarBackground(); // Recheck scroll position when closing menu
    });
});

// Update close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && 
        !navLinks.contains(e.target) && 
        navLinks.classList.contains('show')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        body.style.overflow = 'auto';
        handleNavbarBackground(); // Recheck scroll position when closing menu
    }
});

// Prevent form submission on enter key
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.querySelector('.search-btn').click();
        }
    });
});
