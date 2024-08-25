"use client";

import { Book, Home, Mail, MoreHorizontal, User } from "lucide-react";
import SidebarButton from "./sidebarButton";
import SidebarDesktop from "./siderbarDesktop";

import { SidebarItems } from "@/app/types";
import { useState } from "react";
import HomeContent from "./HomeContent";
import CoursesContent from "./CoursesContent";
import MessagesContent from "./MessagesContent";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "", icon: Home },
    { label: "Courses", href: "", icon: Book },
    { label: "Messages", href: "", icon: Mail },
    // { label: "Profile", href: "", icon: User },
  ],
  extras: (
    <div>
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
    </div>
  ),
};

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Home");

  // Function to update the selected item
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  // Determine the content to display based on selected item
  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <HomeContent />;
      case "Courses":
        return <CoursesContent />;
      case "Messages":
        return <MessagesContent />;

      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarDesktop
        sidebarItems={sidebarItems}
        onSelectItem={handleSelectItem}
      />
      {/* Content Area */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};
