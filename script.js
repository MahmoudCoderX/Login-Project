document.addEventListener('DOMContentLoaded', function() {
    // --- Animation: Circles and Stars in Background ---
    function createBackgroundCircles() {
        const container = document.querySelector('.background-circles');
        if (!container) return;
        for (let i = 0; i < 8; i++) {
            const circle = document.createElement('div');
            circle.className = 'background-circle';
            const size = Math.random() * 80 + 40;
            circle.style.width = size + 'px';
            circle.style.height = size + 'px';
            circle.style.left = Math.random() * 100 + 'vw';
            circle.style.top = Math.random() * 100 + 'vh';
            circle.style.background = `radial-gradient(circle, #5842F5 0%, transparent 80%)`;
            circle.style.animationDelay = (Math.random() * 8) + 's';
            container.appendChild(circle);
        }
    }
    function createBackgroundStars() {
        const container = document.querySelector('.background-stars');
        if (!container) return;
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'background-star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = (Math.random() * 2.5) + 's';
            container.appendChild(star);
        }
    }
    createBackgroundCircles();
    createBackgroundStars();

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordButton = document.getElementById('forgotPasswordButton');
    const signUpButton = document.getElementById('signUpButton');
    const mouseTrail = document.querySelector('.mouse-trail');

    let particles = [];
    let connections = [];
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocity = { x: 0, y: 0 };
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let isMobile = window.innerWidth <= 768;

    if (mouseTrail) {
        function createFloatingParticles() {
            const particleCount = isMobile ? 8 : 15;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                document.body.appendChild(particle);
                particles.push(particle);
            }
        }

        function createConnections() {
            const connectionCount = isMobile ? 4 : 8;
            for (let i = 0; i < connectionCount; i++) {
                const connection = document.createElement('div');
                connection.className = 'particle-connection';
                connection.style.left = Math.random() * window.innerWidth + 'px';
                connection.style.top = Math.random() * window.innerHeight + 'px';
                connection.style.width = (Math.random() * 100 + 50) + 'px';
                connection.style.transform = `rotate(${Math.random() * 360}deg)`;
                connection.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(connection);
                connections.push(connection);
            }
        }

        function createMouseEffect(x, y) {
            if (isTouchDevice && !isMobile) return;
            
            const cursor = document.createElement('div');
            cursor.className = 'mouse-cursor';
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            mouseTrail.appendChild(cursor);

            const ring = document.createElement('div');
            ring.className = 'mouse-ring';
            ring.style.left = x + 'px';
            ring.style.top = y + 'px';
            mouseTrail.appendChild(ring);

            const sparkleCount = isMobile ? 2 : 3;
            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'mouse-sparkle';
                sparkle.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
                sparkle.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
                mouseTrail.appendChild(sparkle);
            }

            const energy = document.createElement('div');
            energy.className = 'mouse-energy';
            energy.style.left = x + 'px';
            energy.style.top = y + 'px';
            mouseTrail.appendChild(energy);

            setTimeout(() => {
                cursor.remove();
                ring.remove();
                mouseTrail.querySelectorAll('.mouse-sparkle').forEach(s => s.remove());
                energy.remove();
            }, 2000);
        }

        function handleMouseMove(e) {
            if (isTouchDevice && !isMobile) return;
            
            const x = e.clientX;
            const y = e.clientY;
            
            mouseVelocity.x = x - lastMouseX;
            mouseVelocity.y = y - lastMouseY;
            
            if (Math.abs(mouseVelocity.x) > 2 || Math.abs(mouseVelocity.y) > 2) {
                createMouseEffect(x, y);
            }
            
            lastMouseX = x;
            lastMouseY = y;
        }

        function handleTouchMove(e) {
            if (!isTouchDevice) return;
            
            e.preventDefault();
            const touch = e.touches[0];
            createMouseEffect(touch.clientX, touch.clientY);
        }

        function handleClick(e) {
            createMouseEffect(e.clientX, e.clientY);
        }

        function handleResize() {
            isMobile = window.innerWidth <= 768;
            
            particles.forEach(particle => particle.remove());
            connections.forEach(connection => connection.remove());
            particles = [];
            connections = [];
            
            createFloatingParticles();
            createConnections();
        }

        function handleOrientationChange() {
            setTimeout(handleResize, 100);
        }

        // Event Listeners
        if (!isTouchDevice) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        document.addEventListener('click', handleClick);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        createFloatingParticles();
        createConnections();
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function updateInputValidation(input, isValid) {
        input.classList.remove('error', 'success');
        input.classList.add(isValid ? 'success' : 'error');
        
        let errorMessage = input.parentNode.querySelector('.error-message');
        if (!isValid && !errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = input.type === 'email' ? 'Please enter a valid email address' : 'Password must be at least 6 characters';
            input.parentNode.appendChild(errorMessage);
        } else if (isValid && errorMessage) {
            errorMessage.remove();
        }
    }

    function togglePasswordVisibility() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        passwordToggle.classList.toggle('active');
        
        // Update the SVG icon
        const eyeIcon = passwordToggle.querySelector('.eye-icon');
        if (type === 'text') {
            // Show eye-off icon
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            // Show eye icon
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    }

    function simulateLogin() {
        loginButton.classList.add('loading');
        loginButton.disabled = true;
        
        setTimeout(() => {
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
            alert('Login functionality would be implemented here!');
        }, 2000);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        
        updateInputValidation(emailInput, isEmailValid);
        updateInputValidation(passwordInput, isPasswordValid);
        
        if (isEmailValid && isPasswordValid) {
            simulateLogin();
        }
    }

    function handleForgotPassword() {
        alert('Forgot password functionality would be implemented here!');
    }

    function handleSignUp() {
        alert('Sign up functionality would be implemented here!');
    }

    function handleKeyNavigation(e) {
        if (e.key === 'Enter') {
            if (document.activeElement === emailInput) {
                passwordInput.focus();
            } else if (document.activeElement === passwordInput) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    }

    // Event Listeners
    emailInput.addEventListener('input', function() {
        const isValid = validateEmail(this.value.trim());
        updateInputValidation(this, isValid);
    });

    passwordInput.addEventListener('input', function() {
        const isValid = validatePassword(this.value.trim());
        updateInputValidation(this, isValid);
    });

    passwordToggle.addEventListener('click', togglePasswordVisibility);
    passwordToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        togglePasswordVisibility();
    });
    loginForm.addEventListener('submit', handleFormSubmit);
    forgotPasswordButton.addEventListener('click', handleForgotPassword);
    if (signUpButton) {
        signUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Focus management for better UX
    if (!isMobile) {
        emailInput.focus();
    }

    // Registration Page Logic
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('nameInput');
    const registerEmailInput = document.getElementById('registerEmailInput');
    const registerPasswordInput = document.getElementById('registerPasswordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const registerPasswordToggle = document.getElementById('registerPasswordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const registerButton = document.getElementById('registerButton');
    const loginPageButton = document.getElementById('loginPageButton');

    if (registerForm) {
        function validateName(name) {
            return name.trim().length >= 2;
        }
        function validateRegisterEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        function validateRegisterPassword(password) {
            return password.length >= 6;
        }
        function validateConfirmPassword(password, confirm) {
            return password === confirm && confirm.length >= 6;
        }
        function updateInputValidation(input, isValid, message) {
            input.classList.remove('error', 'success');
            input.classList.add(isValid ? 'success' : 'error');
            let errorMessage = input.parentNode.querySelector('.error-message');
            if (!isValid && !errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = message;
                input.parentNode.appendChild(errorMessage);
            } else if (isValid && errorMessage) {
                errorMessage.remove();
            } else if (!isValid && errorMessage) {
                errorMessage.textContent = message;
            }
        }
        function togglePasswordVisibility(input, toggle) {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            toggle.classList.toggle('active');
            const eyeIcon = toggle.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        }
        function simulateRegister() {
            registerButton.classList.add('loading');
            registerButton.disabled = true;
            setTimeout(() => {
                registerButton.classList.remove('loading');
                registerButton.disabled = false;
                alert('Registration functionality would be implemented here!');
            }, 2000);
        }
        function handleRegisterSubmit(e) {
            e.preventDefault();
            const name = nameInput.value.trim();
            const email = registerEmailInput.value.trim();
            const password = registerPasswordInput.value.trim();
            const confirm = confirmPasswordInput.value.trim();
            const isNameValid = validateName(name);
            const isEmailValid = validateRegisterEmail(email);
            const isPasswordValid = validateRegisterPassword(password);
            const isConfirmValid = validateConfirmPassword(password, confirm);
            updateInputValidation(nameInput, isNameValid, 'Please enter your full name');
            updateInputValidation(registerEmailInput, isEmailValid, 'Please enter a valid email address');
            updateInputValidation(registerPasswordInput, isPasswordValid, 'Password must be at least 6 characters');
            updateInputValidation(confirmPasswordInput, isConfirmValid, 'Passwords do not match');
            if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
                simulateRegister();
            }
        }
        nameInput.addEventListener('input', function() {
            updateInputValidation(this, validateName(this.value), 'Please enter your full name');
        });
        registerEmailInput.addEventListener('input', function() {
            updateInputValidation(this, validateRegisterEmail(this.value), 'Please enter a valid email address');
        });
        registerPasswordInput.addEventListener('input', function() {
            updateInputValidation(this, validateRegisterPassword(this.value), 'Password must be at least 6 characters');
        });
        confirmPasswordInput.addEventListener('input', function() {
            updateInputValidation(this, validateConfirmPassword(registerPasswordInput.value, this.value), 'Passwords do not match');
        });
        registerPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(registerPasswordInput, registerPasswordToggle);
        });
        registerPasswordToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            togglePasswordVisibility(registerPasswordInput, registerPasswordToggle);
        });
        confirmPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
        });
        confirmPasswordToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
        });
        registerForm.addEventListener('submit', handleRegisterSubmit);
        if (loginPageButton) {
            loginPageButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }
}); 