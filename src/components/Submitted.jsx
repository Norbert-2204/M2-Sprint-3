const Submitted = ({ data }) => {
  const imageUrl = URL.createObjectURL(data.file);

  return (
    <div className="p-2 sm:p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-4 text-green-700 text-2xl sm:text-3xl font-bold text-center">
        Dane z formularza
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-[450px] sm:min-w-[350px] min-w-[280px] bg-neutral-800 p-4 rounded-md">
        <div className="flex flex-col gap-3">
          <h2 className="text-yellow-500 text-lg sm:text-xl font-bold">
            Dane Osobowe
          </h2>
          <p className="text-sm sm:text-base">{data.name}</p>
          <p className="text-sm sm:text-base">{data.surname}</p>
          <p className="text-sm sm:text-base">{data.email}</p>
          <p className="text-sm sm:text-base">{data.phone}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-yellow-500 text-lg sm:text-xl font-bold">
            Doświadczenie w programowaniu
          </h2>
          <ul className="list-disc list-inside text-sm sm:text-base">
            {data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <li key={index}>
                  {skill.name} {skill.level}
                </li>
              ))
            ) : (
              <li>Brak Doświadczeń</li>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-yellow-500 text-lg sm:text-xl font-bold">
            Preferencje kursu
          </h2>
          <p className="text-sm sm:text-base">Typ kursu: {data.selected}</p>
          <p className="text-sm sm:text-base">Preferowane technologie:</p>
          <ul className="list-disc list-inside text-sm sm:text-base">
            {data.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-yellow-500 text-lg sm:text-xl font-bold">
            Curriculum vitae
          </h2>
          <img className=" w-[100px] h-[150px] " src={imageUrl} alt="cv" />
        </div>
      </div>
    </div>
  );
};

export default Submitted;
