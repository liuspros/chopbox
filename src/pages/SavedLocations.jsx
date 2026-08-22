import { useState, useEffect } from "react";
import Header from "../components/Header";

const pickupLocations = ["Ogbomosho", "Ilorin", "Lagos Mainland", "Lagos Island"];

// Stored on-device (localStorage), not in Firestore — this is a personal
// device preference, not data that needs to sync or be shared, so there's
// no need for a database round-trip or a security rule for it.
export default function SavedLocations() {
  const [defaultLocation, setDefaultLocation] = useState(
    () => localStorage.getItem("chopbox-default-location") || pickupLocations[0]
  );

  useEffect(() => {
    localStorage.setItem("chopbox-default-location", defaultLocation);
  }, [defaultLocation]);

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Saved Pickup Locations" showBack />
      <div className="px-5 pt-4">
        <p className="text-graphiteDim dark:text-creamDim text-sm mb-4">
          Pick your usual pickup spot — it'll be selected by default at checkout.
        </p>
        <div className="flex flex-col gap-2">
          {pickupLocations.map((loc) => (
            <button
              key={loc}
              onClick={() => setDefaultLocation(loc)}
              className={`card p-4 flex items-center justify-between text-left ${
                defaultLocation === loc ? "!border-rust border-2" : ""
              }`}
            >
              <span className="text-graphite dark:text-cream text-sm font-medium">{loc}</span>
              {defaultLocation === loc && (
                <span className="text-rust text-xs font-semibold">Default</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
