document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("uploadButton");
    const imageInput = document.getElementById("imageInput");
    const dropArea = document.getElementById("dropArea");
    const gallery = document.getElementById("gallery");
    const toast = document.getElementById("toast");
    const previewOverlay = document.getElementById("previewOverlay");
    const previewImage = document.getElementById("previewImage");
    const previewInfo = document.getElementById("previewInfo");
    const closePreview = document.getElementById("closePreview");
    const searchBar = document.getElementById("searchBar");
  
    let images = JSON.parse(localStorage.getItem("images")) || [];
  
    const showToast = (msg, isError = false) => {
      toast.textContent = msg;
      toast.className = isError ? "error" : "";
      toast.style.display = "block";
      setTimeout(() => toast.style.display = "none", 2500);
    };
  
    const saveImages = () => {
      localStorage.setItem("images", JSON.stringify(images));
    };
  
    const createThumbnail = (imgData, index) => {
        const thumb = document.createElement("div");
        thumb.classList.add("thumbnail");
      
        const img = document.createElement("img");
        img.src = imgData.dataURL;
        img.alt = imgData.filename;
      
        const nameLabel = document.createElement("div");
        nameLabel.className = "image-name";
        nameLabel.textContent = imgData.filename;
      
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.onclick = (e) => {
          e.stopPropagation();
          if (confirm("Are you sure you want to delete this image?")) {
            images.splice(index, 1);
            saveImages();
            renderGallery();
            showToast("Image deleted!");
          }
        };
      
        thumb.appendChild(deleteBtn);
        thumb.appendChild(img);
        thumb.appendChild(nameLabel);
      
        thumb.addEventListener("click", () => {
          previewImage.src = imgData.dataURL;
          previewInfo.textContent = `${imgData.filename} (${imgData.size} KB)`;
          previewOverlay.classList.remove("hidden");
        });
      
        gallery.appendChild(thumb);
      };
      
  
    const renderGallery = () => {
      gallery.innerHTML = "";
      const query = searchBar.value.toLowerCase();
      images.forEach((img, index) => {
        if (img.filename.toLowerCase().includes(query)) {
          createThumbnail(img, index);
        }
      });
    };
  
    const handleFiles = (files) => {
      [...files].forEach(file => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imgData = {
              dataURL: e.target.result,
              filename: file.name,
              size: Math.round(file.size / 1024)
            };
            if (images.length >= 50) {
                showToast("Gallery full: Limit is 50 images", true);
              } else {
                images.push(imgData);
                saveImages();
                renderGallery();
                showToast("Image uploaded successfully!");
              }
              
            saveImages();
            renderGallery();
            showToast("Image uploaded successfully!");
          };
          reader.readAsDataURL(file);
        } else {
          showToast("Only image files are allowed!", true);
        }
      });
    };
  
    // Events
    uploadButton.onclick = () => imageInput.click();
    imageInput.onchange = (e) => handleFiles(e.target.files);
  
    ["dragenter", "dragover"].forEach(evt => {
      dropArea.addEventListener(evt, e => {
        e.preventDefault();
        dropArea.style.borderColor = "#007bff";
      });
    });
  
    ["dragleave", "drop"].forEach(evt => {
      dropArea.addEventListener(evt, e => {
        e.preventDefault();
        dropArea.style.borderColor = "#aaa";
      });
    });
  
    dropArea.addEventListener("drop", (e) => {
      handleFiles(e.dataTransfer.files);
    });
  
    closePreview.onclick = () => {
      previewOverlay.classList.add("hidden");
    };
  
    searchBar.addEventListener("input", renderGallery);
  
    // Initialize
    renderGallery();
  });
  