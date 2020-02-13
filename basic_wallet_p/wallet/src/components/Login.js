import React,{useState} from "react";

function Login(props) {
    const [form, setForm]=useState({id:""})
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("id", form.id)
        props.history.push("/main")
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
        
    }
  return (
    <div className="Login">
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label style={{ margin: "0 10px" }}>Please use your Id to Login:</label>
              <input
                  style={{ margin: "10px auto", width: "200px" }}
                  type="text"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
              />
        <button type="submit" style={{ margin: "10px auto", width: "100px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
