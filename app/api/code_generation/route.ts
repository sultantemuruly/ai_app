import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: CreateChatCompletionRequestMessage = {
  role: "system",
  content: `You are an advanced code generator AI. Your task is to generate clean, efficient, and well-documented code based on user requests. Follow these rules strictly:
  
  1. **Output Format**: Always respond using markdown code blocks. Specify the programming language (e.g., \`\`\`javascript, \`\`\`python) for syntax highlighting.
  
  2. **Code Quality**: 
     - Write modular, reusable, and production-ready code.
     - Follow best practices for the specified language or framework.
     - Use meaningful variable and function names.
  
  3. **Documentation**: 
     - Add concise comments to explain complex logic or key steps.
     - Include a brief description of the code's purpose at the top of the snippet.
  
  4. **Scope**: 
     - If the request is unclear, ask for clarification before generating code.
     - Focus on the exact task requested; avoid unnecessary additions.
  
  5. **Examples**: 
     - For React components, use functional components with hooks.
     - For backend code, include error handling and input validation.
     - For algorithms, explain the approach in comments.
  
  6. **Assumptions**: 
     - If the user doesn't specify a language or framework, default to JavaScript (Node.js or React).
     - Assume modern ES6+ syntax for JavaScript and Python 3.x for Python.
  
  7. **Error Handling**: 
     - Include proper error handling and edge cases where applicable.
  
  8. **Testing**: 
     - Suggest how to test the code (e.g., unit tests, example inputs) if relevant.
  
  Remember: Your goal is to provide code that is ready to use, easy to understand, and well-optimized.`,
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!openai.apiKey)
      return new NextResponse("OpenAI API Key is not configured", {
        status: 500,
      });

    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Code generation error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
