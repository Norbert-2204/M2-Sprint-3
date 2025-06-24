const SkillList = ({ register, index, remove }) => {
  return (
    <li className="flex flex-1 gap-2 items-center justify-between">
      <select
        {...register(`skills.${index}.name`)}
        className="flex-1  basis-0 min-w-0 bg-gray-700 rounded px-1 py-1.5 "
      >
        <option>Javascript</option>
        <option>Python</option>
        <option>C++</option>
        <option>Inne</option>
      </select>
      <select
        {...register(`skills.${index}.level`)}
        className="flex-1 basis-0 min-w-0 bg-gray-700 rounded px-1 py-1.5 "
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-red-600 rounded  flex-1  basis-0 min-w-0 px-1 py-1.5"
      >
        Usuń
      </button>
    </li>
  );
};
export default SkillList;
