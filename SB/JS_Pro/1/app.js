{
  const modal = document.getElementById("myModal");
  const openButton = document.getElementById("openButton");

  openButton.addEventListener('click', () => {
    console.log('skdfj')
    modal.style.display = 'block';
    modal.classList.add('show');
    modal.setAttribute('dialog');
  })
}
