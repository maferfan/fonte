import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { FaUserLarge, FaKey, FaBook, FaMessage } from "react-icons/fa6";
import { auth } from "../../service/auth.services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useState } from "react";

export const Register = () => {
    const { user, setToken} = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()
    const handleRegister = async () => {
        try {
           await auth.registerAuth({
                name: name,
                password: password,
                email: email
            })
            const resLogin = await auth.loginAuth({
              name: name,
              password: password
          })
            localStorage.setItem("token", resLogin.token)
            setToken(resLogin.token)
            nav("/")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user)
  return (
    <div className="relative p-5 h-80 w-80 flex flex-col justify-center gap-4 items-center my-72 mx-auto border border-white rounded-md">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full">
        <FaBook className="text-white text-7xl" />
      </div>
      <div className="w-full gap-2 flex items-center relative mt-5">
        <FaUserLarge className="absolute left-2 text-white " />
        <Input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          className=" bg-transparent pl-8 text-white"
        />
      </div>
      <div className="w-full gap-2 flex items-center relative">
        <FaMessage className="absolute left-2 text-white " />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className=" bg-transparent pl-8 text-white"
        />
      </div>
      <div className="w-full gap-2 flex items-center relative">
        <FaKey className="absolute left-2 text-white " />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className=" bg-transparent pl-8 text-white"
        />
      </div>
      {/* <div className="w-full flex items-center gap-3 justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <div className="text-white text-xs">
          <span>
            Forgot <i>password?</i>
          </span>
        </div>
      </div> */}
      <div className="w-full">
        <Button className="text-center w-full bg-white mt-4 rounded-sm" onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};
