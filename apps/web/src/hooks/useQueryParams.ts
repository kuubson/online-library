import queryString from 'query-string'
import { useLocation } from 'react-router'

export const useQueryParams = () => queryString.parse(useLocation().search)
