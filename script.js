// 1. NAVBAR OFFCANVAS & DROPDOWN LOGIC
const toggleBtn = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const icon = toggleBtn.querySelector('i');
const menuItems = navLinks.querySelectorAll('a');
const dropdowns = document.querySelectorAll('.dropdown');

function toggleMenu() {
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; 
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; 
        // Jab menu band ho to open dropdowns bhi reset ho jayein
        dropdowns.forEach(d => d.classList.remove('active'));
    }
}

toggleBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Accordion functionality for Mobile View
dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault(); 
            
            // Dusre open dropdown ko band karna taaki ek baar me ek hi open rahe
            dropdowns.forEach(d => {
                if(d !== dropdown) d.classList.remove('active');
            });
            
            dropdown.classList.toggle('active');
        }
    });
});

// Close menu on link click (except dropdown parent buttons on mobile)
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 1024;
        const isDropdownBtn = item.classList.contains('dropbtn');
        
        // Agar mobile view hai aur user dropdown wale button par click kar raha hai, to offcanvas band nahi hona chahiye
        if (isMobile && isDropdownBtn) return;
        
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// 2. COUNTDOWN TIMER LOGIC
const targetDate = new Date("Aug 27, 2026 09:00:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h2 style='color: var(--accent-gold);'>Conference Started!</h2>";
    }
}, 1000);