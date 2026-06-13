"use client";

interface GhsPictogramInfo {
  code: string;
  label: string;
  description: string;
}

const GHS_PICTOGRAMS: Record<string, GhsPictogramInfo> = {
  GHS01: { code: "GHS01", label: "Explosive", description: "Explosive" },
  GHS02: { code: "GHS02", label: "Flammable", description: "Flammable Liquid/Gas" },
  GHS03: { code: "GHS03", label: "Oxidizing", description: "Oxidizing" },
  GHS04: { code: "GHS04", label: "Compressed Gas", description: "Compressed Gas" },
  GHS05: { code: "GHS05", label: "Corrosive", description: "Corrosive" },
  GHS06: { code: "GHS06", label: "Toxic", description: "Acute Toxicity" },
  GHS07: { code: "GHS07", label: "Health Hazard", description: "Health Hazard" },
  GHS08: { code: "GHS08", label: "Irritant", description: "Irritant/Harmful" },
  GHS09: { code: "GHS09", label: "Aquatic", description: "Environmental Hazard" },
};

interface GhsPictogramDisplayProps {
  pictograms: string[];
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showCode?: boolean;
}

export default function GhsPictogramDisplay({
  pictograms,
  size = "md",
  showLabel = true,
  showCode = true,
}: GhsPictogramDisplayProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (pictograms.length === 0) {
    return (
      <div className="text-slate-500 text-sm italic">
        No hazard pictograms selected
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {pictograms.map((code) => {
        const info = GHS_PICTOGRAMS[code];
        if (!info) return null;

        return (
          <div key={code} className="flex flex-col items-center gap-2">
            {/* SVG Icon */}
            <div className={`${sizeClasses[size]} bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center overflow-hidden`}>
              <img
                src={`/ghs/${code}.png`}
                alt={info.label}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Label and Code */}
            <div className="text-center">
              {showCode && (
                <p className={`font-semibold text-slate-900 ${textSizeClasses[size]}`}>
                  {code}
                </p>
              )}
              {showLabel && (
                <p className={`font-medium text-slate-700 ${textSizeClasses[size]}`}>
                  {info.label}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { GHS_PICTOGRAMS };
