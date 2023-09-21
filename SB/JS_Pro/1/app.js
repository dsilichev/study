{
  const modal = document.getElementById("myModal");
  const backdrop = document.getElementById("backdrop");
  const openButton = document.getElementById("openButton");

  openButton.addEventListener("click", () => {
    modal.style.display = "block";
    backdrop.style.display = 'block';
    modal.classList.add("show");
  });

  function closeModal() {
    modal.style.display = "none";
    backdrop.style.display = 'none';
    modal.classList.remove("show");
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal()
    }
  }
}
