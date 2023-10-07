import React from "react";
import Button from "../Button/Button";

const Tabs = ({ setToggle }) => {
  return (
    <div>
      <ul
        class="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0"
        id="tabs-tab3"
        role="tablist"
        data-te-nav-ref
      >
        <div>
          <li role="presentation">
            <Button
              buttonName={"services"}
              buttonClassName={
                "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              }
              onClick={() => {
                setToggle(false);
              }}
            />
          </li>
        </div>

        <li role="presentation">
          <Button
            buttonName={"AllPosts"}
            buttonClassName={
              "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            }
            onClick={() => {
              setToggle(true);
            }}
          ></Button>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
