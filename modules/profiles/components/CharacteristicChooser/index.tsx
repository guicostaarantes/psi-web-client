import { State } from "@hookstate/core";
import Checkbox from "@psi/styleguide/components/Checkbox";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import Radio from "@psi/styleguide/components/Radio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

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
  prefix: string;
}

const CharacteristicChooserComponent = ({
  characteristics,
  choices,
  messages,
  prefix,
}: CharacteristicChooserComponentProps) => {
  return (
    <>
      {characteristics?.value
        ?.filter((char) => messages.value[`${prefix}:${char.name}`])
        .map((char) => (
          <div key={char.name}>
            <Row style={{ margin: "1rem" }}>
              <Paragraph noMarginBottom noMarginTop>
                {messages.value[`${prefix}:${char.name}`]}
              </Paragraph>
            </Row>
            <Row style={{ margin: "1rem" }}>
              {char.type === "BOOLEAN"
                ? char.possibleValues
                    .filter(
                      (pv) => messages.value[`${prefix}:${char.name}:${pv}`],
                    )
                    .map((pv) => (
                      <Col
                        xs={12}
                        md={4}
                        key={pv}
                        style={{ padding: "0.5rem" }}
                      >
                        <Radio
                          name={char.name}
                          value={pv}
                          label={messages.value[`${prefix}:${char.name}:${pv}`]}
                          checked={choices.value[char.name] === pv}
                          onChange={() =>
                            choices.set((old) => ({ ...old, [char.name]: pv }))
                          }
                        />
                      </Col>
                    ))
                : char.type === "SINGLE"
                ? char.possibleValues
                    .filter(
                      (pv) => messages.value[`${prefix}:${char.name}:${pv}`],
                    )
                    .map((pv) => (
                      <Col
                        xs={12}
                        md={4}
                        key={pv}
                        style={{ padding: "0.5rem" }}
                      >
                        <Radio
                          name={char.name}
                          value={pv}
                          label={messages.value[`${prefix}:${char.name}:${pv}`]}
                          checked={choices.value[char.name] === pv}
                          onChange={() =>
                            choices.set((old) => ({ ...old, [char.name]: pv }))
                          }
                        />
                      </Col>
                    ))
                : char.type === "MULTIPLE"
                ? char.possibleValues
                    .filter(
                      (pv) => messages.value[`${prefix}:${char.name}:${pv}`],
                    )
                    .map((pv) => (
                      <Col
                        xs={12}
                        md={4}
                        key={pv}
                        style={{ padding: "0.5rem" }}
                      >
                        <Checkbox
                          name={pv}
                          label={messages.value[`${prefix}:${char.name}:${pv}`]}
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
