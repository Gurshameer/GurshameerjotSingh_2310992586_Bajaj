# Bajaj Finserv Qualifier API 🚀

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

A robust REST API service built for the **Bajaj Finserv Health Qualifier** challenge. It features data processing logic (Fibonacci, Prime, LCM, HCF) and AI integration using OpenRouter.

**Live Demo:** [https://bajaj-proj-seven.vercel.app](https://bajaj-proj-seven.vercel.app)

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Integration:** OpenRouter (Google Gemini Flash model)
- **Deployment:** Vercel

---

## 🚀 Features

### 1. `POST /bfhl`
Single endpoint handling multiple operations based on input flags:
- **Fibonacci**: Generates series up to `n`
- **Prime**: Filters prime numbers from an array
- **LCM**: Calculates Least Common Multiple
- **HCF**: Calculates Highest Common Factor
- **AI**: Answers questions in a single word

### 2. `GET /health`
- Health check endpoint returning operational status.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gurshameer/GurshameerjotSingh_2310992586_Bajaj.git
   cd GurshameerjotSingh_2310992586_Bajaj
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   OFFICIAL_EMAIL=your_email@chitkara.edu.in
   OPENROUTER_API_KEY=your_openrouter_api_key
   PORT=3000
   ```

4. **Run Locally:**
   ```bash
   npm start
   ```
   Server will start at `http://localhost:3000`.

---

## 📖 API Usage

### Example Request (Fibonacci)
```bash
curl -X POST https://bajaj-proj-seven.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 10}'
```

### Example Request (AI)
```bash
curl -X POST https://bajaj-proj-seven.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'
```

---

## 📝 License
This project is open-source and available under the MIT License.
