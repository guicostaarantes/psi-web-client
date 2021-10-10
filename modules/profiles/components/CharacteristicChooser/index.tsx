import { State, useState } from "@hookstate/core";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import {
  PATIENT_CHARACTERISTIC_PREFIX,
  PSYCHOLOGIST_CHARACTERISTIC_PREFIX,
} from "@psi/profiles/constants/characteristicPrefixes";
import useCharacteristics from "@psi/profiles/hooks/useCharacteristics";
import { Characteristic, Role } from "@psi/shared/graphql";
import Checkbox from "@psi/styleguide/components/Checkbox";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import Radio from "@psi/styleguide/components/Radio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface CharacteristicChooserComponentProps {
  characteristic: Characteristic;
  choice: State<unknown>;
}

const CharacteristicChooserComponent = ({
  characteristic,
  choice,
}: CharacteristicChooserComponentProps) => {
  const { role } = useCurrentUser();

  const { messages } = useCharacteristics();

  const prefix =
    role === Role.Patient
      ? PATIENT_CHARACTERISTIC_PREFIX
      : PSYCHOLOGIST_CHARACTERISTIC_PREFIX;

  return (
    <>
      <Row style={{ margin: "1rem" }}>
        <Paragraph noMarginBottom noMarginTop>
          {messages[`${prefix}:${characteristic.name}`]}
        </Paragraph>
      </Row>
      <Row style={{ margin: "1rem" }}>
        {characteristic.type === "BOOLEAN" || characteristic.type === "SINGLE"
          ? characteristic.possibleValues
              .filter(
                (pv) => messages[`${prefix}:${characteristic.name}:${pv}`],
              )
              .map((pv) => (
                <RadioCharacteristicSelector
                  key={`${characteristic.name}:${pv}`}
                  charName={characteristic.name}
                  choice={choice}
                  message={messages[`${prefix}:${characteristic.name}:${pv}`]}
                  pv={pv}
                />
              ))
          : characteristic.type === "MULTIPLE"
          ? characteristic.possibleValues
              .filter(
                (pv) => messages[`${prefix}:${characteristic.name}:${pv}`],
              )
              .map((pv) => (
                <CheckboxCharacteristicSelector
                  key={`${characteristic.name}:${pv}`}
                  charName={characteristic.name}
                  choice={choice}
                  message={messages[`${prefix}:${characteristic.name}:${pv}`]}
                  pv={pv}
                />
              ))
          : null}
      </Row>
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

  const md = charName === "issues" ? 12 : 4;

  return (
    <Col xs={12} md={md} key={pv} style={{ padding: "0.5rem" }}>
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
