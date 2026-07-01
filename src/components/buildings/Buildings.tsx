import Building from "./Building";
import { BUILDINGS } from "../../data/sections";

export default function Buildings() {
  return (
    <>
      {BUILDINGS.map((def) => (
        <Building key={def.id} def={def} />
      ))}
    </>
  );
}
