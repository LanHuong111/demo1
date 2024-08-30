import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState()
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  console.log(inputs);
  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!inputs.email) {
      errorsSubmit.email = " Vui lòng nhập email";
      flag = false;
    } else if (!regex.test(inputs.email)) {
      toast.error("Vui lòng nhập đúng định dạng email");
      flag = false;
    } else {
      console.log("Đã nhập đúng email");
    }
    if (!inputs.password) {
      errorsSubmit.password = " Vui lòng nhập mật khẩu";
      flag = false;
    }
    if (!flag) {
      setErrors(errorsSubmit);
    }else{
      setErrors({})
    }
  }

  return (
    <>
      <section id="form">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 register">
              <div className="signup-form">
                <h2>Login to your account</h2>
                <form
                  action="#"
                  className="form-register"
                  onSubmit={handleSubmit}
                >
                  <input
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    onChange={handleChangeInput}
                  />
                  <p>&nbsp;</p>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChangeInput}
                  />
                  <p>&nbsp;</p>
                  <span>
                    <Link to="/register">
                      Do you have an account yet? Register ?
                    </Link>
                  </span>
                  <br />
                  <br />
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

export default Login;
