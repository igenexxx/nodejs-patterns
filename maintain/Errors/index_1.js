//При синхронном стиле
fs.readFile('foo.txt', 'utf8', (err, data) => {
  if(err)
    handleError(err);
  else
    processData(data);
});

//++++++++++++++++++++++++++++++++++++++++++++++++++
//При асинхронном стиле

const fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if(err)
//распространение ошибки и выход из текущей функции
      return callback(err);
    try {
//анализ содержимого файла
      parsed = JSON.parse(data);
    } catch(err) {
//перехват обрабатываемых ошибок
      return callback(err);
    }
//ошибок нет, передаются только данные
    callback(null, parsed);
  });
};

//return callback - чтобы сразу выйти из функции не продолжая выполнение


//Неперехваченные исключения
process.on('uncaughtException', (err) => {
  console.error('This will catch at last the ' +
    'JSON parsing exception: ' + err.message);
// Прерывание приложения с возвратом 1 (ошибка)
// в качестве кода завершения:
// если опустить эту строку, работа приложения
// будет продолжена
  process.exit(1);
});