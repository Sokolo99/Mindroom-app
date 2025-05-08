import { Button } from "@/shared/ui/kit/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/use-login";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email обязателен" })
    .email("Введите корректный email или пароль"),
  password: z
    .string({ required_error: "Password обязателен" })
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const { errorMassage, isPanding, login } = useLogin();
  const onSubmit = form.handleSubmit(login);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {errorMassage && <p className="text-destructive text-sm">{errorMassage}</p>}
        <Button disabled={isPanding} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
