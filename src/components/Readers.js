import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Readers = () => {
  const useAppState = useContext(Appstate);
  return (
    <div className="sticky top-0 z-10 header  bg-black text-3xl flex justify-between items-center text-pink-600 font-bold p-3 border-b-2 border-gray-500">
      <Link to={"/"}>
        <span>
          Movies<span className="text-white">Zone</span>
        </span>
      </Link>
      {useAppState.login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg cursor-pointer flex items-center">
            <Button>
              <AddIcon className="mr-1 text-white" color="secondery" />
              <span className="text-pink-600">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-white text-xxl hover:bg-green-600 cursor-pointer flex items-center rounded  ">
            <Button>
              <span className="text-pink-600 	font-bold capitalize border-0  px-2 focus:outline-none">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Readers;
