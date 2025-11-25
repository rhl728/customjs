/**You can add code to this file for shop customization**/

/*  ++++++ WhatApp chat - Start +++++  */
var url = "https://www.bairaha.com/js/whatsapp.js?1256835";
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = url;
var options = {
  enabled: true,
  chatButtonSetting: {
    backgroundColor: "#ecac00",
    ctaText: "Chat with us",
    borderRadius: "25",
    marginLeft: "0",
    marginRight: "50",
    marginBottom: "65",
    ctaIconWATI: false,
    position: "right",
    closeIcon:
      "https://d3fgegizptfhv.cloudfront.net/e40f00095a4ff37570da906badf62cb7/image/d9e3e707d6b79539136a66dae783ee5d_1740645662.png",
  },
  brandSetting: {
    brandName: "BAIRAHA",
    brandSubTitle: "Online Shop",
    brandImg: "https://www.bairaha.com/images/bairaha.jpg",
    welcomeText: "Hello,\n How can we help you today?",
    messageText: "Hello, %0A I have a question about {{page_link}}",
    backgroundColor: "#ecac00",
    ctaText: "Chat with us",
    borderRadius: "25",
    autoShow: false,
    phoneNumber: "94778534965",
  },
};
s.onload = function () {
  CreateWhatsappChatWidget(options);
};
var x = document.getElementsByTagName("script")[0];
x.parentNode.insertBefore(s, x);
/*  ++++++ WhatApp Chat - end +++++ */

//homepop update start

var x = document.createElement("div");
x.innerHTML = `<div class="meathouse-deals-chi show"> 
    <div class="meathouse-deals-chi-inner">
        <span class="close" id="closeBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </span>
        <img src="https://dna3n15iwxmh8.cloudfront.net/e40f00095a4ff37570da906badf62cb7/popup/1a0c58a587d6017d59abb2c49330bca9_1746776089.png" />
    </div>
</div>`;

var homePage = document.getElementById("home-page");
var endDate = new Date("2025-05-14T23:59:59");

if (window.location.pathname === "/" && new Date() < endDate) {
  var imageUrl =
    "https://dna3n15iwxmh8.cloudfront.net/e40f00095a4ff37570da906badf62cb7/popup/1a0c58a587d6017d59abb2c49330bca9_1746776089.png";
  var img = new Image();

  img.onload = function () {
    document.querySelector("body").appendChild(x);

    var closeButton = document.getElementById("closeBtn");
    var image = document.querySelector(".meathouse-deals-chi img");

    closeButton.addEventListener("click", closeImage);
    image.addEventListener("click", closeImage);

    function closeImage() {
      x.remove();
    }
  };

  img.onerror = function () {
    console.log("Image failed to load.");
  };

  img.src = imageUrl;
}

// ////////////////////////////////////////////////////////////////////

var that = this;
const clientId = "e40f00095a4ff37570da906badf62cb7";

async function reloadProfileData(reloadCount = 0) {
  if (reloadCount >= 5) return true; // Stop retrying after 5 attempts

  console.log("reloadProfileData reloadCount: ", reloadCount);

  // Dispatch custom event to trigger profile loading
  const userProfileEvent = new CustomEvent("oms_userProfile", {
    detail: {
      client_id: clientId,
    },
  });
  document.dispatchEvent(userProfileEvent);

  // Wait 1 second before checking the data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userJson = localStorage.getItem("user_data_" + clientId);

  let data = null;
  try {
    const user = JSON.parse(userJson);
    data = user?.data;
    console.log("reloadProfileData data: ", data);
  } catch (e) {
    console.error("Failed to parse user data:", e);
  }

  if (!data || data.groups?.length === 0) {
    // Retry recursively
    return await reloadProfileData(reloadCount + 1);
  }

  console.log("reload ...");
  window.location.href = "/";

  return true;
}

document.addEventListener("DOMContentLoaded", async (event) => {
  // pop up message
  var showPopupFlag = true;
  var EMPUSER = false;
  var userData = localStorage.getItem("user_data_" + clientId);

  if (userData) {
    var data = JSON.parse(userData).data;
    console.log("data", data);

    if (data.groups.length == 0) {
      await reloadProfileData();

      userData = localStorage.getItem("user_data_" + clientId);
      data = JSON.parse(userData).data;
    }
  }
});

