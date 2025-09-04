var that = this;
const clientId = "bb3f17b6134f3a6c3f1a8afe4334bf16";

var checkoutButton = null;
var cartCheckoutButton = null;
var email = null;

var parentCheckoutbtn = null;

var cartParentCheckoutbtn = null;
var isSkipped = false;

var domain = null;
const sampleDomain = "gmail.com";
let ch_popup_close_wrapper=null;

function primaryFnTO() {
  console.log("DOM loaded!!!!!!!");
  // parentCheckoutbtn?.disabled = false;

  window.addEventListener("load", () => {
    console.log("window loaded!!!!!!!");
    setTimeout(primaryFn, 3000);
  });
}

document.addEventListener("oms_getTemplateListSuccess", function (e) {
  console.log("ddddd");
  if (e.detail.result.success) {
    console.log(e.detail.result.success);

    parentCheckoutbtn = document.getElementById("button_id_themes_parent");

    parentCheckoutbtn?.style.setProperty("pointer-events", "auto", "important");
    console.log("style added!!!");

    cartParentCheckoutbtn = document.getElementById("button_cart");
    if (cartParentCheckoutbtn) {
      cartParentCheckoutbtn.style.pointerEvents = "auto";
    }

    primaryFn();
  }
});

const primaryFn = function (event) {
  console.log("primaryFn running");

  /*   const parentCheckoutbtnSearching = setInterval(() => {
    parentCheckoutbtn = document.getElementById("button_id_themes_parent");

    if (parentCheckoutbtn) {
      parentCheckoutbtn?.style.setProperty(
        "pointer-events",
        "auto",
        "important"
      );
      clearInterval(parentCheckoutbtnSearching);
    } else {
      console.warn("Searching wrapper btn...");
    }
  }, 1500); */

  //getting user status which are updated or not

  userStatus = localStorage.getItem("userStatus")
    ? JSON.parse(localStorage.getItem("userStatus"))
    : {};

  var isUpdatedSuccess = userStatus?.isUpdatedSuccess === true ? true : false;
  // console.log("userStatus>----->",isUpdatedSuccess)
  // var isSkipped=false;
  // var isUpdatedSuccess=false;
  const TestEmail = "test123546456456456@gmail.com";

  checkoutButton = document.getElementById("button_id_themes");
  cartCheckoutButton = document.getElementById("button_id_themes_cart");

  const ch_popup_close_btn = document.getElementById(
    "checkout-popup-close-btn"
  );
   ch_popup_close_wrapper = document.getElementById(
    "checkout-popup-close-btn-wrapper"
  );
  const ch_popup_skip_btn = document.getElementById("checkout-popup-skip-btn");
  const popup_form = document.getElementById("popup-form");

  popup_form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(popup_form);

    const data = Object.fromEntries(formData.entries());

    //   console.log(data);

    const dataObj = {
      ...data,
      client_id: clientId,
      country: "LK",
    };

    //   console.log("dataObj>>>>",dataObj);

    let userProfileEditEvent = new CustomEvent("oms_userProfileEdit", {
      detail: {
        ...dataObj,
        calling_code: +94,
      },
    });
    document.dispatchEvent(userProfileEditEvent);
    document.addEventListener("oms_userProfileEditSuccess", (e) => {
      //   console.log("E>>",e.detail.result)

      if (e.detail.result.success) {
        isUpdatedSuccess = true;
        // userStatus.isUpdatedSuccess=true;
        isSkipped = true;

        // localStorage.setItem("userStatus",JSON.stringify(userStatus))

        showToast();

        /////////////////////////////////////////////

        const store = document.querySelector("#app").__vue__.$store;

        // console.log('Current user:', store.state.orderInfo)

        store.commit("updateorderInfo", null);

        localStorage.removeItem("oms_order_details_" + clientId);

        // console.log("clientId>>>",clientId)
        /////////////////////////

        setTimeout(() => {
          // window.location.reload()
        }, 3000);

        ch_popup_close_wrapper.style.display = "none";

        var userProfileEvent = new CustomEvent("oms_userProfile", {
          detail: {
            client_id: clientId,
          },
        });

        document.dispatchEvent(userProfileEvent);

        document.addEventListener("oms_userProfileSuccess", (e) => {
          // console.log("GGGG>",e)
        });
      }
    });
  });

  ch_popup_close_btn?.addEventListener("click", () => {
    ch_popup_close_wrapper.style.display = "none";
  });

  ch_popup_skip_btn?.addEventListener("click", () => {
    ch_popup_close_wrapper.style.display = "none";
    isSkipped = true;
  });

  callingPop(checkoutButton);
  if (cartCheckoutButton) {
    callingPop(cartCheckoutButton);
  }
};

