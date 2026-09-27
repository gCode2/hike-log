import { createContext } from "react";
import type { HikeLogContextType } from "../types/types";

export const HikeLogContext = createContext<HikeLogContextType | null>(null);

