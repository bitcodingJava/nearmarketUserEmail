import React from 'react'

const SearchBox = ({ handleChange }) => {
    return (
        <div className="searchbox">
            <div className="searchbox-con">
                <input
                    type="text"
                    placeholder="검색하기"
                    onChange={handleChange}
                    style={{
                        width: '300px',
                        height: '20px',
                        padding: '10px',
                        marginTop: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        backgroundImage: 'url(/images/vegetable/search.png)',
                        backgroundPosition: 'right 10px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px 20px',
                    }}
                />

            </div>
        </div>
    )
}

export default SearchBox