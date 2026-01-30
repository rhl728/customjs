const resend_api = 'https://www.meathouse.lk/pages/customer/resend.php';


const prefix = "client_template_9ec6ba5290735b1924916dc0912a24ef_";
const keepKey = "client_template_9ec6ba5290735b1924916dc0912a24ef_flexy";

// Iterate over all keys in localStorage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix) && key !== keepKey) {
        localStorage.removeItem(key);
        i--; // Adjust the index after removing an item
    }
}

async function getResendLink(email) {
    const res = await fetch(resend_api +'?email='+ email)
    return res;
}
   

/*document.addEventListener("oms_userRegisterSuccess", function (e) {
     
    let result = e.detail.result;

    if (result.success) {
        document.body.classList.add('user-registered');
        e.stopImmediatePropagation()
    }
    
    document.querySelector('.resend-verify-link')?.addEventListener("click", function (e) {
      
      e.preventDefault();
      const that = this;
      const email = that.dataset.email;
      getRes(email);

  });
  
     
});
*/

async function getRes(email) {
    
     document.querySelector('.resend-verify-message').innerHTML = '';
     document.querySelector('.resend-verify-message').classList.remove('text-success', 'text-error');
     document.querySelector('.resend-verify-message').innerHTML = '<svg class="-ml-1 animate-spin h-5 mr-3 text-body w-5"fill=none viewBox="0 0 24 24"xmlns=http://www.w3.org/2000/svg><circle class=opacity-25 cx=12 cy=12 r=10 stroke=currentColor stroke-width=4></circle><path class=opacity-75 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"fill=currentColor></path></svg> Processing...';
     
     const res = await getResendLink(email);
     const data = await res.json();
     //console.log(data);
    
      if(data){
        document.querySelector('.resend-verify-message').innerHTML = data.message;
        document.querySelector('.resend-verify-message').classList.add(data.success? 'text-success' : 'text-error');
      }else{
        document.querySelector('.resend-verify-message').innerHTML = 'Failed to send link.';
        document.querySelector('.resend-verify-message').classList.add('text-error');
      }

}



// I am jkh employee
// function toggleCustomFields() {
//         var checkBox = document.getElementById("jkh-employee");
//         var customField = document.querySelector(".coporateid");

//         if (checkBox.checked) {
//             customField.style.display = "block";
//         } else {
//             customField.style.display = "none";
//         }
//     }
















