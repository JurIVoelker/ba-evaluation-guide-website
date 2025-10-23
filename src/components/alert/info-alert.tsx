import { InfoIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function InfoAlert({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="text-sm">
        <InfoIcon
          className="me-3 -mt-0.5 inline-flex text-blue-500"
          size={16}
          aria-hidden="true"
        />
        {children}
      </CardContent>
    </Card>
  );
}
