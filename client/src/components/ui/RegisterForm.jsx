import { Button } from "./button"
import { Input } from "./input"

export const RegisterForm = () => {
  return (
    <form className="mt-5 mb-5">
      <Input label="Username" type="text" placeholder="Username" className="mb-3" />
      <Input label="Email" type="email" placeholder="Email" className="mb-3" />
      <Input label="Password" type="password" placeholder="Password" className="mb-3" />
      <Button type="submit" className="is-success w-full">Register</Button>
    </form>
  )
}
