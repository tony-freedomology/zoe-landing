import fs from "fs";

const API_KEY = "sk_live_C3FVHSeiXzywf5vEMvSs36";
const ENDPOINT = "https://api.quiver.ai/v1/svgs/generations";

const prompts = [
    {
        name: "layer_left_combo",
        prompt: "A minimalist, continuous black ink-brush drawing of a rugged hill rising from the bottom right to the left edge. On top of the hill walks a sketchy, abstract figure in profile facing right. Hand-drawn, loose, expressive journal-style art with abstract ink splatters and drips. White background, black ink only.",
    },
    {
        name: "layer_right_combo",
        prompt: "A minimalist, continuous black ink-brush drawing of a rugged hill rising from the bottom left to the right edge. On top of the hill stands a rugged wooden cross. Hand-drawn, loose, expressive journal-style art with abstract ink splatters and drips. White background, black ink only.",
    }
];

async function generateSVGs() {
    if (!fs.existsSync("./public/jesus-red")) {
        fs.mkdirSync("./public/jesus-red", { recursive: true });
    }

    for (const item of prompts) {
        console.log(`Generating ${item.name}...`);
        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "arrow-preview",
                    prompt: item.prompt,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error(`Failed to generate ${item.name}: ${res.statusText}`, text);
                continue;
            }

            const data = await res.json();
            // Extracted the SVG string
            const svgCode = data.svg || data.data?.[0]?.svg || data.text || data.content;

            if (svgCode) {
                // Instantly recolor black strokes to our dark slate color before saving
                const recoloredSvg = svgCode.replace(/#000000/g, '#3c2a21').replace(/black/g, '#3c2a21');
                fs.writeFileSync(`./public/jesus-red/${item.name}.svg`, recoloredSvg);
                console.log(`Saved ${item.name}.svg`);
            } else {
                console.error(`No SVG found in response for ${item.name}`, data);
            }
        } catch (err) {
            console.error(`Error generating ${item.name}:`, err);
        }
    }
}

generateSVGs();
