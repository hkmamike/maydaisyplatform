import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    zh: {
        adminMessage: "如有任何疑問，可以致電我們的下單／客戶服務專家: (852)9346-8427",
    },
    en:{
        adminMessage: "Our order & customer service expert is available at (852)9346-8427 or contact@maydaisy.com",
    }
  });

export default class AdminMessage extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='zh') {
            strings.setLanguage('zh');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

    render() {

        var currentPath = window.location.pathname;

        return (
            <div>
                {(this.props.onHomePage && currentPath.includes('/zh/')) && <div className="admin-message">
                    五月菊開業喇！如有任何疑問，可以致電我們的下單／客戶服務專家: (852) 9346-8427
                </div>}
                {(this.props.onHomePage && currentPath.includes('/en/')) && <div className="admin-message">
                    Welcome! If you have any question, please call out order & customer service expert @ (852) 9346-8427
                </div>}

                {!this.props.onHomePage && <div className="admin-message">
                    {strings.adminMessage}
                </div>}
            </div>
        )
    }
}