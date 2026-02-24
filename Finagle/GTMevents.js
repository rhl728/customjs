let orderCurrency = localStorage.getItem("orderCurrency") || "LKR";

function pushEcommerceEvent(eventName, ecommerceObj) {
  // console.log('ecommerceObj :>> ', ecommerceObj);
  if (!window.dataLayer) {
    console.warn("dataLayer not available");
    return;
  }
  // Clear previous ecommerce object
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: eventName,
    ecommerce: ecommerceObj,
  });
}

// Helper function to create ecommerce item object
const createEcommerceItem = (item) => {
  const price = Number(item?.display_price || item?.price) || 0;
  const quantity = Number(item?.qty) || 1;
  const value = quantity * price;
  const categories = item.categories || [];
  const discount = quantity * (Number(item?.unit_price || item?.price) - price);
  const categoryArr = categories.map((category, index) => ({
    [`item_category${index == 0 ? "" : index + 1}`]: category.name,
  }));

  const categoryObj = Object.assign({}, ...categoryArr);

  const ecommerceItem = {
    item_id: item?.id,
    item_name: item?.name,
    coupon: null,
    discount: discount,
    ...categoryObj,
    price: price,
    quantity: quantity,
    // index: item?.index,
  };

  return { ecommerceItem: ecommerceItem, value: value };
};

const handleRawItemData = (objData) => {
  const itemsArr = Object.values(objData);

  const filterdItemsArr = itemsArr.map((item) => {
    let filterdObj = {};
    Object.keys(item).forEach((key) => {
      key = key.toString();

      if (key.includes("item_")) {
        let newKey = key.replace("item_", "");
        filterdObj[newKey] = item[key];
      } else {
        filterdObj[key] = item[key];
      }
    });

    return filterdObj;
  });

  return filterdItemsArr;
};

// getting cart data from localStorage
const getCartData = (client_id) => {
  const location_id = window.localStorage.getItem(
    `current_location_${client_id}`,
  );

  let data = window.localStorage.getItem(`cart_location_${location_id}`);
  data = JSON.parse(data) || {};

  const filterdItemsArr = handleRawItemData(data);

  let value = 0;
  const ecommerceItem = filterdItemsArr.map((item) => {
    const returnedObj = createEcommerceItem(item);
    value += returnedObj.value;
    return returnedObj.ecommerceItem;
  });

  return { ecommerceItem, value };
};

//add to cart, remove cart and select promotion events
document.addEventListener("oms_updateCart", function (e) {
  let item = e.detail?.item || {};
  let appliedOffer =item.applied_offer;
  let isOfferApplied = appliedOffer
    ? Object.keys(appliedOffer).length > 0
      ? true
      : false
    : false;
  const quantity = Number(e.detail?.count) || 1;
  let action = e.detail.action;
  let value = 0;
  let ecommerceItem = null;

  if (action === "deleteAll") {
    const filterdItemsArr = handleRawItemData(item);

    let total = 0;
    ecommerceItem = filterdItemsArr.map((item) => {
      const returnedObj = createEcommerceItem(item);
      total += returnedObj.value;
      return returnedObj.ecommerceItem;
    });
    value = total;
  } else {
    item = { ...item, qty: quantity };

    const returnedObj = createEcommerceItem(item);
    ecommerceItem = returnedObj.ecommerceItem;
    value = returnedObj.value;
  }

  if (action === "add") {
    if (isOfferApplied) {
      //select promotion event
      pushEcommerceEvent("select_promotion", {
        creative_name: appliedOffer.offer_name,
        creative_slot: appliedOffer.rule_type,
        promotion_name: appliedOffer.offer_name,
        promotion_id: appliedOffer.offer_name,
        items: [ecommerceItem],
      });
    }
    //add to cart event
    pushEcommerceEvent("add_to_cart", {
      currency: orderCurrency,
      value: value,
      items: [ecommerceItem],
    });
  } else if (
    action === "reduce" ||
    action === "delete" ||
    action === "deleteAll"
  ) {
    //remove from cart event
    pushEcommerceEvent("remove_from_cart", {
      currency: orderCurrency,
      value: value,
      items: action === "deleteAll" ? ecommerceItem : [ecommerceItem],
    });
  } else {
    console.warn(`Unexpected action: ${action}`);
  }
});

