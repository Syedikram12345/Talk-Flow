import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function EditChatPage({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit chat name</DialogTitle>
          {/* <DialogDescription>
            Make changes to the chat here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>

        <form className="space-y-4">
          {/* Inputs ..... later */}

          <h1>Comming soon!</h1>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditChatPage;
