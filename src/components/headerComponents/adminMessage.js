import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    zh: {
        adminMessage: "小提示: 花藝師會在檔期已滿的日期停止接受訂單。如果您的訂花日期顯示為已滿，請考慮其他的花藝師。",
    },
    en:{
        adminMessage: "Tip: Florists will stop accepting orders on full days. If your day is greyed out on the calendar, please check out other florists.",
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