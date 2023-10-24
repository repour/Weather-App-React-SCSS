import { useState } from "react"
import PropTypes from 'prop-types'
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from "../../api"

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=7500000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(error => console.error(error))
    };
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    };


    return (
        <>
            <AsyncPaginate
                placeholder='Serach for city'
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />

        </>
    )
}


Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
}


export default Search