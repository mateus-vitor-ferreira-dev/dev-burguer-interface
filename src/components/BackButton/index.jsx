import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { usePreviousPathname } from "../../hooks/usePreviousPathname";
import { ContainerBackButton } from "./styles";

export function BackButton({ label = "Voltar", fallbackTo = "/" }) {
  const navigate = useNavigate();
  const previousPathname = usePreviousPathname();
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(true);

    setTimeout(() => {
      navigate(previousPathname || fallbackTo);
    }, 1000);
  }

  return (
    <ContainerBackButton onClick={handleClick} $isActive={isActive}>
      <FiArrowLeft />
      {label}
    </ContainerBackButton>
  );
}

BackButton.propTypes = {
  label: PropTypes.string,
  fallbackTo: PropTypes.string,
};