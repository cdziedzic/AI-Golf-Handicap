import OpenAI from 'openai';
import { AssistantResponse } from 'ai'

// Assuming you are using a server environment where you can import such modules

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req) {
  const input = await req.json();
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      const runStream = openai.beta.threads.runs.createAndStream(threadId, {
        assistant_id: process.env.ASSISTANT_ID || (() => { throw new Error('ASSISTANT_ID is not set'); })(),
      });

      let runResult = await forwardStream(runStream);
      while (runResult?.status === 'requires_action' && runResult.required_action?.type === 'submit_tool_outputs') {

        const tool_outputs = await Promise.all(
          runResult.required_action.submit_tool_outputs.tool_calls.map(async (toolCall) => {
            if (toolCall.function.name === 'tavily_search') {
              try {
                const parameters = JSON.parse(toolCall.function.arguments);
                const query = parameters.query;
                const response = await fetch('https://api.tavily.com/search', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    api_key: process.env.TAVILY_API_KEY,
                    query: query,
                    search_depth: "basic",
                    include_answer: true,
                    include_images: false,
                    include_raw_content: false,
                    max_results: 5,
                    include_domains: [],
                    exclude_domains: []
                  }),
                });
                const data = await response.json();
                return {
                  tool_call_id: toolCall.id,
                  output: data.answer,
                };
              } catch (error) {
                console.error('Failed to fetch from Tavily:', error);
                throw new Error('Failed to fetch from Tavily');
              }
            }
            if (toolCall.function.name === 'db_query') {
              console.log('fetching from db')
              try {
                const response = await fetch(process.env.API_ROUTE + '/api/users', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                })
                const data = await response.json();
                console.log(data.rows)
                return {
                  tool_call_id: toolCall.id,
                  output: JSON.stringify(data.rows),
                };
              } catch (error) {
                console.error('Failed to fetch from db:', error);
                throw new Error('Failed to fetch from db');
              }
            }

          }),
        );
        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(threadId, runResult.id, { tool_outputs })
        );
      }
    }
  );
}
