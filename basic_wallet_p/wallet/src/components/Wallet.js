import React, { useState, useEffect } from "react";

function Wallet() {
    const [id, setId] = useState("");
    const [edit, setEdit] = useState(false)
    const [form, setForm] = useState({ id: "" });
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [setId]);

    const changeId = () => {
      setEdit(true)
    }
    const submitChange = (e) => {
        e.preventDefault();
        setId(form.id)
        localStorage.setItem("id", form.id);
        setEdit(false)
    }
    const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  return (
    <div className="Wallet">
      <div>
        <span>
          User Id:{" "}
          {edit ? (
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
            />
          ) : (
            <span>{id}</span>
          )}
        </span>
        {edit ? (
          <button style={{ margin: "0 10px" }} onClick={submitChange}>
            Save
          </button>
        ) : (
          <button style={{ margin: "0 10px" }} onClick={changeId}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Wallet;
