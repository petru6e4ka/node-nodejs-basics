const parseEnv = () => {
  const enironment = process.env;

  const varilables = [];

  for (const variable in enironment) {
    if (variable.startsWith('RSS_')) {
      varilables.push(`${variable}=${enironment[variable]}`);
    }
  }

  console.log(varilables.join('; '));
};

parseEnv();
