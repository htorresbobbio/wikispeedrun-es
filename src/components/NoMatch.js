import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const NoMatch = () => {
  return (
    <Wrapper>
      <h2>¡Acá no hay nada para tí!</h2>
      <p>
        <Link to="/">Ir a la página principal</Link>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: var(--border-gap);
  padding-top: 8px;
`;
export default NoMatch;
