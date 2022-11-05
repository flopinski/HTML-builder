const fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  { stdin, stdout, exit } = process;
output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  exit,
});

rl.question('Enter your text below, honey \n', (userInput) => {
  output.write(`${userInput} \n`);
  if (userInput.toString().trim() === 'exit') {
    console.log('Have a nice day, honey!');
    rl.close()
  }
});

rl.on('line', (userInput) => {
  output.write(`${userInput} \n`);
  if (userInput.toString().trim() === 'exit') {
    console.log('Прощальное сообщение: В Git Bash для Windows версий 2.35.1-2.35.4 присутствует баг, при котором некорректно обрабатывается событие при нажатии сочетания клавиш Ctrl+C. В связи с этим, во второй задаче может не показываться прощальное сообщение при нажатии данного сочетания клавиш. Обновите Git Bash или попробуйте запускать скрипт в другом терминале. Have a nice day, honey!');
    rl.close();
  }
})

rl.on('SIGINT', (userInput) => {
  console.log('Have a nice day, honey!');
  rl.close()
})