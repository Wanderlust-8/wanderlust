import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext";
import { get_all_bills } from "../../Redux/Checkout/checkoutActions";
import { Rating } from "@smastrom/react-rating";
import { addComents } from "../../Redux/Comments/commentsActions";

const Packages = () => {
  const { currentUser } = useContext(authContext);
  const dispatch = useDispatch();
  const allBills = useSelector((state) => state.checkout.allBills);
  const [rating, setRating] = useState(0); // Initial value
  const [comment, setComment] = useState("");
  console.log("Rating", rating);
  const [showModal, setShowModal] = useState(false); // <--- añade esto
  const [currentPackageId, setCurrentPackageId] = useState(null);

  const userBills = allBills?.filter(
    (bill) => bill.uidUser === currentUser.uid
  );
  console.log("userBills", userBills);

  useEffect(() => {
    if (currentUser) {
      dispatch(get_all_bills());
    }
  }, [currentUser, dispatch]);

  return (
    <div className=" fontPoppins m-24">
      <div className="text-gray-800 font-bold text-2xl text-left uppercase mb-8">
        <h1>Mis viajes</h1>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full">
        {userBills &&
          userBills
          .slice() // Crea una copia del array original para preservarlo
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)) // ordena de manera descendente de mas nuevo a mas viejo
          .map((order, index) => (
            <div
              key={index}
              className="bg-verdeFooter block bg-opacity-80 rounded-xl shadow-xl p-4 w-full"
            >
              {order.ItemsBills.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-200 mt-2">
                  {item.title}
                  {item.typeProduct === 1 ? (
                    <Link
                      to={`/itinerary/${item.idProduct}/${order.id}`}
                      className="bg-green-600 text-s p-1 ml-4 mb-2 rounded-md"
                    >
                      VER AGENDA
                    </Link>
                  ) : null}
                </li>
              ))}

              <h4 className="text-gray-400">USD {order.fullValue}</h4>
              <h4 className="text-gray-400">
                Comprado el {order.createdAt.split("T")[0].toString()}
              </h4>

              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setCurrentPackageId(order.ItemsBills[0].idProduct);
                  setShowModal(true);
                }}
              >
                Deja tu opinión
              </button>
            </div>
          ))}
      </div>

      {showModal && (
        <div
          class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
              <div class="px-12 py-5">
                <h2 class="text-gray-800 text-3xl font-semibold">
                  ¡Su opinión nos importa!
                </h2>
              </div>
              <div class="bg-gray-200 w-full flex flex-col items-center">
                <div class="flex flex-col items-center py-6 space-y-3">
                  <span class="text-lg text-gray-800">
                    Deja tu puntuacion del paquete
                  </span>
                  <div class="flex space-x-3">
                    <Rating
                      style={{ maxWidth: 250 }}
                      value={rating}
                      onChange={setRating}
                    />
                  </div>
                </div>
                <div class="w-3/4 flex flex-col">
                  <textarea
                    rows="3"
                    class="p-4 text-gray-500 rounded-xl resize-none"
                    placeholder="Deja tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button
                    class="py-3 my-8 text-lg bg-verdeFooter rounded-xl text-white"
                    onClick={() => {
                      dispatch(
                        addComents({
                          uidUser: currentUser.uid,
                          testimony: comment,
                          idPackage: currentPackageId,
                          calification: rating,
                        })
                      );

                      setComment(""); // Reset the comment
                      setRating(0); // Reset the rating
                      setShowModal(false);
                    }}
                  >
                    Califica ahora
                  </button>
                </div>
              </div>
              <div class="h-20 flex items-center justify-center">
                <a
                  href="#"
                  class="text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                  }}
                >
                  Quizas mas tarde
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
