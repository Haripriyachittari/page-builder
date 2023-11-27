import React from "react";

const ConfigurationModal = ({
  modalValues,
  handleChangeModalValues,
  handleSave,
}) => {
  return (
    <div className="flex bg-white flex-col w-[320px] mr-12 p-4 rounded-md shadow-md ">
      <p className="text-2xl font-semibold mb-2">Edit {modalValues.type}</p>
      <hr />
      <div className="my-1 flex flex-col ">
        <label className="mb-1 font-semibold ">Text</label>
        <input
          name="text"
          onChange={handleChangeModalValues}
          value={modalValues.properties.text}
          className="border focus:outline-none rounded-md p-1.5"
          placeholder="Enter text"
        />
      </div>
      <div className="my-1 flex flex-col">
        <label className="mb-1 font-semibold">X</label>
        <input
          name="x"
          onChange={handleChangeModalValues}
          value={modalValues.properties.x}
          className="border focus:outline-none rounded-md p-1.5"
          placeholder="Enter X"
        />
      </div>
      <div className="my-1 flex flex-col">
        <label className="mb-1 font-semibold">Y</label>
        <input
          name="y"
          onChange={handleChangeModalValues}
          value={modalValues.properties.y}
          className="border focus:outline-none rounded-md p-1.5"
          placeholder="Enter Y"
        />
      </div>
      <div className="my-1 flex flex-col">
        <label className="mb-1 font-semibold">Font Size</label>
        <input
          name="fontSize"
          onChange={handleChangeModalValues}
          value={modalValues.properties.fontSize}
          className="border focus:outline-none rounded-md p-1.5"
          placeholder="Enter fontsize"
        />
      </div>
      <div className="my-1 flex flex-col">
        <label className="mb-1 font-semibold">Font Weight</label>
        <input
          name="fontWeight"
          onChange={handleChangeModalValues}
          value={modalValues.properties.fontWeight}
          className="border focus:outline-none rounded-md p-1.5"
          placeholder="Enter fontweight"
        />
      </div>
      <button
        onClick={handleSave}
        className="p-1.5 rounded-md mt-4 w-[50%] bg-blue-500 text-white font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ConfigurationModal;