//homepop update End

//GTM Add to cart and Remove from cart
document.addEventListener(
  "oms_updateCart",
  function (e) {
    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

    console.log("detail:", e.detail);
    console.log("detail item:", e.detail.item);
    console.log(typeof e.detail.item);

    if (typeof e.detail.item == "object" && Object.keys(e.detail.item).length) {
      //   console.log("detail item:", e.detail.item);

      let item = e.detail.item,
        items = [],
        obj = {
          item_id: item.id,
          item_name: item.name,
          item_category: item.categories,
          price: Number(item.unit_price),
          index: 1,
          quantity: 1,
        };

      if (item.categories && item.categories.length) {
        obj["item_category"] = item.categories[0].name;
      }

      console.log("Created OBJ", obj);
      console.log("Action", e.detail.action);

      items.push(obj);

      if (e.detail.action == "add") {
        //   console.log("add");
        dataLayer.push({
          event: "add_to_cart",
          currency: "LKR",
          ecommerce: {
            items: items,
          },
        });

        console.log("Datalayer", dataLayer);
      } else {
        dataLayer.push({
          event: "remove_from_cart",
          currency: "LKR",
          ecommerce: {
            items: items,
          },
        });
      }
    }
  },
  false
);

//GTM View Cart

document.addEventListener("oms_viewCart", function (e) {
  dataLayer.push({ ecommerce: null });

  console.log("cart detail:", e.detail);

  if (e.detail.data) {
    let items = [],
      i = 1;
    (dataObj = e.detail.data), (total = e.detail.total);

    console.log("DataObj Val:", e.detail.data);
    console.log("Total Val:", e.detail.total);

    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key)) {
        let item = dataObj[key],
          obj = {
            item_name: item.name,
            item_id: item.id,
            price: Number(item.display_price),
            item_category: item.categories,
            SKU: item.sku,
            index: i,
            quanitity: item.qty,
          };

        if (item.categories && item.categories.length) {
          obj["item_category"] = item.categories[0].name;
        }

        items.push(obj);

        i++;
      }
    }

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: "view_cart",
      ecommerce: {
        currency: "LKR",
        value: total,
        items: items,
      },
    });
    //  console.log('test');
    //    console.log(dataLayer);
  }
});

//GTM View item
document.addEventListener("oms_getOrderInfo", function (e) {
  dataLayer.push({ ecommerce: null });
  console.log("payement detail:", e.detail);
});

document.addEventListener("oms_getProductSuccess", function (e) {
  dataLayer.push({ ecommerce: null });

  console.log("Get product detail:", e.detail);
  console.log("Get product detail data:", e.detail.result.data);

  if (Object.keys(e.detail.result.data).length) {
    let item = e.detail.result.data,
      items = [],
      obj = {
        item_id: item.id,
        item_name: item.name,
        item_category: item.categories,
        price: Number(item.unit_price),
        index: 1,
        quantity: 1,
      };

    if (item.categories && item.categories.length) {
      obj["item_category"] = item.categories[0].name;
    }

    items.push(obj);

    console.log("Get product OBJ:", obj);
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "LKR",
        items: items,
      },
    });
  }
});

// if (window.location.pathname.includes("/checkout")) {
//     // begin checkuout
//     function getVueStoreTotal() {
//         let vueElement = Array.from(document.querySelectorAll('*')).find(e => e.__vue__);
//         return vueElement ? vueElement.__vue__.$store.state.totalPrice : null;
//     }
//     function getTransactionIdFromURL() {
//         const params = new URLSearchParams(window.location.search);
//         return params.get('transaction_id') || `T${Date.now()}`; // fallback if not in URL
//     }

//     function pushCheckoutAndPurchaseData() {

//         dataLayer.push({ ecommerce: null });

//         let totalCheckoutValue = getVueStoreTotal();

