import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    console.log("Changing language to:", lang);
    i18n.changeLanguage(lang); // should work now
  };

  return (
    <select onChange={changeLanguage} value={i18n.language}>
      <option value="en">English</option>
      <option value="te">తెలుగు</option>
    </select>
  );
}
