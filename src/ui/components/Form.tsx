"use client";

import React, { useState } from "react";
import { ImportantText } from "../design-system/ImportantText";
import { Typographie } from "../design-system/Typographie";
import Image from "next/image";
/* import { Links } from "../design-system/Links"; */
import { Inputs } from "../design-system/Inputs";
import { Button } from "../design-system/Button";
import { IoIosSend } from "react-icons/io";
import { useTranslations } from "next-intl";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          business: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="form"
      className="w-full min-h-screen flex justify-center items-center"
    >
      <div className="mx-auto w-fit space-y-[40px]">
        <div className="flex flex-col items-center gap-[30px] relative handshow">
          <ImportantText img="/img/svg/Wave-Marker.svg">
            <Typographie
              variant="h6"
              theme="secondary"
              className="uppercase"
              weight="medium"
            >
              {t("form.contactTitle")}
            </Typographie>
          </ImportantText>
          <Typographie
            textEffect="large"
            className="font-calfine uppercase text-center"
            variant="h3"
            theme="secondary"
          >
            {t("form.title1")}
            <Typographie variant="h3" theme="tercery">
              {" "}
              {t("form.title2")}
            </Typographie>
          </Typographie>

          <Typographie className="max-w-[434px] text-center inline-block">
            {t("form.formDescription")}
            <br />
             {t("form.descr")}
            <span className="inline-flex items-center">
              <Image
                alt="Magic Icon"
                src="/img/svg/magic.svg"
                width={18}
                height={18}
                className="inline-block align-middle ml-2"
              />
            </span>
          </Typographie>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-[580px] space-y-[18px] mx-auto handwrite relative"
        >
          <div className="flex items-center gap-[10px]">
            <Inputs
              required
              typeOfInput="text"
              icon="/img/svg/nameInput.svg"
              placeHolder={t("form.formPlaceholders.name")}
              value={formData.name}
              onChange={handleChange("name")}
            />
            <Inputs
              required
              typeOfInput="text"
              icon="/img/svg/envelope.svg"
              placeHolder={t("form.formPlaceholders.email")}
              value={formData.email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <Inputs
              typeOfInput="text"
              icon="/img/svg/job.svg"
              placeHolder={t("form.formPlaceholders.business")}
              value={formData.business}
              onChange={handleChange("business")}
            />
            <Inputs
              required
              typeOfInput="text"
              icon="/img/svg/mobile.svg"
              placeHolder={t("form.formPlaceholders.phone")}
              value={formData.phone}
              onChange={handleChange("phone")}
            />
          </div>
          <Inputs
            className="h-[200px]"
            typeOfInput="textarea"
            icon="/img/svg/messages.svg"
            placeHolder={t("form.formPlaceholders.message")}
            value={formData.message}
            onChange={handleChange("message")}
          />
          <Button
            icon={{ icon: IoIosSend }}
            inputType="submit"
            className="w-full text-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
