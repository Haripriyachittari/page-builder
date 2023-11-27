import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ConfigurationModal from "../components/ConfigurationModal";
import Sidebar from "../components/Sidebar";

const blocks = [
  {
    key: "label",
    text: "Label",
  },
  {
    key: "input",
    text: "Input",
  },
  {
    key: "button",
    text: "Button",
  },
];
const blockElements = blocks.map((block) => block.key);

const selectedElementedStyles = "border-red-500 border ";
const elementStyles = {
  button:
    "absolute bg-[#0044C1] flex gap-2 hover:border hover:border-red-500 items-start my-4 p-2 text-white",
  input:
    "absolute border bg-white flex gap-2 hover:border hover:border-red-500 items-start my-4 p-2 focus:outline-none",
  label:
    "absolute flex gap-2 hover:border hover:border-red-500 items-start my-4",
};

const Home = () => {
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("__config__")) ?? [],
  );
  const [selectedElement, setSelectedElement] = useState(null);
  const [modalValues, setModalValues] = useState(null);

  const handleChangeModalValues = (event) => {
    const { name, value } = event.target;
    setModalValues((prev) => {
      return { ...prev, properties: { ...prev.properties, [name]: value } };
    });
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const handleSave = () => {
    if (elements.map((element) => element.id).includes(modalValues.id)) {
      setElements((prev) =>
        prev.reduce((acc, curr) => {
          if (curr.id === modalValues.id) {
            acc.push(modalValues);
          } else {
            acc.push(curr);
          }
          return acc;
        }, []),
      );
      setSelectedElement(null);
    } else {
      setElements((prev) => [...prev, modalValues]);
    }
    setModalValues(null);
  };

  const handleDrag = (event) => {
    if (event.target.dataset.customElement) {
      event.dataTransfer.setData("text/plain", event.target.id);
      return;
    }
    event.dataTransfer.setData("text/plain", event.target.dataset.elementType);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    const data = event.dataTransfer.getData("text/plain");
    if (!blockElements.includes(data)) {
      if (elements.map((element) => element.id).includes(data)) {
        setElements((prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === data) {
              acc.push({
                ...curr,
                properties: {
                  ...curr.properties,
                  x: event.clientX,
                  y: event.clientY,
                },
              });
            } else {
              acc.push(curr);
            }
            return acc;
          }, []),
        );
      }
      return;
    }

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
          prev.filter((prev) => prev.id !== selectedElement?.id),
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
    <div className="flex h-screen">
      <div
        id="parent"
        className="relative flex h-full flex-1 bg-[#F3F3F3]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {elements.map((element) => (
          <element.type
            key={element.id}
            onClick={() => handleSelectElement(element)}
            id={element.id}
            draggable
            data-custom-element
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
      </div>
      <Sidebar blocks={blocks} handleDrag={handleDrag} />
      {modalValues ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full cursor-pointer items-center justify-end bg-[rgba(0,0,0,0.3)]">
          <ConfigurationModal
            modalValues={modalValues}
            handleChangeModalValues={handleChangeModalValues}
            handleSave={handleSave}
            setModalValues={setModalValues}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
