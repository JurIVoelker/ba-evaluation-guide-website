import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { SidebarProvider } from "./ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "./ui/sonner";

const font = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const Layout = ({
  children,
  hideSidebar = false,
  ...props
}: React.HTMLProps<HTMLDivElement> & { hideSidebar?: boolean }) => {
  return (
    <SidebarProvider className={cn(font.className)}>
      {!hideSidebar && <AppSidebar />}
      <Toaster />
      <div
        {...props}
        className={cn(
          props.className,
          "w-full min-h-screen p-8",
          !hideSidebar && "pl-[calc(var(--sidebar-width)+2rem)]"
        )}
      >
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
