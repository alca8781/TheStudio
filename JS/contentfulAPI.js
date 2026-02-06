const client = contentful.createClient({
  space: 'xyzx0flf1kvl',
  accessToken: 'YZEFnaM1EF0Yn0iwF8ZasRzJrJ7r7_GI0Aa8APUDDns'
});

// =======================
// CART STATE
// =======================
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let isCartVisible = false;

// =======================
// CART COUNT DISPLAY
// =======================
const cartCountDisplay = document.getElementById('cartCountContainer');
const cartCountText = document.createElement('span');
cartCountText.style.marginLeft = '-10px';
cartCountText.style.marginTop = '20px';
cartCountText.style.fontSize = '18px';
cartCountText.textContent = ` ${cartCount}`;
cartCountDisplay.appendChild(cartCountText);

// =======================
// CART UI ELEMENTS
// =======================
const cartListDisplay = document.getElementById('cartListContainer');
const viewCartButton = document.getElementById('viewCartButton');
const resetCartButton = document.getElementById('resetCartButton');

// =======================
// LOCAL STORAGE
// =======================
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartCount', cartCount.toString());
}

// =======================
// VIEW CART
// =======================
viewCartButton.addEventListener('click', () => {
  isCartVisible = !isCartVisible;
  cartListDisplay.innerHTML = '';

  if (!isCartVisible) return;

  if (cartItems.length === 0) {
    cartListDisplay.innerHTML = '<p>cart is empty</p>';
    return;
  }

  const heading = document.createElement('h3');
  heading.textContent = 'Cart Items:';
  cartListDisplay.appendChild(heading);


  const list = document.createElement('ul');
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  cartListDisplay.appendChild(list);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.style.display = 'flex';
  buttonWrapper.style.justifyContent = 'center';
  buttonWrapper.style.marginTop = '15px';

  // =======================
  // EMAIL BUTTON
  // =======================
  const emailButton = document.createElement('button');
  emailButton.textContent = 'CHECK OUT';
  emailButton.style.padding = '6px 10px';
  emailButton.style.fontSize = '12px';
  emailButton.style.cursor = 'pointer';
  emailButton.style.border = '1px solid #888';
  emailButton.style.backgroundColor = '#eee';
  emailButton.style.borderRadius = '4px';

emailButton.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Save cart items to localStorage for the contact page
  localStorage.setItem('checkoutCart', JSON.stringify(cartItems));

  // Redirect to your contact page
  window.location.href = "/Contact.html";
});



  buttonWrapper.appendChild(emailButton);
  cartListDisplay.appendChild(buttonWrapper);
});

// =======================
// DISPLAY IMAGES
// =======================
const DisplayImages = (containerId, fieldKey) => {
  const container = document.getElementById(containerId);

  client.getEntries().then(entries => {
    entries.items.forEach(entry => {
      if (!entry.fields[fieldKey]) return;

      entry.fields[fieldKey].forEach(asset => {
        const name = asset.fields.title || 'No name available';
        ImageName(container, asset, name);
      });
    });
  });
};

// =======================
// IMAGE + BUTTONS
// =======================
const ImageName = (container, imageAsset, name) => {
  const imgContainer = document.createElement('div');
  imgContainer.dataset.imageName = name;
  imgContainer.style.position = 'relative';
  imgContainer.style.display = 'inline-block';
  imgContainer.style.margin = '10px';
  imgContainer.style.overflow = 'hidden';

  const img = document.createElement('img');
  img.src = 'https:' + imageAsset.fields.file.url;
  img.style.width = '300px';
  img.style.transition = 'transform 0.3s ease';

  if (cartItems.includes(name)) {
    img.style.filter = 'opacity(50%)';
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.3s';

  imgContainer.addEventListener('mouseenter', () => overlay.style.opacity = '1');
  imgContainer.addEventListener('mouseleave', () => overlay.style.opacity = '0');

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.textContent = cartItems.includes(name)
    ? 'Remove from Cart'
    : 'Add to Cart';
  styleHoverButton(addToCartButton);

  addToCartButton.addEventListener('click', e => {
    e.stopPropagation();

    if (cartItems.includes(name)) {
      cartItems = cartItems.filter(item => item !== name);
      cartCount--;
      img.style.filter = 'none';
      addToCartButton.textContent = 'Add to Cart';
    } else {
      cartItems.push(name);
      cartCount++;
      img.style.filter = 'opacity(50%)';
      addToCartButton.textContent = 'Remove from Cart';
    }

    cartCountText.textContent = ` ${cartCount}`;
    saveCartToLocalStorage();
    cartListDisplay.innerHTML = '';
    isCartVisible = false;
  });

  const zoomButton = document.createElement('button');
  zoomButton.textContent = 'Zoom In';
  styleHoverButton(zoomButton);
  zoomButton.addEventListener('click', e => {
    e.stopPropagation();
    openZoomModal(img.src, name);
  });

  overlay.append(addToCartButton, zoomButton);

  const caption = document.createElement('span');
  caption.textContent = name;
  caption.style.display = 'block';
  caption.style.textAlign = 'center';
  caption.style.fontFamily = 'Cutive Mono';
  caption.style.fontSize = '10pt';
  caption.style.color = '#ffffff';

  imgContainer.append(img, overlay, caption);
  container.appendChild(imgContainer);
};

// =======================
// BUTTON STYLE
// =======================
function styleHoverButton(button) {
  button.style.margin = '5px';
  button.style.padding = '8px 16px';
  button.style.fontSize = '12px';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#ffffff';
  button.style.color = '#333';
  button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
}

// =======================
// ZOOM MODAL
// =======================
function openZoomModal(src, alt) {
  const modal = document.getElementById('zoomModal');
  const zoomedImage = document.getElementById('zoomedImage');
  zoomedImage.src = src;
  zoomedImage.alt = alt;
  modal.style.display = 'flex';
}

document.getElementById('zoomModal')
  .addEventListener('click', () =>
    document.getElementById('zoomModal').style.display = 'none'
  );

// =======================
// RESET CART
// =======================
resetCartButton.addEventListener('click', () => {
  cartCount = 0;
  cartItems = [];
  isCartVisible = false;

  cartCountText.textContent = ` ${cartCount}`;
  saveCartToLocalStorage();
  cartListDisplay.innerHTML = '';

  document.querySelectorAll('[data-image-name]').forEach(container => {
    const img = container.querySelector('img');
    const button = container.querySelector('.add-to-cart');

    if (img) img.style.filter = 'none';
    if (button) button.textContent = 'Add to Cart';
  });
});

// =======================
// LOAD GALLERIES
// =======================
DisplayImages('SleepyHollow_content', 'sleepyHollow');
DisplayImages('Bristol_content', 'bristol_id');
DisplayImages('Rehearsal_content', 'RehearsalDinner');
DisplayImages('FunnyFam_content', 'FunnyFamPhoto');
DisplayImages('Weppler_content', 'weppler');
DisplayImages('Larson_content', 'larsonFamily');
DisplayImages('Kelly_content', 'Kelly');
DisplayImages('Nalven_content', 'nalven');
DisplayImages('Maddy_content', 'maddySeniorPhotos');
