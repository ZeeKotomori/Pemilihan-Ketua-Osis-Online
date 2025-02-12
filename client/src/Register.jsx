import { RegisterForm } from "./components/ui/RegisterForm"

export const Register = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="w-full sm:w-3/5 lg:w-2/5 sm:max-w-80 lg:max-w-72 px-12 sm:px-0">
        <div>
          <h1 className="text-3xl font-semibold text-center">Register</h1>
          <RegisterForm />
          <p className="text-sm text-center text-neutral-500">
            Sudah punya akun? Login
          </p>
        </div>
      </section>
    </main>
  )
}