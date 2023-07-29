import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    //we use prompt because we need one individual prompt
    const prompt = await Prompt.findById(params.id).populate('creator')

    if(!prompt){
        return new Response("Prompt not found", { status: 404 });
    } 

    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 500 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};


// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)

        
        return new Response(JSON.stringify({message: "Prompt deleted successfully"}), { status: 201 });
    }
    catch(error){
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}



