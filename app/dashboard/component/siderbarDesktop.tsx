import React from "react";
import SidebarButton from "./sidebarButton";
import { SidebarItems } from "@/app/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import SignOutButton from "@/app/(auth)/component/signOutButton";

// Define the updated interface here
interface SidebarDesktopProps {
  onSelectItem(label: string): void;
  sidebarItems: SidebarItems;
  selectedItem: string; // Added selectedItem here
}

const SidebarDesktop = (props: SidebarDesktopProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">AI</h3>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {props.sidebarItems.links.map((link, index) =>
              link.icon ? (
                <Link key={index} href={link.href}>
                  <SidebarButton
                    variant={pathname === link.href ? "link" : "ghost"}
                    icon={link.icon}
                    className="w-full"
                    onClick={() => props.onSelectItem(link.label)}
                  >
                    {link.label}
                  </SidebarButton>
                </Link>
              ) : null
            )}
            {props.sidebarItems.extras}
          </div>
          <div className="absolute left-0 bottom-3 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="https://i.pinimg.com/originals/c3/85/1e/c3851e43527296515fdbb913bb33a6f4.jpg" />
                      <AvatarFallback>move</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                      move
                    </span>
                  </div>
                  <MoreHorizontal size={20} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
                <div className="space-y-1">
                  <SignOutButton />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
