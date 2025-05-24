import express from "express";
import cors from "cors";
import { streamAgentSSE, agentsMap } from "./agents.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/stream-sse/:agentName", async (req, res) => {
  try {
    const { agentName } = req.params;
    const { message, threadId, threadMessages, selectedAgent } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!selectedAgent)
      return res.status(400).json({ error: "agent is required" });

    const agent = agentsMap[selectedAgent];

    if (!agent)
      return res.status(404).json({ error: "Selected Agent not found" });

    console.log(
      "got request for",
      message,
      threadId,
      selectedAgent,
      threadMessages
    );
    await streamAgentSSE(agentName, message, res, threadId, agent);
  } catch (error) {
    console.error("SSE streaming error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `SSE streaming: POST http://localhost:${port}/api/stream-sse/:agentName`
  );
  console.log(
    `JSON streaming: POST http://localhost:${port}/api/stream-json/:agentName`
  );
  console.log(
    `Non-streaming: POST http://localhost:${port}/api/invoke/:agentName`
  );
});
