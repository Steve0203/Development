import "./navbar.css"
import { selectPage } from "../../Redux/slices/navigationSlice"
import { goTo } from '../../Redux/globalActions'
import { useSelector, useDispatch } from 'react-redux';
import { selectTabs } from "../../Redux/slices/azelis/azelisSlice";

const Navbar = () => {
  const tabs = useSelector(selectTabs)
  const activeTab = useSelector(selectPage);

  const dispatch = useDispatch();

  return (
    <div style={{ margin: "10px 0" }}>
      <div className="box-hc">
        {tabs.map(({ slug, label }) => (
          <span
            style={activeTab === slug ? styles.active : styles.inactive}
            onClick={() => {
              dispatch(goTo(slug));
            }}
            className="text-hc"
            key={slug}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const styles = {
  active: {
    borderBottom: 'solid 2px #1E7BE2',
    fontFamily: 'MuseoSans-500'
  },
  inactive: {
    color: '#8E8E8E',
    fontFamily: 'MuseoSans-300'
  }
}

export default Navbar
