import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  filter: "youtube" | "twitter";
  setFilter: (val: "youtube" | "twitter") => void;
}

export function Sidebar({ filter, setFilter }: SidebarProps) {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      {/* Logo + App Name */}
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        Brainly
      </div>

      {/* Navigation Items */}
      <div className="pt-8 pl-4">
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          onClick={() => setFilter("twitter")}
          active={filter === "twitter"}
        />
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          onClick={() => setFilter("youtube")}
          active={filter === "youtube"}
        />
      </div>
    </div>
  );
}
