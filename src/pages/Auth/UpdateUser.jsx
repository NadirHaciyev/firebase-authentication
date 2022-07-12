import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { upload } from "../../firebase";

function UpdateUser() {
  const { update } = useAuth();
  const [file, setFile] = useState(null);

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      full_name: ""
    },
    onSubmit: async (values) => {
      const path = file.type.match(/\/[a-z]{2,4}/gi)[0].slice(1);
      const url = await upload(file, path);
      update(values.full_name, url);
    }
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change user information</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full_name" className="sr-only">
                Full Name
              </label>
              <input
                onChange={handleChange}
                id="full_name"
                name="full_name"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="profile_image" className="sr-only">
                Profile Image
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="profile_image"
                name="profile_image"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Profile Image"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
