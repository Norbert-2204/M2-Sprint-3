const InputLang = ({ value, lang, register }) => {
  return (
    <label className="cursor-pointer w-full">
      <input
        type="checkbox"
        value={value}
        className="peer hidden"
        {...register("languages")}
      />
      <span className="block w-full peer-checked:bg-blue-500">{lang}</span>
    </label>
  );
};
export default InputLang;
