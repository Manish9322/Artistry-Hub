"use client";

import { useEffect, useState } from "react";

export function Copyright() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="container text-center text-sm text-primary-foreground/60">
      &copy; {year} Artistry Hub. All Rights Reserved.
    </div>
  );
}
