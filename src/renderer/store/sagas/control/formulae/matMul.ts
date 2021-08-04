// matA: 3x3
// matB: 3x6

const matMul = (matA: number[][], matB: number[][]) => {
  const matBtranspose = matB[0].map((_, colIndex) =>
    matB.map((row) => row[colIndex])
  );

  return matA.map((matArow, rowIndex) =>
    matBtranspose.map(
      (matBcolumn, columnIndex) =>
        //
        matArow
          .map((matAelement, index) => matAelement * matBcolumn[index])
          .reduce((a, b) => a + b, 0)
      //
    )
  );
};

export default matMul;
