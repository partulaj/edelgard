import { Character, Faction } from "./type";

/* Constants */

export const orderedCharacters: Character[] = [
  "Byleth M",
  "Byleth F",
  "Edelgard",
  "Dimitri",
  "Claude",
  "Hubert",
  "Ferdinand",
  "Linhardt",
  "Caspar",
  "Bernadetta",
  "Dorothea",
  "Petra",
  "Dedue",
  "Felix",
  "Ashe",
  "Sylvain",
  "Mercedes",
  "Annette",
  "Ingrid",
  "Lorenz",
  "Raphael",
  "Ignatz",
  "Lysithea",
  "Marianne",
  "Hilda",
  "Leonie",
  "Seteth",
  "Flayn",
  "Hanneman",
  "Manuela",
  "Gilbert",
  "Alois",
  "Catherine",
  "Shamir",
  "Cyril",
  "Rhea",
];

export const characterFactions: { [char in Character]?: Faction } = {
  Edelgard: "empire",
  Dimitri: "holy",
  Claude: "alliance",
  Hubert: "empire",
  Ferdinand: "empire",
  Linhardt: "empire",
  Caspar: "empire",
  Bernadetta: "empire",
  Dorothea: "empire",
  Petra: "empire",
  Dedue: "holy",
  Felix: "holy",
  Ashe: "holy",
  Sylvain: "holy",
  Mercedes: "holy",
  Annette: "holy",
  Ingrid: "holy",
  Lorenz: "alliance",
  Raphael: "alliance",
  Ignatz: "alliance",
  Lysithea: "alliance",
  Marianne: "alliance",
  Hilda: "alliance",
  Leonie: "alliance",
  Seteth: "church",
  Flayn: "church",
  Hanneman: "church",
  Manuela: "church",
  Gilbert: "church",
  Alois: "church",
  Catherine: "church",
  Shamir: "church",
  Cyril: "church",
  Rhea: "church",
};

/* Utility */
export function isCharacter(char: string): char is Character {
  return (orderedCharacters as string[]).includes(char);
}
