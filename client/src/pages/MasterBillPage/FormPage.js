import { React, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  useUploadBillsMutation,
} from '../../services/billService';
import { toast } from 'react-toastify';
import { useGetAllDepartmentsQuery } from '../../services/departmentService';

function FormPage() {
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();
  const [formData, setFormData] = useState({
    month: '',
    year: '',
    department: '',
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 10 }, (_, i) => selectedYear - i);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [uploadBill] = useUploadBillsMutation();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const billsUploadRes = await uploadBill(selectedFile);

      if (billsUploadRes.data.message === 'Data inserted successfully') {
        toast.success('Bill uploaded successfully');
        fileInputRef.current.value = null;
        setSelectedFile(null);
      } else {
        toast.error('Bill upload failed');
      }
    } else {
      console.error('No file selected');
      // Handle case where no file is selected
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('month', formData.month);
    queryParams.set('year', formData.year);
    queryParams.set('department', formData.department);
    navigate(`/mobitel/master-bill-sheet?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="h-[75px]">
        <Navbar />
      </div>
      <div className=" flex justify-items-center">
        <div className="w-[300px]">
          <Sidebar />
        </div>
        <div className="flex-grow justify-center justify-items-center">
          <form
            class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20"
            onSubmit={handleSubmit}
          >
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Month
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={formData.month}
                    onChange={handleChange}
                    name="month"
                  >
                    <option value="">Select Month</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Year
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={formData.year}
                    onChange={handleChange}
                    name="year"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Department
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={formData.department}
                    onChange={handleChange}
                    name="department"
                  >
                    <option value="">Select Department</option>
                    {!departmentLoading &&
                      departmentData.map((departments) => (
                        <option key={departments.Id} value={departments.Name}>
                          {departments.Name}
                        </option>
                      ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Get the Bill Sheet
            </button>
          </form>

          <div className="mt-10"></div>
          <div class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20">
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Bill
                </label>
                <div class="relative">
                  <input
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleUpload}
              class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
            >
              Upload Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPage;
