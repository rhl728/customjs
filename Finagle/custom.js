// A HACK TO PREVENT SAME CODE RUN TWICE
let funcRunCount = 0;
let selectedOutlet = null;
const clientID = "f19f00fa2ca8585db05b39ba151d8a91";
let scrolled = false;
let sections;
let navLinks;

(function () {
    const savedLocation = localStorage.getItem("user_current_location");

    if (savedLocation && window.location.pathname === "/") {
        window.location.replace("/" + savedLocation);
    }
})();



const intLocationPicker = () => {
    
    console.log('intLocationPicker');
    
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // GOOGLE MAPS FUNCTIONALITY START - FOR UBER EATS LIKE ADDRESS MANAGEMENT AT CHECKOUT [START]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        
        // ============================================
        // CONFIGURATION
        // ============================================
        
        // Define outlets with delivery areas (polygons)
        const OUTLETS = [
            {
                id: 'nugegoda',
                name: 'Nugegoda',
                position: { lat: 6.868745, lng: 79.8888241 },
                deliveryArea: [
                    { lat: 6.887081794361205, lng: 79.88716647050815 },
                    { lat:6.888003919914409, lng: 79.87686448380003 },
                    { lat:6.878289743508352, lng: 79.87609200768873 },
                    { lat:6.873389973775309, lng: 79.8731308486294 },
                    { lat:6.865933705690906, lng: 79.87441830881491 },
                    { lat:6.860479904186905, lng: 79.88179974721183 },
                    { lat:6.856483930905168, lng: 79.89063495769435 },
                    { lat:6.856466016219991, lng: 79.89783438623574 },
                    { lat:6.862879413054721, lng: 79.90180399530325 },
                    { lat:6.872588916599598, lng: 79.90487142147636 },
                    { lat:6.88383879444259, lng: 79.90191225827391 },
                    { lat:6.889320326268385, lng: 79.89444217502935 }
                ]
            },
            {
                id: 'pelawatte',
                name: 'Pelawatte',
                position: { lat: 6.891252806399684, lng: 79.92809825866821 } ,
                deliveryArea: [
                    { lat: 6.906894578752748, lng: 79.94601622044814 },
                    { lat: 6.914904044537732, lng: 79.93520155497487 },
                    { lat: 6.9153300761424, lng: 79.92734804784327 },
                    { lat: 6.908982165458915, lng: 79.91734877373581 },
                    { lat: 6.903358441798891, lng: 79.90979567348509 },
                    { lat: 6.9025915649632585, lng: 79.90537539243837 },
                    { lat: 6.900290927798606, lng: 79.90202799559256 },
                    { lat: 6.893090713232195, lng: 79.8973073082457 },
                    { lat: 6.882822762439483, lng: 79.89292994361497 },
                    { lat: 6.879925541009858, lng: 79.89988222903222 },
                    { lat: 6.871574627559553, lng: 79.90597620742774 },
                    { lat: 6.8671860786017715, lng: 79.92069616888206 },
                    { lat: 6.867612153090889, lng: 79.93108168104517 },
                    { lat: 6.8695720908536435, lng: 79.94112387272999 },
                    { lat: 6.875494462364816, lng: 79.95850458576312 },
                    { lat: 6.887892857148777, lng: 79.9580754324435 },
                    { lat: 6.8941132356692885, lng: 79.95541468146426 },
                    { lat: 6.903869692032196, lng: 79.95511427408763 },
                    { lat: 6.908385713264136, lng: 79.94228258721326 },
                ]
            }
        ];

        // ============================================
        // STATE MANAGEMENT
        // ============================================
        let map, geocoder, autocompleteService, placesService, draggableMarker;
        let currentPosition = { lat: 6.868745, lng: 79.8888241 };
        //let selectedOutlet = null;
        let deliveryPolygon = null;
        let outletMarker = null;
        let sessionToken = null;
        let autocompleteTimeout = null;
        let activeStorePolygon = null;
        
        let selectedLat = 0;
        let selectedLng = 0;
        let selectedAddr = null;
        
        
        // ============================================
        // ELEMENTS CACHE
        // ============================================
        const popup = document.getElementById('locationPopup');
        const openBtn = document.getElementById('openPopupBtn');
        const closeBtn = document.getElementById('closePopupBtn');
        const confirmBtn = document.getElementById('confirmLocation');
        const infoText = document.getElementById('info-text');
        const infoStatus = document.getElementById('info-status');
        
        const addressInput = document.getElementById('address');
        const currentLocation = document.querySelector('.location-dropdown-wrapper select')?.value;
        
        // Find the matching outlet
        const outlet = OUTLETS.find(o => o.id === currentLocation);
        
        const storePolygons = [];


        // ============================================
        // GOOGLE MAPS INITIALIZATION
        // ============================================
        
        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            const { AutocompleteService, PlacesService } = await google.maps.importLibrary("places");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const { Geocoder } = await google.maps.importLibrary("geocoding");
            const { Polygon } = await google.maps.importLibrary("maps");
            const geometry = await google.maps.importLibrary("geometry");
            await google.maps.importLibrary("places");
            
            
            // console.log(currentPosition);
            
            // Create map
            map = new Map(document.getElementById("map"), {
                center: currentPosition,
                zoom: 16,
                mapId: "DEMO_MAP_ID",
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                clickableIcons: false,
                gestureHandling: "greedy",
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: true,
                minZoom: 13,
                maxZoom: 18,
                draggable: true,
            });

            
            // Initialize services
            geocoder = new Geocoder();
            
            // Initialize Autocomplete services
            autocompleteService = new AutocompleteService();
            
            // Initialize places service
            placesService = new PlacesService(map);
            
            // Listen for map drag/idle events
            map.addListener('idle', handleMapIdle);
            
            // Populate outlet on the map
            selectedOutlet = outlet;
                
            // Create outlet marker
            outletMarker = new AdvancedMarkerElement({
                position: outlet.position,
                map: map,
                title: outlet.name
            });
            
            
            // ============================================
            // COMMENT FROM DEVELOPER [HA]:
            // IF A CUSTOM MARKER IS REQUIRED FOR OUTLET, COMMENT ABOVE AND UNCOMMENT BELOW AND CUSTOMIZE [content:] PART AS NEEDED
            // ============================================
                // outletMarker = new google.maps.marker.AdvancedMarkerElement({
                //   position: outlet.position,
                //   map: map,
                //   title: outlet.name,
                //   content: (() => {
                //     const div = document.createElement('div');
                //     div.style.width = '20px';
                //     div.style.height = '20px';
                //     div.style.backgroundColor = '#FF5722';
                //     div.style.border = '3px solid #FFFFFF';
                //     div.style.borderRadius = '50%';
                //     div.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
                //     return div;
                //   })(),
                //   zIndex: 1000
                // });

                
                // Create delivery area polygon
                const polygon = new Polygon({
                  paths: outlet.deliveryArea,
                  strokeColor: "#E20613",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: "#E20613",
                  fillOpacity: 0.05,
                  map: map,
                });
                storePolygons.push({polygon, outlet});
            
            
            
            // Create the central draggable marker
              draggableMarker = new AdvancedMarkerElement({
                map,
                position: map.getCenter(),
                gmpDraggable: true,
                title: "Drag me to find an address",
                content: (() => {
                    const div = document.createElement('div');
                    div.style.width = '24px';
                    div.style.height = '37px';
                    div.style.display = 'flex';
                    div.style.alignItems = 'center';
                    div.style.justifyContent = 'center';
                    div.innerHTML = `
                      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.2906 19.1595 23.4498 13 23.958V35C13 35.5523 12.5523 36 12 36C11.4477 36 11 35.5523 11 35V23.958C4.84051 23.4498 0 18.2906 0 12C0 5.37258 5.37258 0 12 0Z" fill="black"/>
                        <circle cx="12" cy="12" r="4" fill="white"/>
                        </svg>
                    `;
                    return div;
                  })(),
                  zIndex: 1000
              });
            
              // Add event listeners
            //   draggableMarker.addListener("dragend", handleMarkerDrag);
              
              let centerUpdateTimeout = null;

                let isMarkerDragged = false;
              
              draggableMarker.addListener("dragstart", () =>{
                  isMarkerDragged = true;
              });
              
              draggableMarker.addListener("dragend", (event) => {
                  handleMarkerDrag(event);
              })

                map.addListener('center_changed', () => {
                    if(!isMarkerDragged){
                        const center = map.getCenter();
                        draggableMarker.position = center; 
                    }
                  
                  clearTimeout(centerUpdateTimeout);
                  centerUpdateTimeout = setTimeout(() => {
                    updateLocationInfo(draggableMarker.position);
                  }, 800); // waits 0.8s after user stops dragging
                });
                
                
            // Initialize Autocomplete Feature
            setupAutocomplete();
            
            // Initial info update
            updateLocationInfo(draggableMarker.position);
        }
        
        // ============================================
        // MAP INTERACTION
        // ============================================
        // Map Idle functionality
        function handleMapIdle() {
            const center = map.getCenter();
            currentPosition = { lat: center.lat(), lng: center.lng() };
            
            // Reverse geocode to get address
            reverseGeocode(currentPosition);
            
            // Check delivery availability
            checkDeliveryStatus(currentPosition);
        }
        
        //Format Longitudes and Latitudes
        function getLatLngLiteral(pos) {
          return {
            lat: typeof pos.lat === "function" ? pos.lat() : pos.lat,
            lng: typeof pos.lng === "function" ? pos.lng() : pos.lng,
          };
        }
        
        //Update Location info on map, search, and final output
        async function updateLocationInfo(position, prefilledAddress = null) {
        
          const { lat, lng } = getLatLngLiteral(position);
          console.log(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          selectedLat = lat.toFixed(6);
          selectedLng = lng.toFixed(6);
        
          if (prefilledAddress) {
            infoStatus.textContent = prefilledAddress;
            addressInput.value = prefilledAddress;
            checkDeliveryStatus(position);
          } else {
            try {
              const response = await geocoder.geocode({ location: { lat, lng } });
              if (response.results && response.results[0]) {
                const address = response.results[0].formatted_address;
        
                console.log(address);
                selectedAddr = address;
                addressInput.value = address;
                checkDeliveryStatus(position);
              } else {
                infoStatus.textContent = "No address found";
                
                infoText.style.display = 'none';
                infoStatus.style.display = 'inline-block';
                infoStatus.className = 'unavailable';
                confirmBtn.classList.add('disabled');
              }
            } catch (e) {
              console.error("Geocode failed:", e);
              infoStatus.textContent = "Cannot determine address";
              
              infoText.style.display = 'none';
                infoStatus.style.display = 'inline-block';
                infoStatus.className = 'unavailable';
                confirmBtn.classList.add('disabled');
            }
          }
        }
        
        //Behaviour when marker is dragged
        async function handleMarkerDrag(event) {
          const position = draggableMarker.position;
          updateLocationInfo(position);
        }
        
        //Behaviour when user selects a item from auto-complete
        async function handlePlaceSelect(event) {
            const addressAutocomplete = document.getElementById('address-autocomplete');
          const place = event.detail?.place;
          if (place?.location) {
            const loc = place.location;
            const address = place.formattedAddress || place.displayName || "";
        
            map.panTo(loc);
            map.setZoom(16);
            draggableMarker.position = loc;
        
            addressAutocomplete.value = address;
            updateLocationInfo(loc, address); 
          }
        }
        
        // ============================================
        // GEOCODING
        // ============================================
        
        function reverseGeocode(position) {
            geocoder.geocode({ location: position }, (results, status) => {
                if (status === "OK" && results[0]) {
                    addressInput.value = results[0].formatted_address;
                }
            });
        }
        
        function geocodeAddress(address) {
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    currentPosition = { lat: location.lat(), lng: location.lng() };
                    map.setCenter(location);
                    addressInput.value = results[0].formatted_address;
                    hideAutocomplete();
                }
            });
        }
        
        // ============================================
        // AUTOCOMPLETE
        // ============================================
        
        function setupAutocomplete() {
            
            addressInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                
                clearTimeout(autocompleteTimeout);
                
                if (value.length < 3) {
                    hideAutocomplete();
                    return;
                }
                
                autocompleteTimeout = setTimeout(() => {
                    fetchPredictions(value);
                }, 300);
            });
            
            addressInput.addEventListener('focus', () => {
                if (addressInput.value.length >= 3) {
                    fetchPredictions(addressInput.value);
                }
            });
            
            
            //Setup clear address if needed
            // document.getElementById('clearBtn').addEventListener('click', () => {
            //     addressInput.value = '';
            //     hideAutocomplete();
            //     addressInput.focus();
            // });
            
            
            // Hide autocomplete when clicking outside the popup
            document.addEventListener('click', (e) => {
              if (!e.target.closest('.set-location-wrapper')) {
                hideAutocomplete();
              }
            });
            
            // Hide autocomplete when input loses focus
            addressInput.addEventListener('blur', () => {
              // Delay slightly to allow item click to register
              setTimeout(() => {
                hideAutocomplete();
              }, 100);
            });
        }
        
        function fetchPredictions(query) {
            if (!sessionToken) {
                sessionToken = new google.maps.places.AutocompleteSessionToken();
            }
            
            const request = {
                input: query,
                sessionToken: sessionToken,
                componentRestrictions: { country: 'lk' }, // Restrict to Sri Lanka
                location: new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
                radius: 50000
            };
            
            console.log(request);
            
            autocompleteService.getPlacePredictions(request, displayPredictions);
        }
        
        function displayPredictions(predictions, status) {
            const addressAutocomplete = document.getElementById('address-autocomplete');
            // const dropdown = document.getElementById('autocompleteDropdown');
            
            if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                hideAutocomplete();
                return;
            }
            
            addressAutocomplete.innerHTML = '';
            
            predictions.forEach(prediction => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                
                const main = prediction.structured_formatting.main_text;
                const secondary = prediction.structured_formatting.secondary_text || '';
                
                item.innerHTML = `<div class="autocomplete-icon">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C15.866 4.5 19 7.63401 19 11.5C19 16.5159 13.8819 19.5342 12.3984 20.3037C12.1456 20.4349 11.8544 20.4349 11.6016 20.3037C10.1181 19.5342 5 16.5159 5 11.5C5 7.63401 8.13401 4.5 12 4.5ZM12 8.5C10.3431 8.5 9 9.84315 9 11.5C9 13.1569 10.3431 14.5 12 14.5C13.6569 14.5 15 13.1569 15 11.5C15 9.84315 13.6569 8.5 12 8.5Z" fill="#1E1E1E"/>
                        </svg>
                    </div>
                    <div class="autocomplete-content">
                        <p class="autocomplete-main">${main}</p>
                        <p class="autocomplete-secondary">${secondary}</p>
                    </div>`;
                    
                
                item.addEventListener('click', () => {
                    selectPrediction(prediction);
                });
                
                addressAutocomplete.appendChild(item);
            });
            
            addressAutocomplete.classList.remove('hidden');
        }
        
        function selectPrediction(prediction) {
            // Get place details
            placesService.getDetails({
                placeId: prediction.place_id,
                fields: ['geometry', 'formatted_address'],
                sessionToken: sessionToken
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const location = place.geometry.location;
                    currentPosition = { lat: location.lat(), lng: location.lng() };
                    map.setCenter(location);
                    addressInput.value = place.formatted_address;
                    
                    // Reset session token
                    sessionToken = null;
                }
            });
            
            hideAutocomplete();
        }
        
        function hideAutocomplete() {
            document.getElementById('address-autocomplete').classList.add('hidden');
        }
        
        // ============================================
        // DELIVERY VALIDATION
        // ============================================
        
        
        function checkDeliveryStatus(position) {
            let isDeliverable = false;
            let deliveryStore = '';
        
            for (const item of storePolygons) {
                if (google.maps.geometry.poly.containsLocation(position, item.polygon)) {
                    isDeliverable = true;
                    deliveryStore = item.outlet.name;
                    break;
                }
            }
        
            // const statusEl = document.getElementById('status-display');
            if (isDeliverable) {
                infoText.style.display = 'inline-block';
                infoStatus.style.display = 'none';
                // infoStatus.textContent = `Available for delivery from ${deliveryStore}`;
                infoStatus.className = 'available';
                confirmBtn.classList.remove('disabled');
            } else {
                infoText.style.display = 'none';
                infoStatus.style.display = 'inline-block';
                infoStatus.textContent = 'Selected location is out of outlet delivery area';
                infoStatus.className = 'unavailable';
                confirmBtn.classList.add('disabled');
            }
        }
        
        
        // ============================================
        // USER ACTIONS
        // ============================================
        
        function useCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        currentPosition = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map.setCenter(currentPosition);
                        reverseGeocode(currentPosition);
                    },
                    (error) => {
                        alert('Unable to get current location. Please enter address manually.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        }
        
        function confirmLocation() {
            // const address = document.getElementById('addressInput').value;
            
            // Here you would send data to backend
            const locationData = {
                address: selectedAddr,
                latitude: currentPosition.lat,
                longitude: currentPosition.lng,
                outlet: selectedOutlet.id,
                outletName: selectedOutlet.name
            };
            
            //Set Shipping Address Field on Checkout Form
            const shipping_addr = document.getElementById('e3da1e7dd54f8bd0f1298efc0b11199e');
            shipping_addr.value = selectedAddr;
            shipping_addr.setAttribute('value', selectedAddr);
            shipping_addr.setAttribute('data-latitude', currentPosition.lat);
            shipping_addr.setAttribute('data-longitude', currentPosition.lng);
            
            
            shipping_addr.dispatchEvent(new Event('input'));
            
            //Append to checkout Form
            
            //Debugging logging
            console.log('Location confirmed jjj:', locationData);
            
            // Close popup
            closePopup();
            
        }
        
        // ============================================
        // POPUP CONTROLS
        // ============================================
        
        function openPopup() {
            popup.classList.add('popup-active');
            
            initMap();
            
            // Trigger map resize after popup is visible
            setTimeout(() => {
                google.maps.event.trigger(map, 'resize');
                if (selectedOutlet) {
                    map.setCenter(selectedOutlet.position);
                }
            }, 100);
        }
        
        function closePopup() {
            popup.classList.remove('popup-active');
        }
        
        // ============================================
        // EVENT LISTENERS
        // ============================================
        
        openBtn?.addEventListener('click', openPopup);
        closeBtn?.addEventListener('click', closePopup);
        // document.getElementById('useCurrentLocation').addEventListener('click', useCurrentLocation);
        confirmBtn?.addEventListener('click', confirmLocation);
        
        // Close popup when clicking overlay
        popup?.addEventListener('click', (e) => {
            if (e.target.id === 'locationPopup') {
                closePopup();
            }
        });
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // GOOGLE MAPS FUNCTIONALITY START - FOR UBER EATS LIKE ADDRESS MANAGEMENT AT CHECKOUT [END]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
}


const renderOrderTypes = () => {
    
    setTimeout(() => {
         intLocationPicker();
    }, 100);
    
   
}


const setSelectedLoc = (e) => {
    
        const locationDropdownWrapper = document.querySelectorAll(".location-dropdown-wrapper");

        // Get the first URL fragment after domain
        const urlParts = window.location.pathname.split("/").filter(Boolean);
        const firstFragment = urlParts.length > 0 ? urlParts[0] : null;
        
         console.log('onceee locationDropdownWrapper', locationDropdownWrapper);

        locationDropdownWrapper.forEach((dropDownWrapper) => {
            const selectEl = dropDownWrapper.querySelector("select");


            if (selectEl) {
                
                const currLoc = localStorage.getItem("current_location_" + clientID);
                
                //console.log('currLoc', currLoc);
                
                if (currLoc) {
                  // Loop through options to find matching data-id
                  for (const option of selectEl.options) {
                    if (option.dataset.id === currLoc) {
                      option.selected = true;
                      break;
                    }
                  }
                }else{
                const firstLoc = selectEl.options[1];
    
                    firstLoc.selected = true;
                    const firstLocId = firstLoc.dataset.id;
                    if (firstLocId) {
                        localStorage.setItem("current_location_" + clientID, firstLocId);
                    }
                }
                
                
            // Redirect on change
                selectEl.addEventListener("change", function () {
                    const selectedOption = this.options[this.selectedIndex];
                    const selectedValue = this.value;
                    const selectedId = selectedOption.dataset.id;
                    
                    if (selectedValue) {
                        console.log(selectedId);
                        localStorage.setItem("current_location_" + clientID, selectedId);
                        window.location.href = "/" + selectedValue;
                       
                    }
                });
                
            }
        });
}


document.addEventListener("oms_getTemplateListSuccess", function (e) {
    
    
    
    
    document.addEventListener(
        "oms_getOrderInfoSuccess",
        function (e) {
          let orderInfo = e.detail.result.data;

          if (orderInfo.order_info && orderInfo.order_info.success) {
            console.log(">>>>",orderInfo)
          }
        }

      );
    
    
    
    
    
    
    // a hack to prevent same function run twice
    funcRunCount++;
    
    if (e.detail.result.success) {
        
       /* const locationDropdownWrapper = document.querySelectorAll(".location-dropdown-wrapper");

        // Get the first URL fragment after domain
        const urlParts = window.location.pathname.split("/").filter(Boolean);
        const firstFragment = urlParts.length > 0 ? urlParts[0] : null;
        
        locationDropdownWrapper.forEach((dropDownWrapper) => {
            const selectEl = dropDownWrapper.querySelector("select");

            if (selectEl) {
            
                // Redirect on change
                selectEl.addEventListener("change", function () {
                    const selectedOption = this.options[this.selectedIndex];
                    const selectedValue = this.value;
                    const selectedId = selectedOption.dataset.id;
                    
                    if (selectedValue) {
                        console.log(selectedId);
                        localStorage.setItem("current_location_" + clientID, selectedId);
                        window.location.href = "/" + selectedValue;
                       
                    }
                });
            }
        });
        */
        
        //Collapse Section on Checkout and Order Confirmation
        document.querySelectorAll('.collapse-section').forEach(item => {
          const title = item.querySelector('.collapse-button');
          const productListWrapper = item.querySelector('.collapse-item');
        
          title.addEventListener('click', () => {
            productListWrapper.classList.toggle('collapse-active');
            title.classList.toggle('collapse-active');
          });
        });
        
        //Set Outlet Name on Checkout Form
        // function setOutletOnCheckout(){
        //     document.querySelectorAll('.shipping_outlet').forEach(item => {
        //         const inputEl = item.querySelector('input');
        //       const dropdown = document.querySelector('.location-dropdown-wrapper select');
              
        //       console.log(dropdown.value);
              
        //       // set the value
        //       inputEl.value = dropdown.value;
              
        //       // disable the field
        //       inputEl.disabled = true;
        //     });
        // }
        
        
        // //Run on initial Page Load
        // setOutletOnCheckout();
        
        
        // //re-enable outlet on checkbox change
        // const checkoutOrderTypeToggle = document.getElementById('orderType');
        // if(checkoutOrderTypeToggle){
        //     checkoutOrderTypeToggle.querySelectorAll('input[name="orderType"]').forEach(radio => {
        //       radio.addEventListener('change', () => {
        //         setTimeout(setOutletOnCheckout,1000);
        //       });
        //     });
        // }
        



        try {
          
            // Scroll Menu
    
             sections = document.querySelectorAll(".categroy-block-custom > .product-block > div[data-category-id],.best-selling-block [data-category-id],.featured-offers-block");
             navLinks = document.querySelectorAll(".horizontal-menu-wrapper li");
            
            // window.addEventListener("scroll", () => {
            //   sections.forEach(section => {
            //     const rect = section.getBoundingClientRect();
            //     const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            
            //     if (inView) {
            //       console.log("In view:", section.getAttribute("data-category-id"));
            
            //       let activeLink = null;
                  
            //       navLinks.forEach(link => {
            //         const isActive = link.getAttribute("data-category") == section.getAttribute("data-category-id");
            //         link.classList.toggle("active", isActive);
                    
            //         if (isActive) {
            //           activeLink = link;
            //         }
                    
            //       });
            
            //       // Auto-scroll horizontal menu to show active item
            //       if (activeLink) {
            //         scrollToActiveItem(activeLink);
            //       }
            //     }
            //   });
            // });
            
            window.addEventListener("scroll", () => {
                
                
                
                  
                if(!scrolled){
                    
                    sections = document.querySelectorAll(".categroy-block-custom > .product-block > div[data-category-id],.best-selling-block [data-category-id],.featured-offers-block");
                    navLinks = document.querySelectorAll(".horizontal-menu-wrapper li");
            
            
                     console.log('sections', sections);
                    console.log('navLinks', navLinks);
                }
                
                 scrolled = true;
              sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            
                if (inView) {
                  console.log("In view:", section.getAttribute("data-category-id"));
            
                  let activeLink = null;
                  
                  navLinks.forEach(link => {
                    const isActive = link.getAttribute("data-category") == section.getAttribute("data-category-id");
                    link.classList.toggle("active", isActive);
                    
                    if (isActive) {
                      activeLink = link;
                    }
            
                  });
            
                  // Auto-scroll horizontal menu to show active item
                  if (activeLink) {
                    scrollToActiveItem(activeLink);
                  }
                }
              });
            });

            function scrollToActiveItem(activeLink) {
              const menuWrapper = document.querySelector('.horizontal-menu-wrapper');
              const menuUl = menuWrapper.querySelector('ul');
              
              if (!menuWrapper || !menuUl) return;
              
              // Check if menu overflows
              const wrapperWidth = menuWrapper.offsetWidth;
              const ulWidth = menuUl.scrollWidth;
              
              // If no overflow, don't scroll
              if (ulWidth <= wrapperWidth) {
                menuUl.style.transform = 'translateX(0)';
                return;
              }
              
              // Get the position of the active link relative to the ul
              const linkRect = activeLink.getBoundingClientRect();
              const ulRect = menuUl.getBoundingClientRect();
              const wrapperRect = menuWrapper.getBoundingClientRect();
              
              // Calculate how far to scroll
              const linkLeft = linkRect.left - ulRect.left; // Position of link within ul
              const linkWidth = linkRect.width;
              
              // Calculate the target scroll position to center the active item
              const targetScrollLeft = linkLeft - (wrapperWidth / 2) + (linkWidth / 2);
              
              // Ensure we don't scroll beyond the bounds
              const maxScroll = ulWidth - wrapperWidth;
              const clampedScroll = Math.max(0, Math.min(targetScrollLeft, maxScroll));
              
              // Apply the transform
              menuUl.style.transform = `translateX(-${clampedScroll}px)`;
              menuUl.style.transition = 'transform 0.3s ease';
            }
            
                // let isDragging = false;
                // let startX = 0;
                // let currentX = 0;
                // let translateX = 0;
                // let maxTranslateX = 0;
                // let minTranslateX = 0;
            
                // const wrapper = document.querySelector(".horizontal-menu-wrapper");
                // const ul = document.querySelector(".horizontal-menu-wrapper .list-group ul");
            
                // // Calculate boundaries
                // function calculateBoundaries() {
                //     const wrapperWidth = wrapper.offsetWidth;
                //     const ulWidth = ul.scrollWidth;
                //     maxTranslateX = 0;
                //     minTranslateX = Math.min(0, wrapperWidth - ulWidth);
                // }
            
                // // Apply transform
                // function applyTransform(x) {
                //     translateX = Math.max(minTranslateX, Math.min(maxTranslateX, x));
                //     ul.style.transform = `translateX(${translateX}px)`;
                // }
            
                // // Init
                // calculateBoundaries();
                // window.addEventListener("resize", calculateBoundaries);
            
                // // Mouse drag
                // wrapper.addEventListener("mousedown", function (e) {
                //     isDragging = true;
                //     startX = e.pageX;
                //     currentX = translateX;
                //     ul.classList.add("dragging");
                //     wrapper.style.cursor = "grabbing";
                //     e.preventDefault();
                // });
            
                // document.addEventListener("mousemove", function (e) {
                //     if (!isDragging) return;
            
                //     const deltaX = e.pageX - startX;
                //     let newTranslateX = currentX + deltaX;
            
                //     // Elastic edges
                //     if (newTranslateX > maxTranslateX) {
                //         newTranslateX = maxTranslateX + (newTranslateX - maxTranslateX) * 0.3;
                //     } else if (newTranslateX < minTranslateX) {
                //         newTranslateX = minTranslateX + (newTranslateX - minTranslateX) * 0.3;
                //     }
            
                //     translateX = newTranslateX;
                //     ul.style.transform = `translateX(${translateX}px)`;
                // });
            
                // document.addEventListener("mouseup", function () {
                //     if (!isDragging) return;
                //     isDragging = false;
                //     ul.classList.remove("dragging");
                //     wrapper.style.cursor = "grab";
                //     applyTransform(translateX); // snap back
                // });
            
                // // Touch drag
                // wrapper.addEventListener("touchstart", function (e) {
                //     isDragging = true;
                //     startX = e.touches[0].pageX;
                //     currentX = translateX;
                //     ul.classList.add("dragging");
                // });
            
                // document.addEventListener("touchmove", function (e) {
                //     if (!isDragging) return;
            
                //     const deltaX = e.touches[0].pageX - startX;
                //     let newTranslateX = currentX + deltaX;
            
                //     if (newTranslateX > maxTranslateX) {
                //         newTranslateX = maxTranslateX + (newTranslateX - maxTranslateX) * 0.3;
                //     } else if (newTranslateX < minTranslateX) {
                //         newTranslateX = minTranslateX + (newTranslateX - minTranslateX) * 0.3;
                //     }
            
                //     translateX = newTranslateX;
                //     ul.style.transform = `translateX(${translateX}px)`;
                // });
            
                // document.addEventListener("touchend", function () {
                //     if (!isDragging) return;
                //     isDragging = false;
                //     ul.classList.remove("dragging");
                //     applyTransform(translateX);
                // });
            
                // // Prevent text selection while dragging
                // wrapper.addEventListener("selectstart", function (e) {
                //     e.preventDefault();
                // });
            
            
            // function scrollToActiveItem(activeLink) {
            //   const menuWrapper = document.querySelector('.horizontal-menu-wrapper');
            //   const menuUl = menuWrapper.querySelector('ul');
              
            //   if (!menuWrapper || !menuUl) return;
              
            //   // Get the position of the active link relative to the ul
            //   const linkRect = activeLink.getBoundingClientRect();
            //   const ulRect = menuUl.getBoundingClientRect();
            //   const wrapperRect = menuWrapper.getBoundingClientRect();
              
            //   // Calculate how far to scroll
            //   const linkLeft = linkRect.left - ulRect.left; // Position of link within ul
            //   const linkWidth = linkRect.width;
            //   const wrapperWidth = wrapperRect.width;
              
            //   // Calculate the target scroll position to center the active item
            //   const targetScrollLeft = linkLeft - (wrapperWidth / 2) + (linkWidth / 2);
              
            //   // Apply the transform
            //   menuUl.style.transform = `translateX(-${Math.max(0, targetScrollLeft)}px)`;
            //   menuUl.style.transition = 'transform 0.3s ease';
            // }
            
            // window.addEventListener("scroll", () => {
              
            //   sections.forEach(section => {
            //     const rect = section.getBoundingClientRect();
            //     const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            
            //     if (inView) {
                  
            //       console.log("In view:", section.getAttribute("data-category-id"));
            
            //       navLinks.forEach(link => {
                    
            //         link.classList.toggle("active", link.getAttribute("data-category") == section.getAttribute("data-category-id"));
                    
            //       });
            
            //     }
            //   });
            // });
            
            // // Highlight active menu item on scroll
            // const observer = new IntersectionObserver((entries) => {
            //   entries.forEach(entry => {
        
            //     if (entry.isIntersecting) {
         
            //       const category = entry.target.getAttribute("data-category-id");
                  
            //       console.log(category);
                  
            //       navLinks.forEach(link => {
                    
            //         link.classList.toggle("active", link.getAttribute("data-category") == category);
                    
            //       });
                  
            //     }
            //   });
            // }, { threshold: 0.6 });
            
            // sections.forEach(section => observer.observe(section));
            
            // Smooth scroll when clicking menu
            // navLinks.forEach(link => {
            //   link.addEventListener("click", (e) => {
            //     e.preventDefault();
            //     const category = link.getAttribute("data-category");
             
            //     let targetSection = document.querySelector(`.categroy-block-custom > .product-block > div[data-category-id="${category}"]`);
                
            //     if(category == 'populer-items'){
            //         targetSection = document.querySelector(`.best-selling-block [data-category-id]`);
            //     }
                
            //     // console.log(category);
            //     // console.log(targetSection);
            //     // console.log(`.categroy-block-custom > .product-block > div[data-category-id="${category}"]`);
                
            //     let reduceTitleHeight = 150;
                
            //     if(window.outerWidth <= 1024){
            //         reduceTitleHeight = 250
            //     }
                
            //     if (targetSection) {
            //       window.scrollTo({
            //         top: targetSection.offsetTop - reduceTitleHeight, // adjust offset for header
            //         behavior: "smooth"
            //       });
            //     }
            //   });
            // });
            
            navLinks.forEach(link => {
              link.addEventListener("click", (e) => {
                e.preventDefault();
                const category = link.getAttribute("data-category");
             
                let targetSection = document.querySelector(`.categroy-block-custom > .product-block > div[data-category-id="${category}"]`);
                
                if (category == 'populer-items') {
                  targetSection = document.querySelector(`.best-selling-block [data-category-id]`);
                }
                
                if (category == 'deals-offers') {
                  targetSection = document.querySelector(`.featured-offers-block`);
                }
                
            
                let reduceTitleHeight = 150;
                if (window.outerWidth <= 1024) {
                  reduceTitleHeight = 250;
                }
            
                if (targetSection) {
                  window.scrollTo({
                    top: targetSection.offsetTop - reduceTitleHeight, // adjust offset for header
                    behavior: "smooth"
                  });
                }
            
                navLinks.forEach(nav => nav.classList.remove("active"));
                // link.classList.add("active");
              });
            });
            
            
                document.addEventListener("click", function (event) {
                //console.log("dom Clicked" , event.target);
                
                // Check if the clicked element is one of your buttons
                if (event.target.matches(".horizontal-menu-wrapper li")) {
                
                e.preventDefault();
                
                const category =  event.target.getAttribute("data-category");
                
               // console.log("Clicked:", category);
                
                let targetSection = document.querySelector(`.categroy-block-custom > .product-block > div[data-category-id="${category}"]`);
                
                if (category == 'populer-items') {
                targetSection = document.querySelector(`.best-selling-block [data-category-id]`);
                }
                
                if (category == 'deals-offers') {
                targetSection = document.querySelector(`.featured-offers-block`);
                }
                
                
                let reduceTitleHeight = 150;
                if (window.outerWidth <= 1024) {
                reduceTitleHeight = 250;
                }
                
                if (targetSection) {
                window.scrollTo({
                top: targetSection.offsetTop - reduceTitleHeight, // adjust offset for header
                behavior: "smooth"
                });
                }
                
                document.querySelectorAll(".horizontal-menu-wrapper li").forEach(nav => nav.classList.remove("active"));
                }
                });
            


        }
        
        catch(err) {
          
          console.error(err);
          
        }


        //Map
//         let map, marker, geocoder;
//         let position = { lat: 6.8448212, lng: 79.9404323 };
//         const addressInput = document.getElementById("address");
        
        
//         async function initMap() {
//              const { Map } = await google.maps.importLibrary("maps");
             
//              // Create map
//               map = new Map(document.getElementById("map"), {
//                 zoom: 14,
//                 center: position,
//                 mapId: "DEMO_MAP_ID",
//                 disableDefaultUI: true,
//                 clickableIcons: false,
//                 gestureHandling: "greedy",
//                 restriction: {
//                   latLngBounds: {
//                     north: 85,
//                     south: -85,
//                     west: -180,
//                     east: 180,
//                   },
//                   strictBounds: true,
//                 },
//               });
              
//                 // Create draggable marker
//               marker = new google.maps.Marker({ // Assign to the global 'marker' variable
//                 position,
//                 map,
//                 draggable: true,
//                 title: "Your location",
//               });
              
              
//               // Listen for the dragend event on the marker
//               marker.addListener("dragend", (e) => {
//                 const newPos = e.latLng;
//                 console.log("Dragged to:", newPos.lat(), newPos.lng());
//                 position = { lat: newPos.lat(), lng: newPos.lng() };
                
//                 // NEW: Call reverse geocode to get the address
//                 reverseGeocodePosition(newPos);
//               });
              
              
//                  // Create Geocoder
//                   geocoder = new google.maps.Geocoder();
                  
//                   // NEW: Initial reverse geocode on load to set the starting address
//                   reverseGeocodePosition(position);
                  
                  
//                     // Search button
//                   document.getElementById("searchBtn").addEventListener("click", () => {
//                     const address = addressInput.value.trim();
//                     if (!address) return alert("Please enter an address");
//                     geocodeAddress(address);
//                   });
                
//                   // Get Lat/Lng button
//                   document.getElementById("getLatLngBtn").addEventListener("click", () => {
//                     alert(`Latitude: ${position.lat.toFixed(6)}, Longitude: ${position.lng.toFixed(6)}`);
//                   });

            

            
            
//         }
        
        
//         // Geocode function (Address -> Lat/Lng)
// function geocodeAddress(address) {
//   geocoder.geocode({ address: address }, (results, status) => {
//     if (status === "OK") {
//       const location = results[0].geometry.location;
//       map.setCenter(location);
//       marker.setPosition(location); // Use setPosition for existing marker
//       position = { lat: location.lat(), lng: location.lat() };
      
//       // NEW: Update address input with the geocoded address
//       addressInput.value = results[0].formatted_address;
//     } else {
//       alert("Geocode failed: " + status);
//     }
//   });
// }

// // NEW: Reverse Geocode function (Lat/Lng -> Address)
// function reverseGeocodePosition(latLng) {
//   geocoder.geocode({ location: latLng }, (results, status) => {
//     if (status === "OK" && results[0]) {
//       // Set the input value to the formatted address
//       addressInput.value = results[0].formatted_address;
//     } else {
//       console.error("Reverse Geocode failed: " + status);
//       addressInput.value = "Address not found"; // Clear or set a message on failure
//     }
//   });
// }
        
        
//         initMap();
        
        
        
        
//         const popup = document.getElementById('locationPopup');
//         const openBtn = document.getElementById('openPopupBtn');
//         const closeBtn = document.getElementById('closePopupBtn');
        
//         openBtn?.addEventListener('click', () => {
//           popup.classList.remove('hidden');
//           popup.classList.add('flex');
//         });
        
//         closeBtn?.addEventListener('click', () => {
//           popup.classList.add('hidden');
//           popup.classList.remove('flex');
//         });
        
//         // Close when clicking outside popup content
//         popup?.addEventListener('click', (e) => {
//           if (e.target === popup) {
//             popup.classList.add('hidden');
//             popup.classList.remove('flex');
//           }
//         });
        
        
        
        
        
        
//         // Add to Cart Collapse (Plus & Minus) on Mobile
//         function attachQuantityHandlers(){
//             document.querySelectorAll('.collapse-add-to-cart').each(product => {
//                 console.log(product);
//             })
//         }
        
        
        
//         attachQuantityHandlers();
        
        
        
        
       //Map function
         intLocationPicker();
        
        
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // THANK YOU PAGE ORDER STATUS UPDATE WITH API [START]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
       /* if(document.querySelector('body').classList.contains('thank-you-page')){
            
            // a hack to prevent same function run twice
            if (funcRunCount !== 2) return;
            
            // ============================================
            // VARIABLE DECLARATION
            // ============================================
            let orderId = null; // replace with actual order ID
            const POLL_INTERVAL = 5000; // every 5 seconds
            let pollTimer = null;
            let currentStatus = 1;
            let apiRequestTimes = 1;
            const maxReqTimes = 24;
            const apiEndPoint = `/api/v1/check-order-progress`;
            const clientId = 'f19f00fa2ca8585db05b39ba151d8a91';
            let accessToken = null;
            const wrapperEl = document.querySelector('.thank-you-wrapper');
              
              
            // ============================================
            // CHECK ORDER STATUS WITH API CALL
            // ============================================
            async function checkOrderStatus() {
              try {
                const orderElement = document.getElementById('order-id');
                const orderId = orderElement?.dataset.orderId || null;
            
                if (!orderId) {
                  throw new Error('Order ID not found in DOM');
                }
            
                // const response = await fetch(`${apiEndPoint}?order_id=${orderId}`);
                
                const response = await fetch(`${apiEndPoint}?order_id=${orderId}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                }
              });
            
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
            
                const data = await response.json();
            
                if (!data.success) {
                  throw new Error('API responded with success = false');
                }
            
                const newStatus = data.data?.stage_id || "1";
            
                // Only accept known statuses
                const validStatuses = ["1","3","6"];
                if (!validStatuses.includes(newStatus)) {
                    
                    //Stop Sending API request after status change
                    onOrderError();
                    
                  console.warn(`Ignoring unknown order status: "${newStatus}"`);
                  return;
                }
            
                // If status changed -> update UI & trigger logic
                if (newStatus !== currentStatus) {
                  currentStatus = newStatus;
                //   changeStatus(`text-${newStatus}`);
            
                  switch (newStatus) {
                    case "3":
                      onOrderConfirmed();
                      break;
                    case "6":
                      onOrderRejected();
                      break;
                    case "1":
                      // No special handler yet, but could log or show loader
                      console.log('Order still pending, waiting for an update...');
                      break;
                    default:
                        throw new Error('Order status unknown');
                        break;
                  }
                }
                
                if(apiRequestTimes >= maxReqTimes){
                    onLimitReach();
                }
                
                apiRequestTimes++;
                
              } catch (err) {
                  
                onOrderError();
                
                console.error('Error checking order status:', err.message || err);
              }
            }
            
            
            // ============================================
            // CONTINOUS STATUS CHECKING
            // ============================================
            function startPolling() {
                if (pollTimer) return;
                pollTimer = setInterval(checkOrderStatus, POLL_INTERVAL);
            }
            
            function stopPolling() {
                clearInterval(pollTimer);
                pollTimer = null;
            }
            
            // ============================================
            // MANAGE STATUS
            // ============================================
            // --- Define what happens when order is confirmed/rejected ---
            function onOrderConfirmed() {
                //Stop Sending API request after status change
                stopPolling();
                
                // console.log('Order confirmed!');
                changeStatus('text-confirmed');
                
                wrapperEl.classList.remove('pending');
                wrapperEl.classList.add('confirmed');
                
                
                return;
            }
            
            function onOrderRejected() {
                //Stop Sending API request after status change
                stopPolling();
                
                // console.log('Order rejected!');
                
                changeStatus('text-rejected');
                
                wrapperEl.classList.remove('pending');
                wrapperEl.classList.add('rejected');
                
                return;
            }
            
            function onOrderError() {
                //Stop Sending API request after status change
                stopPolling();
                
                // console.log('Order rejected!');
                
                changeStatus('text-error');
                
                wrapperEl.classList.remove('pending');
                wrapperEl.classList.add('error');
                
                return;
            }
            
            function onLimitReach() {
                
                // wrapperEl.classList.remove('pending');
                wrapperEl.classList.add('limit-reached');
                
                return;
            }
            
            
            // ============================================
            // HEADING TEXT ANIMATION
            // ============================================
            function changeStatus(newClass) {
              const title = document.querySelector('.section-title .title');
              const current = title.querySelector('.active');
              const next = title.querySelector('.' + newClass);
              
              if (current === next) return; // no change
              
              // mark current as leaving
              current.classList.remove('active');
              current.classList.add('leaving');
              
              // activate new one
              next.classList.add('active');
              
              // cleanup after animation ends
              setTimeout(() => {
                current.classList.remove('leaving');
              }, 500); // matches CSS transition duration
            }
            
            
            // ============================================
            // DEMO TESTS - *** REMOVE/COMMENT THIS ONCE THE REAL BACKEND API IS LIVE ***
            // ============================================
            // Remove this once the real backend API is live
            
            // --- DEMO BACKEND SIMULATION ---
            // (() => {
            //   const originalFetch = window.fetch;
            //   let demoStatus = 'pending';
            //   let callCount = 0;
            
            //   // Random number of calls (1-5) before confirming/rejecting
            //   const triggerAt = Math.floor(Math.random() * 5) + 1;
            //   // Optional: 50% chance to reject instead of confirm
            //   const willReject = Math.random() < 0.3;
            
            // //   console.log(`[Demo API] Will ${willReject ? 'reject' : 'confirm'} after ${triggerAt} calls.`);
            
            //   window.fetch = async (url, options) => {
            //     if (url.includes('/api/order-status')) {
            //       callCount++;
            
            //       if (callCount >= triggerAt) {
            //         demoStatus = willReject ? 'rejected' : 'confirmed';
            //       }
            
            //     //   console.log(`[Demo API] Call #${callCount} -> status: ${demoStatus}`);
            
            //       // Simulate realistic delay
            //       await new Promise(r => setTimeout(r, 500));
            
            //       return new Response(
            //         JSON.stringify({ status: demoStatus }),
            //         { headers: { 'Content-Type': 'application/json' } }
            //       );
            //     }
            
            //     // Pass through any other requests normally
            //     return originalFetch(url, options);
            //   };
            // })();
            
            // --- DEMO HEADING ANIMATION SIMULATION ---
            // setTimeout(() => changeStatus('text-confirmed'), 2000);
            // setTimeout(() => changeStatus('text-rejected'), 4000);
            // setTimeout(() => changeStatus('text-pending'), 6000);
            
            
            // ============================================
            // FETCH ACCESS TOKEN AUTHORIZATION
            // ============================================
            async function getApiAccessToken() {
              const url = `/api/v1/public-auth?client_id=${clientId}`;
            
              const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Accept": "application/json"
                }
              });
            
              if (!response.ok) throw new Error("Failed to fetch access token");
            
              const data = await response.json();
              return data;
            }
            
            // ============================================
            // FUNCTION INITIALIZATION
            // ============================================
            async function initOrderStatus() {
              try {
                const auth = await getApiAccessToken();
                accessToken = auth?.data?.access_token || null;
                
                if(accessToken){
                    startPolling();
                }
                
                // console.log("Order Data:", orderData);
              } catch (err) {
                  onOrderError();
                console.error("Error:", err.message);
              }
            }
            
            initOrderStatus();
        }*/
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // THANK YOU PAGE ORDER STATUS UPDATE WITH API [END]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // CHECK MY ORDER FUNCTIONALITY [START]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        (() => {
            if (funcRunCount !== 2) return;
            
            // ============================================
            // VARIABLE DECLARATION
            // ============================================
            const openCheckOrderBtns = document.querySelectorAll('.check-my-order');
            const checkOrderEl = document.getElementById('check-order');
            const checkOrderClose = document.getElementById('check-order-close');
            const checkOrderInput = document.getElementById('check-order-input');
            const checkOrderBtn = document.getElementById('check-order-btn');
            const checkOrderError = checkOrderEl.querySelector('.error');
            const checkOrderMsg = checkOrderEl.querySelector('.message');
        
            // ============================================
            // POPUP CONTROLS
            // ============================================
            function openCheckOrder() {
                checkOrderEl.classList.add('popup-active');
            }
        
            function closeCheckOrder() {
                checkOrderMsg.style.display = 'none';
                checkOrderError.style.display = 'none';
                checkOrderInput.value = '';
                if(checkOrderBtn.classList.contains('disabled')){
                    checkOrderBtn.classList.remove('disabled');
                }
                if(checkOrderBtn.classList.contains('loading')){
                    checkOrderBtn.classList.remove('loading');
                }
                checkOrderEl.classList.remove('popup-active');
            }
            
            
            // ============================================
            // INPUT VALIDATION
            // ============================================
            function validatePhoneNumber(phoneNumber) {
              // Regular expression to match most international phone number formats
            //   const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
            const phoneNumberRegex = /^0\d{9}$/;

              // Test the phone number against the regular expression
              if (phoneNumberRegex.test(phoneNumber)) {
                  
                // Phone number is valid
                checkOrderError.style.display = 'none';
                checkOrderBtn.classList.remove('disabled');
                return true;
              } else {
                // Phone number is not valid
                checkOrderError.style.display = 'block';
                checkOrderBtn.classList.add('disabled');
                checkOrderMsg.style.display = 'none';
                return false;
              }
            }
            
            
            // ============================================
            // API REQUESTS
            // ============================================
            //API request to get access token
            async function getAccessToken() {
              const url = `/api/v1/public-auth?client_id=f19f00fa2ca8585db05b39ba151d8a91`;
            
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Accept": "application/json"
                }
              });
            
              if (!response.ok) throw new Error("Failed to fetch access token");
            
              const data = await response.json();
              return data;
            }
            
            //API request to check order status
            async function checkMyOrder(token, callingCode, contactNumber, maxOrderLimit = 1) {
                
              const url = "/api/v1/check-my-orders";
            
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  calling_code: callingCode,
                  contact_number: contactNumber,
                  max_order_limit: maxOrderLimit
                })
              });
            
              if (!response.ok) throw new Error("Failed to check orders");
            
              const data = await response.json();
              return data;
            }
            
            
            async function handleCheckMyOrder(mobileNumber) {
              try {
                const auth = await getAccessToken();
                const token = auth?.data?.access_token;
                
                if (mobileNumber.startsWith("0")) {
                    mobileNumber = mobileNumber.slice(1);
                }
            
                const orderData = await checkMyOrder(token, "+94", mobileNumber);
                
                checkOrderMsg.style.display = 'block';
                checkOrderInput.value = '';
                checkOrderMsg.textContent = orderData.message || "Something went wrong";
                
                checkOrderBtn.classList.remove('loading');
                
                // console.log("Order Data:", orderData);
              } catch (err) {
                checkOrderMsg.textContent = "Something went wrong. Please try again later.";
                checkOrderBtn.classList.remove('loading');
                console.error("Error:", err.message);
              }
            }
        
            // ============================================
            // EVENT LISTENERS
            // ============================================
            openCheckOrderBtns.forEach(navItem => {
                navItem?.addEventListener('click', openCheckOrder);
            });
        
            checkOrderClose?.addEventListener('click', closeCheckOrder);
        
            checkOrderEl?.addEventListener('click', (e) => {
                if (e.target.id === 'check-order') {
                    closeCheckOrder();
                }
            });
            
            checkOrderInput.addEventListener("input", function() {
              // Get the value of the phone number input field
              const phoneNumber = checkOrderInput.value;
              validatePhoneNumber(phoneNumber);
            });
            
            checkOrderBtn.addEventListener("click",function(){
                
                checkOrderMsg.style.display = 'none';
                
                const phoneNumber = checkOrderInput.value;
                if(validatePhoneNumber(phoneNumber)){
                    
                    checkOrderBtn.classList.add('loading');
                    
                    //Implement check order function
                    handleCheckMyOrder(phoneNumber);
                    // console.log('Check Order Executed');
                }
            });
            
        })();
        
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // CHECK MY ORDER FUNCTIONALITY [END]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        
        
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // DISPLAY ORDER SUMMERY ON THANK YOU PAGE [START]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        // if(document.querySelector('body').classList.contains('checkout-page')){
        //     if (funcRunCount !== 2) return;
            
        //     // ============================================
        //     // EVENT LISTENERS
        //     // ============================================
            
        //     (function () {
        //       const STORAGE_KEY = 'order_summary';
            
        //       function saveOrderData() {
        //         try {
        //           // Example fallback data scraping logic
        //           const items = Array.from(document.querySelectorAll('.cart-item, [data-cart-item]')).map(el => ({
        //             name: el.querySelector('.product-name')?.textContent?.trim() || '',
        //             qty: parseInt(el.querySelector('.qty')?.textContent || el.querySelector('input[type="number"]')?.value || '1'),
        //             price: parseFloat((el.querySelector('.price')?.textContent || '').replace(/[^0-9.]/g, '')) || 0,
        //             image: el.querySelector('img')?.src || ''
        //           }));
            
        //           const totalText = document.querySelector('.cart-total, .total-price')?.textContent || '';
        //           const total = parseFloat(totalText.replace(/[^0-9.]/g, '')) || 0;
            
        //           const orderData = {
        //             orderId: 'ORD-' + Date.now(),
        //             items,
        //             summary: { currency: 'LKR', total },
        //             createdAt: new Date().toISOString()
        //           };
            
        //           localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
        //           console.log('Order data saved:', orderData);
        //         } catch (err) {
        //           console.error('Error saving order data:', err);
        //         }
        //       }
            
        //       // Observe the DOM for dynamically rendered Vue buttons
        //       const observer = new MutationObserver(() => {
        //         const btn = document.querySelector('.proceed-to-checkout');
        //         if (btn && !btn.dataset.orderHooked) {
        //           btn.dataset.orderHooked = 'true';
        //           console.log('Order button detected and hook attached.');
            
        //           // Attach capturing listener to ensure it fires before Vue navigation
        //           btn.addEventListener('pointerdown', saveOrderData, { capture: true });
        //           // Fallback in case navigation happens before the click event
        //           btn.addEventListener('click', saveOrderData, { capture: true });
        //         }
        //       });
            
        //       observer.observe(document.body, { childList: true, subtree: true });
            
        //       // As a final fallback - just before leaving the page
        //       window.addEventListener('beforeunload', saveOrderData);
        //     })();


        // }
        
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // DISPLAY ORDER SUMMERY ON THANK YOU PAGE [END]
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
});

