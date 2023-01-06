import React, { useContext, useState } from "react";

const ModalContext = React.createContext();
const ModalUpdateContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function useModalUpdate() {
  return useContext(ModalUpdateContext);
}

export function DisplayModalProvider({ children }) {
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
}
