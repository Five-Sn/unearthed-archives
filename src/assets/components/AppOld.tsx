import { useState } from "react";
import ListGroup from "./ListGroup";
import Alert from "./Alert";
import ButtonExercise from "./ButtonExercise";

function AppOld() {
  const [alertVisible, setAlertVisibility] = useState(false);

  let itemLabelCritters = [
    "Cornpy",
    "Thicc Brungus",
    "Larva",
    "Peeoui",
    "Dinkle",
    "Galumpin Dop",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          WARNING WARNING WARNING WARNING
        </Alert>
      )}
      <ButtonExercise
        text="Splengus"
        onClick={() => setAlertVisibility(true)}
      />
    </>
  );
}

export default AppOld;
