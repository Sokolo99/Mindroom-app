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
import { useRegister } from "../model/use-rgister";

const RegisterFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email обязателен" })
      .email("Введите корректный email или пароль"),
    password: z
      .string({ required_error: "Password обязателен" })
      .min(6, "Пароль должен содержать минимум 6 символов"),
    сonfirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.сonfirmPassword, {
    path: ["сonfirmPassword"],
    message: "Пароли не совпадают",
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { errorMassage, isPanding, register } = useRegister();
  const onSubmit = form.handleSubmit(register);
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
        <FormField
          control={form.control}
          name="сonfirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {errorMassage && (
          <p className="text-destructive text-sm">{errorMassage}</p>
        )}
        <Button disabled={isPanding} type="submit">Зарегистрироваться</Button>
      </form>
    </Form>
  );
}
