import ProfileIcon from "../../assets/Create Profile.svg";
import HeaderCard from "../common/pageHeader/HeaderCard";

const ProfileCreationHeaderCard = () => {
  return (
    <HeaderCard
      cardHeading={`Profile Setuo`}
      cardText="Create your profile and be part of a community that celebrates every voice. Let’s build a space where everyone belongs!"
      cardImageUrl={ProfileIcon}
    />
  );
};

export default ProfileCreationHeaderCard;
