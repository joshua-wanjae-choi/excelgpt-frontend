const productLetters = (args: IProductLetters) => {
  const defaultArgs = {
    prefix: "",
  };
  args = { ...defaultArgs, ...args };

  if (args.numLoop < 1) {
    args.result.push(`${args.prefix}`);
    return;
  }
  for (let l of args.target) {
    productLetters({
      target: args.target,
      result: args.result,
      numLoop: args.numLoop - 1,
      prefix: `${args.prefix}${l}`,
      lenResult: args.lenResult,
    });

    if (args.lenResult && args.result.length >= args.lenResult) {
      return;
    }
  }
};

export const getAlphabetsColNames = (numCols: number) => {
  const result: string[] = [];
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let i = 1; i < Infinity; i++) {
    const powed = Math.pow(alphabets.length, i);
    productLetters({
      target: alphabets,
      result: result,
      numLoop: i,
      lenResult: numCols,
    });

    if (numCols < powed) {
      // console.log('powed', powed);
      // console.log('i', i);
      break;
    }
  }
  // console.log('result', result);
  return result;
};
