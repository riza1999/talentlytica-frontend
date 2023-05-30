import { useState } from "react";

const initArray = Array.from({ length: 10 }, () => Array(4).fill(1));

function App() {
  const [data, setData] = useState(initArray);

  const dataOnChange = (e, i, j) => {
    setData((oldData) => {
      const newArray = [...oldData];
      newArray[i][j] = Number(e.target.value);

      return newArray;
    });
  };

  const getJsonAspek = (aspek) => {
    const map = new Map();

    data.forEach((mahasiswa, index) => {
      map.set(`mahasiswa_${index + 1}`, mahasiswa[aspek]);
    });

    return Object.fromEntries(map);
  };

  const handleButton = () => {
    const map = new Map();
    for (let i = 0; i < 4; i++) {
      map.set(`aspek_penilaian_${i + 1}`, getJsonAspek(i));
    }

    const jsonData = Object.fromEntries(map);

    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "data.json";

    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen text-center py-8">
      <div className="container max-w-screen-md flex flex-col justify-center">
        <h1 className="text-3xl">Aplikasi Penilaian Mahasiswa</h1>
        <TablePenilaian data={data} dataOnChange={dataOnChange} />
        <div className="mt-4">
          <button
            onClick={handleButton}
            className="rounded bg-gray-600 px-4 py-2 float-right"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

const SelectNilai = ({ value, dataOnChange, i, j }) => {
  return (
    <select
      onChange={(e) => {
        dataOnChange(e, i, j);
      }}
      className="text-black w-full"
      value={value}
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
    </select>
  );
};

const TablePenilaian = ({ data, dataOnChange }) => {
  return (
    <table className="">
      <thead>
        <tr>
          <td></td>
          <td>Aspek penilaian 1</td>
          <td>Aspek penilaian 2</td>
          <td>Aspek penilaian 3</td>
          <td>Aspek penilaian 4</td>
        </tr>
      </thead>
      <tbody>
        {data.map((penilaian, index) => {
          return (
            <tr key={index}>
              <td>Mahasiswa {index + 1}</td>
              <td>
                <SelectNilai
                  value={penilaian[0]}
                  dataOnChange={dataOnChange}
                  i={index}
                  j={0}
                />
              </td>
              <td>
                <SelectNilai
                  value={penilaian[1]}
                  dataOnChange={dataOnChange}
                  i={index}
                  j={1}
                />
              </td>
              <td>
                <SelectNilai
                  value={penilaian[2]}
                  dataOnChange={dataOnChange}
                  i={index}
                  j={2}
                />
              </td>
              <td>
                <SelectNilai
                  value={penilaian[3]}
                  dataOnChange={dataOnChange}
                  i={index}
                  j={3}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default App;
