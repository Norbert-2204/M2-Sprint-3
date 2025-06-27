import InputLang from "./InputLang.jsx";
import Input from "./Input.jsx";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/v4";
import SkillList from "./SkillsList";

const Register = ({ completed }) => {
  const [selected, setSelected] = useState("Online");
  const [added, setAdded] = useState("");

  const handleRadio = (value) => {
    if (selected === value) {
      setSelected(null);
      setValue("selected", null);
    } else {
      setSelected(value);
      setValue("selected", value);
    }
  };

  const handleAdded = (e) => {
    const file = e.target.files[0];
    setValue("file", file, { shouldValidate: true });
    setAdded(file ? file.name : "");
  };

  const schema = z
    .object({
      name: z.string().min(3, "Imię musi składać się z conajmniej 3 znaków"),
      surname: z
        .string()
        .min(3, "Nazwisko musi składać się z conajmniej 3 znaków"),
      email: z.string().email("Niepoprawny adres email"),
      phone: z
        .string()
        .length(9, "Numer telefonu musi składać się z 9 cyfr")
        .regex(/^\d+$/, "Pole może zawierać tylko cyfry"),
      languages: z
        .array(z.enum(["react", "html", "css", "node", "next"]))
        .min(1, "Wybierz przynajmniej jedną technologie"),
      file: z
        .file("Plik jest wymagany")
        .mime(["image/jpeg", "image/png"], "Plik musi być w formacie jpg/png"),
      selected: z.enum(["Online", "Stacjonarnie"]),
      checkbox: z.boolean(),
      skills: z.array(
        z.object({
          name: z.string(
            "Przy zaznaczonym doświadczeniu w programowaniu, lista doświadczeń nie może być pusta"
          ),
          level: z.string(
            "Przy zaznaczonym doświadczeniu w programowaniu, lista doświadczeń nie może być pusta"
          ),
        })
      ),
    })
    .refine(
      (data) => {
        if (data.checkbox) {
          return data.skills && data.skills.length > 0;
        }
        return true;
      },
      {
        message:
          "Przy zaznaczonym doświadczeniu w programowaniu, lista doświadczeń nie może być pusta",
        path: ["skills"],
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      languages: [],
      file: undefined,
      checkbox: false,
      skills: [],
      selected: "Online",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    completed(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-2 sm:p-4 gap-2">
      <h1 className="text-green-700 text-2xl sm:text-3xl font-bold text-center mb-2">
        Formularz zgłoszeniowy na kurs programowania
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[450px] sm:min-w-[350px] min-w-[280px] bg-neutral-800 p-4 rounded"
      >
        <h2 className="text-yellow-500 text-xl font-bold">Dane osobowe</h2>
        <div className="flex flex-col gap-1">
          <Input
            register={{ ...register("name") }}
            type="text"
            placeholder={"Imię"}
            errors={errors.name?.message}
          />
          <Input
            register={{ ...register("surname") }}
            type="text"
            placeholder={"Nazwisko"}
            errors={errors.surname?.message}
          />
          <Input
            register={{ ...register("email") }}
            type="email"
            placeholder={"E-mail"}
            errors={errors.email?.message}
          />
          <Input
            register={{ ...register("phone") }}
            type="text"
            placeholder={"Numer telefonu"}
            errors={errors.phone?.message}
          />
        </div>

        <h2 className="text-yellow-500 text-xl font-bold">Preferencje kursu</h2>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <h3 className="whitespace-nowrap max-[720px]:text-[12px] ">
              Wybierz formę nauki:
            </h3>
            <input
              type="radio"
              name="select"
              checked={selected === "Stacjonarnie"}
              onChange={() => handleRadio("Stacjonarnie")}
            />
            <label className="max-[720px]:text-[12px]">Stacjonarnie</label>
            <input
              type="radio"
              name="select"
              checked={selected === "Online"}
              onChange={() => handleRadio("Online")}
            />
            <label className="max-[720px]:text-[12px]">Online</label>
          </div>
          <fieldset className=" bg-gray-700  rounded-lg p-2 flex flex-col items-start ">
            <InputLang value="react" lang="React" register={register} />
            <InputLang value="node" lang="Node.js" register={register} />
            <InputLang value="html" lang="HTML" register={register} />
            <InputLang value="css" lang="CSS" register={register} />
            <InputLang value="next" lang="Next.js" register={register} />
          </fieldset>
          <p className="text-xs text-red-700 min-h-[1rem]">
            {errors.languages?.message}
          </p>
        </div>

        <label className="flex gap-2 flex-col">
          <h2 className="text-yellow-500 text-xl font-bold">Dodaj swoje CV</h2>
          <div className="flex gap-2">
            <label className="cursor-pointer rounded px-1 bg-gray-200 text-black">
              Select file
              <input
                {...register("file")}
                onChange={handleAdded}
                type="file"
                className="hidden"
              />
            </label>
            <p>{added || "No file chosen"}</p>
          </div>
          <p className="text-xs text-red-700 min-h-[1rem]">
            {errors.file?.message}
          </p>
        </label>

        <h2 className="text-yellow-500 text-xl font-bold">
          Doświadczenie w programowaniu
        </h2>
        <label className="flex gap-2">
          <input {...register("checkbox")} type="checkbox" />
          <p>Czy masz doświadczenie w programowaniu?</p>
        </label>

        {watch("checkbox") && (
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => {
                append({ name: "", level: "" });
              }}
              className="bg-emerald-700 rounded-lg text-black py-1"
            >
              Dodaj doświadczenie
            </button>
            {watch("checkbox") && errors.skills && (
              <p className="text-[10px] text-red-700 min-h-[1rem]">
                {errors.skills.message}
              </p>
            )}
            <ul className="flex flex-col gap-1">
              {fields.map((field, index) => {
                return (
                  <SkillList
                    register={register}
                    key={field.id}
                    index={index}
                    remove={remove}
                  />
                );
              })}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 rounded-lg text-black py-1 mt-2"
        >
          Wyślij zgłoszenie
        </button>
      </form>
    </div>
  );
};
export default Register;
