// app/providers.tsx
"use client";

import Nav from "@/components/Dashboardcomponent/Nav";
import Sidenav from "@/components/Dashboardcomponent/Sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  const pathname = usePathname();

  return (
    <HeroUIProvider>
      {!pathname.startsWith("/Signin") ? (
        <main className="grid grid-cols-1 md:grid-cols-[auto,1fr]    w-full">
          <div className="w-full h-full md:h-screen overflow-hidden">
            <Sidenav />
          </div>

          <section className="flex  flex-col  w-full  h-full md:h-screen p-0 ">
            <Nav />
            <ScrollArea className="w-full ">{children}</ScrollArea>
          </section>
        </main>
      ) : (
        <section className="flex  justify-center items-center  w-full  h-full md:h-screen p-0 ">
          <ScrollArea className="w-full ">{children}</ScrollArea>
        </section>
      )}
    </HeroUIProvider>
  );
}
