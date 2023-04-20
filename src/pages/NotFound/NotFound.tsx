import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", {
        replace: true,
        state: location.pathname,
      });
    }, 2000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "2rem",
      }}
    >
      Страница не найдена
    </div>
  );
};
