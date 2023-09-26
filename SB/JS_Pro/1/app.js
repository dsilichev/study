{
  const modal = document.getElementById("myModal");
  const backdrop = document.getElementById("backdrop");
  const openButton = document.getElementById("openButton");
  const closeButton = document.getElementById("closeButton");
  const closeX = document.getElementById("closeX");
  
  // show modal
  openButton.addEventListener("click", () => {
    
    modal.style.display = "block";
    backdrop.style.display = 'block';
    modal.classList.add("show");
  });

  // close modal
  function closeModal() {
    modal.style.display = "none";
    backdrop.style.display = 'none';
    modal.classList.remove("show");
  }
  // close by clicking anywhere
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }
  // close by clicking close button
  closeButton.addEventListener('click', (e) => {
    closeModal(e);
  })  
  // close by clicking X
  closeX.addEventListener('click', (e) => {
    closeModal(e);
  }) 
}
