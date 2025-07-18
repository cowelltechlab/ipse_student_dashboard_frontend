import HomeIcon from "../../assets/Home Page.svg";
import useAuth from "../../contexts/useAuth";
import HeaderCard from "../common/pageHeader/HeaderCard";

const HomeHeaderCard = () => {
  const { first_name, last_name } = useAuth();

  return (
    <HeaderCard
      cardHeading={`Hello, ${first_name} ${last_name}`}
      cardText="Let's make space for every story, celebrate every voice, and build
              a world where everyone belongs."
      cardImageUrl={HomeIcon}
    />
  );
};

export default HomeHeaderCard;
