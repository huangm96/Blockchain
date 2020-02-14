import React, { useState, useEffect } from "react";

function UserInfo() {
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [setId]);

  const changeId = () => {
    setEdit(true);
  };
  const submitChange = e => {
    e.preventDefault();
    if (id) {
      localStorage.setItem("id", id);
    } else {
      setId(localStorage.getItem("id"));
    }
    setEdit(false);
  };
  const handleChange = e => {
    setId(e.target.value);
  };
  return (
    <div className="UserInfo">
      <span style={{ margin: "0 10px" }}>User Id:</span>
      {edit ? (
        <input type="text" name="id" value={id} onChange={handleChange} />
      ) : (
        <span>{id}</span>
      )}

      {edit ? (
        <button
          type="submit"
          style={{ margin: "0 10px" }}
          onClick={submitChange}
        >
          Save
        </button>
      ) : (
        <button style={{ margin: "0 10px" }} onClick={changeId}>
          Edit
        </button>
      )}
    </div>
  );
}

export default UserInfo;
