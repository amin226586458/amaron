/*
====================================================
              المنتجات الرئيسية
====================================================
*/

const products = [

  {
    id:1,
    name:"Samsung s21 ultra",
    price:4000,
    old:6000,
    image:"./images/SAM.png",
    video:"./videos/er.mp4",

    description:"500 جيجا مناسب لي لتصفح اليومي ودراسة والعمل.",
    fullDescription:"علامة التجارية سمسونغ حالة الهاتف مستعمل مزال بحالة جيدة جدا.",
    features:[
      " USB-C",
      "سهل الحمل والتخزين",
      "مناسب للاستخدام اليومي"
    ],

    rating:5,
    reviewCount:2000,

    offer:true,
    best:false,
    newProduct:true
  },

  {
    id:2,
    name:"iPhone 15 pro max 512 GB",
    price:6000,
    old:8000,
    image:"./images/apple-iphone-15-pro-max-1.jpg",
     video:"./videos/e.mp4",

    description:"هاتف ايفون 15 برو مستعمل .",
    fullDescription:"ايفون 15 برو مستعمل مازال في حالة جيدة اللون الازرق التخزين 512 جيجا.",
    features:[
      "سريع و عملي ",
      "كل شيئ اصلي ",
      "مناسب للاستخدام في المنزل أو المكتب"
    ],

    rating:3,
    reviewCount:10,

    offer:false,
    best:false,
    newProduct:true
  },

    {
    id:4,
    name:"iphone xs 256 GB",
    price:1300,
    old:2500,
    image:"./images/14.png",
    video:"./videos/C1082.MP4",

    description:"هاتف iPhone XS بسعة تخزين 256GB.",
    fullDescription:"هاتف iPhone XS بسعة تخزين 256GB لتخزين التطبيقات والصور ومقاطع الفيديو والملفات. يُنصح بالتحقق من حالة الجهاز وصحة البطارية وعمل الكاميرات والشاشة ومكونات الهاتف قبل إتمام الشراء.",
    features:[
      "سعة تخزين 256GB",
      "كاميرات مدمجة",
      "مناسب للتطبيقات والاتصال والاستخدام اليومي"
    ],

    rating:4,
    reviewCount:12,

    offer:false,
    best:false,
    newProduct:false
  },

 
  {
    id:11,
    name:"Xiaomi Redmi 13C 8GB RAM + 256GB ",
    price:900,
    old:1000,
    image:"./images/23100RN82L-XIAOMI-REDMI-13C-(8-256GB)BLACK-1200X1200-1.jpg",
    video:"",

    description:"هاتف مدرج باسم Xiaomi Redmi 13C.",
  fullDescription:" المواصفات الكاملة لهذا المنتج، بما في ذلك سعة التخزين واللون وحالة الجهاز والضمان والملحقات. تأكد من مطابقة اسم الموديل والمواصفات للجهاز المعروض فعليًا قبل نشر العرض.",
    features:[
      "256GB سعة التخزين الفعلية",
      " اللون المتوفر اسود",
      " تفاصيل الضمان والملحقات"
    ],

    rating:5,
    reviewCount:40,

    offer:true,
    best:false,
    newProduct:true
  },

 
];


/*
====================================================
              ترتيب المنتجات عشوائياً
====================================================
*/

function shuffleProducts(list){

  const arr = [...list];

  for(let i = arr.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];

  }

  return arr;

}

const displayProducts = [
  ...shuffleProducts(products.filter(p => p.newProduct)),
  ...shuffleProducts(products.filter(p => !p.newProduct))
];


/*
====================================================
                    العناصر
====================================================
*/

const productsEl = document.getElementById("products");
const offersEl = document.getElementById("offersProducts");
const bestEl = document.getElementById("bestProducts");
const newEl = document.getElementById("newProducts");

const orderPage = document.getElementById("orderPage");
const cartPage = document.getElementById("cartPage");
const homePage = document.getElementById("homePage");