// order-status page changeable message function

document.addEventListener("DOMContentLoaded", function() {
  const messages = [
    "Thank you! We've received your order and it's now being reviewed.",
    "Your order is being verified. Please wait while we confirm your details.",
    "We're confirming your order. This may take a few minutes, thank you for your patience!",
    "Your order will be confirmed shortly. You'll redirect to a new page once it's approved."
  ];

  const messageSpan = document.getElementById("custom-message");
  let currentIndex = 0;

  function showMessage() {
      messageSpan.classList.add("fade-out");
      
      setTimeout(()=> {
        messageSpan.textContent = messages[currentIndex];
        messageSpan.classList.remove("fade-out");
        currentIndex = (currentIndex + 1) % messages.length;
      }, 1000);
    
  }

  showMessage();
  setInterval(showMessage, 20000);
});

// disable the desktop-center-section in order status page

// document.addEventListener("DOMContentLoaded", function(){
//     const url = window.location.href.includes("order-status");
//     if(!url){
//         const centerSection = document.querySelector(".desktop-center-section");
        
//         if(centerSection && window.innerWidth >= 1024){
//             centerSection.classList.add("display");
//         }
//     }
// });

function toggleDisplay() {
  const centerSection = document.querySelector(".desktop-center-section");
  const url = window.location.href.includes("order-status");

  if (!url && centerSection) {
    if (window.innerWidth >= 1024) {
      centerSection.classList.add("display");
    } else {
      centerSection.classList.remove("display");
    }
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", toggleDisplay);

// Run whenever window is resized
window.addEventListener("resize", toggleDisplay);



//deals offers banners redirect functions

document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("offer-1");

  if (button) {
    button.addEventListener("click", function() {
      const currentURL = window.location.origin + window.location.pathname;
      const newURL = currentURL + "/swiss-roll-chocolate";
      window.location.href = newURL;
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("offer-2");

  if (button) {
    button.addEventListener("click", function() {
      const currentURL = window.location.origin + window.location.pathname;
      const newURL = currentURL + "/submarine-bread-2-pcs";
      window.location.href = newURL;
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("offer-3");

  if (button) {
    button.addEventListener("click", function() {
      const currentURL = window.location.origin + window.location.pathname;
      const newURL = currentURL + "/burger-bread-2-pcs";
      window.location.href = newURL;
    });
  }
});



let isCheckoutPage=false

const hidecheckoutBtn = ()=>{
    let url = window.location.href
    isCheckoutPage = url.includes("checkout") || false
    
 
}

hidecheckoutBtn()


// ---------Location redirect when user second time visit---------

document.addEventListener("oms_getTemplateListSuccess", function () {

    const cards = document.querySelectorAll(".location-card");

    cards.forEach(card => {
        card.addEventListener("click", function(){
            const selectedLocation = card.getAttribute("data-location").toLowerCase();
            localStorage.setItem("user_current_location", selectedLocation);
        });
    });

    const select = document.querySelector("#locationSelect");
    if (select) {
        select.addEventListener("change", function () {
            const selectedOption = select.options[select.selectedIndex];
            const selectedLocation = selectedOption.getAttribute("data-location").toLowerCase();
            localStorage.setItem("user_current_location", selectedLocation);
        });
    }

    const savedLocation = localStorage.getItem("user_current_location");
    
    const currentPath = window.location.pathname;

    const isRootHomePage = currentPath === "/";

    if (!isRootHomePage) return;  

    if (savedLocation && savedLocation !== "null") {
        window.location.href = "https://finagle-mini-marts-trial.shoponcloud.com/" + savedLocation;
    }
});


document.addEventListener("oms_getTemplateListSuccess", function () {
    document.querySelector("#e3da1e7dd54f8bd0f1298efc0b11199e").readOnly = true;
});


function updateOrderType(orderTypeValue) {
    
  const key = "oms_order_details_f19f00fa2ca8585db05b39ba151d8a91";


  let data = localStorage.getItem(key);
console.log(">>>>",data)

  if (!data) {
      console.log(">dddd")
    const newData = {
      delivery_info: {
        orderType: orderTypeValue
      }
    };

    localStorage.setItem(key, JSON.stringify(newData));
    return;
  }


}

updateOrderType("Store Pickup");