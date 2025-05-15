function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi',
            autoDisplay: false
        }, 'google_translate_element');
    }

    // Load the script
    (function() {
        var gtScript = document.createElement('script');
        gtScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.head.appendChild(gtScript);
    })();

    // Save and apply language
    function changeLanguage(langPair) {
        localStorage.setItem('preferredLanguage', langPair);
        applyTranslation(langPair);
    }

    function applyTranslation(langPair) {
        const lang = langPair.split('|')[1];
        const interval = setInterval(() => {
            const select = document.querySelector('select.goog-te-combo');
            if (select) {
                select.value = lang;
                select.dispatchEvent(new Event('change'));
                clearInterval(interval);
            }
        }, 100);
    }

    // Apply preferred language on every page load
    window.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) applyTranslation(savedLang);
    });