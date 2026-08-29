import { Compass, FlaskConical, Flag, Layers, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DirectionIcon } from "@/data/connect";

/** The five "bearing" directions map to a lucide glyph each. */
export const connectIconMap: Record<DirectionIcon, LucideIcon> = {
  participation: Users,
  exposure: Compass,
  stem: FlaskConical,
  leadership: Flag,
  experiential: Layers,
};
