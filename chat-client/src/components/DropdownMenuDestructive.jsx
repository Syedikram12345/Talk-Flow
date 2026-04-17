import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { MoreVertical } from "lucide-react";

export function DropdownMenuDestructive({ deleteChat }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
        >
          <MoreVertical style={{ width: "20px", height: "20px" }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-gray-100">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 focus:text-white cursor-pointer">
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 focus:text-white cursor-pointer">
            <ShareIcon className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 focus:text-red-400 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800 border border-gray-700 text-gray-100">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This will permanently delete this chat conversation and you
                  will no longer be friends.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-600 text-white"
                  onClick={deleteChat}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
