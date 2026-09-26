# Resilient API: Rate Limiting & CX-Driven Error Handling

A Node.js and Express API demonstrating how to build resilient backend services that prioritize both **Security** and **Customer Experience (CX)/**.

## The Concept: Empathy in Backed Engineering

Standard HTTP errors (like `429 Too Many Requests` or `500 Internal Server Error`) are often robotic, cryptic,and frustrating for users or client developers.

This project bridgest the gap between robust backend architecture and user experience by implementing:

1. **API Rate Limiting:** Protecting the server from DDos attacks or accidental spam (configured to 5 requests per minute).
2. **CX-Driven Error Handling:** Replacing generic server crashes with empathetic, human-readable, and actionable JSON responses.
3. **Global Error Middleware:** Ensuring that exceptions never expose sensitive stack traces to the public.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Security Middleware:** `express-rate-limit`

## How to Run Locally

1. **Clone the repository:**

```bash
git clone [htpps://github.com/whoismarce/proyecto-api-resiliente.git](https://github.com/whoismarce/proyecto-api-resiliente.git)
cd proyecto-api-resiliente

```

2. **Install dependencies:**

```bash
npm install

```

3. **Start the server:**

```bash
node server.js

```

4. **Test the endpoints ([http://localhost:3000](http://localhost:3000)):**

* */api/data:* Returns a successful payload. (Refresh 6 times quickly to trigger the friendly Rte Limit error).
* */api/broken:* Simulates a server failure to demonstrate the Global Error Handler.
* */random-url:* Simulates a 404 Not Found error with a custom CX message.
