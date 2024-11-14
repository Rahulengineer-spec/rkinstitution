  // Theme switcher functionality
 
  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme + '-theme');
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', setInitialTheme);

// Add click event listener to theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
    });
}
function setFontSize(size) {
    const body = document.body;
    const sizes = ['font-smaller', 'font-normal', 'font-larger', 'font-largest'];
    
    // Remove all font size classes
    sizes.forEach(className => body.classList.remove(className));
    
    // Add the selected font size class
    body.classList.add(`font-${size}`);
    
    // Update active state of buttons
    document.querySelectorAll('.font-size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        }
    });
    
    // Save the preference
    localStorage.setItem('fontSize', size);
}

function setInitialFontSize() {
    const savedSize = localStorage.getItem('fontSize') || 'normal';
    setFontSize(savedSize);
}

// Initialize both theme and font size on page load
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    setInitialFontSize();
});

// Add keyboard controls for font size dropdown
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 'f') {
        const fontControls = document.querySelector('.font-size-controls');
        fontControls.style.display = 
            fontControls.style.display === 'block' ? 'none' : 'block';
    }
});

// Close font size dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.font-size-dropdown')) {
        const fontControls = document.querySelector('.font-size-controls');
        fontControls.style.display = 'none';
    }
});

// Language functionality
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    // Here you would typically reload the page content in the new language
    // This might involve fetching new content or updating text elements
    console.log(`Language changed to ${lang}`);
}

function setInitialLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
}

document.addEventListener('DOMContentLoaded', setInitialLanguage);


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function highlightMatches(searchText) {
        if (searchText.length < 2) return; // Ignore short search terms

        const body = document.body;
        const regex = new RegExp(searchText, 'gi');
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
        const matches = [];

        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.match(regex)) {
                matches.push(node);
            }
        }

        matches.forEach(match => {
            const span = document.createElement('span');
            span.innerHTML = match.nodeValue.replace(regex, match => `<mark>${match}</mark>`);
            match.parentNode.replaceChild(span, match);
        });
    }

    function clearHighlights() {
        document.querySelectorAll('mark').forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    function performSearch() {
        clearHighlights();
        highlightMatches(searchInput.value);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});