// script.js - Contact Form Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.querySelector('.contact-form form');
    const fullnameInput = document.querySelector('input[name="fullname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');
    const submitBtn = document.querySelector('button[type="submitBtn"]');
    
    // Error Elements (dynamically create them)
    const createErrorElement = (inputElement) => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        return errorElement;
    };
    
    const nameError = createErrorElement(fullnameInput);
    const emailError = createErrorElement(emailInput);
    const messageError = createErrorElement(messageInput);
    
    // Success Message Element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    
    // Form Validation Functions
    const validateName = () => {
        if (fullnameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your full name';
            fullnameInput.classList.add('input-error');
            return false;
        }
        nameError.textContent = '';
        fullnameInput.classList.remove('input-error');
        return true;
    };
    
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('input-error');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
        return true;
    };
    
    const validateMessage = () => {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message';
            messageInput.classList.add('input-error');
            return false;
        }
        messageError.textContent = '';
        messageInput.classList.remove('input-error');
        return true;
    };
    
    // Event Listeners for Real-time Validation
    fullnameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Input Focus Effects
    const inputs = [fullnameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.5)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
    
    // Form Submission Handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Disable submit button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Show success message
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });
    
    // Add basic styling through JavaScript (minimal - should be in CSS ideally)
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: -0.5rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        .input-error {
            border-color: #e74c3c !important;
        }
        .success-message {
            background-color: #2ecc71;
            color: white;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            display: none;
        }
    `;
    document.head.appendChild(style);
});