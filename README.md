# Palworld Admin

Administrate your dedicated Palworld server right from the web browser. It uses RCON to communicate with the server.

## Why ?

All the RCON administration tool I found were either pretty basic or only worked on Windows. I wanted a tool that I can
access from anywhere to manage my dedicated Palworld server.

## Features

- [x] Display the online player list
- [x] Kick/ban player from the player
- [x] Broadcast message to all players (with space thanks
  to [Darkhand81](https://github.com/Darkhand81/Palworld_broadcast_encoding_bug)!)

More to come! See
the [issues](https://github.com/na-ji/palworld-admin/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for the roadmap.

## Usage

### Docker image

If you're using [thijsvanloef/palworld-server-docker](https://github.com/thijsvanloef/palworld-server-docker)
or [jammsen/docker-palworld-dedicated-server](https://github.com/jammsen/docker-palworld-dedicated-server) image, you
can easily add the palworld-admin to your docker compose configuration.

```yaml
version: '3.9'
services:
  # your palworld server container
  palworld:
    hostname: palworld
  palworld-admin:
    container_name: palworld-admin
    hostname: palworld-admin
    image: thenaji27/palworld-admin:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:2093:2093"
    volumes:
      - ./data:/usr/src/app/data
    environment:
      - TZ=Europe/Paris
      - RCON_HOST=<palword server container name>
      - RCON_PORT=25575
      - RCON_PASSWORD=<password>
      # Optional, if you want to use the Steam API to display more information about the user
      # Get one at https://steamcommunity.com/dev/apikey
      - STEAM_API_KEY= <your API key>
      # Optional Discord Auth. Leave empty to disable
      - AUTH_DISCORD_ID=
      - AUTH_DISCORD_SECRET=
      # If auth is enabled, fill this with a secret key
      - AUTH_SECRET=
      # To filter users by guilds and roles, fill this
      - AUTH_BOT_TOKEN=
      - AUTH_DISCORD_ALLOWED_GUILDS=123,456
      - AUTH_DISCORD_ALLOWED_ROLES=789,101112
```

## Development

### Stack

- [Bun](https://bun.sh/) and [ElysiaJS](https://elysiajs.com/) for the backend
- [NextJS](https://nextjs.org/) for the frontend

### Prerequisites

- Bun v1.x
- Node.js v20.x

### Installation

Clone the repository and install the dependencies

```bash
git clone https://github.com/na-ji/palworld-admin.git
cd palworld-admin
bun install
```

### Configuration

Copy the example configuration file and fill it

```bash
cp .env.example .env
```

### Dev environment

```bash
bun run dev
```
