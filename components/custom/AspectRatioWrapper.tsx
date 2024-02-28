import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

export function AspectRatioWrapper({
  className,
  children,
}: {
  readonly className?: string;
  readonly children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <AspectRatio ratio={16 / 9} className={cn("bg-muted", className)}>
      {children}
    </AspectRatio>
  );
}
