import "./Header.css";
import React, { useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { CreateNoteModal } from "../../components/CreateNoteModal";
import { Links } from "../../enums";
import { Button, TextField } from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDebounce } from "../../hooks/useDebounce";

export const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignOut = () => {
    auth.signOut(() => {
      navigate(Links.loginLink);
    });
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useDebounce(
    () => {
      value !== "" ? setSearchParams({ search: value }) : setSearchParams("");
    },
    500,
    [value]
  );

  return (
    <>
      <header className="header">
        <div className="header__leftside-bar">
          <div className="header__logo">
            <NavLink to={"/"}>Notes like MacOS</NavLink>
          </div>
          {auth.user !== null && (
            <div className="header__button-wrapper">
              <NavLink to={"/"}>
                <Button
                  variant={
                    location.pathname.indexOf("cards") !== -1
                      ? "outlined"
                      : "contained"
                  }
                >
                  <TableRowsIcon />
                </Button>
              </NavLink>
              <NavLink to={`${Links.cardsLink}`}>
                <Button
                  variant={
                    location.pathname.indexOf("cards") === -1
                      ? "outlined"
                      : "contained"
                  }
                >
                  <GridViewIcon />
                </Button>
              </NavLink>
              <Button onClick={() => setOpenModal(true)} variant="outlined">
                <AddIcon />
              </Button>
            </div>
          )}
        </div>
        {auth.user !== null && (
          <div className="header__rightside-bar">
            <TextField
              color="primary"
              id="search"
              label="search"
              variant="outlined"
              size="small"
              focused
              InputProps={{
                startAdornment: <SearchIcon color="primary" />,
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={handleSignOut} variant="outlined">
              <LogoutIcon />
            </Button>
          </div>
        )}
      </header>
      <CreateNoteModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
