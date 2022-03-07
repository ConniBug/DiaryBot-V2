# DiaryBot-V2
[![Node.js CI](https://github.com/ConniBug/DiaryBot-V2/actions/workflows/node.js.yml/badge.svg)](https://github.com/ConniBug/DiaryBot-V2/actions/workflows/node.js.yml)

This is a discord bot designed to allow users to create private channels that they have alot of control over.

## Prerequisites

[Node JS - 14]([https://nodejs.org/en/)

# Setup

## Basic

npm install
npm start

### PM2 Setup

npm install pm2@latest -g

pm2 start bot.js

## Docker

docker build --pull --rm -f "dockerfile" -t diarybotv2:latest "."
docker run -d diarybotv2:latest

# commands
<br> 
`<prefix>info` - shows bot info
<br> 
`<prefix>create` - Will create a new diary channel that only you have access to
<br> 
`<prefix>public/private` - will make your diary public/private
<br> 
`<prefix>close` - archives the diary so only staff can see it
<br> 
`<prefix>add <userid or mention>` - Used to add people to your diary
<br> 
`<prefix>remove <userid or mention>` - Used to remove people from  your diary
<br>
`<prefix>rename <new channel name>` - Used to rename your diary!
<br>
`<prefix>commenting on/off` - used to enabled and disable all users been able to write in your diary.
<br> 
`<prefix>transfer <id/mention>` - Transfers ownership (doesn't give perms to view the channel just use commands)
<br>
`<prefix>archive` - archives the diary so only you and high ranking staff can see it (staff can unarchive them for you)
