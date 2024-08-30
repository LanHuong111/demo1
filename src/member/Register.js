import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: 0,
  });
  const [files, setFiles] = useState(""); // thông tin hình ảnh
  const [avatar, setAvatar] = useState(""); // mã hóa hình ảnh để gửi đi api
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };
  const handleChangeInputFile = (event) => {
    const file = event.target.files[0];
    // console.log(file)

    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFiles(file);
    };
    reader.readAsDataURL(file);
  };
  console.log(avatar)
  function handleSubmit(event) {
    event.preventDefault();

    let errorsSubmit = {};
    let flag = true;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(!inputs.name){
		errorsSubmit.name  =" Vui lòng nhập tên của bạn";
    toast.info("haha")
    toast.info("Display a dark notification of type info");
    toast.info("Display a light notification of type info", { theme: "light" });
    toast.info("Display a blue notification of type info 3", { theme: "colored" });
    flag = false;
	}
	if(!inputs.email){
		errorsSubmit.email  =" Vui lòng nhập email của bạn";
    flag = false;
	}else if(!regex.test(inputs.email)){
  toast.warning("Vui lòng nhập đúng định dạng email")
  flag = false;
  }
	if(!inputs.password){
		errorsSubmit.password  =" Vui lòng nhập mật khẩu của bạn";
    flag = false;
	}
	if(!inputs.phone){
		errorsSubmit.phone  =" Vui lòng nhập số điện thoại của bạn";
    flag = false;
	}
	if(!inputs.address){
		errorsSubmit.address  =" Vui lòng nhập mật khẩu của bạn";
    flag = false;
	}
	if(!files){
		errorsSubmit.avatar  =" Vui lòng chọn hình ảnh của bạn";
    flag = false;
	}else{
    const size = files.size
    const type = files.type
    if(!type.includes("image")){
      toast.warning("Vui lòng chọn hình ảnh")
      flag = false;
    }else if(size > 1024 * 1024){
      toast.warning("File tải lên quá lớn")
      flag = false;
    }else{
      inputs.avatar = avatar
    }
  }


  if(!flag){
    toast.error("Vui lòng nhập đầy đủ thông tin")
    setErrors(errorsSubmit)
  }else{
    setErrors({})

    api
    .post("/register", inputs)
    .then((res) =>{
      console.log(res)
      if(res.data.message){
        toast.success("Đăng ký tài khoản thành công")
        navigate("/login")
      }
    })
    .catch((error) =>{
      console.log(error)
    })
  }
  }

  console.log(inputs);
  console.log(files)
  // console.log(avatar)
  // console.log(errors)
  return (
    <>
      <section id="form">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 register">
              <div className="signup-form">
                <h2>New User Signup!</h2>
                <form
                  action="#"
                  className="form-register"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChangeInputs}
                  />
                  <p className="error">&nbsp; {errors.name}</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChangeInputs}
                  />
                  <p className="error">&nbsp; {errors.email}</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeInputs}
                  />
                  <p className="error">&nbsp;{errors.password}</p>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChangeInputs}
                  />
                  <p className="error">&nbsp;{errors.phone}</p>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChangeInputs}
                  />
                  <p className="error">&nbsp;{errors.address}</p>
                  <input
                    type="file"
                    name="avatar"
                    placeholder="Avatar"
                    onChange={handleChangeInputFile}
                  />
                  <p className="error">&nbsp;{errors.avatar}</p>
                  <button type="submit" className="btn btn-default">
                    Signup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
