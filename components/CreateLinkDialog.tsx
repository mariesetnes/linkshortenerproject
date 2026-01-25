"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createLinkAction } from "@/app/dashboard/actions"
import { Plus, Loader2 } from "lucide-react"

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    url?: string[]
    shortCode?: string[]
  }>({})
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)

    // Create typed object (NOT FormData type)
    const input = {
      url: formData.get("url") as string,
      shortCode: formData.get("shortCode") as string,
    }

    const result = await createLinkAction(input)

    setIsLoading(false)

    if (result.error) {
      if (result.details?.fieldErrors) {
        setFieldErrors(result.details.fieldErrors)
      } else {
        setError(result.error)
      }
    } else {
      // Success - close dialog and reset form
      setOpen(false)
      formRef.current?.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Shortened Link</DialogTitle>
          <DialogDescription>
            Enter a URL and choose a custom short code for your link.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Original URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              required
              disabled={isLoading}
            />
            {fieldErrors.url && (
              <p className="text-sm text-destructive">{fieldErrors.url[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortCode">Short Code</Label>
            <Input
              id="shortCode"
              name="shortCode"
              type="text"
              placeholder="my-link"
              required
              disabled={isLoading}
              pattern="[a-zA-Z0-9_-]+"
              title="Only letters, numbers, hyphens, and underscores allowed"
            />
            <p className="text-xs text-muted-foreground">
              3-20 characters: letters, numbers, hyphens, and underscores only
            </p>
            {fieldErrors.shortCode && (
              <p className="text-sm text-destructive">
                {fieldErrors.shortCode[0]}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating..." : "Create Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
