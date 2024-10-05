const parseArgs = () => {
  const [, , ...args] = process.argv;

  console.log(
    args
      .reduce((prev, elem, i) => {
        if (i % 2) {
          return (prev += `${elem}, `);
        }

        return (prev += `${elem.slice(2)} is `);
      }, '')
      .slice(0, -2)
  );
};

parseArgs();
