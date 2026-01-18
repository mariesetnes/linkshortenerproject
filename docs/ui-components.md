# UI Component Guidelines

## Overview

This project uses **shadcn/ui** exclusively for all UI components. The components are styled with Tailwind CSS and follow the "New York" style variant.

## Core Principles

1. **Use shadcn/ui Components Only**: Do NOT create custom UI components from scratch
2. **Extend, Don't Replace**: Compose shadcn/ui components to create new features
3. **Consistent Styling**: Use Tailwind CSS utilities with shadcn/ui's design tokens
4. **Accessibility First**: Leverage shadcn/ui's built-in accessibility features

## Available shadcn/ui Components

All shadcn/ui components are installed in the `@/components/ui` directory. Common components include:

- **Layout**: `Card`, `Separator`, `Skeleton`
- **Forms**: `Button`, `Input`, `Label`, `Form`, `Select`, `Checkbox`, `RadioGroup`, `Textarea`
- **Feedback**: `Alert`, `Toast`, `Dialog`, `AlertDialog`, `Sheet`
- **Display**: `Badge`, `Avatar`, `Table`, `Tabs`, `Accordion`
- **Navigation**: `DropdownMenu`, `NavigationMenu`, `Menubar`
- **Overlay**: `Dialog`, `Popover`, `Tooltip`, `HoverCard`

## Adding New shadcn/ui Components

When you need a component that isn't installed yet:

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add dropdown-menu
```

This will:
- Install the component in `components/ui/`
- Include all necessary dependencies
- Configure it with the project's style (New York variant)

## Usage Patterns

### Basic Import

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

### Composing Components

```typescript
// ✅ CORRECT: Compose shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LinkCard({ title, url }: { title: string; url: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{url}</p>
        <Button>Copy</Button>
      </CardContent>
    </Card>
  )
}
```

```typescript
// ❌ WRONG: Creating custom UI primitives
export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {children}
    </div>
  )
}
```

### Styling with Tailwind

Use the `cn()` utility to add custom classes to shadcn/ui components:

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

<Button className={cn("w-full", isLoading && "opacity-50")}>
  Submit
</Button>
```

### Variants

shadcn/ui components come with built-in variants:

```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

## Form Components

Always use shadcn/ui form components with proper validation:

```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="url">URL</Label>
  <Input 
    id="url" 
    type="url" 
    placeholder="https://example.com"
  />
  <Button type="submit">Shorten</Button>
</div>
```

## Modal Dialogs

Use `Dialog` for modals:

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

## Loading States

Use shadcn/ui components for loading states:

```typescript
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Skeleton loading
<Skeleton className="h-12 w-full" />

// Button loading
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Submit
</Button>
```

## Icons

Use Lucide React icons (included with shadcn/ui):

```typescript
import { Copy, Check, Link2, Trash2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

<Button>
  <Copy className="mr-2 h-4 w-4" />
  Copy Link
</Button>
```

## Dark Mode Support

All shadcn/ui components support dark mode out of the box using CSS variables. No additional configuration needed.

## Common Patterns

### Card with Actions

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Copy, Trash2 } from "lucide-react"

<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>Link Title</CardTitle>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Alert Messages

```typescript
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to create short link. Please try again.
  </AlertDescription>
</Alert>
```

## What NOT to Do

❌ **Don't create custom button components**
```typescript
// Wrong
const CustomButton = ({ children }) => (
  <button className="px-4 py-2 rounded bg-blue-500">{children}</button>
)
```

✅ **Use shadcn/ui Button**
```typescript
// Correct
import { Button } from "@/components/ui/button"
<Button>{children}</Button>
```

❌ **Don't create custom input components**
```typescript
// Wrong
const CustomInput = (props) => (
  <input className="border rounded px-3 py-2" {...props} />
)
```

✅ **Use shadcn/ui Input**
```typescript
// Correct
import { Input } from "@/components/ui/input"
<Input {...props} />
```

❌ **Don't create custom card wrappers**
```typescript
// Wrong
const CustomCard = ({ children }) => (
  <div className="rounded-lg border p-4">{children}</div>
)
```

✅ **Use shadcn/ui Card**
```typescript
// Correct
import { Card, CardContent } from "@/components/ui/card"
<Card><CardContent>{children}</CardContent></Card>
```

## Configuration

The project is configured with shadcn/ui's New York style in `components.json`:

```json
{
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Resources

- **shadcn/ui Documentation**: https://ui.shadcn.com
- **Component Examples**: https://ui.shadcn.com/examples
- **Lucide Icons**: https://lucide.dev
- **Tailwind CSS**: https://tailwindcss.com

---

**Key Takeaway**: Always use shadcn/ui components. Never create custom UI primitives. Compose and style existing components to meet your needs.

**Last Updated**: January 18, 2026
