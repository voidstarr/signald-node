# signald-node - client library for [signald](https://gitlab.com/thefinn93/signald/-/tree/master)

This project is still a WIP; however, it is still usable.

## Install:
```bash
npm i signald-node
```

## Usage:
```js
const Signal = require("signald-node");
var client = new Signal("+1234567890");
client.link().then(r => {
    console.log(r);
}).catch(err => {
    console.log(err);
});
```

All of the message types laid out by [signald's socket protocol](https://gitlab.com/thefinn93/signald/-/tree/master#socket-protocol) are exposed via functions on the `Signal` object. Those functions return Promises.

## Feedback
Please let me know of any bugs, crashes, unstableness or wonkiness in the issues or reach out to me on #signald on freenode.
