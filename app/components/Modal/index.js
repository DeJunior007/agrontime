import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Modal = ({ message, entity, isError = false, redirectUrl = "" }) => {

  useEffect(() => {
    const showAlert = async () => {
      const result = await Swal.fire({
        title: isError ? "Erro" : "Sucesso",
        text: isError ? message : `${message} - ${entity} adicionado com sucesso!`,
        icon: isError ? "error" : "success",
        confirmButtonText: "Fechar",
      });

      if (result.isConfirmed && redirectUrl) {
        window.location.href = redirectUrl;
      }
    };

    showAlert();
  }, [message, entity, isError, redirectUrl]);

  return null; 
};

export default Modal;
