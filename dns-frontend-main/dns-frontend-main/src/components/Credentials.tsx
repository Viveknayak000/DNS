import { useState } from "react";
import { Button } from "./Button";
import { Heading, InputBox, SubHeading } from "./SubComponents";
import axios from "axios";
import { API } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function Credentails() {
  const [isSignUp, setSignUp] = useState(true)
  const navigate = useNavigate()


  return <div>
    {
      (isSignUp ? <SignUpModel setSignUp={setSignUp} useNavigate={navigate} /> : <SignInModel setSignUp={setSignUp} useNavigate={navigate} />)
    }
  </div>
}
function SignInModel(props: any) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return <div>

    <div className="relative w-auto my-6 border rounded bg-slate-200">
      {/*content*/}
      <div className="text-center p-4 h-max px-4 ">
        <Heading label={"SignIn"} />
        <SubHeading label={"Enter your credentials"} />
        <InputBox onChange={(e: any) => {
          setEmail(e.target.value)
        }} placeholder="ex : abc@example.com" label={"Email"} />


        <InputBox onChange={(e: any) => {
          setPassword(e.target.value)
        }} placeholder="ex : Passw0rd" label={"Password"} />


        <div className="pt-4 pb-2">
          <Button label={"SignIn"} onClick={async () => {
            if (email === "" || password === "") {
              alert("Please fill all the details")
              return
            }
            try {
              const response: any = await toast.promise(
                axios.post(API + "/user/signin", {
                  email: email,
                  password: password
                }),
                {
                  pending: "Loading... ⏳ ",
                  success: 'Signed Up Successfull! 🎉',
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/main")
            } catch (err: any) {
              const statusCode = err.response.status;
              if (statusCode === 403) toast.error("Wrong Body")
              else if (statusCode === 404) toast.error("User not found / Invalid Credentials")
              else toast.error("Server Error")
            }

          }} />
        </div>
        <div onClick={() => {
          props.setSignUp(true)
        }} className="text-sm flex justify-center cursor-pointer ">
          Don't have an Account?&nbsp;<b> SignUp</b>

        </div>

      </div>
    </div>
  </div>
}

function SignUpModel(props: any) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [awsKey, setAwsKey] = useState("")
  const [awsSecret, setAwsSecret] = useState("")
  const [awsRegion, setAwsRegion] = useState("")

  const navigate = useNavigate()


  return <div>

    <div className="relative w-auto my-6">
      {/*content*/}
      <div className="text-center p-4 h-max px-4 ">
        <Heading label={"Create Your Account"} />

        <SubHeading label={"Enter your information to create an account"} />

        <InputBox onChange={(e: any) => {
          setUsername(e.target.value)
        }} placeholder="ex : Jane_Doe" label={"Username"} />

        <InputBox onChange={(e: any) => {
          setEmail(e.target.value)
        }} placeholder="ex : JaneDoe@example.com" label={"Email"} />

        <InputBox onChange={(e: any) => {
          setPassword(e.target.value)
        }} placeholder="ex : passw0rd" label={"Password"} />

        <InputBox onChange={(e: any) => {
          setAwsKey(e.target.value)
        }} placeholder="ex : IOSFODNN7EXAMPLE " label={"AWS ACCESS KEY ID"} />

        <InputBox onChange={(e: any) => {
          setAwsSecret(e.target.value)
        }} placeholder="ex : lrXUtnFEMI/K7MDENbPEXAMPLEKEY " label={"AWS SECRET ACCESS KEY"} />

        <InputBox onChange={(e: any) => {
          setAwsRegion(e.target.value)
        }} placeholder="ex : us-east-2" label={"AWS Region"} />

        <div className="pt-4 pb-2">
          <Button label={"SignUp"} onClick={async () => {
            if (username === "" || password === "" || email === "" || awsKey === "" || awsSecret === "" || awsRegion === "") {
              alert("Please enter all the details");
              return;
            }
            try {
             
              const response: any = await toast.promise(
                axios.post(API + "/user/signup", {
                  username, password, email, awsKey, awsSecret, awsRegion
                }),
                {
                  pending: "Loading... ⏳",
                  success: 'Signed Up Successfull! 🎉',
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/main")
            } catch (err : any) {
              const statusCode = err.response.status;
              if (statusCode === 403) alert("Invalid AWS Credentials")
              else if (statusCode === 404) toast.error("Email already exists")
              else toast.error("Server Error")
            }

          }} />
        </div>

        <div onClick={() => {
          props.setSignUp(false)
        }} className="text-sm flex justify-center cursor-pointer ">
          Already have Account?&nbsp;<b>Login</b>
        </div>

      </div>
    </div>
  </div>
}