document.addEventListener("DOMContentLoaded", (event) => {



    
    // pop up message
var showPopupFlag = true;
var EMPUSER = false;
var userData = localStorage.getItem("user_data_9ec6ba5290735b1924916dc0912a24ef");

if (userData) {
    var data = JSON.parse(userData).data;

    data?.groups.map(function (group, index) {
        if (group.id === '8eb5a2185855657c7ada911a3a8e6c7a') {
            EMPUSER = true;
        }
    });

}

if (EMPUSER) {
   document.body.classList.add("emp-mode");
    // Add popup message here
    function showPopupMessage(message) {
        if (showPopupFlag) {
            var popup = document.createElement('div');
            popup.className = 'popup';
            popup.innerHTML = message + '<span class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path></svg></span>';
            document.body.appendChild(popup);

            popup.style.cssText = 'position: fixed; margin: 0 auto; top: 5%; left: 50%; transform: translateX(-50%); background: #fff; color: #000; font-family: Open Sans, sans-serif; padding: 20px; width: auto; border-radius: 5px; box-shadow: 0px 0px 10px 0px #930000; z-index: 9999; text-align: center; transition: Bounce;';

            var closeBtn = popup.querySelector('.close-btn');
            closeBtn.style.cssText = 'position: absolute; top: 5px; right: 5px; cursor: pointer;';

            closeBtn.addEventListener('click', function () {
                popup.style.display = 'none';
                showPopupFlag = false;
            });

            setTimeout(function () {
                popup.style.display = 'none';
                showPopupFlag = false;
            }, 5000);
        }
    }

    showPopupMessage("You are now in the special staff rate section of meathouse.lk. Enjoy your purchase!");
}

      

// Pop up only visible in home page
// old one start

// var x = document.createElement("div");
// x.innerHTML = `<div class="meathouse-deals-chi show"> 
//     <div class="meathouse-deals-chi-inner">
//         <span class="close" id="closeBtn">
//             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
//                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
//             </svg>
//         </span>
//         <img src="https://d3fgegizptfhv.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/POP-UP/813dd382d5a15ddf358590fab2c7860e_1738492771.jpg" />
//     </div>
// </div>`;

// var homePage = document.getElementById("home-page-meathouse");

// Check if the element with ID "home-page-meathouse" exists
// if (window.location.pathname === '/') {
//     document.querySelector("body").appendChild(x);

//     // Select both the image and the close button by their IDs
//     var closeButton = document.getElementById("closeBtn");
//     var image = document.querySelector(".meathouse-deals-chi img");

//     // Add click event listeners to both the close button and the image
//     closeButton.addEventListener("click", closeImage);
//     image.addEventListener("click", closeImage);

//     function closeImage() {
//         x.remove();
//     }
// }

// old one end

//homepop update start
/*
var x = document.createElement("div");
x.innerHTML = `<div class="meathouse-deals-chi show"> 
    <div class="meathouse-deals-chi-inner">
        <span class="close" id="closeBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </span>
        <img width="500" height="360" fetchpriority="high" src="https://dna3n15iwxmh8.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/Pop-up-banners/a19faa870ac6863b65e9ae51a4cb355d_1763977197.jpg" />
    </div>
</div>`;

var homePage = document.getElementById("home-page-meathouse");


if (window.location.pathname === '/' ) {
    //return;
    
    var imageUrl = "https://dna3n15iwxmh8.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/Pop-up-banners/a19faa870ac6863b65e9ae51a4cb355d_1763977197.jpg";
    console.log(imageUrl);
    var img = new Image();
    
    img.onload = function() {
        document.querySelector("body").appendChild(x);

        var closeButton = document.getElementById("closeBtn");
        var image = document.querySelector(".meathouse-deals-chi img");

        closeButton.addEventListener("click", closeImage);
        image.addEventListener("click", closeImage);

        function closeImage() {
            x.remove();
        }
    };
    
    img.onerror = function() {
        console.log("Image failed to load.");
    };

    img.src = imageUrl;
}*/


window.addEventListener('load', function() {
    // Wait an extra 2 seconds after the page is "ready"
   // setTimeout(function() {
        
        var x = document.createElement("div");
        x.innerHTML = `
        <div class="meathouse-deals-chi show"> 
            <div class="meathouse-deals-chi-inner">
                <span class="close" id="closeBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.646 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </span>
                <img width="500" height="360" fetchpriority=high atl="popup-banner" src="https://dna3n15iwxmh8.cloudfront.net/9ec6ba5290735b1924916dc0912a24ef/media/images/themes/827f86235406bf22bd1a8b2a03f952b6/popup-banner.jpg" />
            </div>
        </div>`;

        if (window.location.pathname === '/') {
            document.body.appendChild(x);

            document.getElementById("closeBtn").addEventListener("click", () => x.remove());
            document.querySelector(".meathouse-deals-chi img").addEventListener("click", () => x.remove());
        }

   // }, 5000); // 2000ms = 2 seconds
});

//homepop update End

  
  
  
// /*  
//   document.addEventListener("oms_getSettingsSuccess", function (e) {
// console.log('oms_getSettingsSuccess')
// });
// */


});

// expire date js code start

// Function to format date in "Month Day, Year" format
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Define the function to process each expiration date element
function processExpireDateElements() {
    // console.log("function-start");

    // Select all elements with data-code="expireDate"
    const expireDateElements = document.querySelectorAll('[data-code="expireDate"]');

    // console.log(`Found ${expireDateElements.length} elements with data-code="expireDate"`);

    // Iterate through each element
    expireDateElements.forEach(expireDateElement => {
        // console.log("for-each");

        // Get the expiration date string
        const expireDateElementValue = expireDateElement.querySelector('.expire-date-value');
        if (expireDateElementValue) {
            const expireDateString = expireDateElementValue.textContent.trim();
            // console.log(`Expire date string: ${expireDateString}`);

            const expireDate = new Date(expireDateString);
            // console.log(`Parsed expire date: ${expireDate}`);

            // Calculate the difference in days between today and the expiration date
            const today = new Date();
            const timeDiff = expireDate.getTime() - today.getTime();
            const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // console.log(`Difference in days: ${diffInDays}`);

            // Show the expiration date if it is equal to or more than 30 days away
            if (diffInDays >= 30) {
                expireDateElement.style.display = 'block'; // or 'inline-block' depending on your layout
                expireDateElementValue.textContent = `${formatDate(expireDate)}`;
                // console.log("Displaying element");
            }
        } else {
            // console.log("Expire date value element not found");
        }
    });
}

document.addEventListener("oms_getSettingsSuccess", (event) => {
    setTimeout(() => {
        // console.log("Executing after 3 seconds");
        processExpireDateElements();
    }, 3000);
});






