// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
}

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
})

function subscribe() {
    document.getElementById('popup').style.display = 'block';
    setTimeout(function() {
        document.getElementById('popup').style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('subscribeBtn').addEventListener('click', function() {
        var email = document.getElementById('emailInput').value;
        if (email.trim() !== '') {
            subscribe();
        } else {
            alert('Please enter your email address.');
        }
    });
});