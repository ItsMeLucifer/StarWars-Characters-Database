import { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

//Partials
import TableTale from './tableTale/TableTale';
//Actions
import * as SiteActions from '../../store/actions/siteActions';

//CSS
import './charsTable.scss';

//Icons
import SortIcon from '@material-ui/icons/Sort';

interface Character {
    birth_year: string,
    films: Array<string>,
    films_data: Array<Film>
    name: string,
    height: string,
    visible: boolean,
    gender: string
}
interface Film {
    characters: Array<string>,
    title: string
}
interface Site {
    characters: Array<Character>,
    next: string,
    previous: string,
    totalLength: number
}
interface CharsTableProps {
    site: Site,
    getCharacters: (character: number) => any,
    sortCharactersByName: () => any,
    searchFilm: (film: number) => any,
    searchName: (name: string) => any
}
class CharsTable extends Component<CharsTableProps> {
    state = {
        name: '',
        film: 0
    }
    componentDidMount() {
        this.props.getCharacters(0);

    }
    loadMoreCharacters() {
        this.state.name === '' && this.state.film === 0 && this.props.site.next && this.props.getCharacters(parseInt(this.props.site.next[this.props.site.next.length - 1]));
    }
    sortCharactersByName() {
        this.props.sortCharactersByName()
    }
    searchFilm(film: number) {
        this.setState({ film: film });
        this.setState({ name: '' });
        this.props.searchFilm(film);
    }
    searchName(name: string) {
        this.setState({ film: 0 });
        this.setState({ name: name });
        this.props.searchName(name);
    }
    render() {
        return (
            <div className='char-page'>
                <div className='title-page-text'>Star Wars
                    <div className='subtitle-page-text'>Characters Database</div>
                </div>
                <div className='char-table'>
                    <div className='table-row-2'>
                        <input placeholder='Search name' type='text' className='search-input' value={this.state.name} onChange={e => this.searchName(e.target.value)} />
                        <select value={this.state.film} onChange={e => parseInt(e.target.value) !== 0 && this.searchFilm(parseInt(e.target.value))}>
                            <option value={0}>Select a movie</option>
                            <option value={1}>A New Hope</option>
                            <option value={2}>The Empire Strikes Back</option>
                            <option value={3}>Return of the Jedi</option>
                            <option value={4}>The Phantom Menace</option>
                            <option value={5}>Attack of the Clones</option>
                            <option value={6}>Revenge of the Sith</option>
                        </select>
                    </div>
                </div>
                <div className='char-table'>
                    <div className='table-row-2'>
                        <div className='column-name-text'>
                            Name <SortIcon className='icon' onClick={() => this.sortCharactersByName()} />
                        </div>
                        <div className='column-name-text'>
                            Gender
                        </div>
                        <div className='column-name-text'>
                            Birth
                        </div>
                    </div>
                    <div className='main-space'>
                        <InfiniteScroll
                            style={{ width: '100%' }}
                            pageStart={0}
                            loadMore={() => this.loadMoreCharacters()}
                            hasMore={this.props.site.characters.length < 81}
                            loader={this.state.name === '' && this.state.film === 0 ? <div style={{ color: 'yellow' }}>Loading...</div> : <div></div>}
                            threshold={250}
                        >
                            {this.props.site.characters.map((character, ci) => {
                                if (character.visible) return <TableTale key={ci} {...character} />
                                else return <span style={{ display: 'none' }}></span>
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => ({
    site: state.site
});
const mapDispatchToProps = (dispatch: any) => ({
    getCharacters: (page: number) => {
        dispatch(SiteActions.getCharacters(page));
    },
    sortCharactersByName: () => {
        dispatch(SiteActions.sortCharactersByName());
    },
    searchName: (name: string) => {
        dispatch(SiteActions.searchName(name));
    },
    searchFilm: (film: number) => {
        dispatch(SiteActions.searchFilm(film));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharsTable);