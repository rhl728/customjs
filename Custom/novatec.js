document.addEventListener("oms_getTemplateListSuccess", () => {
  /* ====================================================================
     DATA
     Replace this array with your real categories.
     Each category now has exactly ONE pdf:
       - name  : category name shown on the card
       - file  : path/URL to the PDF
       - image : background image for the card (path/URL)
  ==================================================================== */
  const DOWNLOAD_DATA = [
    {
      name: "Product Brochures",
      file: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/catalog/sample.pdf",
      image:
        "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/15346d3c7bc7661fb0d7a692b220dc99_1758865810.JPG",
    },
    {
      name: "User Manuals",
      file: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/catalog/sample.pdf",
      image:
        "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/46fc7b4d17a10dadd6b8cdf9e33726f9_1758865820.JPG",
    },
    {
      name: "Warranty Information",
      file: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/catalog/sample.pdf",
      image:
        "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/d5d2fed0ad37ccde3e14482f006c54ba_1758865818.JPG",
    },
    {
      name: "Certificates & Compliance",
      file: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/catalog/sample.pdf",
      image:
        "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/8fa4af7e07d221aba48bfcde3d403605_1758865807.JPG",
    },
    {
      name: "Price Lists",
      file: "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/catalog/sample.pdf",
      image:
        "https://dna3n15iwxmh8.cloudfront.net/40b9a03a71d88968f15a6017f16a8ef5/84e771f88408e14c605f2da34af81084_1758865812.JPG",
    },
  ];

  const DOWNLOAD_ICON = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke-width="2"/>
    </svg>`;

  const CHECK_ICON = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13l4 4L19 7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function escapeHtml(str) {
    return String(str).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&",
          "<": "<",
          ">": ">",
          '"': "&quot;",
          "'": "'",
        })[c],
    );
  }

  function buildCard(item) {
    const card = document.createElement("div");
    card.className = "nv-card";

    card.innerHTML = `
      
        <div class="nv-card__image" style="background-image:url('${item.image}')"></div>
          <button class="nv-card__btn" type="button" aria-label="Download ${escapeHtml(item.name)}">
            ${DOWNLOAD_ICON}
          </button>
          <div class="nv-card__namebar">
            <p class="nv-card__name">${escapeHtml(item.name)}</p>
          </div>
     
    `;

    const btn = card.querySelector(".nv-card__btn");
    card?.addEventListener("click", () => triggerDownload(item, btn));

    return card;
  }

  function triggerDownload(item, btn) {
    // const originalHTML = btn.innerHTML;
    // btn.disabled = true;

    // fetch(item.file)
    //   .then((res) => {
    //     if (!res.ok) throw new Error("HTTP " + res.status);
    //     return res.blob();
    //   })
    //   .then((blob) => {
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = item.name ? item.name + ".pdf" : "download.pdf";
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);

    //     // Brief visual confirmation on the button itself.
    //     btn.innerHTML = CHECK_ICON;
    //     btn.classList.add("is-done");

    //     setTimeout(() => {
    //       btn.innerHTML = originalHTML;
    //       btn.classList.remove("is-done");
    //       btn.disabled = false;
    //     }, 1400);
    //   })
    //   .catch((err) => {
    //     console.error("Download failed:", err);
    //     alert("Sorry, that file couldn't be downloaded. Please try again.");
    //     btn.innerHTML = originalHTML;
    //     btn.disabled = false;
    //   });

    const link = document.createElement("a");
    link.href = item.file;
    link.download = item.name || "";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function render() {
    const root = document.getElementById("nv-downloads-root");
    if (!root) return;
    root.innerHTML = "";

    if (!DOWNLOAD_DATA.length) {
      const empty = document.createElement("div");
      empty.className = "nv-empty";
      empty.textContent = "No downloads available yet.";
      root.appendChild(empty);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "nv-grid";
    DOWNLOAD_DATA.forEach((item) => grid.appendChild(buildCard(item)));
    root.appendChild(grid);
  }

  render();

   
  
  const menuBtn = document.querySelector(".menuBtn");
  menuBtn?.addEventListener("click", () => {
     
        setTimeout(() => {
            // Check if the current pathname matches /catalog
              if (window.location.pathname === "/catalog") {
                 
                // Select the element with the class 'catelog-block'
                const catalogElement = document.querySelector(".catelog-block");
            
                if (catalogElement) {
                    
                  // Add your two classes here (replace 'class-one' and 'class-two' with your actual class names)
                  catalogElement.classList.add("insideCatelog");
                }
              }
        }, 500);
  });
});