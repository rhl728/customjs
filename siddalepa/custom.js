const mainFn = () => {
  const header = document.querySelector("#home-page header#header");
  header.classList.add("updatedHeader");

  window.addEventListener("scroll", function () {
    // console.log(">>>");
    const header = document.querySelector("#home-page header#header"); // or any element you want
    if (window.scrollY > 110) {
      header.classList.remove("updatedHeader");
    } else {
      header.classList.add("updatedHeader");
    }
  });
};

document.addEventListener("oms_getTemplateListSuccess", function (e) {
  if (e.detail.result.success) {
    mainFn();
  }
});
