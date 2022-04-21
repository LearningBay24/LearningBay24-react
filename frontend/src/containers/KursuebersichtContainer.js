import { fetchArticleDetails } from '../redux/actions'
import { Kursuebersicht } from '../components/Kursuebersicht'


function mapDispatchToProps(dispatch) {
    return({
        fetchArticleDetails: () => {dispatch(fetchArticleDetails())}
    });
}

function mapStateToProps(state) {
    return({
        test: state
    });
}
/*
export const KursuebersichtContainer = connect(
    mapStateToProps, mapDispatchToProps)(
    Kursuebersicht
    );*/

export default connect(mapStateToProps)(Kursuebersicht);
