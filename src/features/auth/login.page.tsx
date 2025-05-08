import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { Component as AuthLayout } from "@/features/auth/ui/auth-layout";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите свои учетные данные для входа в систему."
      footerText={
        <>
          Нет учетной записи?
          <Link to={ROUTES.REGISTER}>Зарегистрируйтесь</Link>
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;
