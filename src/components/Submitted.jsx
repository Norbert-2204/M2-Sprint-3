const Submitted = ({ data }) => {
  const imageUrl = URL.createObjectURL(data.file);
  console.log(data.skills);
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1 className="text-green-700 text-3xl font-bold">Dane z formularza</h1>
      <div className="flex flex-col  w-96 bg-neutral-800 p-4 rounded justify-center items-start bg gap-2">
        <div>
          <h2 className="text-yellow-500 text-xl font-bold">Dane Osobowe</h2>
          <p>{data.name}</p>
          <p>{data.surname}</p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
        <div>
          <h2 className="text-yellow-500 text-xl font-bold">
            Doświadczenie w programowaniu
          </h2>
          <ul>
            {data.skills.map((skill, index) => {
              return (
                <li key={index}>
                  {skill.name} {skill.level}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-yellow-500 text-xl font-bold">
            Preferencje kursu
          </h2>
          <p>Typ kursu: {data.selected}</p>
          <p>Preferowane technologie:</p>
        </div>
        <div>
          <h2 className="text-yellow-500 text-xl font-bold">
            Curriculum vitae
          </h2>
          <img className="w-25 h-35" src={imageUrl} alt="cv" />
        </div>
      </div>
    </div>
  );
};
export default Submitted;
