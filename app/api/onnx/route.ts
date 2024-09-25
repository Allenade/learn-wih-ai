// /app/api/onnx/route.ts (App directory style)
import { NextResponse } from 'next/server';
import { InferenceSession, Tensor } from 'onnxruntime-node';

// Define the shape of the expected request body
interface RequestBody {
  userMessage: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const { userMessage }: RequestBody = await request.json();

    // Ensure that userMessage is provided
    if (!userMessage) {
      return NextResponse.json({ error: 'No user message provided' }, { status: 400 });
    }

    // Load the ONNX model (ensure the path is correct)
    const session = await InferenceSession.create('./path/to/model.onnx');

    // Process the input message into a tensor
    const inputTensor = processInput(userMessage);

    // Run inference
    const output = await session.run({ input: inputTensor });

    // Process the output and generate the response
    const aiResponse = processOutput(output);

    // Return the AI response in JSON format
    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('Error processing ONNX model:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper function to process input
function processInput(message: string): Tensor {
  // Convert the message into a tensor format expected by the model.
  // Example conversion (this is highly dependent on your specific model).
  // This assumes the model expects a numerical vector or an encoded version of the text message.

  const encodedMessage = new TextEncoder().encode(message);
  return new Tensor('float32', Float32Array.from(encodedMessage), [1, encodedMessage.length]);
}

// Helper function to process the model's output
function processOutput(output: Record<string, any>): string {
  // Adjust this based on your model's output format.
  // The following assumes the output is a tensor and extracts the necessary data.
  
  // Assuming 'someOutputKey' is the name of the output node in the model
  const outputTensor = output.someOutputKey;

  if (!outputTensor || !outputTensor.data) {
    throw new Error('Invalid output from the model');
  }

  // Example: Convert output tensor to a human-readable string (adjust to match your model's output)
  return outputTensor.data.toString();
}
