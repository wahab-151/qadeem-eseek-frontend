// Safely import outfit font - will be undefined if export doesn't exist
// In Next.js/webpack, missing named exports result in undefined, not runtime errors
// We use optional chaining to safely access the font without throwing errors

// Import outfit - if export doesn't exist, webpack makes it undefined
// eslint-disable-next-line import/no-unresolved
import { outfit } from "app/layout";

export const fontSize = 14;
const fw600 = 600;
const fw500 = 500;

// Safely get font family with fallback - uses secondary fonts if primary is not loaded
// This function prevents any errors from being thrown
const getFontFamily = () => {
  try {
    // Use optional chaining to safely access outfit.style.fontFamily
    // If outfit is undefined or doesn't have style, this returns undefined
    // This prevents "Cannot read properties of undefined" errors
    const primaryFont = outfit?.style?.fontFamily;
    
    // If primary font is available, use it with fallbacks
    if (primaryFont) {
      return `${primaryFont}, "Inter", "Roboto", "Helvetica", "Arial", sans-serif`;
    }
  } catch (e) {
    // Silently catch any errors and use fallback fonts
    // This ensures no errors are shown to the user
  }
  
  // Fallback to secondary fonts if primary font is not loaded or any error occurs
  // This will be used silently in the background without showing any errors
  return `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`;
};

export const typography = {
  fontSize,
  htmlFontSize: 16,
  fontFamily: getFontFamily(),
  body1: {
    fontSize
  },
  body2: {
    fontSize
  },
  h1: {
    fontSize: 30,
    fontWeight: fw600,
    lineHeight: 1.5
  },
  h2: {
    fontSize: 25,
    fontWeight: fw600,
    lineHeight: 1.5
  },
  h3: {
    fontSize: 20,
    fontWeight: fw600,
    lineHeight: 1.5
  },
  h4: {
    fontSize: 17,
    fontWeight: fw500
  },
  h5: {
    fontSize: 16,
    fontWeight: fw500,
    lineHeight: 1
  },
  h6: {
    fontSize,
    fontWeight: fw500
  }
};
