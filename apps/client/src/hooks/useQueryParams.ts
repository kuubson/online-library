import { useLocation } from 'react-router'
import queryString from 'query-string'

export const useQueryParams = () => queryString.parse(useLocation().search)
