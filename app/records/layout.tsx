import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <Navbar />
        <main className="h-full pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
