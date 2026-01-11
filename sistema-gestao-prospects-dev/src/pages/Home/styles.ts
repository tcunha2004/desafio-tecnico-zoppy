import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

export const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme["blue-700"]};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GithubImageLogo = styled(FaGithub)`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

export const Title = styled.h1`
  position: absolute;
  top: 4rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.white};

  span {
    color: ${(props) => props.theme.orange};
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;

  .swiper {
    width: 100%;
    overflow: hidden;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    color: ${(props) => props.theme.white};
    top: 50%;
    transform: translateY(-50%);
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .navigate {
    color: ${(props) => props.theme.gray};
    align-self: flex-end;
    margin-top: 1rem;
    cursor: pointer;
    transition: color 200ms;

    &:hover {
      color: ${(props) => props.theme.white};
    }
  }
`;

export const ProspectCard = styled.div`
  height: 21rem;
  border-radius: 16px;
  background: ${(props) => props.theme["blue-300"]};
  padding: 0 2.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;

  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.26);
  user-select: none;
`;

export const Avatar = styled.div`
  width: 9.5rem;
  height: 9.5rem;
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

export const ProspectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`;

export const ProspectName = styled.strong`
  color: ${(props) => props.theme.white};
  font-weight: 700;
  font-size: 2.35rem;
  letter-spacing: -0.6px;
  line-height: 1.06;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProspectUsername = styled.span`
  color: ${(props) => props.theme.gray};
  font-weight: 500;
  font-size: 1.35rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AddNewCardButton = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  height: 5rem;
  width: 5rem;
  background: ${(props) => props.theme.orange};
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;

  &:hover {
    transform: scale(1.06);
  }

  &:active {
    filter: brightness(1.1);
  }
`;
