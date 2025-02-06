'use client';

import { Bell, ChevronDown, Settings, User, LogOut, Search } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useGlobalSearch } from "@/hooks/use-global-search";
import { useDebounce } from "@/hooks/use-debounce";

const mockNotifications = [
  {
    id: 1,
    title: "New appointment request",
    message: "Dr. Smith has requested an appointment",
    time: "5 minutes ago"
  },
  {
    id: 2,
    title: "Vaccination reminder",
    message: "Max's vaccination is due next week",
    time: "1 hour ago"
  },
  {
    id: 3,
    title: "Medical record updated",
    message: "Your pet's medical record has been updated",
    time: "2 hours ago"
  }
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { results, isLoading } = useGlobalSearch(debouncedQuery);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearchClick = useCallback((href: string) => {
    console.log('Navigating to:', href);
    setSearchQuery("");
    setIsSearching(false);
    router.push(href);
  }, [router]);

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="relative max-w-md w-full lg:max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            placeholder="Search pets, records, or appointments..." 
            className="w-full pl-10 focus-visible:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isSearching) setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
          />
        </div>
        {isSearching && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsSearching(false)}
          />
        )}
        {isSearching && (
          <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
            <div className="max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-sm text-gray-500">
                  Searching...
                </div>
              ) : results.length === 0 && debouncedQuery ? (
                <div className="p-4 text-sm text-gray-500">
                  No results found
                </div>
              ) : (
                <div className="divide-y">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 hover:bg-gray-50"
                      onClick={() => handleSearchClick(result.href)}
                    >
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {result.title}
                        </p>
                        {result.date && (
                          <p className="text-xs text-gray-500 pl-2">
                            {result.date}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {result.subtitle}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
