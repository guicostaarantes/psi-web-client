import StartTreatmentCard from "@psi/profiles/components/PsychologistProfile/components/StartTreatmentCard";
import { usePsychologistProfileQuery } from "@psi/shared/graphql";
import Card from "@psi/styleguide/components/Card";
import Image from "@psi/styleguide/components/Image";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface PsychologistProfileProps {
  id: string;
}

const PsychologistProfile = ({ id }: PsychologistProfileProps) => {
  const { data } = usePsychologistProfileQuery({ variables: { id } });

  const { likeName, fullName, bio, avatar } = data?.psychologistProfile || {};

  return (
    <>
      <Card>
        <div className="center">
          <div className="image-wrapper">
            <Image
              circle
              label={`Avatar de ${likeName}`}
              authSrc={
                avatar
                  ? `${process.env.NEXT_PUBLIC_PSI_STATIC_URI}/${avatar}`
                  : ""
              }
              src="avatar.webp"
            />
          </div>
          <MainTitle noMarginBottom>{likeName}</MainTitle>
          <Paragraph noMarginBottom>{fullName}</Paragraph>
        </div>
      </Card>
      <Card>
        <MediumTitle noMarginTop>Sobre mim</MediumTitle>
        <Paragraph noMarginBottom>{bio}</Paragraph>
      </Card>
      <StartTreatmentCard psyId={id} likeName={likeName} />
      <style jsx>{`
        .center {
          align-items: center;
          display: flex;
          flex-direction: column;
        }
        .image-wrapper {
          height: 10rem;
          width: 10rem;
        }
      `}</style>
    </>
  );
};

export default PsychologistProfile;
