const mainFn = () => {
  const header = document.querySelector("#home-page header#header");
  header?.classList.add("updatedHeader");

  window.addEventListener("scroll", function () {
    // console.log(">>>");
    const header = document.querySelector("#home-page header#header"); // or any element you want
    if (window.scrollY > 110) {
      header.classList.remove("updatedHeader");
    } else {
      header.classList.add("updatedHeader");
    }
  });

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const currentPage = url.pathname;

  if (currentPage == "/offers") {
    const offerpage = document.querySelector("#header-offers");
    // console.log(">>>", currentPage, offerpage);
    offerpage.style.color = "rgb(115,40,22)";
  }
};

document.addEventListener("oms_getTemplateListSuccess", function (e) {
  if (e.detail.result.success) {
    mainFn();
  }
});