//         if (totalCheckoutValue === null || totalCheckoutValue === 0) {
//             setTimeout(pushCheckoutAndPurchaseData, 100);
//             return;
//         }

//         let checkoutProducts = JSON.parse(localStorage.getItem('cart_location_2c4abe707bfc5a4107b46d173ac15e99')) || [];
//         let productsArray = Object.values(checkoutProducts);

//         let itemsCheckout = productsArray.map((product, index) => ({
//             item_id: product.item_id,
//             item_name: product.item_name,
//             item_category: product.categories,
//             price: Number(product.item_display_price) || 0,
//             index: index + 1,
//             quantity: Number(product.item_qty) || 0
//         }));

//         console.log("Final Checkout Total Value (from Vue store):", totalCheckoutValue);

//         // begin checkout
//         dataLayer.push({
//             event: "begin_checkout",
//             ecommerce: {
//                 currency: "LKR",
//                 value: totalCheckoutValue,
//                 items: itemsCheckout
//             }
//         });

//         console.log("All checkout items:", itemsCheckout);

//         if (window.location.pathname.includes("/checkout")) {

//         }
//         //purchase
//         dataLayer.push({
//             event: "purchase",
//             ecommerce: {
//                 transaction_id: ``, // unique transaction id
//                 currency: "LKR",
//                 value: totalCheckoutValue,
//                 items: itemsCheckout
//             }
//         });

//     }
//     pushCheckoutAndPurchaseData();

// }

function getVueStoreTotal() {
  let vueElement = Array.from(document.querySelectorAll("*")).find(
    (e) => e.__vue__
  );
  return vueElement ? vueElement.__vue__.$store.state.totalPrice : null;
}

//BEGIN CHECKOUT -
if (window.location.pathname.includes("/checkout")) {
  function pushBeginCheckoutData() {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ ecommerce: null });

    let totalCheckoutValue = getVueStoreTotal();

    if (totalCheckoutValue === null || totalCheckoutValue === 0) {
      setTimeout(pushBeginCheckoutData, 100);
      return;
    }

    let checkoutProducts =
      JSON.parse(
        localStorage.getItem("cart_location_2c4abe707bfc5a4107b46d173ac15e99")
      ) || [];
    let items = Object.values(checkoutProducts).map((product, index) => ({
      item_id: product.item_id,
      item_name: product.item_name,
      item_category: product.categories,
      price: Number(product.item_display_price) || 0,
      index: index + 1,
      quantity: Number(product.item_qty) || 0,
    }));

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "LKR",
        value: totalCheckoutValue,
        items: items,
      },
    });

    console.log("BEGIN CHECKOUT Triggered:", items);
  }

  pushBeginCheckoutData();
}

//PURCHASE
// if (window.location.pathname.includes("/thank-you")) {

//     function getTransactionIdFromURL() {
//         const params = new URLSearchParams(window.location.search);
//         return params.get("transaction_id") || `T${Date.now()}`;
//     }

//     function pushPurchaseData() {

//         window.dataLayer = window.dataLayer || [];
//         dataLayer.push({ ecommerce: null });

//         let totalCheckoutValue = getVueStoreTotal();

//         if (totalCheckoutValue === null || totalCheckoutValue === 0) {
//             setTimeout(pushBeginCheckoutData, 100);
//             return;
//         }

//         let checkoutProducts = JSON.parse(localStorage.getItem("cart_location_2c4abe707bfc5a4107b46d173ac15e99")) || [];
//         let items = Object.values(checkoutProducts).map((product, index) => ({
//             item_id: product.item_id,
//             item_name: product.item_name,
//             item_category: product.categories,
//             price: Number(product.item_display_price) || 0,
//             index: index + 1,
//             quantity: Number(product.item_qty) || 0
//         }));

//         dataLayer.push({
//             event: "purchase",
//             ecommerce: {
//                 transaction_id: getTransactionIdFromURL(),
//                 currency: "LKR",
//                 value: totalCheckoutValue,
//                 items: items
//             }
//         });

//         console.log("PURCHASE Triggered:", items);
//     }

//     pushPurchaseData();
// }

// Purchase
