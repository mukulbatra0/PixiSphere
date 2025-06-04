import { redirect } from "next/navigation";
import Image from "next/image";

export default function Home() {
  // Redirect to category page
  redirect("/category");

  // The code below will never execute because of the redirect
  // but we'll keep it commented for reference
  /*
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        // ... existing code ...
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        // ... existing code ...
      </footer>
    </div>
  );
  */
}

// Remove this second Home component or comment it out
/*
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      // ... existing code ...
    </div>
  );
}
*/
