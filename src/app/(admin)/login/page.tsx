"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { signInAction } from "@/lib/actions/auth";
import { authSchema, type AuthValues } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthValues) {
    startTransition(async () => {
      const result = await signInAction(values);
      if (!result.success) {
        toast.error(result.error || "Could not sign in");
        return;
      }

      toast.success("Welcome back");
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <div className="light flex min-h-screen items-center justify-center bg-background px-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Portfolio Admin</CardTitle>
          <CardDescription>Sign in to manage projects, collections, and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <Button className="w-full" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
