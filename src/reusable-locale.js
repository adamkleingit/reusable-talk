import React, { useState, useEffect, useCallback } from "react";
import { reusable } from "reusable";
import moment from "moment";

export const LOCALES = {
  enUS: "en-US",
  heIL: "he-IL"
};

export const useLocalization = reusable(() => {
  const [locale, setLocale] = useState(LOCALES.enUS);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  const currentTime = useCallback(() => moment().format("L"), []);

  return { locale, setLocale, currentTime };
});

export const LocalSwitcher = () => {
  const { locale, setLocale } = useLocalization();

  return (
    <select value={locale} onChange={e => setLocale(e.target.value)}>
      {Object.keys(LOCALES).map(key => (
        <option value={LOCALES[key]}>{LOCALES[key]}</option>
      ))}
    </select>
  );
};
