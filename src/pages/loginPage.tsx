const LoginPage = () => {
  return (
    <main className="container">
      <div className="login_container">
        <div className="login_title">
          <span>Login</span>
        </div>
        <div className="input_wrapper">
          <input type="text" id="user" className="input_field" required />
          <label htmlFor="user" className="lable">
            {" "}
            Username
          </label>
          <i className="fa-regular fa-user icon" />
        </div>
        <div className="input_wrapper">
          <input type="password" id="pass" className="input_field" required />
          <label htmlFor="pass" className="lable">
            {" "}
            Password
          </label>
          <i className="fa-solid fa-lock icon" />
        </div>
        <div className="input_wrapper">
          <input type="submit" className="input_submit" defaultValue="Login" />
        </div>
        <div className="signup">
          <span>
            Don't have an account <a href="#">Sign Up</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
