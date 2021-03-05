import { State } from "@hookstate/core";
import Checkbox from "@src/modules/styleguide/components/Checkbox";
import Col from "@src/modules/styleguide/components/Layout/Col";
import Row from "@src/modules/styleguide/components/Layout/Row";
import Radio from "@src/modules/styleguide/components/Radio";
import Paragraph from "@src/modules/styleguide/components/Typography/Paragraph";

interface CharacteristicChooserComponentProps {
  characteristics: State<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >;
  choices: State<Record<string, unknown>>;
  messages: State<Record<string, string>>;
}

const CharacteristicChooserComponent = ({
  characteristics,
  choices,
  messages,
}: CharacteristicChooserComponentProps) => {
  return (
    <>
      {characteristics?.value?.map((char) => (
        <div key={char.name}>
          <Row style={{ margin: "1rem" }}>
            <Paragraph noMarginBottom noMarginTop>
              {messages.value[`char:${char.name}`]}
            </Paragraph>
          </Row>
          <Row style={{ margin: "1rem" }}>
            {char.type === "BOOLEAN"
              ? char.possibleValues.map((pv) => (
                  <Col xs={12} md={4} key={pv}>
                    <Radio
                      name={char.name}
                      value={pv}
                      label={messages.value[`char:${char.name}:${pv}`]}
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
                      label={messages.value[`char:${char.name}:${pv}`]}
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
                      label={messages.value[`char:${char.name}:${pv}`]}
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
