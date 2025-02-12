export type XYColor = [number, number];

/**
 * Converts RGB values to CIE 1931 XY color space for Philips Hue.
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns An array with [x, y] coordinates
 */
export function rgbToXY(r: number, g: number, b: number): XYColor {
    // Normalize RGB values to the range 0-1
    let red = r / 255;
    let green = g / 255;
    let blue = b / 255;

    // Apply gamma correction
    red = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
    green = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
    blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;

    // Convert to XYZ color space
    const X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    const Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    const Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

    // Calculate x and y coordinates
    const x = X / (X + Y + Z);
    const y = Y / (X + Y + Z);

    return [x || 0, y || 0]; // Return [0, 0] if division by zero occurs
}

// Example usage
const rgb: [number, number, number] = [255, 100, 50]; // Example RGB value
const xy: XYColor = rgbToXY(rgb[0], rgb[1], rgb[2]);
console.log(`Converted XY values: ${xy}`);
