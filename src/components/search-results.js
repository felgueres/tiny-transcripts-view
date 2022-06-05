import { useSearchParams } from "react-router-dom";
import SkeletonHit from "../skeletons/SkeletonHit";
import useSearch from "./useSearch";

const reactStringReplace = require('react-string-replace')

const HitItem = ({ h, q }) => {

    let r = '(' + q.split(' ').join('|') + ')'

    return (
        <table id='results-table'>
            <tbody>
                <tr>
                    <td>
                        <span className="title">{h.company_name}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        {reactStringReplace(h.s, new RegExp(r, "gmi"), (match,i)=>(<b key={i}>{match}</b>))}
                    </td>
                </tr>
                <tr>
                    <td onClick={handleClick}>
                        <span> Show Original<br /></span>
                        <span className="summary not-visible">{h.original}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


const handleClick = event => {
    event.currentTarget.querySelector('.summary').classList.toggle('not-visible')
}

export const SearchResults = () => {
    let [searchParams,] = useSearchParams();
    let { data, loading } = useSearch(searchParams)

    if (loading) {
        return <>
            <SkeletonHit />
        </>
    }

    return (<>
        <tr>
            <td>
                {Object.entries(data).map(([k, v],) => <HitItem key={k} h={v} q={searchParams.get('q')} />)}
                {data.length === 0 && <span>Your search did not match any documents. <br /> <br /> Try different or fewer keywords.</span>}
            </td>
        </tr>
    </>
    )
};
