const base = 'http://localhost:3000';
const garage = `${base}/garage`;
// const winners = `${base}/winners`;

export const getCars = async () => {
  const response = await fetch(`${garage}`);
  const items = await response.json();

  return {
    items: await Promise.all(items),
  };
};
