import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

//compose viene utilizzato quando si desidera trasferire più potenziatori del negozio al negozio

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(    //è equivalente a scriverlo senza compose
    connect(mapStateToProps),
    WithSpinner)(CollectionsOverview);

export default CollectionsOverviewContainer;