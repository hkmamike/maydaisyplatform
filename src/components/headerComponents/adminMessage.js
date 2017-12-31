import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    ch: {
        adminMessage: "多謝大家的支持和期待！五月菊市集的服務還未正式開啟，我們會在二月初開業。",
    },
    en:{
        adminMessage: "Thankyou for all the support and excitement! MayDaisy marketplace is not yet live. We target to launch in ealry Feb 2018.",
    }
  });

export default class AdminMessage extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
            strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

    render() {
        return (
            <div className="admin-message">
                {strings.adminMessage}
            </div>
        )
    }
}