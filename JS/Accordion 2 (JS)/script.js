(function () {
  const accordionHeaders = document.getElementsByClassName("header");

  function toggleAccordion(e) {
    const details = e.target.nextElementSibling;
    for (let i = 0; i < accordionHeaders.length; i++) {
      if (accordionHeaders[i] !== e.target) {
        accordionHeaders[i].nextElementSibling.classList.add("collapsed");
      }
    }
    details.classList.toggle("collapsed");
  }

  for (let i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].addEventListener("click", toggleAccordion);
  }
})();