//popup function

const callingPop = (checkoutButton) => {
  console.log("insidecallingpopup>>>>>>", checkoutButton);

  checkoutButton?.addEventListener("click", function (e) {
    console.log("2nd>>>>>>",domain,domain === sampleDomain,isSkipped,checkoutButton)

    if (
      domain &&
      domain === sampleDomain &&
      checkoutButton &&
      !isSkipped
    ) {
      checkoutButton.disabled = true;
      checkoutButton.style.opacity = "0.5";

      ch_popup_close_wrapper.style.display = "flex";
      e.stopPropagation();
       console.log("------------->>>>>")
    } 
  });
};

document.addEventListener("oms_getUserDataSuccess", function (e) {
  email = e?.detail?.result?.data?.data?.email;
  // console.log("User mail got++> ", email.substring(email.indexOf("@")+1));
  domain = email?.substring(email.indexOf("@") + 1);
  // console.log("domain>>>",domain)
});

// document.addEventListener("DOMContentLoaded", primaryFnTO);

//Toast message function
function createToast(title, message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";

  const iconSymbol =
    type === "success"
      ? `
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                               fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 
                                                     0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 
                                                     0 0 0-1.06 1.06L6.97 11.03a.75.75 
                                                     0 0 0 1.079-.02l3.992-4.99a.75.75 
                                                     0 0 0-.01-1.05z"/>
                                          </svg>
                                        `
      : null;

  toast.innerHTML = `
                <div class="toast-icon">${iconSymbol}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
               
                <div class="toast-progress"></div>
            `;

  toastContainer.appendChild(toast);

  // Trigger show animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Auto hide after 4 seconds
  setTimeout(() => {
    hideToast(toast);
  }, 4000);

  return toast;
}

function hideToast(toast) {
  toast.classList.remove("show");
  toast.classList.add("hide");

  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 400);
}

function showToast() {
  createToast("Success!", "Profile updated successfully");
}

// ///////////////////////////////////////////////

let data = {};
console.log("*****************************");

const params = new URLSearchParams(window.location.search);

const user_id = params.get("user_id");

if (user_id) {
  let socialForm = document.getElementById("SocialLoginForm");
  if (socialForm) {
    socialForm.style.display = "none";
  }
  data.request_id = null;
  data.client_id = clientId;
  data.name = "JKH Staff";
  data.email = "test123546456456456@gmail.com";
  data.calling_code = "+94";
  data.contact_number = "";
  data.verification_id = user_id;
  console.log(data);
  document.addEventListener(
    "oms_userRegisterBySocialVerificationSuccess",
    function (e) {
      let result = e.detail.result;

      if (result.success) {
        // validate two-factor authentication
        if (result.data.otp_request_id) {
          data.otp_request_id = result.data.otp_request_id;
          data.otp = "123356";

          let getProductEvent = new CustomEvent(
            "oms_userRegisterBySocialVerification",
            {
              detail: data,
            }
          );
          document.dispatchEvent(getProductEvent);
        }
      }
    },
    false,
    that
  );

  let getProductEvent = new CustomEvent(
    "oms_userRegisterBySocialVerification",
    {
      detail: data,
    }
  );
  document.dispatchEvent(getProductEvent);
}

// //---------------------------------------------------------------------

// async function reloadProfileData(reloadCount = 0) {
//     if (reloadCount >= 5) return true; // Stop retrying after 5 attempts

//     console.log('reloadProfileData reloadCount: ', reloadCount);

//     // Dispatch custom event to trigger profile loading
//     const userProfileEvent = new CustomEvent("oms_userProfile", {
//         detail: {
//             client_id: clientId
//         }
//     });
//     document.dispatchEvent(userProfileEvent);

//     // Wait 1 second before checking the data
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const userJson = localStorage.getItem("user_data_" + clientId);

//     let data = null;
//     try {
//         const user = JSON.parse(userJson);
//         data = user?.data;
//         console.log('reloadProfileData data: ', data);
//     } catch (e) {
//         console.error('Failed to parse user data:', e);
//     }

//     if (!data || data.groups?.length === 0) {
//         // Retry recursively
//         return await reloadProfileData(reloadCount + 1);
//     }

//     window.location.href = '/';
//     return true;
// }

// function changeOfferLabel(count = 0) {
//     if (count >= 10) return true; // Stop retrying after 10 attempts
//     setTimeout(() => {
//         const offerLabels = document.querySelectorAll('.azure-offer-label');

//         if (offerLabels.length > 0) {
//             // Select all elements with class 'azure-offer-label'
//             offerLabels.forEach(function(element) {
//                 // Check if it also has class 'hidden'
//                 if (element.classList.contains('hidden')) {
//                     // Remove the 'hidden' class
//                     element.classList.remove('hidden');
//                 }
//             });
//         }
//         else {
//             count += 1;
//             that.changeOfferLabel(count);
//         }
//     }, 1000);

