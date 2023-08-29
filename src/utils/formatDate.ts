function formateDate(date: string, locale = 'ru-RU') {
  try {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  } catch (e) {
    console.warn(`Cannot convert ${date} to ${locale} format`);
    return date;
  }
}

export { formateDate };
