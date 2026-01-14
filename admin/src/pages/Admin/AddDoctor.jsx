import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!docImg) return toast.error("Please upload doctor image");

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="px-4 md:px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-4 text-xl font-semibold text-gray-700">Add Doctor</h1>

        <form
          onSubmit={onSubmitHandler}
          className="rounded-2xl border bg-white p-8 shadow-sm max-h-[80vh] overflow-y-auto"
        >
          {/* Image Upload */}
          <div className="flex items-center gap-4 mb-8">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload"
                className="w-20 h-20 rounded-full bg-gray-100 object-cover"
              />
            </label>
            <input
              id="doc-img"
              type="file"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
            <p className="text-sm text-gray-500">
              Upload doctor profile picture
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-gray-600">
            {/* Left */}
            <div className="space-y-4">
              <Input label="Doctor Name" value={name} setValue={setName} />
              <Input
                label="Doctor Email"
                value={email}
                setValue={setEmail}
                type="email"
              />
              <Input
                label="Password"
                value={password}
                setValue={setPassword}
                type="password"
              />

              <Select
                label="Experience"
                value={experience}
                setValue={setExperience}
                options={[
                  "1 Year",
                  "2 Year",
                  "3 Year",
                  "4 Year",
                  "5 Year",
                  "6 Year",
                  "8 Year",
                  "9 Year",
                  "10 Year",
                ]}
              />

              <Input
                label="Fees"
                value={fees}
                setValue={setFees}
                type="number"
              />
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Select
                label="Speciality"
                value={speciality}
                setValue={setSpeciality}
                options={[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ]}
              />

              <Input label="Degree" value={degree} setValue={setDegree} />

              <div>
                <label className="block mb-1">Address</label>
                <input
                  className="input"
                  placeholder="Address line 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
                <input
                  className="input mt-2"
                  placeholder="Address line 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <label className="block mb-2 text-sm">About Doctor</label>
            <textarea
              rows={5}
              className="w-full rounded-lg border px-4 py-2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write about doctor..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 rounded-full bg-primary px-10 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </main>
  );
};

/* ---------- Reusable Inputs ---------- */
const Input = ({ label, value, setValue, type = "text" }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="input"
      required
    />
  </div>
);

const Select = ({ label, value, setValue, options }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="input"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddDoctor;
