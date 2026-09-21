import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next["name"] = "Enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next["email"] = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next["email"] = "Enter a valid email address.";
    if (!String(data.get("message") ?? "").trim()) next["message"] = "Enter a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success border border-border p-8" role="status" aria-live="polite">
        <p className="label-mono text-muted-foreground">Received</p>
        <p className="display-md mt-4">Message logged.</p>
        <p className="body-copy mt-4 max-w-[46ch] text-muted-foreground">
          This form is not yet connected to an inbox. Share the destination address and we will wire
          submissions through to it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2" aria-describedby="contact-form-status">
      <p id="contact-form-status" className="sr-only">
        All fields marked required must be completed.
      </p>
      <div>
        <label htmlFor="name" className="label-mono text-muted-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors["name"] ? "true" : undefined}
          aria-describedby={errors["name"] ? "name-error" : undefined}
          className="field-input mt-2"
        />
        {errors["name"] ? (
          <p id="name-error" className="data-mono mt-2 text-primary" role="alert">
            {errors["name"]}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="company" className="label-mono text-muted-foreground">
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="field-input mt-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-mono text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-required="true"
          aria-invalid={errors["email"] ? "true" : undefined}
          aria-describedby={errors["email"] ? "email-error" : undefined}
          className="field-input mt-2"
        />
        {errors["email"] ? (
          <p id="email-error" className="data-mono mt-2 text-primary" role="alert">
            {errors["email"]}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="label-mono text-muted-foreground">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className="field-input mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="interest" className="label-mono text-muted-foreground">
          Project Interest
        </label>
        <select id="interest" name="interest" className="field-input mt-2" defaultValue="land">
          <option value="land">Land opportunity</option>
          <option value="capital">Capital / investment</option>
          <option value="development">Development partnership</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className="label-mono text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={errors["message"] ? "true" : undefined}
          aria-describedby={errors["message"] ? "message-error" : undefined}
          className="field-input mt-2 min-h-40 resize-y"
        />
        {errors["message"] ? (
          <p id="message-error" className="data-mono mt-2 text-primary" role="alert">
            {errors["message"]}
          </p>
        ) : null}
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="btn-brut btn-solid" data-cursor="open">
          <span>Start Conversation</span>
        </button>
      </div>
    </form>
  );
}
