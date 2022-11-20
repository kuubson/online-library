import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

export const useQueryParams = () => queryString.parse(useLocation().search)
