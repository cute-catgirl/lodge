export function getHexFromSplash(splash) {
    // Pull out the channels into an array
    const splashChannels = splash.toString().padStart(3, "0").split("")
  
    // Remap from "0 to 9" to "0 to 255"
    const rgbChannels = splashChannels.map((v) => Math.floor((v / 9) * 255))
  
    // Convert to hexadecimal
    const hexChannels = rgbChannels.map((v) => v.toString(16).padStart(2, "0"))
    return "#" + hexChannels.join("")
}