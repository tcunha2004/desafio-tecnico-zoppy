import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme["blue-700"]};

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5.25rem 1.5rem 3rem;
`;

export const GithubImageLogo = styled(FaGithub)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  width: min(40rem, 92vw);
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 3.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: ${(props) => props.theme["blue-300"]};

  padding: 0 1.5rem;
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1rem;

  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, filter 160ms ease;

  &::placeholder {
    color: ${(props) => props.theme.gray};
  }

  &:focus {
    border-color: rgba(240, 81, 51, 0.22);
    box-shadow: 0 0 0 4px rgba(240, 81, 51, 0.08);
  }
`;

export const ProspectsList = styled.div`
  width: min(46rem, 92vw);
  margin-top: 2.75rem;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ProspectCard = styled.div`
  width: 100%;
  min-height: 5rem;
  border-radius: 16px;
  background: ${(props) => props.theme["blue-300"]};
  padding: 1rem 1.25rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: ${(props) => props.theme.white};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Username = styled.span`
  color: ${(props) => props.theme.white};
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.2px;
`;
