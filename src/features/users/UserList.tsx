
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { deleteUser, fetchUsers } from "./userSlice";
import { useNavigate } from "react-router-dom"
import '../../index.css';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button
  } from "@material-tailwind/react";

const UserList = (): any => {
    const user = useSelector((state: any) => state.users)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleRemoveUser = (id: any):any => {
        dispatch(deleteUser({ id }));
      }

    const renderCard = () => user.users.map((val: any) => (
    //     <Card  >
    //         <span>
    //   <CardHeader color="blue" className="h-56">
    //      USER
    //   </CardHeader>
    //   <span>
    //   <CardBody className="text-center">
    //     <Typography variant="h5" className="mb-2">
    //       {val.firstName + " " + val.lastName}
    //     </Typography>
    //     <Typography>
    //     {val.phoneNumber}
    //     </Typography>
    //     <Link to={`edit-user/${val._id}`}>
    //     <Button className ="button">Edit User</Button>
    //     </Link>
    //     <Button className ="button" onClick={() => handleRemoveUser(val._id)}>Delete User</Button>
    //   </CardBody>
    //   </span>
    //   </span>
    // </Card>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Name : {val.firstName + " " + val.lastName}</div>
    <p className="text-gray-700 text-base">
    Phone : {val.phoneNumber}
        </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span> 
      
      <Link to={`edit-user/${val._id}`}>
      <button  className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      Edit User
      </button>
     </Link>
    </span>
    <span> 
      
      <button onClick={() => handleRemoveUser(val._id)}  className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      Delete User
      </button>
    </span>
    
  </div>
</div>
    ))
    return (
        <div>
             <h1 className="text-center font-bold text-2xl text-gray-700">DASHBOARD</h1>
            <Link to="/add-user"><Button className="button rounded px-3 py-1">Add User</Button></Link>
            <div className="grid md:grid-cols-3" >
                {user.users.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">No User</p>}
            </div>
        </div>
    )

}

export default UserList;