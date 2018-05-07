import React from 'react';

// ?keyword=123 뭐 이런식으로 쓰면 그게 저기 저장됨

const Search = ({location}) => {
    return (
        <div>
            {new URLSearchParams(location.search).get('keyword')} Search
        </div>
    );
};

export default Search;