interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
  errors?: string[]; // optional
}

export default function Input({
  type,
  placeholder,
  required,
  name,
  errors = [], // Default to empty array
}: InputProps) {
  return (
    <>
      <input
        className="w-full min-w-[350px] bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {errors.map((error, index) => (
        <div key={index} className="text-sm font-semibold text-red-600">
          {error}
        </div>
      ))}
    </>
  );
}
