import fs from 'fs';

function convertSvgToReact(filePath, componentName) {
    let svgContent = fs.readFileSync(filePath, 'utf8');

    // Remove background rect
    svgContent = svgContent.replace(/<rect[^>]*fill="#FEFFFE"[^>]*\/>/gi, '');

    // Change all black shapes to brand slate color
    svgContent = svgContent.replace(/fill="black"/gi, 'fill="#3c2a21"');

    // React camelCase fixes
    svgContent = svgContent.replace(/fill-opacity/gi, 'fillOpacity');

    // Replace <path with <motion.path
    // We will animate the stroke to draw it, then fade in the fill
    svgContent = svgContent.replace(/<path([^>]+?)fill="(#[0-9a-fA-F]+)"([^>]*)>/gi, (match, p1, color, p2) => {
        return `<motion.path${p1}fill="${color}"${p2} 
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ 
                pathLength: { duration: 2.5, ease: "easeInOut" },
                fillOpacity: { duration: 1, delay: 2 }
            }}
            stroke="${color}"
            strokeWidth="1"
        />`;
    });

    // Deal with any paths that already had fillOpacity
    svgContent = svgContent.replace(/<motion\.path([^>]+?)fillOpacity="([0-9.]+)"([^>]*)initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: 1 }}/gi, (match, p1, opacity, p2) => {
        return `<motion.path${p1}initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: ${opacity} }}${p2}`;
    });

    // Replace the opening <svg> tag to accept className
    svgContent = svgContent.replace(/<svg[^>]*>/i, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" fill="none" className={className}>`);

    const reactCode = `
"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ${componentName}({ className }: { className?: string }) {
    return (
        ${svgContent.trim()}
    );
}
`;

    fs.writeFileSync(`./components/${componentName}.tsx`, reactCode);
    console.log(`Created ${componentName}.tsx`);
}

convertSvgToReact('./public/jesus-red/layer_left_combo.svg', 'LeftHeroSvg');
convertSvgToReact('./public/jesus-red/layer_right_combo.svg', 'RightHeroSvg');
