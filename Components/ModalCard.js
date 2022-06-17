import React, { useState, useEffect } from "react";

const ModalCard = ({
  item,
  updateVariation,
  updateSugar,
  updateQty,
  updateAdditional,
}) => {
  if (!item) return null;
  const [selectVariation, setSelectedVariation] = useState(item.variation[0]);
  const [selectSugar, setSelectedSugar] = useState(item.sugar[0]);
  const [Additional, SetAdditional] = useState({
    tmpAdd: [],
  });
  const [qty, setQty] = useState(1);

  const handleVariation = (variation) => {
    setSelectedVariation(variation);
    updateVariation(variation);
  };
  const handleSugar = (sugar) => {
    setSelectedSugar(sugar);
    updateSugar(sugar);
  };

  const handleAdditional = (e) => {
    const { value, checked } = e.target;
    const { tmpAdd } = Additional;

    if (checked) {
      SetAdditional({
        tmpAdd: [...tmpAdd, value],
      });
    } else {
      SetAdditional({
        tmpAdd: tmpAdd.filter((e) => e !== value),
      });
    }
    updateAdditional(tmpAdd);
  };
  console.log(Additional);
  function handleDecreaseQty() {
    if (qty > 1) {
      let tmpQty = qty;
      tmpQty = qty - 1;
      setQty(tmpQty);
      updateQty(tmpQty);
    }
  }
  function handleIncreaseQty() {
    let tmpQty = qty;
    tmpQty = qty + 1;
    setQty(tmpQty);
    updateQty(tmpQty);
  }
  useEffect(() => {
    updateVariation(selectVariation);
    updateSugar(selectSugar);
    // updateAdditional(Additional);
  }, []);
  console.log(Additional);
  return (
    <>
      <div className="h-48">
        <img src={item.img} alt="" className="h-full w-full object-contain" />
      </div>
      <h1 className="mt-2 text-indigo-800 text-2xl uppercase">{item.name}</h1>
      <form action="">
        {item.variation.map((i) => {
          return (
            <div className="radio" key={i.id} className=" py-1">
              <label>
                <input
                  type="radio"
                  value={i.id}
                  checked={selectVariation === i}
                  onChange={(e) => handleVariation(i)}
                />
                {i.name} {i.price}$
              </label>
            </div>
          );
        })}
      </form>

      <h1 className="text-blue-600">choice level of Sugar</h1>
      <form action="">
        {item.sugar.map((s) => {
          return (
            <div className="radio" key={s.id} className=" py-1">
              <label>
                <input
                  type="radio"
                  value={s.id}
                  checked={selectSugar === s}
                  onChange={(e) => handleSugar(s)}
                />
                <small className="text-gray-700"> {s.percentage}%</small>
              </label>
            </div>
          );
        })}
      </form>

      <div className="mb-5 pb-1">
        <h1 className="text-blue-600">Choice of topping</h1>
        <small className="text-purple-600">Select up to (3 optional)</small>
        <form action="">
          {item.addition.map((a) => {
            return (
              <div className="checkbox" key={a.id} className=" py-1">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="additional"
                    value={a.name}
                    onChange={handleAdditional}
                  />
                  <small className="text-gray-700 ml-1">
                    {a.name} {a.price}
                  </small>
                </label>
              </div>
            );
          })}
        </form>
      </div>

      <div className="mb-5 border-b flex flex-row pb-3">
        <h1 className="text-semibold mr-5">Enter item quantity:</h1>
        <button
          className="mx-2 text-gray-600 hover:bg-red-100 hover:rounded-full "
          onClick={handleDecreaseQty}
        >
          -
        </button>
        <span className="mx-2 ">{qty}</span>
        <button
          className="mx-2 text-gray-600 hover:bg-gray-100 hover:rounded-full"
          onClick={handleIncreaseQty}
        >
          +
        </button>
      </div>
    </>
  );
};

export default ModalCard;
