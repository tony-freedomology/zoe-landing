import fs from 'fs';

const API_KEY = "sk_live_C3FVHSeiXzywf5vEMvSs36";
const ENDPOINT = "https://api.quiver.ai/v1/svgs/generations";

const prompts = [
    {
        name: "layer1_hills",
        prompt: "A minimalist, abstract landscape of rolling hills drawn in a loose, expressive black ink wash style. Hand-sketched, organic, single-line art with subtle watercolor-like ink bleeding at the edges. Very sparse detail, lots of negative space. Designed to sit at the bottom of a wide composition. Solid white background. High contrast, raw journal aesthetic. Vector line art, simple paths, solid black #000000."
    },
    {
        name: "layer2_cross",
        prompt: "A rugged, hand-drawn wooden cross standing on a small, sketched grassy hill. Rendered in bold, scratchy black ink strokes as if drawn quickly in a personal journal with a fountain pen. A few subtle drops of deep crimson red ink splattered near the base of the cross. Positioned on the right side of the frame. Minimalist, evocative, raw, transparent background. Vector line art, solid black #000000 and deep red #7a2332."
    },
    {
        name: "layer3_figure",
        prompt: "A minimalist silhouette of a person walking forward, drawn in loose, sketchy black ink lines. The style is abstract and expressive, like a quick study in an artist's sketchbook. No facial features, just the gesture of moving forward. A few stray ink drips. Positioned on the left side of the frame. Transparent background. Vector line art, solid black #000000."
    },
    {
        name: "layer4_splatters",
        prompt: "A collection of abstract, expressive ink splatters, drips, and brush strokes entirely in deep crimson red (#7a2332). Hand-drawn, chaotic but artistic, resembling both spilled fountain pen ink and visceral passion. Scattered organically across a wide transparent canvas. High contrast, vector style, no background. Vector line art, solid red #7a2332."
    }
];

async function generateSVGs() {
    for (const { name, prompt } of prompts) {
        console.log(`Generating ${name}...`);
        try {
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "arrow-preview",
                    prompt: prompt,
                    n: 1
                })
            });

            if (!response.ok) {
                console.error(`Failed to generate ${name}: ${response.status} ${response.statusText}`);
                const text = await response.text();
                console.error(text);
                continue;
            }

            const data = await response.json();
            const svgCode = data.data?.[0]?.svg || data.svg || data.data?.[0]?.text || data.text || data.data?.[0]?.content || data.content || (data.data && data.data[0] && JSON.stringify(data.data[0])) || null;

            if (svgCode) {
                fs.writeFileSync(`./public/jesus-red/${name}.svg`, svgCode);
                console.log(`Saved ${name}.svg`);
            } else {
                console.error(`No SVG content found for ${name} in response:`, data);
            }
        } catch (err) {
            console.error(`Error generating ${name}:`, err);
        }
    }
}

generateSVGs();
