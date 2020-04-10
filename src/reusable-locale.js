import React, { useState, useEffect, useCallback } from "react";
import { createStore } from "reusable";
import moment from "moment";
import "moment/locale/he";

export const LOCALES = {
  en: "US",
  gb: "GB",
};
moment.locale(LOCALES.en);

export const useLocalization = createStore(() => {
  const [locale, setLocale] = useState(LOCALES.en);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  const currentDate = useCallback(() => {
    return moment().format("L");
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return { locale, setLocale, currentDate };
});

export const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocalization();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      {Object.keys(LOCALES).map((key) => (
        <option key={key} value={LOCALES[key]}>
          {LOCALES[key]}
        </option>
      ))}
    </select>
  );
};
