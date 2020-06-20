# Discord Reddit bot

Discord bot for buildapcsales subreddit sales notification

## Getting Started

### Prerequisites

* Please create a `secrets.js` file in the root of the project with the appropriate config. This file will be used to load up your config. Or copy the following command.

* Node version 12+

### RUN
Setup the discord bot from https://discord.com/developers/applications. You can refer guide: https://discordjs.guide/preparations/setting-up-a-bot-application.html

```
node index.js
```

### Usage
```
!switch <search-term>
```
To start searching periodically for a perticular item.

```
!stop
```
To stop searching and being notified about the item.
