"use client";

import { Props } from "./page";

export default function Content({ params }: Props) {
  return <>{params.id}</>;
}