// expire date js code ends




// promo deal background color
document.addEventListener("DOMContentLoaded", function() {
   
    var element = document.querySelector('[data-category="offers"]');
 
    if (element && window.location.pathname === "/offers") {
       
        element.style.backgroundColor = "#f7fafc";
    }
});


//Enabling Register button once clicked consent - B - START
 document.addEventListener("DOMContentLoaded", function () {
     setTimeout(() => {
  const consentButton = document.getElementById("checkbox-group-checkbox-group");
  const submitButton = document.getElementById("submit-btn");

  if (consentButton && submitButton) {
    consentButton.addEventListener("click", function () {
      submitButton.disabled = false;
    });
  } else {
    console.warn("Consent button or submit button not found in DOM.");
  }
     }, 3000);
});



//Enabling Register button once clicked consent - B - END






//loading receipes - B - START

  function recipesFeaturedFetch() {
    const dataURL = 'https://www.keellsfoods.lk/dcb/dynamic.php?requestType=json&dcbName=recipeListing';
    const recipesWrapper = document.querySelector('.recipes-wrapper');
    //const list = recipesWrapper.querySelector('.recipes-wrapper .product-row.recipes');
    const list = recipesWrapper?.querySelector('.product-row.recipes');
    

        
        if (!list) {
          console.error('List container not found');
          return; // stop further execution if list is missing
        }
    fetch(dataURL)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        list.innerHTML = ''; // Clear existing content

        const items = data.data.slice(0, 6);

        items.forEach(item => {
          if (item) {
            const listitem = document.createElement('div');
            listitem.className = 'card relative grid-mode rounded-md box-border overflow-hidden flex flex-nowrap rounded-md items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-md"';

            listitem.innerHTML = `
                  <div class="image-wrapper">
                    <a href="https://www.keellsfoods.lk/recipes/${item.seo_url}" target="_blank"><img width="280" height="185" src="https://www.keellsfoods.lk/${item.featured_image}" title="${item.name}" alt="${item.name}"></a>
                  </div>
                
                    <div class="info px-4">
                      <h3 class="text-heading font-semibold mb-1 md:mb-1.5 text-sm sm:text-base md:text-sm xl:text-base">${item.name}</h3>
                      <p class="text-sm text-red-600"><a href="https://www.keellsfoods.lk/recipes/${item.seo_url}" target="_blank">View Recipe Details</a></p>
                    </div>
                  </div>
            `;

            list.appendChild(listitem);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

document.addEventListener("DOMContentLoaded", function () {


/* setTimeout(() => {
  recipesFeaturedFetch(); // Call the function
 }, 3000);*/
 
function hideofferheading() {
    // Check if there are no .product-list-inner-wrapper inside #product-list-wrapper
//   document.querySelectorAll('#product-list-wrapper').forEach(wrapper => {
//     if (wrapper.querySelectorAll('.product-list-inner-wrapper').length === 0) {
//         const h2 = wrapper.closest('.promo-category-wrap')?.querySelector('h2');
//         if (h2) {
//             h2.style.display = 'none';
//         }
//     }
// });

document.querySelectorAll('.promo-category-wrap').forEach(category => {
  // Find all product list wrappers inside this category
  const wrappers = category.querySelectorAll('.product-list-inner-wrapper');
  let hasProducts = false;

  // Loop through each wrapper to see if it has at least one .item inside
    wrappers.forEach(wrapper => {
      if (wrapper.querySelector('.item:not(.loading-animation)')) {
        hasProducts = true;
      }
    });

  // If none of the wrappers contain products, hide the <h2>
    const heading = category.querySelector('h2');
    if (heading) {
      heading.style.display = hasProducts ? 'block' : 'none';
    }
});
       
}

setTimeout(hideofferheading, 2000);
setTimeout(hideofferheading, 5000);


});


const homePageLoaded  = () => {
    
    setTimeout(function () {
       recipesFeaturedFetch(); // Call the function
    }, 500); // give Vue time to render
  
}



// document.addEventListener("DOMContentLoaded", function () {
//     if (document.querySelector(".home-page")) {
//         document.body.insertAdjacentHTML('afterbegin', '<div id="snow-animation-container"></div>');
//     }
// });


// document.addEventListener('DOMContentLoaded', function() {
//   if (document.querySelector('.home-page')) {
//     const MAX_SNOW = 200;
//     const MAX_SNOW_SIZE = 7;
//     const MAX_SNOW_SPEED = 1;

//     snowStart();

//     function snowStart() {
//       createSnows();
//     }

//     function createSnows() {
//       const container = document.getElementById('snow-animation-container');
//       if (!container) return;

//       for (let i = 0; i < MAX_SNOW; i++) {
//         const appendItem = getRandomItem(i);
//         container.insertAdjacentHTML('beforeend', appendItem);

//         const animateItem = container.querySelector('.snow' + i);
//         const randomTime = Math.random() * MAX_SNOW_SPEED;

//         goAnimate(animateItem, i, randomTime);
//         goAnimate2(animateItem);
//       }
//     }

//     function goAnimate(item, id, randomTime) {
//       if (!item) return;

//       TweenMax.to(item, randomTime, {
//         css: { marginTop: '+=100' },
//         ease: Linear.easeNone,
//         onComplete: function() {
//           const topPosition = parseFloat(item.style.marginTop) || 0;
//           if (topPosition > window.innerHeight) {
//             changePosition(item);
//             const newRandomTime = Math.random() * MAX_SNOW_SPEED;
//             goAnimate(item, id, newRandomTime);
//           } else {
//             goAnimate(item, id, randomTime);
//           }
//         }
//       });
//     }

//     function goAnimate2(item) {
//       if (!item) return;

//       const directionTime = 1 + Math.floor(Math.random() * 5);
//       const randomDirection = 1 + Math.floor(Math.random() * 4);
//       const delayTime = 1 + Math.floor(Math.random() * 3);

//       if (randomDirection === 1) {
//         TweenMax.to(item, directionTime, {
//           css: { marginLeft: '+=100' },
//           ease: Linear.easeOut,
//           onComplete: function() {
//             TweenMax.to(item, directionTime, {
//               css: { marginLeft: '-=100' },
//               delay: delayTime,
//               ease: Linear.easeOut,
//               onComplete: function() {
//                 goAnimate2(item);
//               }
//             });
//           }
//         });
//       } else if (randomDirection === 2) {
//         TweenMax.to(item, directionTime, {
//           css: { marginLeft: '-=100' },
//           ease: Linear.easeOut,
//           onComplete: function() {
//             TweenMax.to(item, directionTime, {
//               css: { marginLeft: '+=100' },
//               delay: delayTime,
//               ease: Linear.easeOut,
//               onComplete: function() {
//                 goAnimate2(item);
//               }
//             });
//           }
//         });
//       } else if (randomDirection === 3) {
//         TweenMax.to(item, directionTime, {
//           css: { marginLeft: '+=100' },
//           ease: Linear.easeOut,
//           onComplete: function() {
//             goAnimate2(item);
//           }
//         });
//       } else if (randomDirection === 4) {
//         TweenMax.to(item, directionTime, {
//           css: { marginLeft: '-=100' },
//           ease: Linear.easeOut,
//           onComplete: function() {
//             goAnimate2(item);
//           }
//         });
//       }
//     }

//     function changePosition(item) {
//       const _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
//       const _height = _width;
//       const _blur = Math.floor(Math.random() * 5 + 2);
//       const _left = Math.floor(Math.random() * (window.innerWidth - _width));
//       const _top = -window.innerHeight + Math.floor(Math.random() * (window.innerHeight - _height));

//       item.style.width = _width + 'px';
//       item.style.height = _height + 'px';
//       item.style.marginLeft = _left + 'px';
//       item.style.marginTop = _top + 'px';

//       const blurValue = `blur(${_blur}px)`;
//       item.style.webkitFilter = blurValue;
//       item.style.mozFilter = blurValue;
//       item.style.oFilter = blurValue;
//       item.style.msFilter = blurValue;
//       item.style.filter = blurValue;
//     }

//     function getRandomItem(id) {
//       const _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
//       const _height = _width;
//       const _blur = Math.floor(Math.random() * 5 + 2);
//       const _left = Math.floor(Math.random() * (window.innerWidth - _width));
//       const _top = -window.innerHeight + Math.floor(Math.random() * (window.innerHeight - _height));
//       const _id = id;

//       return getSmallSnow(_width, _height, _blur, _left, _top, _id);
//     }

//     function getSmallSnow(width, height, blur, left, top, id) {
//       return `<div class="snow${id}" style="
//         position: absolute;
//         margin-left: ${left}px;
//         margin-top: ${top}px;
//         width: ${width}px;
//         height: ${height}px;
//         border-radius: 50%;
//         background-color: white;
//         -webkit-filter: blur(${blur}px);
//         -moz-filter: blur(${blur}px);
//         -o-filter: blur(${blur}px);
//         -ms-filter: blur(${blur}px);
//         filter: blur(${blur}px);
//       "></div>`;
//     }
//   }
// });