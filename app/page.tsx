import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Lock, Moon, Zap, Code } from "lucide-react";

export default async function Home() {
  try {
    const { userId } = await auth();

    if (userId) {
      redirect("/dashboard");
    }
  } catch (error) {
    // Handle Clerk configuration issues gracefully
    console.log("Auth check skipped:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shorten Links,{" "}
              <span className="text-primary">Amplify Results</span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Create short, memorable links with custom codes. Manage all your
              links in one powerful dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>No credit card required • Free forever</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need to manage links
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with modern technologies for the best performance, security,
            and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custom Short Codes */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom Short Codes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Create memorable, branded links with custom short codes that
                reflect your brand or campaign.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Secure & Private */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Enterprise-grade security with Clerk authentication. Your data
                is safe and protected.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Link Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Link2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Link Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Organize, edit, and delete links easily. Manage all your
                shortened URLs from one dashboard.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Dark Mode */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Moon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dark Mode</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Full dark mode support that&apos;s easy on the eyes. Seamlessly
                switch between light and dark themes.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Lightning Fast */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Built with Next.js 16 and React 19 for blazing fast performance
                and optimal user experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to shorten your links?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Join thousands of users who trust our link shortener for their
                business and personal needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Link Shortener. Built with Next.js, React, and TypeScript.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
