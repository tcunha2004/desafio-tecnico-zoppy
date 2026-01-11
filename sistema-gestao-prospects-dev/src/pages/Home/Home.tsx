import {
  CarouselContainer,
  GithubImageLogo,
  MainContainer,
  Title,
  AddNewCardButton,
  ProspectCard,
  Avatar,
  ProspectInfo,
  ProspectName,
  ProspectUsername,
} from "./styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosAdd } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const prospects = [
    {
      name: "Thiago Cunha",
      username: "tcunha2004",
      avatarUrl: "https://github.com/tcunha2004.png",
    },
    {
      name: "Arturs Smirnovs",
      username: "arturssmirnovs",
      avatarUrl: "https://github.com/arturssmirnovs.png",
    },
    {
      name: "Thiago Cunha",
      username: "tcunha2004",
      avatarUrl: "https://github.com/tcunha2004.png",
    },
    {
      name: "Arturs Smirnovs",
      username: "arturssmirnovs",
      avatarUrl: "https://github.com/arturssmirnovs.png",
    },
  ];

  return (
    <MainContainer>
      <GithubImageLogo color="white" size={32} />
      <Title>
        Gerencie seus <span>prospects</span> com seus perfis do{" "}
        <span>Github</span>
      </Title>

      <CarouselContainer>
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={2}
          spaceBetween={32}
        >
          {prospects.map((prospect) => (
            <SwiperSlide key={prospect.username}>
              <ProspectCard>
                <Avatar>
                  <img
                    src={prospect.avatarUrl}
                    alt={`Avatar de ${prospect.name}`}
                    loading="lazy"
                  />
                </Avatar>

                <ProspectInfo>
                  <ProspectName>{prospect.name}</ProspectName>
                  <ProspectUsername>{prospect.username}</ProspectUsername>
                </ProspectInfo>
              </ProspectCard>
            </SwiperSlide>
          ))}
        </Swiper>

        <span className="navigate" onClick={() => navigate("/list")}>
          Ver lista completa
        </span>
      </CarouselContainer>

      <AddNewCardButton>
        <IoIosAdd color="white" size={54} />
      </AddNewCardButton>
    </MainContainer>
  );
}
