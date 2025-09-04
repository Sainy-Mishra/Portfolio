// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    
    // Initialize typing animation after a short delay to ensure DOM is ready
    setTimeout(initTypingAnimation, 500);
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(17, 24, 39, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                }
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(17, 24, 39, 0.95)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            }
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150; // Increased offset for better detection
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Update navbar background for theme change
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (newTheme === 'dark') {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
}

// Update theme icon
function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .stat-item, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300 + (index * 100)); // Stagger the animations
                });
                skillObserver.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Clear previous errors
        clearFormErrors();
        
        // Validate each field
        formInputs.forEach(input => {
            const value = input.value.trim();
            const fieldName = input.name;
            
            formData[fieldName] = value;
            
            // Required field validation
            if (!value) {
                showError(fieldName, 'This field is required');
                isValid = false;
                return;
            }
            
            // Email validation
            if (fieldName === 'email' && !isValidEmail(value)) {
                showError(fieldName, 'Please enter a valid email address');
                isValid = false;
                return;
            }
            
            // Name validation (at least 2 characters)
            if (fieldName === 'name' && value.length < 2) {
                showError(fieldName, 'Name must be at least 2 characters long');
                isValid = false;
                return;
            }
            
            // Subject validation (at least 5 characters)
            if (fieldName === 'subject' && value.length < 5) {
                showError(fieldName, 'Subject must be at least 5 characters long');
                isValid = false;
                return;
            }
            
            // Message validation (at least 10 characters)
            if (fieldName === 'message' && value.length < 10) {
                showError(fieldName, 'Message must be at least 10 characters long');
                isValid = false;
                return;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            submitForm(formData);
        }
    });
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this.name);
        });
    });
}

// Form validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '#ef4444';
    }
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--border-color)';
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-control');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    inputElements.forEach(input => {
        input.style.borderColor = 'var(--border-color)';
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(fieldName);
    
    if (!value) {
        showError(fieldName, 'This field is required');
        return false;
    }
    
    switch (fieldName) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'name':
            if (value.length < 2) {
                showError(fieldName, 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showError(fieldName, 'Subject must be at least 5 characters long');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showError(fieldName, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    return true;
}

// Simulate form submission
function submitForm(formData) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    if (!submitButton) return;
    
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Thank you! Your message has been sent successfully.');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Form submitted with data:', formData);
    }, 2000);
}

function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.textContent = message;
    
    // Add animation keyframes
    if (!document.getElementById('success-animation')) {
        const style = document.createElement('style');
        style.id = 'success-animation';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links - FIXED VERSION
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20; // Extra padding
                
                // Use smooth scrolling
                window.scrollTo({
                    top: Math.max(0, offsetTop), // Ensure we don't scroll to negative position
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Typing animation for hero section - FIXED VERSION
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) {
        console.log('Typing text element not found');
        return;
    }
    
    const text = 'John Doe'; // The name to type
    typingText.textContent = ''; // Clear existing text
    typingText.style.borderRight = '3px solid var(--primary-color)'; // Ensure cursor is visible
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150); // Slightly slower for better effect
        } else {
            // Keep cursor blinking for a few seconds then remove it
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 2000);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
}

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Add ripple animation if not already added
            if (!document.getElementById('ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .image-placeholder');
        parallaxElements.forEach(element => {
            if (element) {
                const speed = scrolled * 0.1; // Reduced speed for subtlety
                element.style.transform = `translateY(${speed}px)`;
            }
        });
    });
    
    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 30; // Slower animation
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + suffix;
            }, 50);
        });
    };
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(aboutSection);
    }
    
    // Page loading complete - remove any loading states
    window.addEventListener('load', function() {
        // Trigger any final animations
        const heroElements = document.querySelectorAll('.fade-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});