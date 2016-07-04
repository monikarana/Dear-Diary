import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {SelectList} from '../../components/SelectList';
import './style.scss';

const mapStateToProps = (state, {location: {query}}) => {
    const tag = query.tag || null;
    const entries = Object.keys(state.entries)
                          .sort()
                          .map((k) => state.entries[k]);

    return {
        entries,
        tag
    };
};

@connect(mapStateToProps)
class BrowseEntries extends Component {
    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            body: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(moment).isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired
        })).isRequired,
        tag: PropTypes.string
    };

    render () {
        const entries = this.props.entries;

        return <div className='BrowseEntries__container'>
            <div className='BrowseEntries__tags'>
                <SelectList />
            </div>
            <div className='BrowseEntries__entries'>
                <ul className='BrowseEntries__entries-list'>
                    {/* eslint-disable prefer-arrow-callback */}
                    {entries.map(function (e) {
                        return (
                            <li className='BrowseEntries__entries-list-item' key={e.date.format('YYYY-MM-DD')}>
                                <h2 className='BrowseEntries__entries-header'>
                                    <Link to={'/entries/' + e.date.format('YYYY-MM-DD')}>{e.date.format('dddd MMMM DD, YYYY')}</Link>
                                </h2>
                                <div className='BrowseEntries__entries-tags'>{e.tags.map(function (t) { return <Link key={t} query={{tag: t}} to='/entries'>{t}, </Link>; })}</div>
                                <div className='BrowseEntries__entries-excerpt'>{e.body.substr(0, 100)}...</div>
                            </li>
                        );
                    })}
                </ul>
                {/* eslint-enable */}
            </div>
        </div>;
    }
}

export {
    BrowseEntries
};
