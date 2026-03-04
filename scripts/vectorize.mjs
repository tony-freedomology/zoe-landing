import fs from 'fs';

const API_KEY = "sk_live_C3FVHSeiXzywf5vEMvSs36";
const ENDPOINT = "https://api.quiver.ai/v1/svgs/vectorizations";
const imageUrl = "https://files.catbox.moe/wfcxol.png";

async function vectorize() {
    console.log("Vectorizing image from URL...");
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "arrow-preview",
            image: imageUrl
        })
    });

    const data = await response.json();
    const svgCode = data.svg || data.data?.[0]?.svg || data.text || data.content || null;
    if (svgCode) {
        const coloredSvg = svgCode.replace(/#000000/g, '#3c2a21').replace(/black/g, '#3c2a21');
        fs.writeFileSync('./public/jesus-red/layer3_figure.svg', coloredSvg);
        console.log("Saved layer3_figure.svg");
    } else {
        console.log("Failed to extract SVG:", data);
    }
}

vectorize();
