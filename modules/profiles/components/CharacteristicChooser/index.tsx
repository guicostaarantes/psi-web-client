import { State, useState } from "@hookstate/core";
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
              {char.type === "BOOLEAN" || char.type === "SINGLE"
                ? char.possibleValues
                    .filter(
                      (pv) => messages.value[`${prefix}:${char.name}:${pv}`],
                    )
                    .map((pv) => (
                      <RadioCharacteristicSelector
                        key={`${char.name}:${pv}`}
                        charName={char.name}
                        choice={choices[char.name]}
                        message={messages.value[`${prefix}:${char.name}:${pv}`]}
                        pv={pv}
                      />
                    ))
                : char.type === "MULTIPLE"
                ? char.possibleValues
                    .filter(
                      (pv) => messages.value[`${prefix}:${char.name}:${pv}`],
                    )
                    .map((pv) => (
                      <CheckboxCharacteristicSelector
                        key={`${char.name}:${pv}`}
                        charName={char.name}
                        choice={choices[char.name]}
                        message={messages.value[`${prefix}:${char.name}:${pv}`]}
                        pv={pv}
                      />
                    ))
                : null}
            </Row>
          </div>
        ))}
    </>
  );
};

interface RadioCharacteristicSelectorProps {
  charName: string;
  choice: State<unknown>;
  message: string;
  pv: string;
}

const RadioCharacteristicSelector = ({
  charName,
  choice,
  message,
  pv,
}: RadioCharacteristicSelectorProps) => {
  const internalChoice = useState(choice);

  return (
    <Col xs={12} md={4} key={pv} style={{ padding: "0.5rem" }}>
      <Radio
        name={charName}
        value={pv}
        label={message}
        checked={internalChoice.value === pv}
        onChange={() => internalChoice.set(pv)}
      />
    </Col>
  );
};

interface CheckboxCharacteristicSelectorProps {
  charName: string;
  choice: State<unknown>;
  message: string;
  pv: string;
}

const CheckboxCharacteristicSelector = ({
  charName,
  choice,
  message,
  pv,
}: CheckboxCharacteristicSelectorProps) => {
  const internalChoice = useState(choice[pv]);

  return (
    <Col xs={12} md={4} key={pv} style={{ padding: "0.5rem" }}>
      <Checkbox
        name={pv}
        label={message}
        checked={internalChoice.value || false}
        onChange={() => internalChoice.set((old) => !old)}
      />
    </Col>
  );
};

export default CharacteristicChooserComponent;