const selected = document.getElementById("selectedProduct");
const searchInput = document.getElementById("searchInput");

let selectedProduct = null;
let checkoutFromCart = false;


/*
====================================================
                    السلة
====================================================
*/

let cart = JSON.parse(
  localStorage.getItem("amaronCart") || "[]"
);


/*
====================================================
                    الطلبات
====================================================
*/

let orders = JSON.parse(
  localStorage.getItem("amaronOrders") || "[]"
);


function saveCart(){

  localStorage.setItem(
    "amaronCart",
    JSON.stringify(cart)
  );

}


function saveOrders(){

  localStorage.setItem(
    "amaronOrders",
    JSON.stringify(orders)
  );

}


/*
====================================================
                    المال
====================================================
*/

function money(n){

  return Number(n).toLocaleString("fr-FR") + " درهم";

}


/*
====================================================
                  حساب الخصم
====================================================
*/

function discount(p){

  if(!p.old || p.old <= p.price){
    return 0;
  }

  return Math.round(
    ((p.old - p.price) / p.old) * 100
  );

}


/*
====================================================
              إنشاء تقييم المنتج
====================================================
*/

function productRatingHTML(p){

  const rating = Math.max(
    0,
    Math.min(5, Number(p.rating) || 0)
  );

  const reviewCount = Math.max(
    0,
    Number(p.reviewCount) || 0
  );

  // إخفاء التقييم إذا لم تضف تقييمًا لهذا المنتج.
  if(rating <= 0){
    return "";
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  let stars = "";

  for(let i = 1; i <= 5; i++){

    if(i <= fullStars){
      stars += "★";
    }else if(i === fullStars + 1 && hasHalfStar){
      stars += "★";
    }else{
      stars += "☆";
    }

  }

  return `
    <div class="product-rating"
         style="display:flex;align-items:center;gap:7px;direction:rtl;margin:8px 0;">

      <span
        class="rating-stars"
        style="color:#f5a623;font-size:19px;letter-spacing:1px;"
        aria-label="تقييم ${rating} من 5"
      >${stars}</span>

      <span
        style="font-size:12px;color:#777;"
      >${rating.toFixed(1)}/5${reviewCount > 0 ? ` (${reviewCount})` : ""}</span>

    </div>
  `;

}


/*
====================================================
              إنشاء بطاقة المنتج
====================================================
*/

function productCard(p){

  const d = discount(p);

  const descriptionHTML = p.description
    ? `
      <p
        class="product-description"
        style="font-size:13px;line-height:1.7;color:#666;margin:8px 0;text-align:right;direction:rtl;"
      >${p.description}</p>
    `
    : "";

  return `

    <article
      class="product"
      onclick="openOrder(${p.id})"
    >

      ${
        p.offer && d > 0
        ? `<span class="discount">-${d}%</span>`
        : ""
      }

      ${
        p.best
        ? `<span class="best-badge">⭐ الأكثر مبيعاً</span>`
        : ""
      }

      ${
        p.newProduct
        ? `<span class="new-badge">جديد</span>`
        : ""
      }

      <img
        src="${p.image}"
        onerror="this.onerror=null;this.src='./images/placeholder.svg'"
        alt="${p.name}"
      >

      <h3>${p.name}</h3>

      ${productRatingHTML(p)}

      ${descriptionHTML}

      <div>

        <span class="price">
          ${money(p.price)}
        </span>

        <span class="old">
          ${money(p.old)}
        </span>

      </div>

      <button
        class="buy"
        onclick="event.stopPropagation();openOrder(${p.id})"
      >
        اطلب الآن
      </button>

      <button
        class="add-cart"
        onclick="event.stopPropagation();addToCart(${p.id})"
      >
        🛒 أضف إلى السلة
      </button>

    </article>

  `;

}


/*
====================================================
                  عرض المنتجات
====================================================
*/

function render(list = displayProducts){

  if(!productsEl) return;

  productsEl.innerHTML =
    list.map(productCard).join("");

}


/*
====================================================
                    العروض
====================================================
*/

function renderOffers(){

  if(!offersEl) return;

  const list = shuffleProducts(
    products.filter(p => p.offer)
  );

  offersEl.innerHTML =
    list.map(productCard).join("");

}


/*
====================================================
                  الأكثر مبيعاً
====================================================
*/

function renderBest(){

  if(!bestEl) return;

  const list = shuffleProducts(
    products.filter(p => p.best)
  );

  bestEl.innerHTML =
    list.map(productCard).join("");

}


/*
====================================================
                       جديد
====================================================
*/

function renderNew(){

  if(!newEl) return;

  const list = shuffleProducts(
    products.filter(p => p.newProduct)
  );

  newEl.innerHTML =
    list.map(productCard).join("");

}


/*
====================================================
            فتح تفاصيل المنتج والفيديو
====================================================
*/

function openOrder(id){

  checkoutFromCart = false;

  selectedProduct = products.find(p => p.id === id);

  if(!selectedProduct || !selected) return;

  const productNameInput =
    document.getElementById("productName");

  if(productNameInput){
    productNameInput.value = selectedProduct.name;
  }

  const imagePath =
    selectedProduct.image || "./images/placeholder.svg";

  const videoPath =
    typeof selectedProduct.video === "string"
      ? selectedProduct.video.trim()
      : "";

  let mediaHTML = `

    <img
      class="product-detail-image"
      src="${imagePath}"
      onerror="this.onerror=null;this.src='./images/placeholder.svg'"
      alt="${selectedProduct.name}"
    >

  `;

  if(videoPath){

    mediaHTML += `

      <div class="product-video-container">

        <video
          class="product-video"
          autoplay
          muted
          loop
          playsinline
          controls
          preload="metadata"
          aria-label="فيديو ${selectedProduct.name}"
        >

          <source
            src="${videoPath}"
            type="video/mp4"
          >

          متصفحك لا يدعم تشغيل الفيديو.

        </video>

        <button
          type="button"
          class="product-video-sound"
          onclick="toggleProductVideoSound(this)"
        >
          🔇 تشغيل الصوت
        </button>

      </div>

    `;

  }

  const fullDescriptionHTML = selectedProduct.fullDescription
    ? `
      <section class="product-description-full"
        style="margin-top:18px;padding:15px;border-radius:10px;background:#f7f7f7;direction:rtl;text-align:right;">

        <h4 style="margin:0 0 10px;">وصف المنتج</h4>

        <p style="margin:0;color:#444;font-size:14px;line-height:1.9;">
          ${selectedProduct.fullDescription}
        </p>

      </section>
    `
    : "";

  const featuresHTML =
    Array.isArray(selectedProduct.features) &&
    selectedProduct.features.length
      ? `
        <section class="product-features"
          style="margin-top:14px;padding:15px;border-radius:10px;background:#f7f7f7;direction:rtl;text-align:right;">

          <h4 style="margin:0 0 10px;">مميزات المنتج</h4>

          <ul style="margin:0;padding-right:22px;">

            ${selectedProduct.features.map(feature => `
              <li style="margin:7px 0;line-height:1.7;">
                ${feature}
              </li>
            `).join("")}

          </ul>

        </section>
      `
      : "";

  selected.innerHTML = `

    <div class="product-detail-media">

      ${mediaHTML}

    </div>

    <h3>${selectedProduct.name}</h3>

    ${productRatingHTML(selectedProduct)}

    <div class="price">
      ${money(selectedProduct.price)}
    </div>

    ${fullDescriptionHTML}

    ${featuresHTML}

  `;

  if(homePage) homePage.classList.add("hidden");
  if(cartPage) cartPage.classList.add("hidden");
  if(orderPage) orderPage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  const video = selected.querySelector(".product-video");

  if(video){

    video.muted = true;

    const playAttempt = video.play();

    if(playAttempt && typeof playAttempt.catch === "function"){

      playAttempt.catch(() => {});

    }

  }

}


/*
====================================================
              تشغيل صوت الفيديو وكتمه
====================================================
*/

function toggleProductVideoSound(button){

  const container =
    button.closest(".product-video-container");

  if(!container) return;

  const video = container.querySelector("video");

  if(!video) return;

  video.muted = !video.muted;

  if(video.muted){

    button.textContent = "🔇 تشغيل الصوت";

  }else{

    video.volume = 1;
    button.textContent = "🔊 كتم الصوت";

    const playAttempt = video.play();

    if(playAttempt && typeof playAttempt.catch === "function"){
      playAttempt.catch(() => {});
    }

  }

}


/*
====================================================
                  إضافة للسلة
====================================================
*/

function addToCart(id){

  const product = products.find(p => p.id === id);

  if(!product) return;

  const existing = cart.find(item => item.id === id);

  if(existing){

    existing.quantity += 1;

  }else{

    cart.push({
      id: product.id,
      quantity: 1
    });

  }

  saveCart();
  updateCartCount();

  showToast("تمت إضافة المنتج إلى السلة 🛒");

}


/*
====================================================
                  عدد السلة
====================================================
*/

function updateCartCount(){

  const count = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const cartCount = document.getElementById("cartCount");

  if(cartCount){
    cartCount.textContent = count;
  }

  const cartItemsCount = document.getElementById("cartItemsCount");

  if(cartItemsCount){
    cartItemsCount.textContent = count + " منتجات";
  }

}


/*
====================================================
                    عرض السلة
====================================================
*/

function renderCart(){

  const container = document.getElementById("cartItems");
  const empty = document.getElementById("emptyCart");
  const totalEl = document.getElementById("cartTotal");

  if(!container || !empty || !totalEl) return;

  cart = cart.filter(item =>
    products.some(p => p.id === item.id)
  );

  if(cart.length === 0){

    container.innerHTML = "";
    empty.classList.remove("hidden");
    totalEl.textContent = money(0);

    updateCartCount();

    return;

  }

  empty.classList.add("hidden");

  let total = 0;

  container.innerHTML = cart.map(item => {

    const product = products.find(p => p.id === item.id);

    if(!product) return "";

    const quantity = Math.max(
      1,
      Number(item.quantity) || 1
    );

    const itemTotal = product.price * quantity;

    total += itemTotal;

    return `

      <div class="cart-item">

        <img
          src="${product.image}"
          onerror="this.onerror=null;this.src='./images/placeholder.svg'"
          alt="${product.name}"
        >

        <div class="cart-info">

          <h3>${product.name}</h3>

          <div class="cart-price">
            ${money(product.price)}
          </div>

          <div class="quantity">

            <button
              onclick="changeQuantity(${product.id},-1)"
            >
              −
            </button>

            <strong>${quantity}</strong>

            <button
              onclick="changeQuantity(${product.id},1)"
            >
              +
            </button>

          </div>

        </div>

        <div>

          <strong>${money(itemTotal)}</strong>

          <br><br>

          <button
            class="remove"
            onclick="removeFromCart(${product.id})"
          >
            🗑 إزالة
          </button>

        </div>

      </div>

    `;

  }).join("");

  totalEl.textContent = money(total);

  updateCartCount();

}


/*
====================================================
                  تغيير الكمية
====================================================
*/

function changeQuantity(id, amount){

  const item = cart.find(i => i.id === id);

  if(!item) return;

  item.quantity += amount;

  if(item.quantity <= 0){

    cart = cart.filter(i => i.id !== id);

  }

  saveCart();
  renderCart();

}


/*
====================================================
                  حذف من السلة
====================================================
*/

function removeFromCart(id){

  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

  showToast("تمت إزالة المنتج من السلة");

}


/*
====================================================
                    فتح السلة
====================================================
*/

const cartBtn = document.getElementById("cartBtn");

if(cartBtn){

  cartBtn.onclick = () => {

    if(homePage) homePage.classList.add("hidden");
    if(orderPage) orderPage.classList.add("hidden");
    if(cartPage) cartPage.classList.remove("hidden");

    renderCart();

    window.scrollTo(0, 0);

  };

}


/*
====================================================
                  العودة للمتجر
====================================================
*/

const cartBackBtn = document.getElementById("cartBackBtn");

if(cartBackBtn){

  cartBackBtn.onclick = () => {

    if(cartPage) cartPage.classList.add("hidden");
    if(homePage) homePage.classList.remove("hidden");

    window.scrollTo(0, 0);

  };

}


const backBtn = document.getElementById("backBtn");

if(backBtn){

  backBtn.onclick = () => {

    if(selected){

      selected.querySelectorAll("video").forEach(video => {
        video.pause();
      });

    }

    if(orderPage) orderPage.classList.add("hidden");
    if(homePage) homePage.classList.remove("hidden");

  };

}


/*
====================================================
                    البحث
====================================================
*/

function normalizeText(text){

  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

}


function searchProducts(){

  if(!searchInput || !productsEl) return;

  const q = normalizeText(searchInput.value);

  if(!q){

    render(displayProducts);
    return;

  }

  const result = displayProducts.filter(product => {

    const name = normalizeText(product.name);
    const description = normalizeText(product.description || "");
    const fullDescription = normalizeText(product.fullDescription || "");

    return name.includes(q) ||
           description.includes(q) ||
           fullDescription.includes(q);

  });

  if(result.length > 0){

    render(result);

  }else{

    productsEl.innerHTML = `

      <div class="no-results">

        <div style="font-size:50px;">
          🔍
        </div>

        <h3>لم يتم العثور على المنتج</h3>

        <p>
          لا يوجد منتج يطابق:
          <strong></strong>
        </p>

        <button
          onclick="clearSearch()"
          style="
            padding:12px 25px;
            border:0;
            border-radius:8px;
            background:#ffd814;
            cursor:pointer;
            font-weight:bold;
          "
        >
          عرض جميع المنتجات
        </button>

      </div>

    `;

    const searchTerm =
      productsEl.querySelector(".no-results strong");

    if(searchTerm){
      searchTerm.textContent = searchInput.value;
    }

  }

  productsEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/*
====================================================
              البحث أثناء الكتابة
====================================================
*/

if(searchInput){

  searchInput.addEventListener("input", searchProducts);

  searchInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

      e.preventDefault();
      searchProducts();

    }

  });

}


