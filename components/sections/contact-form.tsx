"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { company } from "@/data/site";
const enquiryTypes = [
  "Cybersecurity",
  "Compliance / GRC",
  "Secure Engineering",
  "Incident Response",
  "Certanika Lite",
  "Partnership",
  "General enquiry",
];
export function ContactForm() {
  const [emailLink, setEmailLink] = useState("");
  return (
    <form
      className="contact-form"
      onChange={() => setEmailLink("")}
      onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const body =
          "Name: " +
          values.get("name") +
          "\nBusiness email: " +
          values.get("email") +
          "\nCompany: " +
          values.get("company") +
          "\nPhone: " +
          values.get("phone") +
          "\n\n" +
          values.get("message");
        setEmailLink(
          "mailto:" +
            company.email +
            "?subject=" +
            encodeURIComponent("HabileSec enquiry: " + values.get("reason")) +
            "&body=" +
            encodeURIComponent(body),
        );
      }}
    >
      <div className="form-grid">
        <Field label="Name" name="name" required />
        <Field label="Business email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Phone" name="phone" type="tel" />
        <label className="form-field wide">
          What would you like to discuss?
          <select name="reason">
            {enquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="form-field wide">
          Your message *
          <textarea name="message" required maxLength={2000} rows={5} />
        </label>
      </div>
      <button className="site-button button-primary mt-8" type="submit">
        Prepare enquiry
        <ArrowRight size={18} />
      </button>
      {emailLink && (
        <div className="form-result" role="status">
          <p>Your enquiry is ready to send by email.</p>
          <a className="arrow-link" href={emailLink}>
            Open email draft
            <ArrowRight size={18} />
          </a>
        </div>
      )}
    </form>
  );
}
function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="form-field">
      {label}
      {required ? " *" : ""}
      <input
        name={name}
        type={type}
        required={required}
        maxLength={type === "email" ? 254 : type === "tel" ? 40 : 200}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "phone"
                ? "tel"
                : "organization"
        }
      />
    </label>
  );
}
