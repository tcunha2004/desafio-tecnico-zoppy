import { useNavigate } from "react-router-dom";
import {
  Avatar,
  GithubImageLogo,
  MainContainer,
  ProspectCard,
  ProspectsList,
  SearchContainer,
  SearchInput,
  Username,
} from "./styles";

export default function List() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <GithubImageLogo color="white" size={32} onClick={() => navigate("/")} />

      <SearchContainer>
        <SearchInput placeholder="Digite o nome do usuário..." />
      </SearchContainer>

      <ProspectsList>
        <ProspectCard>
          <Avatar>
            <img
              src="https://github.com/tcunha2004.png"
              alt="Avatar do usuário tcunha2004"
            />
          </Avatar>

          <Username>tcunha2004</Username>
        </ProspectCard>

        <ProspectCard>
          <Avatar>
            <img
              src="https://github.com/arturssmirnovs.png"
              alt="Avatar do usuário arturssmirnovs"
            />
          </Avatar>

          <Username>arturssmirnovs</Username>
        </ProspectCard>
      </ProspectsList>
    </MainContainer>
  );
}
