
    const media = this.slotData.item.images;

    // 1. Find the primary image directly. This is more efficient than filter + forEach.
    const primaryImageItem = media.find(item => item.type === "image" && item.primary_image);

    // 2. If no primary image is found, exit the function.
    if (!primaryImageItem) {
      console.warn("No primary image found to calculate ratio.");
      return;
    }
    
    const primaryImg = new Image();

    // 3. Set up the onload handler. This function will run ONLY after the image is loaded.
    primaryImg.onload = () => {
      // Now naturalWidth and naturalHeight have the correct values
      const calculatedRatio = primaryImg.naturalWidth / primaryImg.naturalHeight;

      // 4. Update the component's data property. 'this' refers to the Vue component.
      this.ratio = calculatedRatio;

      console.log(`Image loaded! Dimensions: ${primaryImg.naturalWidth}x${primaryImg.naturalHeight}`);
      console.log('Calculated Ratio:', this.ratio);
    };
    
    // Add an error handler for robustness
    primaryImg.onerror = () => {
        console.error("Failed to load image at:", primaryImageItem.path);
        // Optionally set a default fallback ratio
        this.ratio = 16 / 9; 
    };

    // 5. Finally, set the src attribute to trigger the download.
    primaryImg.src = primaryImageItem.path;
