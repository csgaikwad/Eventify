/* eslint-disable react/prop-types */
export default function CustomInput({
  label,
  type,
  value,
  onChange,
  name,
  min,
}) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
      />
    </div>
  );
}
