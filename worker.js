export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
          story: story,
          duration: duration,
          language: language
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
