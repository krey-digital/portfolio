import Image from "next/image";
import type { Client } from "@/content/clients";

/**
 * ClientLogos Component
 * 
 * Displays a grid/horizontal scroll of client logos with grayscale hover effect.
 * Used as a trust element on the homepage to showcase client relationships.
 * 
 * Validates Requirements: 10.4, 14.4
 */

interface ClientLogosProps {
  clients: Client[];
}

export function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Our Partners</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Trusted By Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Serving premium quality chemicals to leading businesses across diverse industries
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className={`flex items-center justify-center animate-fade-in-scale delay-${Math.min(index + 1, 8)} group`}
              style={{
                animationFillMode: 'both',
              }}
            >
              <div className="relative h-20 w-32 grayscale transition-all duration-300 group-hover:grayscale-0 filter hover:drop-shadow-lg">
                <Image
                  src={client.logoUrl}
                  alt={`${client.name} logo`}
                  width={128}
                  height={80}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
