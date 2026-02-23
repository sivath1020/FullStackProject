


// import { useEffect, useState } from "react";
// import "./Profile.css";

// export default function Profile() {
//   const [isEdit, setIsEdit] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     dob: "",
//     phoneNumber: "",
//     email: "",
//   });

//   // Load profile on mount
//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     if (!email) return;

//     fetch(`http://localhost:8080/api/auth/profile?email=${email}`)
//       .then(res => res.json())
//       .then(data => setProfile(data))
//       .catch(err => console.error("Profile fetch error:", err));
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // Save profile
//   const handleSave = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/auth/profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(profile),
//       });

//       // Backend returns a simple string message
//       const message = await res.text(); 

//       alert(message); // show backend message

//       if (message.includes("successfully")) {
//         setIsEdit(false); // exit edit mode
//       }

//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Update failed ❌");
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>My Profile</h2>

//       <div className="profile-field">
//         <label>Name</label>
//         {isEdit ? (
//           <input name="name" value={profile.name} onChange={handleChange} />
//         ) : (
//           <p>{profile.name}</p>
//         )}
//       </div>

//       <div className="profile-field">
//         <label>Email</label>
//         <p>{profile.email}</p>
//       </div>

//       <div className="profile-field">
//         <label>Phone</label>
//         {isEdit ? (
//           <input
//             name="phoneNumber"
//             maxLength="10"
//             value={profile.phoneNumber}
//             onChange={(e) =>
//               setProfile({
//                 ...profile,
//                 phoneNumber: e.target.value.replace(/[^0-9]/g, ""),
//               })
//             }
//           />
//         ) : (
//           <p>{profile.phoneNumber}</p>
//         )}
//       </div>

//       <div className="profile-field">
//         <label>DOB</label>
//         {isEdit ? (
//           <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
//         ) : (
//           <p>{profile.dob}</p>
//         )}
//       </div>

//       {isEdit ? (
//         <>
//           <button onClick={handleSave}>Save</button>
//           <br /><br />
//           <button onClick={() => setIsEdit(false)}>Cancel</button>
//         </>
//       ) : (
//         <button onClick={() => setIsEdit(true)}>Edit</button>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  // Load profile
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    fetch(`http://localhost:8080/api/auth/profile?email=${email}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const message = await res.text();
      alert(message);
      if (message.includes("successfully")) setIsEdit(false);
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  // ✅ DELETE PROFILE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/auth/profile?email=${profile.email}`, {
        method: "DELETE",
      });
      const message = await res.text();
      alert(message);

      if (message.includes("deleted")) {
        localStorage.removeItem("userEmail");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed ");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-field">
        <label>Name</label>
        {isEdit ? (
          <input name="name" value={profile.name} onChange={handleChange} />
        ) : (
          <p>{profile.name}</p>
        )}
      </div>

      <div className="profile-field">
        <label>Email</label>
        <p>{profile.email}</p>
      </div>

      <div className="profile-field">
        <label>Phone</label>
        {isEdit ? (
          <input
            name="phoneNumber"
            maxLength="10"
            value={profile.phoneNumber}
            onChange={(e) =>
              setProfile({
                ...profile,
                phoneNumber: e.target.value.replace(/[^0-9]/g, ""),
              })
            }
          />
        ) : (
          <p>{profile.phoneNumber}</p>
        )}
      </div>

      <div className="profile-field">
        <label>DOB</label>
        {isEdit ? (
          <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
        ) : (
          <p>{profile.dob}</p>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleSave}>Save</button>
          <br /><br />
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <br /><br />
          <button onClick={handleDelete} className="del">
            Delete Account
          </button>
        </>
      )}
    </div>
  );
}
