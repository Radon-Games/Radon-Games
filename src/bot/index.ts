import { client } from "./client";
import { bindInteractionCreateEvent } from "./events/interactionCreate";
import { bindReadyEvent } from "./events/ready";

bindReadyEvent();
bindInteractionCreateEvent();

export default client;
