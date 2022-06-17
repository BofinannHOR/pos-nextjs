import { Data } from "../data/Data";
import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import ModalCard from "../Components/ModalCard";
import Test from "../Components/Test";

export default function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState({
    id: null,
    name: null,
    price: null,
  });
  const [selectedSugar, setSelectedSugar] = useState({
    id: null,
    percentage: null,
  });
  const [selectedAdditional, setSelectedAdditonal] = useState();
  const [selectedQty, setSelectedQty] = useState();
  const [ItemCart, setItemCart] = useState([]);

  const onClickHandler = (itemId) => {
    let selectedProduct = Data.products.find(({ id }) => id === itemId);
    setSelectedItem(selectedProduct);
    setShowModal(true);
  };

  const handlerCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setSelectedVariation({});
    setSelectedSugar({});
    setSelectedAdditonal({});
    setSelectedQty();
  };

  const handlerAddToCart = () => {
    let tmpItemCart = ItemCart;
    tmpItemCart.push({
      coffee: selectedItem.name,
      variation: selectedVariation,
      sugar: selectedSugar,
      qty: selectedQty,
      addition: selectedAdditional,
    });
    setItemCart(tmpItemCart); // ItemCart=tmpItemCart
    setShowModal(false);
  };
  const handleDeleteCart = (itemIndex) => {
    let removeIndex = ItemCart.filter((e, index) => index != itemIndex);
    setItemCart(removeIndex);
  };

  console.log(selectedAdditional);
  return (
    <React.Fragment>
      <div className="App flex lg:flex-row flex-col p-3 mt-10">
        <div className="W-1/2 h-auto bg-white grid lg:grid-cols-4 lg:mx-0 mx-20 border p-4 shadow-lg rounded-md">
          {/* <h1 className="text-3xl text-blue-800">Coffee</h1> */}
          {Data.products.map((product) => (
            <div className="w-full md:w-1/3 p-2" key={product.id}>
              <div className="bg-white shadow-md rounded-lg ">
                <div className=" lg:h-44 h-44 w-full rounded ">
                  <img
                    src={product.img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start px-2 pt-2">
                  <div className="p-2 flex-grow">
                    <h1 className="font-medium text-xl font-poppins uppercase">
                      {product.name}
                    </h1>
                  </div>
                  <div className="p-2 text-right">
                    <div className="text-teal-500 font-semibold text-lg font-poppins">
                      $ {product.variation[0].price}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center px-2 pb-2">
                  <div className="w-1/2 p-2">
                    <button
                      className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium"
                      type="button"
                      onClick={(e) => onClickHandler(product.id)}
                      ripple="light"
                    >
                      Order
                    </button>

                    <Modal
                      size="regular"
                      active={showModal}
                      toggler={() => handlerCloseModal()}
                    >
                      <ModalCard
                        item={selectedItem}
                        updateVariation={setSelectedVariation}
                        updateSugar={setSelectedSugar}
                        updateQty={setSelectedQty}
                        updateAdditional={setSelectedAdditonal}
                      />
                      <ModalFooter>
                        <Button
                          color="red"
                          buttonType="link"
                          onClick={(e) => handlerCloseModal()}
                          ripple="dark"
                        >
                          Cancel
                        </Button>

                        <Button
                          color="blue"
                          buttonType="link"
                          onClick={(e) => handlerAddToCart()}
                          ripple="dark"
                        >
                          Add to Cart
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ----------------------------- */}
        <div className="w-auto h-auto bg-white border p-4 shadow-lg rounded-md lg:mx-0 mx-20">
          <div className="border-b-2 p-3">
            <h1 className="text-2xl">YOUR CUSTOMER'S CART</h1>
          </div>

          {ItemCart.map((item, index) => (
            <ul className="p-3" key={index}>
              <li className="flex flex-row justify-between">
                <span className="text-blue-700 text-lg">
                  {item.coffee}({item.variation.name})
                </span>
                <span className="text-gray-700">${item.variation.price}</span>
              </li>
              <ul>
                <li> Sugar: {item.sugar.percentage}%</li>
                <li>{item.addition}</li>
              </ul>

              <button
                onClick={(e) => handleDeleteCart(index)}
                className="float-right bg-transparent hover:bg-red-500 text-red-700 hover:text-white border border-red-500 hover:border-transparent rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fillRule="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="float-right mr-2">{item.qty} items</span>
            </ul>
          ))}
        </div>
      </div>
      {/* <Test /> */}
    </React.Fragment>
  );
}