//view cart event

document.addEventListener("isViewCartLoaded", (e) => {
  let client_id = e.detail.client_id;

  const returnedCartData = getCartData(client_id);

  const value = returnedCartData.value;

  const ecommerceItem = returnedCartData.ecommerceItem.map((item, key) => {
    const { coupon, discount, ...rest } = item;
    return {
      ...rest,
      currency: orderCurrency,
      index: key,
    };
  });

  pushEcommerceEvent("view_cart", {
    currency: orderCurrency,
    value: value,
    items: ecommerceItem,
  });
});

//view item event

document.addEventListener("oms_getProductSuccess", (e) => {
  let item = e.detail.result.data || {};

  const quantity = 1; //Number(e.detail?.count) || 1;

  item = { ...item, qty: quantity };

  const returnedObj = createEcommerceItem(item);

  const ecommerceItem = returnedObj.ecommerceItem;
  const value = returnedObj.value;

  pushEcommerceEvent("view_item", {
    currency: orderCurrency,
    value: value,
    items: ecommerceItem,
  });
});

//begin checkout event

document.addEventListener("checkoutBtnTriggered", (e) => {
  const client_id = e.detail.client_id;

  const returnedCartData = getCartData(client_id);
  pushEcommerceEvent("begin_checkout", {
    currency: orderCurrency,
    value: returnedCartData.value,
    items: returnedCartData.ecommerceItem,
  });
});

//purchase event
let global = {
  tax_rate: 0,
};
document.addEventListener("oms_submitOrder",(e)=>{
  global.tax_rate = e.detail.tax_rate;
  // console.log('tax_rate_global :>> ', global.tax_rate);
});
document.addEventListener("oms_submitOrderSuccess", (e) => {
  
  let result = e.detail.result;
  // console.log('result.data :>> ', result.data);
  let shippingCharges = result.data.shipping_charge;

  const client_id = result.client_id;

  const returnedCartData = getCartData(client_id);

  pushEcommerceEvent("purchase", {
    transaction_id: result.data.order_id,
    value: returnedCartData.value,
    tax: global.tax_rate,
    shipping: shippingCharges,
    currency: orderCurrency,
    items: returnedCartData.ecommerceItem,
  });
});

//add to wish list event

document.addEventListener("oms_addToFavoriteEvent", (e) => {
  let item = e.detail.product_detail || {};

  const quantity = 1; //Number(e.detail?.count) || 1;

  item = { ...item, qty: quantity };

  const returnedObj = createEcommerceItem(item);

  const ecommerceItem = returnedObj.ecommerceItem;
  const value = returnedObj.value;

  pushEcommerceEvent("add_to_wishlist", {
    currency: orderCurrency,
    value: value,
    items: [ecommerceItem],
  });
});

document.addEventListener("oms_getTemplateListSuccess", (e) => {
  //view item list event

  document.addEventListener("isCategoryPageLoaded", (e) => {
    let data = e.detail || [];
    let products = data.productData || [];

    const ecommerceItem = products.map((item) => {
      const returnedObj = createEcommerceItem(item);

      return returnedObj.ecommerceItem;
    });

    pushEcommerceEvent("view_item_list", {
      item_list_id: data?.category_id[0],
      item_list_name: data.category_name,
      items: ecommerceItem,
    });
  });

  // Dispatch event to indicate (for app.js) that analytic events have been loaded

  let checkAnalyticEventsLoad = new CustomEvent("checkAnalyticEventsLoad", {
    detail: {
      isEventsLoad: true,
    },
  });

  document.dispatchEvent(checkAnalyticEventsLoad);
});
