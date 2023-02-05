import { Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks";
import userSlice, { addUsers } from "./userSlice";


const AddUser = () => {
    const intialValues = { firstName: "", lastName: "", phoneNumber: "", age: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({firstName: "", lastName: "", phoneNumber: "", age: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
    const submitForm = () => {
        console.log(formValues);
      };
    
     const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormErrors({firstName: "", lastName: "", phoneNumber: "", age: ""});
        setIsSubmitting(false)
        setFormValues({ ...formValues, [name]: value });
      };
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let isVaild = validate(formValues)
        setFormErrors(isVaild);
        setIsSubmitting(true);
        if(Object.keys(isVaild).length === 0){
        dispatch(addUsers(formValues));
        navigate('/');
        }
      };
    
    const validate = (values: any): any => {
        let errors: any = {};
        if(values.firstName == ""){
          errors.firstName = "Enter First Name";
        }
        if(values.lastName == ""){
          errors.lastName = "Enter Last Name";
        }
        if(values.phoneNumber == ""){
          errors.phoneNumber = "Enter Phone Number";
        }
        if(values.age == ""){
          errors.age = "Enter Age";
        }
        return errors;
      };
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          submitForm();
        }
      }, [formErrors]);

  return (
    <div className="container">
    <h1 className="text-center font-bold text-2xl text-gray-700">ADD USER</h1>
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          value={formValues.firstName}
          onChange={handleChange}
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        />
        {formErrors.firstName && (
          <span className="error">{formErrors.firstName}</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          value={formValues.lastName}
          onChange={handleChange}
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        />
        {formErrors.lastName && (
          <span className="error">{formErrors.lastName}</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          required
          id="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        />
        {formErrors.phoneNumber && (
          <span className="error">{formErrors.phoneNumber}</span>
        )}
      </div>
      <div className="form-row mb-6" >
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          required
          value={formValues.age}
          onChange={handleChange}
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        />
        {formErrors.age && (
          <span className="error">{formErrors.age}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
      <button  type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
       Add
      </button>
  
    </div>    
    </form>
  
  </div>
  )
}

export default AddUser