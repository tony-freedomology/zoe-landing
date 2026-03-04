import potrace from 'potrace';
import fs from 'fs';

const imagePath = "/Users/tony/.gemini/antigravity/brain/a310448a-079d-42e5-9f64-9c62f638d779/media__1772654922914.png";

potrace.trace(imagePath, { color: '#3c2a21' }, function (err, svg) {
    if (err) throw err;
    fs.writeFileSync('./public/jesus-red/layer3_figure.svg', svg);
    console.log("Vectorized and saved layer3_figure.svg!");
});
