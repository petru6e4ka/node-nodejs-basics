import { Transform } from 'node:stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(data, _, callback) {
      const reversedData = data.toString().split('').reverse().join('');
      this.push(reversedData);
      callback();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
