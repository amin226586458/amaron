const products = [
  {id:1,name:"سماعات لاسلكية احترافية",price:299,old:399,image:"https://i.postimg.cc/prMBJqDw/IMG-8280.jpg"},
  {id:2,name:"ساعة ذكية رياضية",price:449,old:599,image:"https://i.postimg.cc/kXcyWNB3/IMG-8281.jpg"},
  {id:3,name:"حقيبة ظهر عصرية",price:249,old:329,image:"https://i.postimg.cc/ZYPPhPP5/IMG-8282.jpg"},
  {id:4,name:"كاميرا صغيرة للتصوير",price:799,old:999,image:"https://i.postimg.cc/7PTHCXtf/IMG-8283.jpg"},
  {id:5,name:"لوحة مفاتيح لاسلكية",price:199,old:249,image:"https://i.postimg.cc/nhWB13Zr/IMG-8285.jpg"},
  {id:6,name:"مصباح LED مكتبي",price:129,old:179,image:"https://i.postimg.cc/P5dTRHXp/IMG-8286.jpg"},
  {id:7,name:"كمبيوتر محمول",price:2.899,old:3500,image:"https://i.postimg.cc/5tRJyFwL/IMG-8287.jpg"},
  {id:8,name:"واقي ذكري",price:99,old:139,image:"https://i.postimg.cc/XJS2sj3j/IMG-8288.jpg"}
];

const productsEl = document.getElementById("products");
const orderPage = document.getElementById("orderPage");
const selected = document.getElementById("selectedProduct");

let selectedProduct = null;

function money(n) {
  return n + " درهم";
}

function render(list = products) {
  productsEl.innerHTML = list.map(p => `
    <article class="product" onclick="openOrder(${p.id})">
      <img src="${p.image}" onerror="this.src='images/placeholder.svg'" alt="">
      <h3>${p.name}</h3>
      <div>
        <span class="price">${money(p.price)}</span>
        <span class="old">${money(p.old)}</span>
      </div>
      <button class="buy" onclick="event.stopPropagation();openOrder(${p.id})">
        اطلب الآن
      </button>
    </article>
  `).join("");
}

function openOrder(id) {
  selectedProduct = products.find(p => p.id === id);

  if (!selectedProduct) return;

  document.getElementById("productName").value = selectedProduct.name;

  selected.innerHTML = `
    <img src="${selectedProduct.image}" onerror="this.src='images/placeholder.svg'">
    <h3>${selectedProduct.name}</h3>
    <div class="price">${money(selectedProduct.price)}</div>
  `;

  document.querySelector("main").classList.add("hidden");
  orderPage.classList.remove("hidden");

  window.scrollTo(0, 0);
}

document.getElementById("backBtn").onclick = () => {
  orderPage.classList.add("hidden");
  document.querySelector("main").classList.remove("hidden");
};

document.getElementById("searchInput").oninput = e => {
  const q = e.target.value.trim().toLowerCase();

  render(
    products.filter(p =>
      p.name.toLowerCase().includes(q)
    )
  );
};

document.getElementById("orderForm").onsubmit = async e => {
  e.preventDefault();

  const status = document.getElementById("status");

  if (!selectedProduct) {
    status.className = "error";
    status.textContent = "يرجى اختيار منتج أولاً";
    return;
  }

  status.className = "";
  status.textContent = "جارٍ إرسال الطلب...";

  const data = {
    product: selectedProduct.name,
    price: selectedProduct.price,
    name: document.getElementById("fullName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    quantity: document.getElementById("quantity").value
  };

  try {
    const r = await fetch("/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const j = await r.json();

    if (!j.success) {
      throw new Error(j.message || "تعذر إرسال الطلب");
    }

    status.className = "success";
    status.textContent =
      "تم استلام طلبك بنجاح، سنتواصل معك قريباً.";

    e.target.reset();

  } catch (err) {
    status.className = "error";
    status.textContent =
      err.message || "حدث خطأ أثناء إرسال الطلب";
  }
};

render();

if (!sessionStorage.getItem("visitorNotified")) {

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