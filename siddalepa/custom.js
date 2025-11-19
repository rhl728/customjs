const mainFn = () => {
  const header = document.querySelector("#home-page header#header");
  header?.classList.add("updatedHeader");

  window.addEventListener("scroll", function () {
    // console.log(">>>");
    const header = document.querySelector("#home-page header#header"); // or any element you want
    if (window.scrollY > 80) {
      header.classList.remove("updatedHeader");
    } else {
      header.classList.add("updatedHeader");
    }
  });

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const currentPage = url.pathname;

  const elements = document.querySelectorAll(".headerElements");

  elements.forEach((el) => {
    console.log("el :>> ", el.dataset.key, currentPage);
    if (el.dataset.key == currentPage) {
      el.classList.add("activeClass");
    }
  });
};

document.addEventListener("oms_getTemplateListSuccess", function (e) {
  if (e.detail.result.success) {
    mainFn();
  }
});
