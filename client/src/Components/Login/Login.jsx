import Image from "./Image/Image";
import Input from "./Input/Input";

function Login() {
  return (
    <div className="grid lg:grid-cols-2 min-w-full h-screen">
      <Image />
      <Input />
    </div>
  );
}

export default Login;
