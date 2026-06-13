import Image from "next/image";
import type { Testimonial } from "@/content/testimonials";

/**
 * Testimonials Component
 * 
 * Displays 2-3 testimonial cards with quotes, author information, and optional photos.
 * Used as a trust element on the homepage to showcase customer satisfaction.
 * 
 * Validates Requirements: 3.4, 10.4, 14.4
 */

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="w-full bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Client Success</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted partnerships built on excellence, reliability, and consistent quality
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col rounded-xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-md border border-slate-100 transition-all hover:shadow-lg hover:border-amber-200 duration-300"
            >
              <div className="flex-1">
                <svg
                  className="h-10 w-10 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <p className="mt-6 text-base leading-relaxed text-slate-700 font-medium">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-100">
                {testimonial.authorPhotoUrl ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-amber-200">
                    <Image
                      src={testimonial.authorPhotoUrl}
                      alt={`${testimonial.authorName} photo`}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-200">
                    <span className="text-lg font-bold text-amber-600">
                      {testimonial.authorName.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    {testimonial.authorName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.authorTitle}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.companyName}
                  </p>
                </div>

                {testimonial.companyLogoUrl && (
                  <div className="relative h-8 w-16 shrink-0">
                    <Image
                      src={testimonial.companyLogoUrl}
                      alt={`${testimonial.companyName} logo`}
                      width={64}
                      height={32}
                      className="object-contain grayscale"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
