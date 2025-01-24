const fetchAIResponse = async (message: string) => {
  try {
    const response = await fetch("/api/ai-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};

export default fetchAIResponse
