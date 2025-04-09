document.querySelectorAll('header .links .firstPart nav ul li').forEach(li => {
    li.addEventListener('click', function() {
        // Remove 'active' class from all li elements
        document.querySelectorAll('header .links .firstPart nav ul li').forEach(item => {
            item.classList.remove('active');
        });
        // Add 'active' class to the clicked li
        this.classList.add('active');
    });
});