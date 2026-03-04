"use client";

import DesktopStickySmsJesusRed from "./DesktopStickySmsJesusRed";
import MobileStickySmsJesusRed from "./MobileStickySmsJesusRed";

export default function StickySmsSectionJesusRed() {
    return (
        <div className="w-full relative">
            <div className="hidden md:block overflow-x-clip w-full">
                <DesktopStickySmsJesusRed />
            </div>
            <div className="block md:hidden overflow-x-clip w-full">
                <MobileStickySmsJesusRed />
            </div>
        </div>
    );
}
