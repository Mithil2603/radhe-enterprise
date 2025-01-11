import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='container-fluid text-center d-flex flex-column gap-3 align-items-center justify-content-center w-100 vh-100' style={{backgroundImage: "url('https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg')", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <h1 className='fw-bolder text-danger'>Unauthorized</h1>
      <p className='text-danger'>You do not have permission to view this page.</p>
      <Link to="/" className='btn bg-danger text-light'>Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
