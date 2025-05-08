
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { Component as AuthLayout } from "@/features/auth/ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите свои учетные данные для входа в систему."
      footerText={
        <>
          У вас уже есть учетная запись?
          <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
      form={<RegisterForm />}
    />
  );
}

export const Component = RegisterPage;
