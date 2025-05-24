import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.2,
  apiKey: process.env.OPENAI_API_KEY,
});
const memory = new MemorySaver();

const CEOAgent = createReactAgent({
  llm,
  tools: [],
  name: "ceo_agent",
  prompt: `
    You are a high-profile CEO known for your strategic thinking and business acumen, participating in a public debate.
  
    If this is the first message in the debate (no prior messages), begin with a concise professional greeting and introduce your perspective.
  
    Otherwise, respond with clear, business-focused arguments emphasizing economic implications, regulatory impact, and long-term market considerations.
  
    Maintain a confident and composed tone suitable for corporate and media attention.
    `,
  checkpointSaver: memory,
});

const SenatorAgent = createReactAgent({
  llm,
  tools: [],
  name: "senator_agent",
  prompt: `
    You are a government senator participating in a formal policy debate.
  
    If this is the first message in the debate (no prior messages), start with a brief greeting and introduce your argument.
  
    Otherwise, respond directly with well-reasoned points focusing on public health, legislative responsibility, and societal impact.
  
    Maintain a balanced, policy-driven stance appropriate for public and official scrutiny.
    `,
  checkpointSaver: memory,
});

const PhilosopherAgent = createReactAgent({
  llm,
  tools: [],
  name: "philosopher_agent",
  prompt: `
    You are a thoughtful philosopher engaging in a reflective debate.
  
    If this is the first message in the debate (no prior messages), start with a respectful, inquisitive greeting and present your stance.
  
    Otherwise, respond with deep reasoning, drawing from ethics, logic, and philosophical frameworks.
  
    Speak in a calm, contemplative tone and raise moral and societal dilemmas without being confrontational.
    `,
  checkpointSaver: memory,
});

const ReporterAgent = createReactAgent({
  llm,
  tools: [],
  name: "reporter_agent",
  prompt: `
    You are a seasoned investigative reporter contributing to a public debate.
  
    If this is the first message in the debate (no prior messages), begin with a neutral, professional greeting and frame your initial position.
  
    Otherwise, respond with factual, research-based observations—reference case studies, real-world policies, and public sentiment.
  
    Maintain an analytical, unbiased tone to uphold journalistic integrity.
    `,
  checkpointSaver: memory,
});

const ActorAgent = createReactAgent({
  llm,
  tools: [],
  name: "actor_agent",
  prompt: `
    You are a well-known actor and public figure participating in a high-visibility debate.
  
    If this is the first message in the debate (no prior messages), begin with a warm, engaging greeting and express your personal stance.
  
    Otherwise, reply with emotionally compelling arguments, anecdotes, and reflections on influence, responsibility, and cultural impact.
  
    Maintain a passionate and charismatic tone throughout.
    `,
  checkpointSaver: memory,
});

export const agentsMap = {
  ceo_agent: CEOAgent,
  senator_agent: SenatorAgent,
  reporter_agent: ReporterAgent,
  philosopher_agent: PhilosopherAgent,
  actor_agent: ActorAgent,
};

export async function streamAgentSSE(
  agentName,
  userMessage,
  res,
  threadId = "default-thread",
  agent,
  threadMessages
) {
  if (!agent) {
    throw new Error(`Agent "${agentName}" not found.`);
  }

  const previousMessages = [];

  if (Array.isArray(threadMessages) && threadMessages.length > 0) {
    previousMessages = threadMessages.map((threadmessage) => {
      const { agentId, content } = threadmessage;
      if (agentId === "user") {
        return new HumanMessage(content);
      } else if (agentId === "ceo_agent")
        return new AIMessage(`[CEO]: ${content}`);
      else if (agentId === "senator_agent")
        return new AIMessage(`[Senator]:${content}`);
      else if (agentId === "reporter_agent")
        return new AIMessage(`[Reporter]: ${content}`);
      else if (agentId === "philosopher_agent")
        return new AIMessage(`[Philosopher]: ${content}`);
      else if (agentId === "actor_agent")
        return new AIMessage(`[Actor]: ${content}`);
    });
  }

  // Set SSE headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Cache-Control",
  });

  const allMessages = [...previousMessages, new HumanMessage(userMessage)];
  let completeResponse = "";

  try {
    const stream = await agent.streamEvents(
      { messages: allMessages },
      { version: "v2", configurable: { thread_id: threadId } }
    );

    for await (const event of stream) {
      if (
        event.event === "on_chat_model_stream" &&
        event.data &&
        "chunk" in event.data &&
        event.data.chunk &&
        event.data.chunk.content
      ) {
        const content = event.data.chunk.content;
        if (content.length > 0) {
          completeResponse += content;

          // Send the chunk as SSE
          res.write(
            `data: ${JSON.stringify({
              type: "chunk",
              content: content,
              complete: false,
            })}\n\n`
          );
        }
      }
    }

    // Send completion signal
    res.write(
      `data: ${JSON.stringify({
        type: "streaming_completed",
        content: completeResponse,
        complete: true,
      })}\n\n`
    );

    res.end();
  } catch (error) {
    console.error("Stream error:", error);
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        error: error.message,
      })}\n\n`
    );
    res.end();
  }
}
