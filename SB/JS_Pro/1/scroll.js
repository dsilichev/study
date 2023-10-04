{
    const scrollUpButton = document.getElementById('scrollUpButton');

    // show/hide button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 100) {
            scrollUpButton.classList.remove('d-none');
        } else {
            scrollUpButton.classList.add('d-none');
        }
    }, {passive: true})
    
    // scroll to top
    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
}