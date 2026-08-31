import type { NextConfig } from "next";

/**
 * Kein statischer Export mehr.
 *
 * Grund: Der KlickTipp-Eintrag braucht einen Server, damit der API-Schluessel
 * nicht im Browser landet und damit wir erfahren, ob der Eintrag geklappt hat.
 * Alle Seiten werden weiterhin beim Bauen vorgerendert, es kommt nur die
 * Route /api/eintrag dazu.
 *
 * trailingSlash bleibt, weil Google gerade genau diese URLs indexiert.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
