import FilterBoxPage from '../component/FilterBoxPage'
import BoxResults from '../component/boxresults/BoxResults'

const getRoute = (page, props = {}) => {
  const routes = {
    Ingredients: <FilterBoxPage {...props} />,
    Formulas: <FilterBoxPage {...props} />,
    Trends: <BoxResults {...props} />
  }

  return routes[page] || <div></div>
}

export default getRoute;
