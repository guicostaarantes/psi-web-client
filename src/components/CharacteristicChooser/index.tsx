import { State } from "@hookstate/core";
import Checkbox from "@src/styleguide/Checkbox";
import Col from "@src/styleguide/Layout/Col";
import Row from "@src/styleguide/Layout/Row";
import Radio from "@src/styleguide/Radio";
import Paragraph from "@src/styleguide/Typography/Paragraph";

interface CharacteristicChooserComponentProps {
  characteristics: State<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >;
  choices: State<Record<string, unknown>>;
}

const CharacteristicChooserComponent = ({
  characteristics,
  choices,
}: CharacteristicChooserComponentProps) => {
  return (
    <>
      {characteristics?.value?.map((char) => (
        <div key={char.name}>
          <Row style={{ margin: "1rem" }}>
            <Paragraph noMarginBottom noMarginTop>
              {char.name}
            </Paragraph>
          </Row>
          <Row style={{ margin: "1rem" }}>
            {char.type === "BOOLEAN"
              ? char.possibleValues.map((pv) => (
                  <Col xs={12} md={4} key={pv}>
                    <Radio
                      name={char.name}
                      value={pv}
                      label={pv === "false" ? "Não" : "Sim"}
                      checked={choices.value[char.name] === pv}
                      onChange={() =>
                        choices.set((old) => ({ ...old, [char.name]: pv }))
                      }
                    />
                  </Col>
                ))
              : char.type === "SINGLE"
              ? char.possibleValues.map((pv) => (
                  <Col xs={12} md={4} key={pv}>
                    <Radio
                      name={char.name}
                      value={pv}
                      label={pv}
                      checked={choices.value[char.name] === pv}
                      onChange={() =>
                        choices.set((old) => ({ ...old, [char.name]: pv }))
                      }
                    />
                  </Col>
                ))
              : char.type === "MULTIPLE"
              ? char.possibleValues.map((pv) => (
                  <Col xs={12} md={4} key={pv}>
                    <Checkbox
                      name={pv}
                      label={pv}
                      checked={choices.value[char.name]?.[pv] || false}
                      onChange={() =>
                        choices.set((old) => ({
                          ...old,
                          [char.name]: {
                            ...(old as object)[char.name], // eslint-disable-line @typescript-eslint/ban-types
                            [pv]: !old[char.name]?.[pv],
                          },
                        }))
                      }
                    />
                  </Col>
                ))
              : null}
          </Row>
        </div>
      ))}
    </>
  );
};

export default CharacteristicChooserComponent;
