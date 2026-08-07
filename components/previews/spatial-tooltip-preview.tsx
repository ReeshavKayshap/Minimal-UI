"use client";

import SpatialTooltip, {
  SpatialTooltipItem,
} from "@/components/core/Spatial-Tooltip";
import {
  IconMessageCircle,
  IconInbox,
  IconToggleLeft,
  IconScanEye,
  IconBrandTelegram,
  IconDotsVerticalFilled,
  IconCommand,
} from "@tabler/icons-react";

const items: SpatialTooltipItem[] = [
  {
    id: "comment",
    label: "Comment",
    icon: <IconMessageCircle className="size-5" />,
    keys: [{ char: "C" }],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: <IconInbox className="size-5" />,
    dot: true,
  },
  {
    id: "flags",
    label: "Feature Flags",
    icon: <IconToggleLeft className="size-5" />,
  },
  {
    id: "draft",
    label: "Draft Mode",
    icon: <IconScanEye className="size-5" />,
  },
  {
    id: "share",
    label: "Share",
    icon: <IconBrandTelegram className="size-5" />,
  },
  {
    id: "menu",
    label: "Menu",
    icon: <IconDotsVerticalFilled className="size-5" />,
    keys: [{ icon: <IconCommand className="size-3" /> }, { char: "K" }],
    dot: true,
  },
];

export default function SpatialTooltipPreview() {
  return (
    <div className="flex items-center justify-center w-full py-8">
      <SpatialTooltip items={items} />
    </div>
  );
}
