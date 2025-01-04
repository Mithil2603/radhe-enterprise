import React from "react";
import "./styles/About.css";

export default function About() {
  return (
    <>
      <div className="container-fluid p-3 custom-bg-about">
        <section className="d-flex justify-content-center align-items-center gap-3 text-center px-2 mb-5">
          <div className="left-section mobile">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/QLEMu1WJRLuHtSmM5bMscQ"
              alt="first-img"
              className="rounded"
            />
            {/* <img src="https://res.cloudinary.com/drpcouvle/image/upload/v1733929143/Radhe_Enterprise_Company_Image_istqjp.jpg" alt="first-img" className='rounded'/> */}
          </div>
          <div className="right-section">
            <h1 className="mb-2 bold">Our Establishment Journey</h1>
            <br />
            <h3>
              Radhe Enterprise has a rich history of producing high-quality
              creels and providing customized machinery modification solutions
              to meet the unique needs of our clients. Situated in Vatva, GIDC,
              Ahmedabad, our focus is on enhancing the performance and
              efficiency of our customers' machinery through personalized
              product support.
            </h3>
          </div>
        </section>
        <hr />
        <section className="mobile d-flex justify-content-center align-items-center gap-2 text-center">
          <div className="right-section">
            <h1 className="mb-2 bold">Our Vision</h1>
            <br />
            <h3>
              At Radhe Enterprise, our mission is to manage client interactions
              more efficiently, monitor machinery performance, and ensure timely
              product support delivery. We aim to provide a platform where we
              can customize our services to meet individual client requirements,
              ensuring optimal machinery performance and maximizing client
              satisfaction. This will lead to improved operational efficiency
              and enhanced client service management across the organization.
            </h3>
          </div>
          <div className="left-section">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/c46Hnxh1RuO2lew4885dfw"
              alt="first-img"
              className="rounded"
            />
          </div>
        </section>
        <hr />
        <section className="mobile d-flex justify-content-center align-items-center gap-3 text-center">
          <div className="left-section">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/dT9nXwZJQ5K1LRMAroOKvw"
              alt="first-img"
              className="rounded"
            />
          </div>
          <div className="right-section">
            <h1 className="mb-2 bold">Our Values</h1>
            <br />
            <h3>
              At Radhe Enterprise, we are committed to quality, reliability, and
              flexibility in machinery manufacturing. We prioritize operational
              efficiency and offer tailored solutions that cater to various
              industries.
            </h3>
          </div>
        </section>
      </div>
    </>
  );
}
