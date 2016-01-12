import React, {
    Component,
} from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from '../../styles/components/editor.scss';

import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

import MediumEditor from 'react-medium-editor';
import '../../../node_modules/medium-editor/dist/css/medium-editor.css';
import '../../../node_modules/medium-editor/dist/css/themes/default.css';

class Editor extends Component {
    handleDateChange = () => {
        return false;
    };

    render() {
        let currentDate;

        currentDate = moment().format('MMMM DD, YYYY');

        return (
            <div styleName='edit-page'>
                <div styleName='entry-date'>
                    <span styleName='visible-date'>{currentDate}</span>

                    <DatePicker
                        styleName='edit-date'
                        popoverTargetOffset='10px 25px'
                        onChange={this.handleDateChange}
                    />
                </div>

                <div >
                    <MediumEditor
                        tag='pre'
                        styleName='edit-entry'
                        options={{
                            placeholder: {
                                text: 'Dear Diary,',
                            },
                            toolbar: {
                                buttons: ['bold', 'italic', 'strikethrough', 'h2', 'h3', 'removeFormat'],
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default CSSModules(Editor, styles);
