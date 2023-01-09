import React, { useContext, useState } from "react";

const ModalContext = React.createContext();
const ModalUpdateContext = React.createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const useModalUpdate = () => {
  return useContext(ModalUpdateContext);
};

export const DisplayModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ModalContext.Provider value={showModal}>
      <ModalUpdateContext.Provider value={toggleModal}>
        {children}
      </ModalUpdateContext.Provider>
    </ModalContext.Provider>
  );
};
