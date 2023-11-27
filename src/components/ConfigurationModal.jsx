import React from "react";

const ConfigurationModal = ({
  modalValues,
  handleChangeModalValues,
  handleSave,
}) => {
  return (
    <div className="flex bg-white flex-col w-[400px] absolute right-16 top-20 p-4 rounded-md shadow-md ">
      <p className="text-2xl font-semibold my-2">Edit {modalValues.type}</p>
      <hr />
      <div className="my-3 flex flex-col ">
        <label className="mb-2 font-semibold ">Text</label>
        <input
          name="text"
          onChange={handleChangeModalValues}
          value={modalValues.properties.text}
          className="border focus:outline-none rounded-md p-2"
          placeholder="Enter text"
        />
      </div>
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">X</label>
        <input
          name="x"
          onChange={handleChangeModalValues}
          value={modalValues.properties.x}
          className="border focus:outline-none rounded-md p-2"
          placeholder="Enter X"
        />
      </div>
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Y</label>
        <input
          name="y"
          onChange={handleChangeModalValues}
          value={modalValues.properties.y}
          className="border focus:outline-none rounded-md p-2"
          placeholder="Enter Y"
        />
      </div>
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Font Size</label>
        <input
          name="fontSize"
          onChange={handleChangeModalValues}
          value={modalValues.properties.fontSize}
          className="border focus:outline-none rounded-md p-2"
          placeholder="Enter fontsize"
        />
      </div>
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Font Weight</label>
        <input
          name="fontWeight"
          onChange={handleChangeModalValues}
          value={modalValues.properties.fontWeight}
          className="border focus:outline-none rounded-md p-2"
          placeholder="Enter fontweight"
        />
      </div>
      <button
        onClick={handleSave}
        className="p-2 rounded-md my-3 w-[50%] bg-blue-500 text-white font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ConfigurationModal;
