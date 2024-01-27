import { buttons } from "../buttons";
import { client } from "../client";
import { commands } from "../commands";
import { modals } from "../modals";
import { ActivityType, Events } from "discord.js";

const activities = [
  "Play the latest games",
  "Search the web freely",
  "Unleash your freedom",
  "Game on!",
  "Anywhere, anytime",
  "No limits, no blocks",
  "Unlock the fun",
  "Play unrestricted",
  "No barriers",
  "Perfection"
];

export function bindReadyEvent(): void {
  client.on(Events.ClientReady, async () => {
    setInterval(() => {
      const activity =
        activities[Math.floor(Math.random() * activities.length)];

      client.user?.setActivity({
        type: ActivityType.Custom,
        name: activity
      });
    }, 10000);

    for (const file of commands) {
      const { command, handle } = file;
      await client.application?.commands.create(command);

      client.commands.set(command.name, handle);
    }

    for (const file of modals) {
      const { id, handle } = file;

      client.modals.set(id, handle);
    }

    for (const file of buttons) {
      const { name, handle } = file;

      client.buttons.set(name, handle);
    }

    console.log(`Logged in as ${client.user?.tag}`);
  });
}
