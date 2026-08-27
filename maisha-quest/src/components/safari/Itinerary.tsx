import { CompassPoint } from "@/components/ui/Compass";
import { Photo } from "@/components/ui/Photo";
import type { ItineraryDay } from "@/types/content";

/**
 * Itinerario día a día.
 *
 * `<details>` nativo en lugar de un acordeón de JavaScript: se abre y cierra
 * sin hidratar nada, es navegable con teclado por definición, los lectores de
 * pantalla lo anuncian correctamente y el buscador indexa el contenido aunque
 * esté plegado. El primer día viene abierto para que se vea de qué va.
 */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) {
    return (
      <p className="border-l-2 border-gold/60 py-2 pl-5 text-[0.95rem] leading-relaxed text-ink-soft">
        The day-by-day itinerary for this journey is being finalised with our
        team in Arusha. Ask us for it and we will send the current version.
      </p>
    );
  }

  return (
    <ol className="flex flex-col divide-y divide-rule border-y border-rule">
      {days.map((day, index) => (
        <li key={day.day}>
          <details open={index === 0} className="group">
            <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
              <span className="tnum eyebrow w-14 shrink-0 pt-1 text-terracotta">
                Day {day.day}
              </span>
              <span className="flex-1">
                <span className="font-display block text-[1.35rem] leading-tight text-forest">
                  {day.title}
                </span>
                {day.route && (
                  <span className="mt-1.5 block text-[0.85rem] text-ink-faint">
                    {day.route}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-faint transition-transform duration-500 ease-out group-open:rotate-45"
              >
                <CompassPoint className="size-3" />
              </span>
            </summary>

            <div className="pb-8 pl-0 sm:pl-[4.75rem]">
              <ul className="flex flex-col gap-2">
                {day.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
                  >
                    <CompassPoint className="mt-2 size-2 shrink-0 text-gold" />
                    {activity}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-rule pt-5 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow text-ink-faint">Stay</dt>
                  <dd className="mt-1 text-[0.9rem] text-ink-soft">
                    {/* Los nombres de campamento se confirman con el viajero:
                        anunciar uno concreto implicaría un acuerdo que no
                        podemos afirmar. */}
                    {day.accommodationSlug ?? "Confirmed with your proposal"}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">Meals</dt>
                  <dd className="mt-1 text-[0.9rem] text-ink-soft">
                    {day.meals.length > 0 ? day.meals.join(", ") : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">Time</dt>
                  <dd className="mt-1 text-[0.9rem] text-ink-soft">
                    {day.estimatedDuration ?? "—"}
                  </dd>
                </div>
              </dl>

              {day.images && day.images.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {day.images.map((image) => (
                    <li key={image.src} className="relative aspect-3/2 overflow-hidden">
                      <Photo photo={image} sizes="(max-width: 640px) 100vw, 30vw" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
