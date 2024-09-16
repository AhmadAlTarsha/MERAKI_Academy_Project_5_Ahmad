import React from "react";
import Button from "../Button/Button";

const Tabs = ({ setToggle }) => {
  return (
    <div className="w-full">
      <ul
        className="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0"
        id="tabs-tab3"
        role="tablist"
        data-te-nav-ref
      >
        <div className="w-1/2 flex justify-center items-center">
          <li className="w-full" role="presentation">
            <Button
              buttonName={"services"}
              buttonClassName={`my-2 w-full block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-[#C3A97E] focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
              onClick={() => {
                setToggle(false);
              }}
            />
          </li>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <li className="w-full" role="presentation">
            <Button
              buttonName={"AllPosts"}
              buttonClassName={
                `my-2 w-full block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-[#C3A97E] focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`
              }
              onClick={() => {
                setToggle(true);
              }}
            ></Button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Tabs;
