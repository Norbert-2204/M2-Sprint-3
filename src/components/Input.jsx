const Input = ({ register, type = "text", placeholder, errors }) => {
  return (
    <label className="flex flex-col justify-center gap-1">
      <input
        className="bg-gray-700 rounded px-2 py-1"
        {...register}
        type={type}
        placeholder={placeholder}
      />
      <p className="text-xs text-red-700 min-h-[1rem]">{errors}</p>
    </label>
  );
};
export default Input;
