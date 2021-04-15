import { Component } from 'react';
import { connect } from 'react-redux';

//Actions
import * as SiteActions from '../../../store/actions/siteActions';

interface TableTaleProps {
    //Character
    birth_year: string,
    films: Array<string>,
    films_data: Array<Film>
    name: string,
    height: string,
    visible: boolean,
    gender: string
    //Reducer Actions
    getFilm: (name: string, film: number) => any
}
interface Film {
    characters: Array<string>,
    title: string
}
class TableTale extends Component<TableTaleProps> {
    state = {
        open: false
    }
    showDescription() {
        this.setState({ open: !this.state.open });
        if (!this.props.films_data)
            this.props.films.forEach(film => {
                this.props.getFilm(this.props.name, parseInt(film[film.length - 2]))
            })

    }
    render() {
        return (
            <div className={`table-tale ${this.state.open ? 'description-expanded' : ''}`} onClick={() => this.showDescription()}>
                <div className={`table-row `}>
                    <div className='tale-text'>
                        {this.props.name}
                    </div>
                    <div className='tale-text'>
                        {this.props.gender}
                    </div>
                    <div className='tale-text'>
                        {this.props.birth_year}
                    </div>
                </div>

                <div className={`tale-description ${this.state.open ? 'expanded' : ''}`}>
                    <div className='description-part'>
                        <span className={`highlighted ${this.state.open ? 'expanded' : ''}`}>Age:</span>
                        <div>{this.props.birth_year}</div>
                    </div>
                    <div className='description-part'>
                        <span className={`highlighted ${this.state.open ? 'expanded' : ''}`}>Height:</span>
                        <div>{this.props.height}</div>
                    </div>
                    <div className='description-part'>
                        <span className={`highlighted ${this.state.open ? 'expanded' : ''}`}>Films:</span>
                        {this.props.films_data && this.props.films_data.map((film, fi) => {
                            return <div key={fi}>{film.title}</div>
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: any) => ({
    site: state.site
});
const mapDispatchToProps = (dispatch: any) => ({
    getFilm: (name: string, film: number) => {
        dispatch(SiteActions.getFilm(name, film));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableTale);