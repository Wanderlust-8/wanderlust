import React from "react";

export default function ContactInputBox({
  placeholder,
  name,
  value,
  type,
  onChange,
}) {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none"
      />
    </div>
  );
}
