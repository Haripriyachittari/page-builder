import React from "react";
import gripIcon from "../assets/grip-vertical.png";

const Sidebar = ({ blocks, handleDrag }) => {
  return (
    <div className="h-full w-[21%] bg-[#2D2D2D] p-4 text-white " id="sidebar">
      <p className="text-xl font-semibold"> BLOCKS </p>
      {blocks.map((block) => (
        <div
          data-element-type={block.key}
          draggable
          className="my-4 flex gap-2 rounded-md border bg-white p-2.5 shadow-md"
          onDragStart={handleDrag}
        >
          <img alt="icon" src={gripIcon} />
          <p className="text-black"> {block.text} </p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
