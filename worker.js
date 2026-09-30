export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI connection test
    if (url.pathname === "/api/ai-test") {
      try {
        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct-fast",
          {
            prompt: "Reply with exactly: Banao AI is connected!"
          }
        );

        return Response.json({
          ok: true,
          ai: result
        });

      } catch (error) {
        return Response.json(
          {
            ok: false,
            error: error.message
          },
          { status: 500 }
        );
      }
    }
// Video generation test
if (url.pathname === "/api/video-test") {
  try {
    const result = await env.AI.run(
      "pixverse/v6",
      {
        prompt: "A beautiful cinematic sunrise over green mountains, realistic, smooth camera movement",
        aspect_ratio: "16:9",
        duration: 5,
        quality: "360p",
        generate_audio: false
      }
    );

    return Response.json({
      ok: true,
      video: result?.video || result?.result?.video,
      result: result
    });

  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
    // Existing generate endpoint
    if (url.pathname === "/api/generate" && request.method === "POST") {
      try {
        const body = await request.json();

        const story = String(body.story || "").trim();
        const duration = Number(body.duration || 30);
        const language = String(body.language || "Hindi");

        if (!story) {
          return Response.json(
            { ok: false, error: "Story required" },
            { status: 400 }
          );
        }

        return Response.json({
          ok: true,
          message: "Story received successfully!",
          story,
          duration,
          language
        });

      } catch (error) {
        return Response.json(
          { ok: false, error: "Invalid request" },
          { status: 400 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