/*
====================================================
                  مسح البحث
====================================================
*/

function clearSearch(){

  if(!searchInput) return;

  searchInput.value = "";

  render(displayProducts);

  productsEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/*
====================================================
                  أزرار التنقل
====================================================
*/

document.querySelectorAll("[data-section]").forEach(button => {

  button.addEventListener("click", () => {

    const id = button.dataset.section;

    if(id === "offers"){

      document.getElementById("offersSection")?.scrollIntoView({
        behavior: "smooth"
      });

    }

    if(id === "best"){

      document.getElementById("bestSection")?.scrollIntoView({
        behavior: "smooth"
      });

    }

    if(id === "new"){

      document.getElementById("newSection")?.scrollIntoView({
        behavior: "smooth"
      });

    }

    if(id === "home"){

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  });

});


/*
====================================================
                  إتمام الطلب من السلة
====================================================
*/

const checkoutBtn = document.getElementById("checkoutBtn");

if(checkoutBtn){

  checkoutBtn.onclick = () => {

    if(cart.length === 0){

      showToast("السلة فارغة");
      return;

    }

    openCartCheckout();

  };

}


/*
====================================================
                    نموذج الطلب
====================================================
*/

const orderForm = document.getElementById("orderForm");

if(orderForm){

  orderForm.onsubmit = async e => {

    e.preventDefault();

    const status = document.getElementById("status");

    if(!status) return;

    if(!selectedProduct){

      status.className = "error";
      status.textContent = "يرجى اختيار منتج أولاً";

      return;

    }

    let orderItems;

    if(checkoutFromCart){

      orderItems = cart.map(item => {

        const product = products.find(p => p.id === item.id);

        if(!product) return null;

        return {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: Math.max(1, Number(item.quantity) || 1),
          image: product.image
        };

      }).filter(Boolean);

      if(!orderItems.length){

        status.className = "error";
        status.textContent = "السلة فارغة";

        return;

      }

    }else{

      const quantityInput = document.getElementById("quantity");

      const qty = Math.max(
        1,
        Number(quantityInput?.value) || 1
      );

      orderItems = [{

        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity: qty,
        image: selectedProduct.image

      }];

    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalQuantity = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const productText = orderItems
      .map(item => `${item.name} × ${item.quantity}`)
      .join("\n");

    status.className = "";
    status.textContent = "جارٍ إرسال الطلب...";

    const data = {

      product: productText,

      products: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),

      items: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),

      price: total,
      total: total,

      name: document.getElementById("fullName")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      email: document.getElementById("email")?.value || "",
      city: document.getElementById("city")?.value || "",
      address: document.getElementById("address")?.value || "",

      quantity: totalQuantity

    };

    try{

      const r = await fetch("/send-order", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

      });

      const j = await r.json();

      if(!r.ok || !j.success){

        throw new Error(
          j.message || "تعذر إرسال الطلب"
        );

      }

      orders.push({

        id: Date.now(),

        product: productText,

        products: orderItems,
        items: orderItems,

        price: total,
        total: total,

        quantity: totalQuantity,

        createdAt: Date.now(),

        status: "pending"

      });

      saveOrders();

      status.className = "success";

      status.textContent =
        "تم استلام طلبك بنجاح، سنتواصل معك قريباً.";

      orderForm.reset();

      if(checkoutFromCart){

        cart = [];

      }else{

        cart = cart.filter(
          item => item.id !== selectedProduct.id
        );

      }

      saveCart();
      updateCartCount();
      renderCart();

      checkoutFromCart = false;

    }
    catch(err){

      status.className = "error";

      status.textContent =
        err.message || "حدث خطأ أثناء إرسال الطلب";

    }

  };

}


