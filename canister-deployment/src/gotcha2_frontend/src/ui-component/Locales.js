import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// third-party
import { IntlProvider } from 'react-intl';

// load locales files
const loadLocaleData = (locale) => {
    switch (locale) {
        default:
            return import('../utils/locales/en.json');
    }
};

// ==============================|| LOCALIZATION ||============================== //

const Locales = ({ children }) => {
    const customization = useSelector((state) => state.customization);
    const [messages, setMessages] = useState(loadLocaleData.default);

    useEffect(() => {
        loadLocaleData(customization.locale).then((d) => {
            setMessages(d.default);
        });
    }, [customization.locale]);

    return (
        <>
            {messages && (
                <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

Locales.propTypes = {
    children: PropTypes.node
};

export default Locales;
