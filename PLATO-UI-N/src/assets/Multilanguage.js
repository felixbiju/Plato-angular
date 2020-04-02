function googleTranslateElementInit() {
  // window.location.reload();
    new google.translate.TranslateElement({
      pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }