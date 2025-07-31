// JavaScript for Deva's International Website

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const subscribeForm = document.getElementById('subscribe-form');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Subscription Form
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real application, you would send this to your server
                // For demo purposes, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, imgOptions);
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});