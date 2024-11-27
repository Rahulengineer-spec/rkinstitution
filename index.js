// Theme switcher functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    body.classList.toggle('dark-theme', !isDark);
    body.classList.toggle('light-theme', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);
}
// Language functionality
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    console.log(`Language changed to ${lang}`);
}

function setInitialLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
}

// Search functionality with debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function highlightMatches(searchText) {
    if (searchText.length < 2) return;

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
    highlightMatches(document.getElementById('searchInput').value);
}

document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    setInitialFontSize();
    setInitialLanguage();

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const debouncedSearch = debounce(performSearch, 300);

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', debouncedSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.innerText);
        let count = 0;
        const speed = 200;
        const inc = target / speed;
        
        const updateCount = () => {
            count += inc;
            counter.innerText = Math.ceil(count);
            if (count < target) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

// Course Card Hover Effect
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Event Registration
document.querySelectorAll('.event-card button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Thank you for your interest! Registration form will open shortly.');
    });
});

// Initialize Bootstrap Carousel with custom options
const carousel = new bootstrap.Carousel(document.querySelector('#institutionCarousel'), {
    interval: 5000,
    wrap: true,
    keyboard: true
});

// Testimonial Carousel using Slick (requires jQuery and Slick Carousel)
$(document).ready(function(){
    $('.testimonial-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});
// Display search results below the navbar
function displaySearchResults(matches) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    matches.forEach(match => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = match.nodeValue;
        resultsContainer.appendChild(resultItem);
    });
}

function performSearch() {
    clearHighlights();
    const searchText = document.getElementById('searchInput').value;
    highlightMatches(searchText);

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

    displaySearchResults(matches);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.id = 'searchResults';
    searchResultsContainer.classList.add('search-results-container');
    document.body.insertBefore(searchResultsContainer, document.body.firstChild);
});