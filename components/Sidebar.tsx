"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  PawPrint,
  Stethoscope,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-indigo-500"
  },
  {
    label: "Pets",
    icon: PawPrint,
    href: "/pets",
    color: "text-indigo-500"
  },
  {
    label: "Medical Services",
    icon: Stethoscope,
    href: "/medical-services",
    color: "text-indigo-500"
  },
  {
    label: "Calendar Month",
    icon: Calendar,
    href: "/calendar",
    color: "text-indigo-500"
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
    color: "text-indigo-500"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-indigo-500"
  },
];

const bottomRoutes = [
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "/help",
    color: "text-gray-500"
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-gray-600">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <PawPrint className="h-8 w-8 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold text-indigo-500">
            PetCare
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-indigo-500 hover:bg-indigo-100/50 rounded-lg transition",
                pathname === route.href ? "text-indigo-500 bg-indigo-100/50" : "text-gray-600"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t">
        {bottomRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition",
              pathname === route.href ? "text-gray-600 bg-gray-100/50" : "text-gray-500"
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-gray-500" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};
