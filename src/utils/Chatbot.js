import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "this-is-dummy-key",
  baseURL: "", // Your baseUrl api llm enpoind
  dangerouslyAllowBrowser: true
});

async function streamLLMcall(message) {
  try {
    const stream = await client.beta.chat.completions.stream({
      messages: [{ role: 'user', content: message }],
      model: 'my-dummy-model',
      stream: true
    });

    let responseText = '';
    for await (const chunk of stream) {
      responseText += chunk.choices?.[0]?.delta?.content || '';
    }
    return responseText;
  } catch (error) {
    console.error(error);
    return 'Erreur lors de la génération de la réponse';
  }
}



/**
 * Makes an asynchronous call to the LLM (Large Language Model) and returns the response.
 * 
 * @param {string} message The message to be sent to the LLM.
 * @returns {Promise<string>} A promise that resolves to the LLM's response.
 */
export async function LLMcall(message) {
  try {
    // Using a descriptive variable name improves readability
    const chatCompletionResponse = await client.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'my-dummy-model',
    });

    // Using destructuring improves readability and makes the code more concise
    const { content } = chatCompletionResponse.choices[0].message;
    return content;
  } catch (error) {
    // Using template literals makes the error message more readable
    console.error(`Error generating response: ${error.message}`);
    return 'Erreur lors de la génération de la réponse';
  }
}

export const generateBotResponse = async (message, role) => {
  const responseText = await streamLLMcall(message);
  return { role: role, text: responseText };
};
