const Discord = require('discord.js');
const axios = require('axios');
const _get = require('lodash/get');
const { token, minutes } = require('./secrets');

const client = new Discord.Client();

const prefix = '!';
let lastId = '';

client.once('ready', () => {
  console.log('ready');
});

const onMessage = (message) => {
  const { content } = message;
  if (content.startsWith(`${prefix}search`)) {
    const begin = content.indexOf(' ');
    if (begin === -1 || begin === content.length - 1) {
      return;
    }
    // remove previous interval if any
    clearInterval(searchReddit);
    const searchTerm = content.substr(begin + 1, content.length).toLowerCase();
    message.channel.send(`Started looking for deals with term: ${searchTerm}`);
    // set new interval
    setInterval(searchReddit, minutes * 60 * 1000, message, searchTerm);
  }
  else if (content === `${prefix}stop`) {
    clearInterval(searchReddit);
    message.channel.send('Stopped looking for deals');
  }
};

const searchReddit = async (message, searchTerm) => {
  if (searchTerm == '') {
    return;
  }

  const response = await axios.get(`https://www.reddit.com/r/buildapcsales/new/.json?before=${lastId}`);
  if (response && response.status === 200) {
    const listings = _get(response, 'data.data.children');

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i].data;
      if (!listing) continue;

      if (i === 0) {
        lastId = listing.name;
      }

      if (_get(listing, 'title', '').toLowerCase().includes(searchTerm) ||
				_get(listing, 'link_flair_text', '').toLowerCase().includes(searchTerm)) {
        const { title, url, permalink } = listing;
        message.channel.send(`${title}: ${url || `https://reddit.com${permalink}`}`);
      }
    }
  }
};

client.on('message', onMessage);

client.login(token);

