const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const email = process.env.OFFICIAL_EMAIL || "YOUR_CHITKARA_EMAIL";

// util functions 
function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw { status: 400, message: "fibonacci requires a non-negative integer" };
  }
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) arr.push(0);
    else if (i === 1) arr.push(1);
    else arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function getPrimes(arr) {
  if (!Array.isArray(arr)) {
    throw { status: 400, message: "prime requires array" };
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isInteger(arr[i])) {
      throw { status: 400, message: "all elements must be integers" };
    }
  }
  return arr.filter(isPrime);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

function getLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw { status: 400, message: "lcm requires non-empty array" };
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isInteger(arr[i])) throw { status: 400, message: "integers only" };
  }
  let ans = arr[0];
  for (let i = 1; i < arr.length; i++) {
    ans = lcm(ans, arr[i]);
  }
  return ans;
}

function getHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw { status: 400, message: "hcf requires non-empty array" };
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isInteger(arr[i])) throw { status: 400, message: "integers only" };
  }
  let ans = arr[0];
  for (let i = 1; i < arr.length; i++) {
    ans = gcd(ans, arr[i]);
  }
  return ans;
}

async function getAI(q) {
  if (typeof q !== "string" || q.trim().length === 0) {
    throw { status: 400, message: "AI needs a question" };
  }
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw { status: 500, message: "api key missing" };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: "One word answer only. No punctuation. Question: " + q }]
      })
    });

    const data = await res.json();
    if (!res.ok) throw { status: 500, message: "AI error" };

    const txt = data.choices[0].message.content.trim();
    let ans = txt.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "");
    return ans || txt.split(/\s+/)[0];
  } catch (e) {
    if (e.status) throw e;
    throw { status: 500, message: "AI failed" };
  }
}

const keys = ["fibonacci", "prime", "lcm", "hcf", "AI"];

app.get("/", (req, res) => {
  res.json({
    message: "Bajaj Finserv API running",
    endpoints: { health: "GET /health", bfhl: "POST /bfhl" }
  });
});

app.get("/health", (req, res) => {
  res.json({ is_success: true, official_email: email });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ is_success: false, official_email: email });
    }

    const k = Object.keys(body);
    if (k.length !== 1 || !keys.includes(k[0])) {
      return res.status(400).json({ is_success: false, official_email: email });
    }

    const key = k[0];
    const val = body[key];
    let data;

    if (key === "fibonacci") data = fibonacci(val);
    else if (key === "prime") data = getPrimes(val);
    else if (key === "lcm") data = getLCM(val);
    else if (key === "hcf") data = getHCF(val);
    else if (key === "AI") data = await getAI(val);

    res.json({ is_success: true, official_email: email, data: data });
  } catch (e) {
    const s = e.status || 500;
    res.status(s).json({ is_success: false, official_email: email });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));

module.exports = app;
