import React,{useState} from "react";

function Login(props) {
    const [form, setForm] = useState({ id: "" })
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.id) {
            localStorage.setItem("id", form.id)
            props.history.push("/main")
        } else {
            setError("Please enter id!")
        }
        
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

        <button
          type="submit"
          style={{ margin: "10px auto 0 auto", width: "100px" }}
        >
          Submit
        </button>
        {error ? (
          <span style={{ color: "red" }}>
            {error}
          </span>
        ) : null}
      </form>
    </div>
  );
}

export default Login;
