// Color palette data for chair customization
// Based on professional furniture manufacturer standards

export const meshColors = {
  series: "OA 2000 Mesh Series",
  options: [
    { code: "OA-2001", name: "Light Grey", hex: "#BFBFBF" },
    { code: "OA-2016", name: "Charcoal", hex: "#4A4A4A" },
    { code: "OA-2004", name: "Burnt Orange", hex: "#CC5500" },
    { code: "OA-2007", name: "Tangerine", hex: "#FF6B35" },
    { code: "OA-2010", name: "Crimson", hex: "#B22222" },
    { code: "OA-2002", name: "Taupe", hex: "#A89F91" },
    { code: "OA-2006", name: "Lime", hex: "#9ACD32" },
    { code: "OA-2003", name: "Olive", hex: "#808000" },
    { code: "OA-2011", name: "Cyan", hex: "#00B4D8" },
    { code: "OA-2011A", name: "Ocean Blue", hex: "#0077B6" },
    { code: "OA-2015", name: "Teal", hex: "#008080" },
    { code: "OA-2005", name: "Sage", hex: "#87AE73" },
    { code: "OA-2008", name: "Steel Blue", hex: "#4682B4" },
    { code: "OA-2018", name: "Navy", hex: "#1B3A57" },
    { code: "OA-2023", name: "Graphite", hex: "#383838" },
    { code: "OA-2014", name: "Midnight", hex: "#191970" },
    { code: "OA-2016A", name: "Dark Teal", hex: "#006666" },
    { code: "OA-2020", name: "Slate", hex: "#708090" },
    { code: "OA-2009", name: "Onyx", hex: "#353839" },
    { code: "OA-2000", name: "Black", hex: "#1C1C1C" },
  ],
};

export const seatFabricColors = {
  series: "OS Seat Fabric Series",
  options: [
    { code: "OS-01", name: "Noir", hex: "#1C1C1C" },
    { code: "OS-300", name: "Charcoal Weave", hex: "#36454F" },
    { code: "OS-02", name: "Slate Grey", hex: "#708090" },
    { code: "OS-03", name: "Mist", hex: "#B4B4B4" },
    { code: "OS-04", name: "Cream", hex: "#F5F5DC" },
    { code: "OS-05", name: "Burgundy", hex: "#722F37" },
    { code: "OS-06", name: "Navy", hex: "#1B3A57" },
    { code: "OS-07", name: "Forest", hex: "#228B22" },
    { code: "OS-08", name: "Tan", hex: "#D2B48C" },
    { code: "OS-09", name: "Terracotta", hex: "#E2725B" },
    { code: "OS-10", name: "Ocean", hex: "#006994" },
    { code: "OS-11", name: "Plum", hex: "#8E4585" },
  ],
};

export const leatherColors = {
  series: "Premium Leather Collection",
  options: [
    { code: "LT-001", name: "Black", hex: "#1C1C1C" },
    { code: "LT-002", name: "Dark Brown", hex: "#3D2914" },
    { code: "LT-003", name: "Cognac", hex: "#9A463D" },
    { code: "LT-004", name: "Tan", hex: "#C19A6B" },
    { code: "LT-005", name: "Ivory", hex: "#FFFFF0" },
    { code: "LT-006", name: "Burgundy", hex: "#722F37" },
    { code: "LT-007", name: "Navy", hex: "#1B3A57" },
    { code: "LT-008", name: "Grey", hex: "#808080" },
    { code: "LT-009", name: "Camel", hex: "#C19A6B" },
    { code: "LT-010", name: "Espresso", hex: "#3C1414" },
  ],
};

