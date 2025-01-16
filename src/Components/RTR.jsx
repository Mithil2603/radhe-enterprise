import React, { useEffect, useState } from "react";
import "./styles/RTR.css";
import { Link, useParams } from "react-router-dom";

export default function RTR() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    comment: "",
    rating: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(
          `http://localhost:8080/products/${productId}`
        );
        const feedbackResponse = await fetch(
          `http://localhost:8080/products/${productId}/feedback`
        );

        if (!productResponse.ok || !feedbackResponse.ok) {
          throw new Error("Failed to fetch product or feedback data.");
        }

        const productData = await productResponse.json();
        const feedbackData = await feedbackResponse.json();

        setProduct(productData);
        setFeedbacks(feedbackData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
          credentials: "include", // Include cookies for authentication
        }
      );

      if (response.status === 401) {
        throw new Error("You are not authenticated");
      }

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const feedback = await response.json();
      setFeedbacks((prev) => [feedback, ...prev]);
      setNewFeedback({ comment: "", rating: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid pt-5 pb-5 custom-bg-RTR">
      <div className="container-fluid">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={product.product_img[0]}
                className="d-block rtr-img"
                alt={product.product_name}
              />
            </div>
            <div className="carousel-item">
              <img
                src={product.product_img[1]}
                className="d-block w-100 rtr-img"
                alt={product.product_name}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="black"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="black"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="container">
        <h1 className="text-center mt-5">{product.product_name}</h1>
        <h3 className="Description">Description</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creel Types</td>
              <td>{product.product_description[0]}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td>{product.product_description[1]}</td>
            </tr>
            <tr>
              <td>Pitch</td>
              <td>{product.product_description[2]}</td>
            </tr>
            <tr>
              <td>Creel Tensioner</td>
              <td>{product.product_description[3]}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons d-flex justify-content-center align-items-center gap-4 px-5 mt-5 w-100">
          <Link
            to="#"
            className="btn btn-light custom-btn w-50 d-flex justify-content-center align-items-center gap-2"
            onClick={() => {
              const ownerNumber = "917041177240";
              const message = encodeURIComponent(
                "Hello, I am interested in your product. Could you please provide more details?"
              );
              const whatsappURL = `https://wa.me/${ownerNumber}?text=${message}`;
              window.open(whatsappURL, "_blank");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-whatsapp"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            Enquire Now
          </Link>
          <Link
            to="/placeorder"
            className="btn btn-light custom-btn w-50"
            state={{
              product: { productId },
              name: product.product_name,
            }}
          >
            Place Order
          </Link>
        </div>
      </div>
      {/* Display Feedback */}
      <section className="child z-0">
        <h1 className="text-center mt-5 mb-3">Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p>No feedback available yet.</p>
        ) : (
          <div className="container-fluid d-flex justify-content-center align-items-center gap-3 custom-width flex-wrap">
            {feedbacks.map((f) => (
              <div
                key={f.feedback_id}
                className="border border-dark px-3 py-3 rounded custom-bg custom-color"
              >
                <strong className="fw-bolder fs-5">{f.first_name}</strong>{" "}
                <br /> <div className="text-white fs-4">{f.comment} </div>
                {/* Render Stars for Rating */}
                <div className="fs-5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          i < parseInt(f.rating) ? "lightblue" : "lightgray",
                      }}
                      {...console.log(f.rating)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={i < f.rating ? "#4084b4" : "black"}
                        className="bi bi-star-fill custom-color m-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </span>
                  ))}
                </div>
                <small className="text-white">
                  {new Date(f.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Feedback Section */}
      <section>
        <h1 className="text-center mt-5 mb-3">Submit Your Feedback</h1>
        <div className="container w-100 text-center">
          <form onSubmit={handleFeedbackSubmit} className=" w-100">
            <select
              required
              className="w-50 text-center mt-3 mb-3 py-2 rounded"
              value={newFeedback.rating}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, rating: e.target.value })
              }
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>{" "}
            <br />
            <textarea
              required
              className="rounded px-2 py-2 w-100 mobile"
              placeholder="Write your feedback here..."
              value={newFeedback.comment}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, comment: e.target.value })
              }
            />
            <br />
            <button type="submit" className="btn custom-btn mt-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
