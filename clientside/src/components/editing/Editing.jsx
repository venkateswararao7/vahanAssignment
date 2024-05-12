import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./editing.css";

const Editing = () => {
    const location = useLocation();
    const [data, setData] = useState(null);

    // Function to parse query string into object
    const parseQueryString = queryString => {
        const params = {};
        const queryStringWithoutQuestionMark = queryString.substring(1);
        queryStringWithoutQuestionMark.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = decodeURIComponent(value);
        });
        return params;
    };

    useEffect(() => {
        // Extracting data from the query string
        const queryString = location.search;
        const parsedData = parseQueryString(queryString);

        // Set the parsed data to state
        setData(parsedData);
    }, [location.search]); // Trigger the effect whenever location.search changes

    return (
        <div>
            {data && (
                <div>
                    {/* Render the data here */}
                    <h1>Data:</h1>
                    <p>{JSON.stringify(data)}</p>
                </div>
            )}
        </div>
    );
}

export default Editing;
