import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectLoading, loadFilterData, loadItems } from '../../Redux/slices/azelis/azelisSlice'

const useLoadSection = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoading);

  useEffect(() => {
    if (loadingState.filters === null) {
      dispatch(loadFilterData())
    }
    if (loadingState.filters === 'loaded' && loadingState.data === null) {
      dispatch(loadItems())
    }
  }, [loadingState])

  return;
}

export default useLoadSection;