/*
====================================================
              إتمام الطلب من السلة
====================================================
*/

function openCartCheckout(){

  if(cart.length === 0){

    showToast("السلة فارغة");
    return;

  }

  const detailedCart = cart.map(item => {

    const product = products.find(p => p.id === item.id);

    if(!product) return null;

    return {

      id: product.id,
      name: product.name,
      price: Number(product.price),

      quantity: Math.max(
        1,
        Number(item.quantity) || 1
      ),

      image: product.image

    };

  }).filter(Boolean);

  if(!detailedCart.length){

    showToast("السلة فارغة");
    return;

  }

  checkoutFromCart = true;

  selectedProduct = products.find(
    p => p.id === detailedCart[0].id
  );

  if(!selectedProduct){

    checkoutFromCart = false;
    return;

  }

  const total = detailedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = detailedCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const productNameInput = document.getElementById("productName");

  if(productNameInput){
    productNameInput.value = "طلب متعدد المنتجات";
  }

  selected.innerHTML = `

    <img
      class="product-detail-image"
      src="${selectedProduct.image}"
      onerror="this.onerror=null;this.src='./images/placeholder.svg'"
      alt="${selectedProduct.name}"
    >

    <h3>طلب متعدد المنتجات</h3>

    <div class="price">
      ${money(total)}
    </div>

    <p>
      عدد المنتجات المختلفة:
      <strong>${detailedCart.length}</strong>
    </p>

    <p>
      إجمالي الكمية:
      <strong>${totalQuantity}</strong>
    </p>

    <div style="
      margin-top:15px;
      padding:12px;
      background:#f5f6f8;
      border-radius:10px;
    ">

      ${detailedCart.map(item => `

        <div style="
          display:flex;
          justify-content:space-between;
          gap:10px;
          padding:8px 0;
          border-bottom:1px solid #ddd;
        ">

          <span>
            ${item.name} × ${item.quantity}
          </span>

          <strong>
            ${money(item.price * item.quantity)}
          </strong>

        </div>

      `).join("")}

    </div>

  `;

  const quantityInput = document.getElementById("quantity");

  if(quantityInput){
    quantityInput.value = totalQuantity;
  }

  if(cartPage) cartPage.classList.add("hidden");
  if(homePage) homePage.classList.add("hidden");
  if(orderPage) orderPage.classList.remove("hidden");

  window.scrollTo(0, 0);

}


