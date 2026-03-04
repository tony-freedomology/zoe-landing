const API_KEY = "sk_live_C3FVHSeiXzywf5vEMvSs36";
const ENDPOINT = "https://api.quiver.ai/v1/svgs/vectorizations";
const imageUrl = "https://files.catbox.moe/wfcxol.png";

async function test(bodyParams) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyParams)
  });
  console.log(await response.json());
}

test({ model: "arrow-preview", image_url: { url: imageUrl } });
