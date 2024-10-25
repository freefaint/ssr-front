
export interface Page {
  title: string;
  name: string;
  href: Href;
}

export interface NotificationSubscription
{
	id: string;
	fullName: string;
	userId: string;
	synapseId: string;
	subscriptionChannelId: string;
	creationDate: string;
	lastTriggerDate: string;
	enabled: boolean;
}

export enum Href {
  Index = "/index.html",
  Main = "/",
  Vesp = "/vesp",
  Dry = "/dry",
  Fabric = "/fabric",
  PSK = "/psk",
  Complex = "/complex",
  Rudnik = "/rudnik",
  Air = "air",
  Channels = "/channels",
  Subscriptions = "/channels/:id/:name",
}
