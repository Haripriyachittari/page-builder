import React, { ChangeEventHandler, MouseEventHandler } from "react";
import closeIcon from "../assets/closeicon.png";
import { Element } from "../views/Home";

const formElements = [
  {
    name: "text",
    label: "Text",
    placeholder: "Enter text",
  },
  {
    name: "x",
    label: "X",
    placeholder: "Enter x",
  },
  {
    name: "y",
    label: "Y",
    placeholder: "Enter y",
  },
  {
    name: "fontSize",
    label: "Font Size",
    placeholder: "Enter font size",
  },
  {
    name: "fontWeight",
    label: "Font Weight",
    placeholder: "Enter font weight",
  },
] as const;

interface Props {
  setModalValues: React.Dispatch<React.SetStateAction<Element | null>>;
  modalValues: Element;
  handleChangeModalValues: ChangeEventHandler<HTMLInputElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
}

const ConfigurationModal: React.FC<Props> = ({
  setModalValues,
  modalValues,
  handleChangeModalValues,
  handleSave,
}) => {
  return (
    <div className="mr-[400px] flex w-[320px] flex-col   bg-white shadow-md ">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-[21px] font-semibold">Edit {modalValues.type}</p>
        <button
          className="cursor-pointer font-semibold"
          onClick={() => setModalValues(null)}
        >
          <img alt="icon" src={closeIcon} />
        </button>
      </div>

      <div className="p-4 text-[#262626]">
        {formElements.map((formElement) => (
          <div className=" my-3 flex flex-col ">
            <label className="mb-1 text-sm">{formElement.label}</label>
            <input
              name={formElement.name}
              onChange={handleChangeModalValues}
              value={modalValues.properties[formElement.name]}
              className="text-md border p-1.5 focus:outline-none"
              placeholder={formElement.placeholder}
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="mt-4 w-[42%] rounded-sm bg-[#0044C1] p-1.5 text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ConfigurationModal;
