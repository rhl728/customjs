let orderCurrency = localStorage.getItem("orderCurrency") || "LKR";

function pushEcommerceEvent(eventName, ecommerceObj) {
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

const getCartData = (client_id) => {
  const location_id = window.localStorage.getItem(
    `current_location_${client_id}`
  );

  let data = window.localStorage.getItem(`cart_location_${location_id}`);
  data = JSON.parse(data) || {};

  const itemsArr = Object.values(data);

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

  let value = 0;
  const ecommerceItem = filterdItemsArr.map((item) => {
    const returnedObj = createEcommerceItem(item);
    value += returnedObj.value;
    return returnedObj.ecommerceItem;
  });

  return { ecommerceItem, value };
};

//add to cart and remove cart
document.addEventListener("oms_updateCart", function (e) {
  let item = e.detail?.item || {};

  const quantity = Number(e.detail?.count) || 1;

  item = { ...item, qty: quantity };

  const returnedObj = createEcommerceItem(item);

  const ecommerceItem = returnedObj.ecommerceItem;
  const value = returnedObj.value;

  if (e.detail.action === "add") {
    pushEcommerceEvent("add_to_cart", {
      currency: orderCurrency,
      value: value,
      items: [ecommerceItem],
    });
  } else if (e.detail.action === "reduce") {
    pushEcommerceEvent("remove_from_cart", {
      currency: orderCurrency,
      value: value,
      items: [ecommerceItem],
    });
  }
});


//view_cart event

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

//view_item event

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

//begin_checkout event

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

document.addEventListener("oms_submitOrderSuccess", (e) => {
  let result = e.detail.result;
  let shippingCharges = result.data.shipping_charge;

  const client_id = result.client_id;

  const returnedCartData = getCartData(client_id);

  pushEcommerceEvent("purchase", {
    value: returnedCartData.value,
    shipping: shippingCharges,
    currency: orderCurrency,
    items: returnedCartData.ecommerceItem,
  });
});

let checkAnalyticEventsLoad = new CustomEvent("checkAnalyticEventsLoad", {
  detail: {
    isEventsLoad: true,
  },
});

document.dispatchEvent(checkAnalyticEventsLoad);
