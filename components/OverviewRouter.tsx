"use client";

import { useEntityType } from "@/context/EntityTypeContext";
import NonprofitOverview from "./NonprofitOverview";

interface Props {
  children: React.ReactNode; // business overview (server-rendered)
}

export default function OverviewRouter({ children }: Props) {
  const { isNonprofit } = useEntityType();
  return isNonprofit ? <NonprofitOverview /> : <>{children}</>;
}
