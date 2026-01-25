import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserLinks } from "@/data/links"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreateLinkDialog } from "@/components/CreateLinkDialog"

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/")
  }
  
  const userLinks = await getUserLinks(userId)
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your shortened links</p>
        </div>
        <CreateLinkDialog />
      </div>
      
      {userLinks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No links yet. Create your first shortened link to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userLinks.map((link) => (
            <Card key={link.id}>
              <CardHeader>
                <CardTitle className="text-lg break-all">
                  {link.shortCode}
                </CardTitle>
                <CardDescription className="break-all">
                  {link.url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Created {link.createdAt.toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm">
                      View Stats
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
