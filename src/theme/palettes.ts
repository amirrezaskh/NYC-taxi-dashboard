/**
 * Color Palettes for Data Visualizations
 * Shared across all components in the NYC Trips Dashboard
 */

export const colorPalettes = {
  // Sequential palettes (for heatmaps, gradients)
  sequential: {
    goldToRed: ['#FFD700', '#FF8C00', '#FF4500', '#FF0000'],
    blueToRed: ['#0000FF', '#4169E1', '#FF4500', '#FF0000'],
    lightToRed: ['#FFE6E6', '#FF9999', '#FF4D4D', '#FF0000'],
    greenToRed: ['#90EE90', '#FFFF00', '#FFA500', '#FF0000'],
    purpleToYellow: ['#8A2BE2', '#9932CC', '#FFD700', '#FFFF00'],
    oceanDepth: ['#E0F6FF', '#87CEEB', '#4682B4', '#191970'],
    moneyGreen: ['#90EE90', '#32CD32', '#228B22', '#006400'],
    sunset: ['#FFE4B5', '#FFA500', '#FF6347', '#DC143C'],
  },

  // Diverging palettes (for comparing positive/negative values)
  diverging: {
    redBlue: ['#B2182B', '#F4A582', '#F7F7F7', '#92C5DE', '#2166AC'],
    orangePurple: ['#E66101', '#FDB863', '#F7F7F7', '#B2ABD2', '#5E3C99'],
    brownTeal: ['#8C510A', '#DFC27D', '#F6E8C3', '#C7EAE5', '#01665E'],
    pinkGreen: ['#C51B7D', '#F1B6DA', '#F7F7F7', '#B8E186', '#4D9221'],
  },

  // Categorical palettes (for different categories/groups)
  categorical: {
    material: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'],
    pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D4BAFF', '#FFBAFF'],
    vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'],
    borough: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'], // For NYC boroughs
    contrast: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'],
  },

  // Financial/Business palettes
  financial: {
    revenue: ['#E8F5E8', '#A5D6A7', '#66BB6A', '#2E7D32'], // Light to dark green
    profit: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1976D2'], // Light to dark blue
    risk: ['#FFF3E0', '#FFB74D', '#FF9800', '#E65100'], // Light to dark orange
    performance: ['#F3E5F5', '#CE93D8', '#AB47BC', '#7B1FA2'], // Light to dark purple
  },

  // NYC specific palettes
  nyc: {
    boroughs: {
      manhattan: '#FF6B6B',
      brooklyn: '#4ECDC4', 
      queens: '#45B7D1',
      bronx: '#96CEB4',
      statenIsland: '#FECA57'
    },
    taxi: ['#FFD700', '#FF8C00', '#FF4500', '#FF0000'], // Gold to red for taxi data
    subway: ['#0039A6', '#FF6319', '#6CBE45', '#996633'], // MTA colors
  }
};

// Helper functions for working with palettes
export const paletteHelpers = {
  /**
   * Get a color from a palette by percentage (0-1)
   */
  getColorByPercent: (palette: string[], percent: number): string => {
    const index = Math.floor(percent * (palette.length - 1));
    return palette[Math.min(index, palette.length - 1)];
  },

  /**
   * Interpolate between two colors
   */
  interpolateColors: (color1: string, color2: string, factor: number): string => {
    // Simple hex color interpolation
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  },

  /**
   * Generate palette preview for documentation/debugging
   */
  generatePalettePreview: (palette: string[]): string => {
    return palette.map(color => `<div style="background: ${color}; width: 50px; height: 20px; display: inline-block;"></div>`).join('');
  }
};

// Type definitions for TypeScript
export type PaletteCategory = keyof typeof colorPalettes;
export type SequentialPalette = keyof typeof colorPalettes.sequential;
export type DivergingPalette = keyof typeof colorPalettes.diverging;
export type CategoricalPalette = keyof typeof colorPalettes.categorical;
export type FinancialPalette = keyof typeof colorPalettes.financial;