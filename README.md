# 🧠 Multi-Agent AI Debate Platform

A dynamic, interactive debate system where multiple AI agents—each with distinct personas—participate in a structured conversation. Inspired by Discord-style chat, agents respond in sequence based on user selection, forming arguments and counterarguments on complex topics.

---

## 🚀 Features

- 💬 Multi-agent conversations (CEO, Senator, Reporter, Philosopher, Actor)
- 🎭 Custom prompts and personalities for each agent
- 🧠 Memory-aware agents with conversation history
- 🔁 SSE-based real-time streaming responses
- 🧑‍💻 Built with Node.js (backend) and React (frontend)
- 🎯 Modular agent architecture using LangGraph

---

## 📦 Tech Stack

**Frontend**

- React + TypeScript
- TailwindCSS
- SSE stream consumption

**Backend**

- Node.js + Express
- LangGraph (LLM Orchestration)
- OpenAI (`gpt-3.5-turbo`)
- Custom memory manager (`MemorySaver`)
- SSE endpoint for streaming responses
