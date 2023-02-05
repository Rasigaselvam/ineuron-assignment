import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks";
import { EditUsers, fetchUsers } from "./userSlice";

const EditUser = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const users = useSelector((store: any) => store.users.users);
    const existingUser = users.filter((user: any) => user._id === params.id);
    const { firstName, lastName, phoneNumber, age, _id} = existingUser[0];

  const [formValues, setFormValues] = useState({firstName, lastName, phoneNumber, age, _id});
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({firstName: "", lastName: "", phoneNumber: "", age: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            dispatch(EditUsers(formValues));
            dispatch(fetchUsers())
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
    <h1 className="text-center font-bold text-2xl text-gray-700">EDIT USER</h1>
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          required
          id="firstName"
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
          required
          id="lastName"
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
          required
          name="phoneNumber"
          id="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        />
        {formErrors.phoneNumber && (
          <span className="error">{formErrors.phoneNumber}</span>
        )}
      </div>
      <div className="form-row mb-6">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          required
          name="age"
          id="age"
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
      UPDATE
      </button>
  
    </div>  
    </form>
  </div>
  )
}

export default EditUser