import InputLang from "./Input";
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
    } else {
      setSelected(value);
    }
  };

  const handleAdded = (e) => {
    const file = e.target.files[0];
    setValue("file", file, { shouldValidate: true });
    setAdded(file ? file.name : "");
  };

  const schema = z.object({
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
    checkbox: z.boolean(),
    skills: z
      .array(
        z.object({
          name: z.string(),
          level: z.string(),
        })
      )
      .min(
        1,
        "Przy zaznaczonym doświadczeniu w programowaniu, lista nie może być pusta"
      ),
  });
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    completed(data);
    console.log(data);
  };
  console.log(watch("checkbox"));

  return (
    <div className="flex flex-col justify-start items-center bg gap-2">
      <h1 className="text-green-700 text-3xl font-bold">
        Formularz zgłoszeniowy na kurs programowania
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  w-96 bg-neutral-800 p-4 rounded"
      >
        <h2 className="text-yellow-500 text-xl font-bold">Dane osobowe</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-center gap-0.5">
            <input
              {...register("name")}
              type="text"
              placeholder="Imię"
              className="bg-gray-700 rounded px-2 py-1"
            />
            <p className="text-xs text-red-700 min-h-[1rem]">
              {errors.name?.message}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <input
              className="bg-gray-700 rounded px-2 py-1"
              {...register("surname")}
              type="text"
              placeholder="Nazwisko"
            />
            <p className="text-xs text-red-700 min-h-[1rem]">
              {errors.surname?.message}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <input
              className="bg-gray-700 rounded px-2 py-1"
              {...register("email")}
              type="email"
              placeholder="E-mail"
            />
            <p className="text-xs text-red-700 min-h-[1rem]">
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <input
              className="bg-gray-700 rounded px-2 py-1"
              {...register("phone")}
              type="text"
              placeholder="Numer Telefonu"
            />
            <p className="text-xs text-red-700 min-h-[1rem]">
              {errors.phone?.message}
            </p>
          </div>
        </div>

        <h2 className="text-yellow-500 text-xl font-bold">Preferencje kursu</h2>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <h3>Wybierz formę nauki:</h3>
            <input
              type="radio"
              name="select"
              checked={selected === "Stacjonarnie"}
              onChange={() => handleRadio("Stacjonarnie")}
            />
            <label>Stacjonarnie</label>
            <input
              type="radio"
              name="select"
              checked={selected === "Online"}
              onChange={() => handleRadio("Online")}
            />
            <label>Online</label>
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
        <label>
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
                  append({ skills: "" });
                }}
                className="bg-emerald-700 rounded-lg text-black py-1"
              >
                Dodaj doświadczenie
              </button>
              <p className="text-[10px] text-red-700 min-h-[1rem]">
                {errors.skills?.message}
              </p>
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
        </label>
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
