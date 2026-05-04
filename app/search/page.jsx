import { Suspense } from "react";
import SearchPageClient from "../components/SearchPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}