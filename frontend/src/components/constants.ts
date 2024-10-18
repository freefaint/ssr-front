import { FC } from "react";
import FabricPage from "../pages/fabric";
import MainPage from "../pages/main";
import RudnikPage from "../pages/rudnik";
import VespPage from "../pages/vesp";
import { Page, Href } from "./types";

export const PAGES: Page[] = [
  {
    name: "Главная",
    title: "index",
    href: Href.Index
  },
  {
    name: "Главная",
    title: "main",
    href: Href.Main
  },
  {
    name: "ВЭСП",
    title: "vesp",
    href: Href.Vesp
  },
  {
    name: "Комплекс сушки",
    title: "dry",
    href: Href.Dry
  },
  {
    name: "Фабрика",
    title: "fabric",
    href: Href.Fabric
  },
  {
    name: "ПСК",
    title: "psk",
    href: Href.PSK
  },
  {
    name: "Закладочный комплекс",
    title: "complex",
    href: Href.Complex
  },
  {
    name: "Рудник подземный",
    title: "rudnik",
    href: Href.Rudnik
  },
  {
    name: "Газопоршневая",
    title: "air",
    href: Href.Air
  },
];

export const COMPONENTS: Partial<Record<Href, FC>> = {
  [Href.Main]: MainPage,
  [Href.Rudnik]: RudnikPage,
  [Href.Vesp]: VespPage,
  [Href.Fabric]: FabricPage
};