export const frameColors = {
  series: "Frame Finish Options",
  options: [
    { code: "FR-01", name: "Polished Aluminum", hex: "#D4D4D4", type: "metallic" },
    { code: "FR-02", name: "Satin Aluminum", hex: "#A9A9A9", type: "metallic" },
    { code: "FR-03", name: "Graphite", hex: "#383838", type: "matte" },
    { code: "FR-04", name: "Black", hex: "#1C1C1C", type: "matte" },
    { code: "FR-05", name: "White", hex: "#F5F5F5", type: "matte" },
    { code: "FR-06", name: "Chrome", hex: "#C0C0C0", type: "metallic" },
    { code: "FR-07", name: "Bronze", hex: "#8B4513", type: "metallic" },
    { code: "FR-08", name: "Titanium", hex: "#878681", type: "metallic" },
  ],
};

export const armrestColors = {
  series: "Armrest Options",
  options: [
    { code: "AR-01", name: "Black Polymer", hex: "#1C1C1C" },
    { code: "AR-02", name: "Graphite Polymer", hex: "#383838" },
    { code: "AR-03", name: "Black Leather Pad", hex: "#1C1C1C", padded: true },
    { code: "AR-04", name: "Brown Leather Pad", hex: "#3D2914", padded: true },
    { code: "AR-05", name: "White Polymer", hex: "#F5F5F5" },
  ],
};

export const baseColors = {
  series: "Base Options",
  options: [
    { code: "BS-01", name: "Polished Aluminum", hex: "#D4D4D4", type: "5-star" },
    { code: "BS-02", name: "Graphite", hex: "#383838", type: "5-star" },
    { code: "BS-03", name: "Black", hex: "#1C1C1C", type: "5-star" },
    { code: "BS-04", name: "Chrome", hex: "#C0C0C0", type: "5-star" },
    { code: "BS-05", name: "Black Nylon", hex: "#1C1C1C", type: "5-star" },
  ],
};

// Define which parts are customizable per product type
export const productCustomizationConfig = {
  mesh: {
    parts: [
      { id: "backrestMesh", name: "Backrest Mesh", palette: "meshColors" },
      { id: "seatFabric", name: "Seat Fabric", palette: "seatFabricColors" },
      { id: "frame", name: "Frame", palette: "frameColors" },
      { id: "armrest", name: "Armrests", palette: "armrestColors" },
      { id: "base", name: "Base", palette: "baseColors" },
    ],
  },
  leather: {
    parts: [
      { id: "leather", name: "Leather Upholstery", palette: "leatherColors" },
      { id: "frame", name: "Frame", palette: "frameColors" },
      { id: "armrest", name: "Armrests", palette: "armrestColors" },
      { id: "base", name: "Base", palette: "baseColors" },
    ],
  },
  fabric: {
    parts: [
      { id: "fabric", name: "Fabric Upholstery", palette: "seatFabricColors" },
      { id: "frame", name: "Frame", palette: "frameColors" },
      { id: "armrest", name: "Armrests", palette: "armrestColors" },
      { id: "base", name: "Base", palette: "baseColors" },
    ],
  },
  gaming: {
    parts: [
      { id: "backrestMesh", name: "Back Support", palette: "meshColors" },
      { id: "seatFabric", name: "Seat Cushion", palette: "seatFabricColors" },
      { id: "frame", name: "Frame", palette: "frameColors" },
      { id: "armrest", name: "4D Armrests", palette: "armrestColors" },
      { id: "base", name: "Base", palette: "baseColors" },
    ],
  },
};

// Get all palettes
export const colorPalettes = {
  meshColors,
  seatFabricColors,
  leatherColors,
  frameColors,
  armrestColors,
  baseColors,
};

// Get product material type
export const getProductMaterialType = (material) => {
  const materialLower = material.toLowerCase();
  if (materialLower.includes("leather") || materialLower.includes("mcl")) {
    return "leather";
  }
  if (materialLower.includes("fabric") || materialLower.includes("sync") || materialLower.includes("knit")) {
    return "fabric";
  }
  if (materialLower.includes("gaming")) {
    return "gaming";
  }
  return "mesh"; // Default to mesh
};
