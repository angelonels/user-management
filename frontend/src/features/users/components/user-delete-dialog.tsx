import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Archive } from "lucide-react";
import type { UserListItem } from "../types/user.types";

type UserDeleteDialogProps = {
  user: UserListItem | null;
  isBusy: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function UserDeleteDialog({ user, isBusy, onClose, onConfirm }: UserDeleteDialogProps) {
  return (
    <AlertDialog open={Boolean(user)} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Archive aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Archive profile</AlertDialogTitle>
          <AlertDialogDescription>
            {user?.name ?? "This profile"} will move out of the active view.
            You can restore it later from archived profiles.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isBusy}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isBusy} variant="destructive" onClick={onConfirm}>
            {isBusy ? "Archiving..." : "Archive profile"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
