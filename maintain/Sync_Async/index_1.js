//Неверный пример
//Непредсказуемая функция
const fs = require('fs');
const cache = {};
function inconsistentRead(filename, callback) {
  if(cache[filename]) {
//вызывается синхронно
    callback(cache[filename]);
  } else {
//асинхронная функция
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value));
  });
  return {
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
  console.log('First call data: ' + data);
//...чуть позже попытаемся вновь прочитать данные из
//того же файла
  const reader2 = createFileReader('data.txt');
  reader2.onDataReady( data => {
    console.log('Second call data: ' + data);
  });
});

//Предыдущий код выведет следующее:
//First call data: some data

// ================== Способы исправления =================
//1. Синхронный код
{
  const fs = require('fs');
  const cache = {};
  function consistentReadSync(filename) {
    if(cache[filename]) {
      return cache[filename];
    } else {
      cache[filename] = fs.readFileSync(filename, 'utf8');
      return cache[filename];
    }
  }
}

//2. Отложенное выполнение
{
  const fs = require('fs');
  const cache = {};
  function consistentReadAsync(filename, callback) {
    if(cache[filename]) {
      //Выполнить позже с помощью метода process.nextTick(),
      //откладывающего выполнение функции до следующей итерации цикла событий
      process.nextTick(() => callback(cache[filename]));
    } else {
//асинхронная функция
      fs.readFile(filename, 'utf8', (err, data) => {
        cache[filename] = data;
        callback(data);
      });
    }
  }
}
