import { cn } from "@/lib/utils";

interface Props {
  text: string;
  variant: "destructive" | "primary" | "pending" | "default";
  icon: any;
}

export function Banner({ text, variant, icon }: Props) {
  const Icon = icon;

  return (
    <div
      className={cn(
        "dark rounded-lg p-5",
        variant === "destructive" && "bg-destructive/10 text-destructive",
        variant === "primary" && "bg-primary/5 text-primary",
        variant === "pending" && "bg-yellow-500/10 text-yellow-500",
        variant === "default" && "bg-secondary text-black"
      )}
    >
      <div className="flex grow gap-3 md:items-center">
        <Icon className="size-7" />
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}
