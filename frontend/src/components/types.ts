
export interface Page {
  title: string;
  name: string;
  href: Href;
}

export enum Href {
  Main = "/",
  Vesp = "/vesp",
  Dry = "/dry",
  Fabric = "/fabric",
  PSK = "/psk",
  Complex = "/complex",
  Rudnik = "/rudnik",
  Air = "air"
}