/*
====================================================
                    إشعار الزائر
====================================================
*/

function showToast(message){

  const toast = document.getElementById("toast");

  if(!toast) return;

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {

    toast.style.display = "none";

  }, 2500);

}


/*
====================================================
                    سجل الطلبات
====================================================
*/

function renderOrders(){

  const container = document.getElementById("ordersList");

  if(!container) return;

  if(orders.length === 0){

    container.innerHTML = `

      <div class="order-history">
        لا توجد طلبات حالياً.
      </div>

    `;

    return;

  }

  container.innerHTML = orders.map(order => {

    const createdAt = Number(order.createdAt) || Date.now();

    const elapsed = Date.now() - createdAt;

    const fourHours = 4 * 60 * 60 * 1000;

    const canCancel =
      elapsed < fourHours &&
      order.status !== "cancelled";

    const orderQuantity = Number(order.quantity) || 0;

    const orderTotal =
      Number(order.total ?? order.price) || 0;

    return `

      <div class="order-history">

        <div class="order-history-header">

          <strong>
            📦 ${order.product}
          </strong>

          ${
            canCancel

            ? `

              <button
                class="cancel-btn"
                onclick="cancelOrder(${order.id})"
              >
                التراجع عن الطلب
              </button>

            `

            : `

              <button
                class="cancel-btn cancel-disabled"
                disabled
              >
                ${order.status === "cancelled" ? "تم الإلغاء" : "انتهت مهلة الإلغاء"}
              </button>

            `
          }

        </div>

        <p>
          الكمية: ${orderQuantity}
        </p>

        <p>
          السعر الإجمالي: ${money(orderTotal)}
        </p>

        <small>

          ${
            order.status === "cancelled"

            ? "تم إلغاء الطلب"

            : canCancel

            ? "يمكنك التراجع عن الطلب لمدة 4 ساعات."

            : "انتهت مهلة التراجع عن الطلب."

          }

        </small>

      </div>

    `;

  }).join("");

}


/*
====================================================
                  إلغاء الطلب
====================================================
*/

function cancelOrder(id){

  const order = orders.find(o => o.id === id);

  if(!order) return;

  const elapsed = Date.now() - (Number(order.createdAt) || 0);

  const fourHours = 4 * 60 * 60 * 1000;

  if(elapsed >= fourHours){

    showToast(
      "انتهت مهلة التراجع عن الطلب."
    );

    return;

  }

  if(order.status === "cancelled"){

    showToast("تم إلغاء هذا الطلب مسبقاً.");

    return;

  }

  order.status = "cancelled";

  saveOrders();
  renderOrders();

  showToast("تم التراجع عن الطلب بنجاح.");

}


/*
====================================================
                  تشغيل المشروع
====================================================
*/

render(displayProducts);
renderOffers();
renderBest();
renderNew();
renderCart();
updateCartCount();


/*
====================================================
                  إشعار الزائر إلى الخادم
====================================================
*/

if(!sessionStorage.getItem("visitorNotified")){

  fetch("/visitor", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      page: location.href
    })

  }).catch(() => {});

  sessionStorage.setItem("visitorNotified", "1");

}
