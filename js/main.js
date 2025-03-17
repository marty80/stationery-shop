document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init('p573ROyEWQsuWHA43');

    const form = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email');

    // Add animation classes to elements as they scroll into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .preview-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation states
    document.querySelectorAll('.feature-item, .preview-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Form submission handling
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const email = emailInput.value.trim();
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await emailjs.send('service_uiwoxtp', 'template_ib5jwik', {
                to_email: email,
                from_name: 'Cute Animal Stationery',
                message: 'Thank you for signing up for our waiting list!'
            });

            if (response.status === 200) {
                showMessage('Thank you for signing up! We\'ll keep you updated. 🎉', 'success');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            showMessage('Oops! Something went wrong. Please try again later.', 'error');
        }
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Message display helper
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Add success/error styles
        if (type === 'success') {
            formMessage.style.color = '#2ecc71';
        } else if (type === 'error') {
            formMessage.style.color = '#e74c3c';
        }

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}); 