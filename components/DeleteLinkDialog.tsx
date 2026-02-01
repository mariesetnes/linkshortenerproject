"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteLinkAction } from "@/app/dashboard/actions"
import { Trash2, Loader2 } from "lucide-react"
import type { Link } from "@/db/schema"

interface DeleteLinkDialogProps {
  link: Link
}

export function DeleteLinkDialog({ link }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setIsLoading(true)
    setError(null)

    const result = await deleteLinkAction({ linkId: link.id })

    setIsLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      // Success - close dialog
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this link? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md bg-muted p-4 space-y-2">
            <div className="text-sm">
              <span className="font-medium">Short Code:</span>{" "}
              <span className="text-muted-foreground break-all">{link.shortCode}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">URL:</span>{" "}
              <span className="text-muted-foreground break-all">{link.url}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Deleting..." : "Delete Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
