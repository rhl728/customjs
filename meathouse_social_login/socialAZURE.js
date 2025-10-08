// document.addEventListener("DOMContentLoaded", primaryFn);
let isGuestUser = null;
let closeButton = null;
let popupContainer = null;
let checkoutBtn = null;
let consentPopup = null;
let consentPopupYesBtn = null;
let consentPopupNoBtn = null;
let consentPopupCloseBtn = null;
let checkoutContbtn = null;
let checkoutConsentCBox = null;
let consentCheckBoxes = null; //common checkboxes

const consentPopupFnCore = () => {

  const consentCheckBoxes = document.querySelectorAll(".consentCheckBox"); // layouts-Checkout, sections-ProfileUserInfo, sections->AddressBookPopup, sections-ProfileCreationPopup

  consentCheckBoxes.forEach((consentCheckBox) => {
    consentCheckBox.addEventListener("click", (e) => {
      if (e.target.checked) {
        consentPopup.style.display = "flex";
      } else {
        document
          .querySelector(".contbtn")
          ?.classList.add("pointer-events-none", "opacity-50"); // sections-MiniCartContent, sections-ProfileUserInfo, sections->AddressBookPopup, section-ProfileCreationPopup
      }
    });

    consentPopupYesBtn.addEventListener("click", function (e) {
      consentCheckBox.checked = true;
      consentPopup.style.display = "none";
      document
        .querySelector(".contbtn")
        ?.classList.remove("pointer-events-none", "opacity-50");
    });

    consentPopupNoBtn.addEventListener("click", function (e) {
      consentCheckBox.checked = false;
      consentPopup.style.display = "none";
      document
        .querySelector(".contbtn")
        ?.classList.add("pointer-events-none", "opacity-50");
    });

    consentPopupCloseBtn.addEventListener("click", function (e) {
      consentCheckBox.checked = false;
      consentPopup.style.display = "none";
      document
        .querySelector(".contbtn")
        ?.classList.add("pointer-events-none", "opacity-50");
    });
  });
};

function primaryFn() {
  // welcome popup close section

  closeButton = document.getElementById(
    "layout-main-aad-welcome-popup-close-btn"
  );

  popupContainer = document.getElementById("layout-main-aad-welcome-popup");

  const closeButtons = document.querySelectorAll(
    ".layout-main-aad-welcome-popup-close-btn"
  );

  closeButtons.forEach((closeButton) => {
    closeButton?.addEventListener("click", function () {
      popupContainer.style.display = "none";
    });
  });

  checkoutBtn = document.getElementById("section-minicartContent-checkout-btn");

  consentPopup = document.getElementById("sections-HeaderBlock-consent-popup");

  consentPopupYesBtn = document.getElementById(
    "sections-HeaderBlock-consent-popup-yes-btn"
  );
  consentPopupNoBtn = document.getElementById(
    "sections-HeaderBlock-consent-popup-no-btn"
  );
  consentPopupCloseBtn = document.getElementById(
    "sections-HeaderBlock-consent-popup-close-btn"
  );

  checkoutConsentCBox = document.getElementById(
    "layouts-checkout-consent-checkbox"
  );
  checkoutContbtn = document.getElementById("section-minicartContent-cont-btn");

  consentPopupFnCore();

  // showing welcome popup if a guest user
  if (isGuestUser && popupContainer) {
    popupContainer.style.display = "flex";
  }

  //welcome popup close button
  closeButton?.addEventListener("click", function () {
    popupContainer.style.display = "none";
  });
}

const checkingElements = function () {
  ///sections-MiniCartContent,

  setTimeout(() => {
    const accCreatingBtn = document.getElementById(
      "sections-ProfileCreationPopup-acc-crate-btn"
    );

    accCreatingBtn?.addEventListener("click", function () {
      consentPopupFnCore();
    });
  }, 300);
};

const consentPopupFn = () => {
  //sections->AddressBookPopup

  setTimeout(() => {
    consentPopupFnCore();
  }, 300);
};

// checking user status

document.addEventListener("oms_getUserDataSuccess", function (e) {
  const data = e.detail?.result?.data?.data;

  if (data?.social_provider && data?.is_guest_user) {
    isGuestUser = true;
  }
});

document.addEventListener(
  "oms_getTemplateListSuccess",
  function (e) {
    if (e.detail.result.success) {
      primaryFn();

      checkoutBtn?.addEventListener("click", function () {});
    }
  },
  false
);
