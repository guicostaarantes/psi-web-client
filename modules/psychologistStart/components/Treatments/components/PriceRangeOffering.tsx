import formatValueRange from "@psi/shared/utils/formatValueRange";
import Card from "@psi/styleguide/components/Card";

interface PriceRangeOfferingProps {
  name: string;
  minimumPrice: number;
  maximumPrice: number;
  count: number;
}

const PriceRangeOffering = ({
  minimumPrice,
  maximumPrice,
  count,
}: PriceRangeOfferingProps) => {
  return (
    <>
      <Card floating>
        <div className="wrapper">
          {count} tratamento{count !== 1 && "s"} com valor{" "}
          {formatValueRange(minimumPrice, maximumPrice)}
        </div>
      </Card>
      <style jsx>{`
        .wrapper {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default PriceRangeOffering;