//     return true;
// }

// document.addEventListener("DOMContentLoaded", async (event) => {

//     // pop up message
//     var showPopupFlag = true;
//     var EMPUSER = false;
//     var userData = localStorage.getItem("user_data_" + clientId);

//     if (userData) {
//         var data = JSON.parse(userData).data;

//         if (data?.social_provider == 'azure_saml2') {

//             // EMPUSER = true;

//             if (data.groups.length == 0) {

//                 await reloadProfileData();

//                 userData = localStorage.getItem("user_data_" + clientId);
//                 data = JSON.parse(userData).data;
//             }

//             data?.groups.map(function (group, index) {
//                 if (group.id === '12ff02f4289fb12879cf9e36168668b9') {
//                     EMPUSER = true;
//                 }
//             });
//         }

//     }

//     // EMPUSER = true;

//     if (EMPUSER) {
//       document.body.classList.add("emp-mode");

//         // Add popup message here
//         function showPopupMessage(message) {
//             if (showPopupFlag) {
//                 var x = document.createElement("div");
//                 x.innerHTML = `<div class="meathouse-deals-chi show">
//                     <div class="meathouse-deals-chi-inner">
//                         <span class="close" id="closeBtn">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
//                                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
//                             </svg>
//                         </span>
//                         <img src="https://dna3n15iwxmh8.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/Pop-up-banners/1d198ff3636b8d2e7b7f97fa8080a0ac_1747720892.jpg" />
//                     </div>
//                 </div>`;

//                 var homePage = document.getElementById("home-page-meathouse");
//                 const showOfferPopup = 'true'; //localStorage.getItem("show_saml_offer_" + clientId);

//                 if (window.location.pathname === '/' && showOfferPopup == 'true') {
//                     var imageUrl = "https://dna3n15iwxmh8.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/Pop-up-banners/1d198ff3636b8d2e7b7f97fa8080a0ac_1747720892.jpg";
//                     var img = new Image();

//                     img.onload = function() {
//                         document.querySelector("body").appendChild(x);

//                         var closeButton = document.getElementById("closeBtn");
//                         var image = document.querySelector(".meathouse-deals-chi img");

//                         closeButton.addEventListener("click", closeImage);
//                         image.addEventListener("click", closeImage);

//                         function closeImage() {
//                             x.remove();
//                         }
//                     };

//                     img.onerror = function() {
//                         console.log("Image failed to load.");
//                     };

//                     img.src = imageUrl;

//                     // localStorage.setItem("show_saml_offer_" + clientId, false);
//                 }
//             }
//         }

//         showPopupMessage("You are now in the special staff rate section of meathouse.lk. Enjoy your purchase!");

//         // Change offer label
//         changeOfferLabel();
//     }

//     //  Handle form errors
//     const socialName = document.getElementById('social-name');
//     const socialEmail = document.getElementById('social-email');

//     if (socialName && socialEmail) {
//          socialName.addEventListener('input', function(event) {
//              if (document.getElementById('social-name-error')) {
//                 document.getElementById('social-name-error').style.display = event.target.value ? 'none' : 'block';
//              }
//          });

//          socialEmail.addEventListener('input', function(event) {
//              if (document.getElementById('social-email-error')) {
//                     document.getElementById('social-email-error').style.display = event.target.value ? 'none' : 'block';
//              }
//          });
//     }

//     //  confirmation checkbox
//     setTimeout(() => {
//       const consentButton = document.getElementById("social-login-form-checkbox");
//       const submitButton = document.getElementById("social-login-submit-button");

//       if (consentButton && submitButton) {
//         consentButton.addEventListener("click", function () {
//             submitButton.disabled = consentButton.checked ? false : true;

//         });
//       } else {
//         console.warn("Consent button or submit button not found in DOM.");
//       }
//     }, 3000);

//     document.addEventListener("oms_userRegisterBySocialVerificationSuccess", function (e) {
//         let result = e.detail.result;

//         if (result.success && !result.data.otp_request_id) {
//             // localStorage.setItem("show_saml_offer_" + clientId, true);

//             //   Load profile data after login
//             var userProfileEvent = new CustomEvent("oms_userProfile", {
//                 'detail': {
//                     "client_id": clientId
//                 }
//             });
//             document.dispatchEvent(userProfileEvent);
//         }

//     }, false, this);

//     document.addEventListener("oms_getProductListSuccess", function (e) {
//         let result = e.detail.result;

//         if (result.success && EMPUSER) {
//             changeOfferLabel();
//         }

//     }, false, this);

// });
