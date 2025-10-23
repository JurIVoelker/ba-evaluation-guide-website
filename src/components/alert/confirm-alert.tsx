import { CircleCheckIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function ConfirmAlert({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="text-sm">
        <CircleCheckIcon
          className="me-3 -mt-0.5 inline-flex text-emerald-500"
          size={16}
          aria-hidden="true"
        />
        {children}
      </CardContent>
    </Card>
  );
}
