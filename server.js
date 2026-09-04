require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

async function sendTelegram(text) {
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "متغيرات Telegram غير موجودة في Environment Variables"
    );
  }

  const response = await axios.post(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML"
    },
    {
      timeout: 8000
    }
  );

  if (!response.data?.ok) {
    throw new Error(
      response.data?.description || "Telegram رفض إرسال الرسالة"
    );
  }

  return response.data;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/send-order", async (req, res) => {
  try {
    const data = req.body || {};

    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const city = String(data.city || "").trim();
    const address = String(data.address || "").trim();
    const product = String(data.product || "").trim();

    const price = Number(data.price || 0);
    const quantity = Math.max(1, Number.parseInt(data.quantity || 1, 10));

    if (
      !name ||
      !phone ||
      !city ||
      !address ||
      !product
    ) {
      return res.status(422).json({
        success: false,
        message: "يرجى إكمال الحقول المطلوبة"
      });
    }

    const total = price * quantity;

    const text =
      "🛍️ <b>طلب جديد</b>\n\n" +
      "📦 المنتج: " + escapeHtml(product) + "\n" +
      "💰 السعر: " + price.toFixed(2) + " درهم\n" +
      "🔢 الكمية: " + quantity + "\n" +
      "💵 الإجمالي: " + total.toFixed(2) + " درهم\n\n" +
      "👤 الاسم: " + escapeHtml(name) + "\n" +
      "📞 الهاتف: " + escapeHtml(phone) + "\n" +
      "📧 البريد: " + escapeHtml(email || "غير مقدم") + "\n" +
      "🏙️ المدينة: " + escapeHtml(city) + "\n" +
      "📍 العنوان: " + escapeHtml(address);

    await sendTelegram(text);

    console.log("Order sent to Telegram");

    return res.json({
      success: true,
      message: "تم إرسال الطلب إلى Telegram بنجاح"
    });

  } catch (error) {
    console.error(
      "Telegram order error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "فشل إرسال الطلب"
    });
  }
});

app.post("/visitor", async (req, res) => {
  try {
    const page = String(req.body?.page || "").trim();

    const userAgent =
      String(req.headers["user-agent"] || "غير معروف")
        .substring(0, 180);

    const now = new Date().toISOString();

    const text =
      "👀 <b>زائر جديد دخل إلى المتجر</b>\n\n" +
      "🌐 الصفحة: " + escapeHtml(page || "غير معروفة") + "\n" +
      "🕒 الوقت: " + escapeHtml(now) + "\n" +
      "📱 المتصفح: " + escapeHtml(userAgent);

    await sendTelegram(text);

    return res.json({
      success: true,
      message: "تم إرسال إشعار الزيارة إلى Telegram"
    });

  } catch (error) {
    console.error(
      "Telegram visitor error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "فشل إرسال إشعار الزيارة"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});