import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import type React from "react";

function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  footerText: React.ReactNode;
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col pt-[200px] items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary [&_a]:ml-2">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export const Component = AuthLayout;
