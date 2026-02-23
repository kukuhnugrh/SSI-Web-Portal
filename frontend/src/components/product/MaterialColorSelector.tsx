import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  colorPalettes,
  productCustomizationConfig,
  getProductMaterialType,
} from "@/data/colorPalettes";
import { Check, ChevronDown, ChevronUp, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export const MaterialColorSelector = ({ product, selectedColors, onColorChange }) => {
  const [expandedPart, setExpandedPart] = useState(null);
  const [activeTab, setActiveTab] = useState("visual");

  // Get the customization config based on product material
  const materialType = getProductMaterialType(product.material);
  const config = productCustomizationConfig[materialType] || productCustomizationConfig.mesh;

  const toggleExpand = (partId) => {
    setExpandedPart(expandedPart === partId ? null : partId);
  };

  const handleColorSelect = (partId, color) => {
    onColorChange(partId, color);
  };

  const getSelectedColorInfo = (partId, paletteKey) => {
    const palette = colorPalettes[paletteKey];
    const selectedCode = selectedColors[partId];
    if (selectedCode && palette) {
      return palette.options.find((c) => c.code === selectedCode) || palette.options[0];
    }
    return palette?.options[0];
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Customize Your Chair</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Select colors for each part of your {product.name}
          </p>
        </div>

        {/* Tabs for Visual/List view */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-3 border-b border-border">
            <TabsList className="bg-muted/50 h-9">
              <TabsTrigger value="visual" className="text-xs">Visual Selector</TabsTrigger>
              <TabsTrigger value="list" className="text-xs">Color Codes</TabsTrigger>
            </TabsList>
          </div>

          {/* Visual Selector View */}
          <TabsContent value="visual" className="m-0">
            <div className="divide-y divide-border">
              {config.parts.map((part) => {
                const palette = colorPalettes[part.palette];
                const selectedInfo = getSelectedColorInfo(part.id, part.palette);
                const isExpanded = expandedPart === part.id;

                return (
                  <div key={part.id}>
                    {/* Part Header */}
                    <button
                      onClick={() => toggleExpand(part.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border-2 border-border shadow-sm"
                          style={{ backgroundColor: selectedInfo?.hex || "#ccc" }}
                        />
                        <div className="text-left">
                          <div className="text-sm font-medium text-foreground">{part.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {selectedInfo?.name} ({selectedInfo?.code})
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    {/* Color Options */}
                    {isExpanded && palette && (
                      <div className="px-4 pb-4 bg-muted/20">
                        <div className="text-xs text-muted-foreground mb-3">{palette.series}</div>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                          {palette.options.map((color) => (
                            <button
                              key={color.code}
                              onClick={() => handleColorSelect(part.id, color.code)}
                              className={cn(
                                "group relative aspect-square rounded-lg border-2 transition-all hover:scale-110 hover:z-10",
                                selectedColors[part.id] === color.code
                                  ? "border-accent ring-2 ring-accent ring-offset-2"
                                  : "border-border hover:border-foreground"
                              )}
                              style={{ backgroundColor: color.hex }}
                              title={`${color.name} (${color.code})`}
                            >
                              {selectedColors[part.id] === color.code && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Check
                                    className={cn(
                                      "w-4 h-4",
                                      isLightColor(color.hex) ? "text-foreground" : "text-white"
                                    )}
                                  />
                                </div>
                              )}
                              {/* Tooltip on hover */}
                              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {color.code}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* List/Code View */}
          <TabsContent value="list" className="m-0">
            <ScrollArea className="h-[400px]">
              <div className="p-4 space-y-6">
                {config.parts.map((part) => {
                  const palette = colorPalettes[part.palette];
                  if (!palette) return null;

                  return (
                    <div key={part.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-foreground text-sm">{part.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {palette.series}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {palette.options.map((color) => (
                          <button
                            key={color.code}
                            onClick={() => handleColorSelect(part.id, color.code)}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg border transition-all text-left",
                              selectedColors[part.id] === color.code
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-foreground hover:bg-secondary/50"
                            )}
                          >
                            <div
                              className="w-6 h-6 rounded border border-border flex-shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-foreground truncate">
                                {color.name}
                              </div>
                              <div className="text-xs text-muted-foreground">{color.code}</div>
                            </div>
                            {selectedColors[part.id] === color.code && (
                              <Check className="w-4 h-4 text-accent ml-auto flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Summary */}
        <div className="p-4 bg-secondary/30 border-t border-border">
          <div className="text-xs font-medium text-muted-foreground mb-2">Your Configuration:</div>
          <div className="flex flex-wrap gap-2">
            {config.parts.map((part) => {
              const selectedInfo = getSelectedColorInfo(part.id, part.palette);
              return (
                <div
                  key={part.id}
                  className="flex items-center gap-1.5 bg-background rounded-full px-2 py-1 border border-border"
                >
                  <div
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: selectedInfo?.hex || "#ccc" }}
                  />
                  <span className="text-xs text-foreground">{part.name}:</span>
                  <span className="text-xs text-muted-foreground">{selectedInfo?.code}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper to determine if a color is light or dark
function isLightColor(hex) {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128;
}

export default MaterialColorSelector;
