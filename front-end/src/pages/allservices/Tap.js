import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Servicepage from "./servicepage";

const TAP = () => {
  const [page, setpage] = useState({
    ser: true,
    post: false,
  });

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
                setpage({
                  post: false,
                  ser: true,
                });
                console.log(page);
              }}
            ></Button>
          </li>
        </div>

        <li role="presentation">
          <Button
            buttonName={"AllPosts"}
            buttonClassName={
              "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            }
            onClick={() => {
              setpage({
                post: true,
                ser: false,
              });
              console.log(page);
            }}
          ></Button>
        </li>
      </ul>

      <div>
        <div
          class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-home3"
          role="tabpanel"
          data-te-tab-active
          aria-labelledby="tabs-home-tab3"
        >
          Tab 1 content button version
        </div>
        <div
          class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-profile3"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab3"
        >
          Tab 2 content button version
        </div>
      </div>
    </div>
  );
};

export default TAP;
