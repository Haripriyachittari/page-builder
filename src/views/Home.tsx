import React, {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import ConfigurationModal from "../components/ConfigurationModal";
import Sidebar from "../components/Sidebar";
import { blocks, blockElements } from "../constants";

const selectedElementedStyles = "border-red-500 border ";
const elementStyles = {
  button:
    "absolute bg-[#0044C1] flex gap-2 hover:border hover:border-red-500 items-start my-4 p-2 text-white",
  input:
    "absolute border bg-white flex gap-2 hover:border hover:border-red-500 items-start my-4 p-2 focus:outline-none",
  label:
    "absolute flex gap-2 hover:border hover:border-red-500 items-start my-4",
};

export interface Element {
  id: string;
  type: "button" | "input" | "label";
  properties: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: number;
  };
}

const Home = () => {
  const [elements, setElements] = useState<Element[]>(
    JSON.parse(localStorage.getItem("__config__")!) ?? [],
  );
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [modalValues, setModalValues] = useState<Element | null>(null);

  const handleChangeModalValues: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { name, value } = event.target;
    setModalValues((prev) => {
      return { ...prev!, properties: { ...prev!.properties, [name]: value } };
    });
  };

  const handleSelectElement = (element: Element) => {
    setSelectedElement(element);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = () => {
    if (
      modalValues &&
      elements.map((element) => element.id).includes(modalValues.id)
    ) {
      setElements((prev) =>
        prev.reduce(
          (acc, curr) => {
            if (curr.id === modalValues.id) {
              acc.push(modalValues);
            } else {
              acc.push(curr);
            }
            return acc;
          },
          [] as typeof prev,
        ),
      );
      setSelectedElement(null);
    } else {
      setElements((prev) => [...prev, modalValues!]);
    }
    setModalValues(null);
  };

  const handleDrag: DragEventHandler<HTMLElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (target.dataset.customElement) {
      event.dataTransfer.setData("text/plain", target.id);
      return;
    }
    event.dataTransfer.setData("text/plain", target.dataset.elementType!);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    const data = event.dataTransfer.getData("text/plain") as Element["type"];
    if (!blockElements.includes(data)) {
      if (elements.map((element) => element.id).includes(data)) {
        setElements((prev) =>
          prev.reduce(
            (acc, curr) => {
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
            },
            [] as typeof prev,
          ),
        );
      }
      return;
    }

    const element = {
      id: uuid(),
      type: event.dataTransfer.getData("text/plain") as Element["type"],
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
    const handleActions = (event: KeyboardEvent) => {
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
      <Sidebar handleDrag={handleDrag} />
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
