import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;

export function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-border bg-card p-6 shadow-2xl",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("space-y-2", className)} {...props} />
);

export const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("mt-6 flex justify-end gap-3", className)} {...props} />
);

export const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title className={cn("font-display text-2xl", className)} {...props} />
);

export const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

AlertDialogAction.displayName = "AlertDialogAction";
AlertDialogCancel.displayName = "AlertDialogCancel";

export const alertDialogActionClassName = buttonVariants({ variant: "destructive" });
export const alertDialogCancelClassName = buttonVariants({ variant: "outline" });
