import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import icon from "../assets/grip-vertical.png";
import ConfigurationModal from "../components/ConfigurationModal";

const selectedElementedStyles = "border-red-500 border ";

const elementStyles = {
  button:
    "flex gap-2 items-start bg-blue-500 text-white hover:border hover:border-red-500 p-4 my-4",
  input:
    "flex gap-2 items-start hover:border hover:border-red-500 border rounded-md p-4 my-4",
  label:
    "flex gap-2 items-start hover:border hover:border-red-500  rounded-md p-4 my-4",
};

const Home = () => {
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("__config__"))
  );
  const [selectedElement, setSelectedElement] = useState();
  const [modalValues, setModalValues] = useState();

  const handleChangeModalValues = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setModalValues((prev) => {
      return { ...prev, properties: { ...prev.properties, [name]: value } };
    });
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const handleElementOnDrop = () => {
    if (elements.map((element) => element.id).includes(modalValues.id)) {
      setElements((prev) =>
        prev.reduce((acc, curr) => {
          if (curr.id === modalValues.id) {
            acc.push(modalValues);
          } else {
            acc.push(curr);
          }
          return acc;
        }, [])
      );
      setSelectedElement(null);
    }
    setElements((prev) => [...prev, modalValues]);
    setModalValues(null);
  };

  const handleDrag = (event) => {
    event.dataTransfer.setData("text/plain", event.target.dataset.elementType);
  };

  const handleDrop = (event) => {
    console.log("dropevent", event);
    const element = {
      id: uuid(),
      type: event.dataTransfer.getData("text/plain"),
      properties: {
        text: "",
        x: event.clientX,
        y: event.clientY,
        fontSize: 16,
        fontWeight: 400,
      },
    };
    setModalValues(element);
  };
  useEffect(() => {
    localStorage.setItem("__config__", JSON.stringify(elements));
  }, [elements]);

  useEffect(() => {
    const handleActions = (event) => {
      if (event.code === "Enter") {
        setModalValues(selectedElement);
        setSelectedElement(null);
      }
      if (event.code === "Delete") {
        setElements((prev) =>
          prev.filter((prev) => prev.id !== selectedElement?.id)
        );
        setSelectedElement(null);
      }
    };
    document.body.addEventListener("keydown", handleActions);

    return () => {
      document.body.removeEventListener("keydown", handleActions);
    };
  }, [selectedElement]);

  return (
    <div className="flex h-[100vh]">
      <div
        id="parent"
        className="flex-1 h-full border border-green-400 relative"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {elements?.map((element) => (
          <element.type
            key={element.id}
            onClick={() => handleSelectElement(element)}
            id={element.id}
            draggable
            data-element-type={element.type}
            className={`${elementStyles[element.type]} ${
              element.id === selectedElement?.id
                ? selectedElementedStyles
                : null
            }`}
            style={{
              position: "absolute",
              left: `${element.properties.x}px`,
              top: `${element.properties.y}px`,
              fontWeight: `${element.properties.fontWeight}`,
              fontSize: `${element.properties.fontSize}px`,
            }}
            onDragStart={handleDrag}
            {...(element.type === "input"
              ? { placeholder: element.properties.text }
              : {})}
          >
            {element.type !== "input" ? element.properties.text : null}
          </element.type>
        ))}
        {modalValues ? (
          <div
            className="w-full h-full absolute top-0 cursor-pointer bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)]"
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   setModalValues(null);
            // }}
          >
            <ConfigurationModal
              modalValues={modalValues}
              handleChangeModalValues={handleChangeModalValues}
              handleElementOnDrop={handleElementOnDrop}
            />
          </div>
        ) : null}
      </div>
      <div
        className="w-[21%] h-full border bg-[#2D2D2D] text-white p-4 "
        id="sidebar"
      >
        <p className="text-xl font-semibold"> BLOCKS </p>
        <div
          data-element-type="label"
          draggable
          className="flex gap-2 shadow-md border bg-white rounded-md p-4 my-4"
          onDragStart={handleDrag}
        >
          <img alt="icon" src={icon} />
          <p className="text-black"> Label </p>
        </div>
        <div
          data-element-type="input"
          draggable
          className="flex gap-2 shadow-md border bg-white rounded-md p-4 my-4"
          onDragStart={handleDrag}
        >
          <img alt="icon" src={icon} />
          <p className="text-black">Input</p>
        </div>
        <div
          data-element-type="button"
          draggable
          className="flex gap-2 shadow-md border bg-white rounded-md p-4 my-4"
          onDragStart={handleDrag}
        >
          <img alt="icon" src={icon} />
          <p className="text-black">Button</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
