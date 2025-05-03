document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const saveBtn = document.getElementById('save-btn');
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.getElementById('animated-element');
    const body = document.body;
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    saveBtn.addEventListener('click', function() {
        const preferences = {
            theme: themeSelect.value,
            animation: animationSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        triggerAnimation();
    });
    
    // Theme select change handler
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('userPreferences');
        
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            // Set select values
            themeSelect.value = preferences.theme;
            animationSelect.value = preferences.animation;
            
            // Apply theme and animation
            applyTheme(preferences.theme);
            triggerAnimation();
        }
    }
    
    // Apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes
        body.classList.remove('light', 'dark', 'blue');
        
        // Add selected theme class
        body.classList.add(theme);
        
        // Update the container background based on theme
        const container = document.querySelector('.container');
        if (theme === 'dark') {
            container.style.backgroundColor = '#444';
            document.querySelector('.preference-form').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else if (theme === 'blue') {
            container.style.backgroundColor = '#cce0ff';
            document.querySelector('.preference-form').style.backgroundColor = 'rgba(204, 224, 255, 0.8)';
        } else {
            // Light theme (default)
            container.style.backgroundColor = '#fff';
            document.querySelector('.preference-form').style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    }
    
    // Trigger the selected animation
    function triggerAnimation() {
        const animationType = animationSelect.value;
        
        // Remove all animation classes first
        animatedElement.classList.remove('bounce', 'spin', 'pulse');
        
        // Force reflow to restart animation
        void animatedElement.offsetWidth;
        
        // Add selected animation class
        animatedElement.classList.add(animationType);
    }
});